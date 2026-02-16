[![Playwright Tests CI](https://github.com/nightCoffe/christmas_tree_generator/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/nightCoffe/christmas_tree_generator/actions/workflows/playwright-tests.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


ASCII-генератор новогодней елки на TypeScript с автоматизированным тестированием на Playwright.

##  Описание

Проект treeNext генерирует красивую ASCII-елку с возможностью указать количеством уровней и сохраняет её в текстовый файл по указанному адресу. По умолчанию выводит 5 уровней и сохраняет в файл tree.txt

Проект treeSimple упрощенный вариант генератора без возможности задать количество уровней и путь к выходному файлу.



##  Генерация елки

Входные параметры
- количество уровней елки (положительное число)
- путь к выходному файлу (по умолчанию ./tree.txt)

С кастомными параметрами
npm run build
node src/dist/treeNext.js <количество_уровней> <путь_к_файлу>

Примеры
node src/dist/treeNext.js 10 src/output/big_tree.txt
node src/dist/treeNext.js 3 small_tree.txt


##  Запуск тестов

npm test


##  ⭐ Если проект понравился, поставьте звезду!

