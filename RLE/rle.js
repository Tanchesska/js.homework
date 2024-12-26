let argumentsFromConsole = process.argv; // получаем данные из консоли
let typeOfOperation = argumentsFromConsole[2]; // функции сode или decode
let inputFile = argumentsFromConsole[3]; // входной файл
let outputFile = argumentsFromConsole[4];  // выходной файл

try {
    let testTxt = (inputFile.slice(-4) === '.txt' && outputFile.slice(-4) === '.txt'); 
    let testOperation = (typeOfOperation === 'code' || typeOfOperation === 'decode');

    if (testTxt && testOperation) {
        const fileSystem = require('fs');
        let inputData = fileSystem.readFileSync(inputFile, 'utf8');
        let code = '';

        if (typeOfOperation === 'code') {  // code
            inputData += ' '; // добавляем пробел, чтобы гарантировать обработку последнего символа
            let count = 1; // счетчик последовательно одинаковых символов
            for (let i = 0; i < inputData.length - 1; i++) {
                if (inputData[i] === inputData[i + 1]) {
                    count++;
                } else {
                    while (count > 255) {
                        code += '#' + '255' + inputData[i];
                        count -= 255;
                    }
                    if (count > 2 || inputData[i] === '#') {
                        code += '#' + String(count) + inputData[i];
                    } else {
                        code += inputData[i].repeat(count);
                    }
                    count = 1;
                }
            }
            fileSystem.writeFileSync(outputFile, code);
           let compression = (inputData.length - 1) / code.length; // коэффициент сжатия
            console.log("Коэффициент сжатия =", compression);

        } else { // decode
           let i = 0; // используем для прохода по символам строки
            while (i < inputData.length) {
                if (inputData[i] === '#') {
                   i++; // Пропускаем символ #
                    let countStr = ''; // счетчик цифр после #
                    while (i < inputData.length && !isNaN(parseInt(inputData[i]))) {
                         countStr += inputData[i];
                         i++;
                    }

                    let count = parseInt(countStr); // преобразование countStr в число count

                     if (isNaN(count)) { // Если после # не оказалось цифр, то программа добавляет # в результат (code) и переходит к следующей итерации цикла.
                       code += "#";
                       continue;
                     }
                    if(i < inputData.length) {
                        code += inputData[i].repeat(count); // повторение символа count раз и добавляем в результат
                         i++;
                     } else {
                         code += '#' + count
                    }
                } else { // обработка обычных символов
                    code += inputData[i];
                    i++;
                }
            }
            fileSystem.writeFileSync(outputFile, code); // записываем результат в файл
        }
    } else {
        console.log("Неверные аргументы");
    }
} catch (e) {
    console.error("Ошибка:", e);
}

/*
запуск(записать исходную строку в файл input.txt)
cd desktop
cd js
cd rle
node rle.js code input.txt code.txt
node rle.js decode code.txt decoded.txt
*/