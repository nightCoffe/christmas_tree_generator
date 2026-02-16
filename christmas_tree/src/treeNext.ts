import { writeFileSync, mkdirSync } from 'fs';
import * as path from 'path';


function createChristmasTree(levels: number): string {
  let result: string = '';
  const maxWidth: number = (1 + (levels - 1) * 4) * 2 + 6;

  // размещаем по центру
  const center = (text: string): string => {
    const pad: number = Math.floor((maxWidth - text.length) / 2);
    return ' '.repeat(Math.max(0, pad)) + text + '\n';
  };

  // верх
  result += center('W');
  result += '\n'; // Пустая строка после верхушки

  // уровни
  for (let i = 0; i < levels; i++) {
    let line: string = '';

    // добавление @ слева
    if (i % 2 === 1 && i > 0) {
      line += '@ ';
    }

    // звездочки
    const stars: number = 1 + (i * 4);
    for (let j = 0; j < stars; j++) {
      line += '* ';
    }

    // добавление @ справа
    if (i % 2 === 0 && i > 0) {
      line += '@';
    }

    result += center(line.trim());

    // пустая строка после каждого уровня
    result += '\n';
  }

  // TTTTT
  result += center('TTTTT');
  result += '\n';
  result += center('TTTTT');

  return result;
}


function main(): void {
  // получаем параметры из командной строки
  const levels: number = parseInt(process.argv[2]) || 5;
  const outputPath: string = process.argv[3] || './tree.txt';

  // проверяем количество уровней
  if (isNaN(levels) || levels < 1) {
    console.error('Ошибка: количество уровней должно быть положительным числом');
    console.log('Пример: node treeGenerator.js 6 ./output/tree.txt');
    process.exit(1);
  }

  // создаем директорию если ее нет
  const dir: string = path.dirname(outputPath);
  if (dir !== '.') {
    try {
      mkdirSync(dir, { recursive: true });
    } catch (error) {
      console.error('Ошибка при создании директории:', error);
      process.exit(1);
    }
  }

  // создаем елку
  const tree: string = createChristmasTree(levels);

  console.log(tree);
  console.log('─'.repeat(50));

  // сохраняем в файл
  try {
    writeFileSync(outputPath, tree, 'utf-8');
    console.log(`Количество уровней: ${levels}`);
    console.log(`Путь к файлу: ${outputPath}`);
  } catch (error) {
    console.error('Ошибка при сохранении файла:', error);
    process.exit(1);
  }
}

main();
