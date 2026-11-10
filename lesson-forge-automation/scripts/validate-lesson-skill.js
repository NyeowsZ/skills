#!/usr/bin/env node

/**
 * validate-lesson-skill.js
 * Validates that the lesson-forge-automation skill conforms strictly to
 * the agentskills.io standard and skill architectural conventions.
 */

const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

function showHelp() {
  console.log(`
Usage: node validate-lesson-skill.js <path-to-skill-dir> [options]

Options:
  --max-router-lines <n>   Max lines allowed in SKILL.md [Default: 120]
  --max-leaf-lines <n>     Max lines allowed in a single reference file [Default: 200]
  --json                   Output results as JSON
  --help                   Show this help message
`);
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const rawYaml = match[1];
  const fields = {};
  for (const line of rawYaml.split(/\r?\n/)) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();
      fields[key] = val;
    }
  }
  return fields;
}

function extractMarkdownLinks(content) {
  const links = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const target = match[2].trim();
    if (!target.startsWith('http://') && !target.startsWith('https://') && !target.startsWith('#')) {
      links.push(target);
    }
  }
  return links;
}

function countLines(content) {
  return content.split(/\r?\n/).length;
}

function validateSkill(targetDir, maxRouter, maxLeaf) {
  const errors = [];
  const warnings = [];

  const skillPath = path.join(targetDir, 'SKILL.md');
  if (!fs.existsSync(skillPath)) {
    errors.push('Missing required entry file: SKILL.md');
    return { valid: false, errors, warnings };
  }

  const skillContent = fs.readFileSync(skillPath, 'utf8');
  const skillLines = countLines(skillContent);
  if (skillLines > maxRouter) {
    warnings.push(`SKILL.md is ${skillLines} lines (recommended <= ${maxRouter})`);
  }

  // Frontmatter checks
  const fm = parseFrontmatter(skillContent);
  if (!fm) {
    errors.push('SKILL.md missing valid YAML frontmatter (delimited by ---)');
  } else {
    if (!fm.name) errors.push('Frontmatter missing "name" field');
    if (!fm.description) errors.push('Frontmatter missing "description" field');
    if (!fm.compatibility) warnings.push('Frontmatter missing "compatibility" field');
  }

  // Check references folder
  const refDir = path.join(targetDir, 'references');
  if (!fs.existsSync(refDir) || !fs.statSync(refDir).isDirectory()) {
    warnings.push('references/ directory does not exist');
  } else {
    const refFiles = fs.readdirSync(refDir).filter(f => f.endsWith('.md'));
    if (refFiles.length === 0) {
      warnings.push('references/ directory contains no markdown files');
    }
    for (const refFile of refFiles) {
      const refPath = path.join(refDir, refFile);
      const refContent = fs.readFileSync(refPath, 'utf8');
      const lines = countLines(refContent);
      if (lines > maxLeaf) {
        warnings.push(`Reference file ${refFile} has ${lines} lines (recommended <= ${maxLeaf})`);
      }
    }
  }

  // Check links in SKILL.md
  const links = extractMarkdownLinks(skillContent);
  for (const link of links) {
    const cleanLink = link.split('#')[0];
    if (cleanLink) {
      const resolved = path.resolve(targetDir, cleanLink);
      if (!fs.existsSync(resolved)) {
        errors.push(`Dead markdown link in SKILL.md: ${link}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    skillLines
  };
}

function main() {
  const args = process.argv.slice(2);
  let targetPath = '.';
  let maxRouter = 140;
  let maxLeaf = 250;
  let outputJson = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      showHelp();
      process.exit(0);
    } else if (arg === '--max-router-lines') {
      maxRouter = parseInt(args[++i], 10);
    } else if (arg === '--max-leaf-lines') {
      maxLeaf = parseInt(args[++i], 10);
    } else if (arg === '--json') {
      outputJson = true;
    } else if (!arg.startsWith('-')) {
      targetPath = arg;
    }
  }

  const resolvedTarget = path.resolve(process.cwd(), targetPath);
  const result = validateSkill(resolvedTarget, maxRouter, maxLeaf);

  if (outputJson) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(`\n=== Skill Validation: ${path.basename(resolvedTarget)} ===`);
    console.log(`Status: ${result.valid ? 'PASSED (Compliant)' : 'FAILED'}`);
    console.log(`SKILL.md Lines: ${result.skillLines}`);

    if (result.errors.length > 0) {
      console.log('\nErrors:');
      result.errors.forEach(e => console.log(`  [X] ${e}`));
    }
    if (result.warnings.length > 0) {
      console.log('\nWarnings:');
      result.warnings.forEach(w => console.log(`  [!] ${w}`));
    }
    if (result.valid && result.warnings.length === 0) {
      console.log('Zero errors or warnings detected. Standard compliant!');
    }
    console.log('');
  }

  process.exit(result.valid ? 0 : 1);
}

main();

