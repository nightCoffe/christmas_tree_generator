import { promises as fs, writeFileSync } from 'fs';


function createChristmasTree(levels: number): string {
  let result = '';
  const maxWidth = (1 + (levels - 1) * 4) * 2 + 6;

  // размещаем по центру
  const center = (text: string) => {
    const pad = Math.floor((maxWidth - text.length) / 2);
    return ' '.repeat(Math.max(0, pad)) + text + '\n';
  };

  // верх
  result += center('W');
  result += '\n'; // Пустая строка после верхушки

  // уровни
  for (let i = 0; i < levels; i++) {
    let line = '';

    // добавление @ слева
    if (i % 2 === 1 && i > 0) {
      line += '@ ';
    }

    // добавление звезд
    const stars = 1 + (i * 4);
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

// указываем количество уровней
const tree = createChristmasTree(5);
console.log(tree);

// сохраняем в файл
writeFileSync('./tree.txt', tree, 'utf-8');
