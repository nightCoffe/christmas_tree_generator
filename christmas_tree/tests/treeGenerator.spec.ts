import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import { readFileSync, existsSync, rmSync, mkdirSync } from 'fs';
import * as path from 'path';

test.describe('Christmas Tree Generator - Acceptance Tests', () => {
  const testOutputDir = './test-output';
  const scriptPath = './src/dist/treeNext.js'; // Изменено на treeNext

  test.beforeAll(async () => {
    // Компилируем TypeScript перед тестами
    try {
      execSync('npx tsc src/treeNext.ts --outDir src/dist', { stdio: 'inherit' });
    } catch (error) {
      console.error('Ошибка компиляции:', error);
      throw error;
    }
  });

  test.beforeEach(async () => {
    if (!existsSync(testOutputDir)) {
      mkdirSync(testOutputDir, { recursive: true });
    }
  });

  test.afterEach(async () => {
    if (existsSync(testOutputDir)) {
      rmSync(testOutputDir, { recursive: true, force: true });
    }
  });

  test('должен создать елку с 5 уровнями', async () => {
    const outputPath = path.join(testOutputDir, 'tree-5.txt');

    execSync(`node ${scriptPath} 5 ${outputPath}`);

    expect(existsSync(outputPath)).toBeTruthy();
    const content = readFileSync(outputPath, 'utf-8');

    expect(content).toContain('W');
    expect(content).toContain('TTTTT');
    expect(content).toContain('*');
  });

  test('должен создать елку с украшениями @', async () => {
    const outputPath = path.join(testOutputDir, 'tree-decorations.txt');

    execSync(`node ${scriptPath} 6 ${outputPath}`);

    const content = readFileSync(outputPath, 'utf-8');
    expect(content).toContain('@');
  });

  test('должен создать вложенные директории', async () => {
    const outputPath = path.join(testOutputDir, 'nested', 'deep', 'tree.txt');

    execSync(`node ${scriptPath} 3 ${outputPath}`);

    expect(existsSync(outputPath)).toBeTruthy();
  });

  test('должен иметь пустые строки между уровнями', async () => {
    const outputPath = path.join(testOutputDir, 'tree-spacing.txt');

    execSync(`node ${scriptPath} 4 ${outputPath}`);

    const content = readFileSync(outputPath, 'utf-8');

    // Проверяем наличие двойных переносов строк
    expect(content).toContain('\n\n');
  });

  test('должен вернуть ошибку при отрицательном количестве уровней', async () => {
    const outputPath = path.join(testOutputDir, 'error.txt');

    expect(() => {
      execSync(`node ${scriptPath} -5 ${outputPath}`, { stdio: 'pipe' });
    }).toThrow();

    expect(existsSync(outputPath)).toBeFalsy();
  });

  test('должен использовать значения по умолчанию', async () => {
    const defaultPath = './tree.txt';

    try {
      execSync(`node ${scriptPath}`);
      expect(existsSync(defaultPath)).toBeTruthy();
    } finally {
      if (existsSync(defaultPath)) {
        rmSync(defaultPath);
      }
    }
  });

  test('должен создать файл в поддиректории src/output', async () => {
    const outputPath = './src/output/test-tree.txt';

    try {
      execSync(`node ${scriptPath} 5 ${outputPath}`);

      expect(existsSync(outputPath)).toBeTruthy();
      const content = readFileSync(outputPath, 'utf-8');
      expect(content).toContain('W');
    } finally {
      if (existsSync(outputPath)) {
        rmSync(outputPath);
      }
    }
  });

  test('файл должен содержать верхушку, уровни и ствол', async () => {
    const outputPath = path.join(testOutputDir, 'complete-tree.txt');

    execSync(`node ${scriptPath} 5 ${outputPath}`);

    const content = readFileSync(outputPath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());

    // Проверяем первую строку - верхушка
    expect(lines[0]).toContain('W');

    // Проверяем последние строки - ствол
    const lastLines = lines.slice(-2);
    expect(lastLines[0]).toContain('TTTTT');
    expect(lastLines[1]).toContain('TTTTT');
  });
});
