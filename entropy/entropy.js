// получение аргументов из командной строки
let argumentsFromConsole = process.argv;
let inputFile = argumentsFromConsole[2];

// проверка на наличие файла
let testNotNan = inputFile;
if (testNotNan){
    let testTxt = (inputFile.slice(-4) == '.txt'); // проверка формата файла
    if (testTxt){
        const fileSystem = require('fs');
        let input = fileSystem.readFileSync(inputFile, 'utf8'); 

        // создание объекта для хранения частот символов
        let alph = new Object(); //объект, где ключи — символы текста, а значения — частота их появления.
        let entropy = 0;
        let inputLength = input.length; // длина текста

        // подсчет частот символов
        for (let i = 0; i < inputLength; i++){
            if (alph[input.charAt(i)])
                alph[input.charAt(i)] ++; //Если символ уже есть в объекте alph, увеличивает его частоту на 1
            else
                alph[input.charAt(i)] = 1;// Если символа нет, добавляет его в объект с частотой 1
        }

        // нормализация частот символов
        for (let i in alph){
            alph[i] /= inputLength; // вероятность поялвения символа
        }

        // Вычисление энтропии
        for (let i in alph)
            entropy -= alph[i] * Math.log2(alph[i]);
		
        console.log("Энтропия данного текста =", entropy);
        console.log("\nАлфавит с частотами");
        console.log(alph);
    }
    else{
        console.log("ERROR");
    }
}
else{
    console.log("ERROR");
}

/*
запуск
cd desktop
cd js
cd entropy
node entropy.js text1.txt
node entropy.js text2.txt
node entropy.js text3.txt
*/