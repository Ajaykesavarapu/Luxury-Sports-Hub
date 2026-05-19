import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function getFiles(dir, filesList = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      getFiles(fullPath, filesList);
    } else {
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        filesList.push(fullPath);
      }
    }
  }
  return filesList;
}

const files = getFiles('c:/Users/anudeep/OneDrive/Documents/ignite/Luxury-Sports-Hub/client/src');

const replacements = [
  { regex: /bg-\[#0A0A0A\]/g, replace: 'bg-[var(--bg-primary)]' },
  { regex: /bg-\[#111111\]/g, replace: 'bg-[var(--bg-secondary)]' },
  { regex: /bg-\[#1A1A1A\]/g, replace: 'bg-[var(--bg-card)]' },
  { regex: /text-white/g, replace: 'text-[var(--text-primary)]' },
  { regex: /text-\[#E8E8E8\]/g, replace: 'text-[var(--text-primary)]' },
  { regex: /text-\[#888888\]/g, replace: 'text-[var(--text-muted)]' },
  { regex: /text-black/g, replace: 'text-[var(--text-inverse)]' },
  { regex: /bg-white/g, replace: 'bg-[var(--bg-inverse)]' },
  { regex: /border-white\/5/g, replace: 'border-[var(--border-light)]' },
  { regex: /border-white\/10/g, replace: 'border-[var(--border-medium)]' },
  { regex: /border-white\/50/g, replace: 'border-[var(--text-muted)]' }
];

let changedCount = 0;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  let newContent = content;
  
  for (const { regex, replace } of replacements) {
    newContent = newContent.replace(regex, replace);
  }
  
  if (newContent !== content) {
    writeFileSync(file, newContent, 'utf8');
    changedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Operation completed. Updated ${changedCount} files.`);
