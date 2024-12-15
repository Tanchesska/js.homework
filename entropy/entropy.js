// получение аргументов из командной строки
let argumentsFromConsole = process.argv;
let inputFile = argumentsFromConsole[2]; 

// проверка на наличие файла
let testNotNan = inputFile;
if (testNotNan){
    let testTxt = (inputFile.slice(-4) == '.txt'); // проверка формата файла

    if (testTxt){
        const fileSystem = require('fs'); // подключение модуля файловой системы
        let input = fileSystem.readFileSync(inputFile, 'utf8'); // считывание содержимого файла
		// создание объекта для хранения частот символов
        let alph = new Object(); //объект, где ключи — символы текста, а значения — частота их появления.
        let alphPower = 0; // мощность алфавита
        let entropy = 0; // итоговая интропия текста
        let inputLength = input.length; // длина текста
	// подсчет частот символов
        for (let i = 0; i < inputLength; i++){
            if (alph[input.charAt(i)])
                alph[input.charAt(i)] ++; //Если символ уже есть в объекте alph, увеличивает его частоту на 1
            else
                alph[input.charAt(i)] = 1;// Если символа нет, добавляет его в объект с частотой 1
        }
	// нормализация частот символов
        for (let i in alph){ // Для каждого символа в объекте alph делит его частоту на общую длину текста, чтобы получить вероятность появления символа
            alphPower++; // Увеличивает alphPower (мощность алфавита) на 1 для каждого уникального символа
            alph[i] /= inputLength;  
        }
	// Вычисление энтропии
        if (alphPower>1){
            for (let i in alph)
                entropy -= alph[i] * Math.log(alph[i]); // вычисляем по формуле
            entropy /= Math.log(alphPower); // Делит итоговую сумму на логарифм мощности алфавита, чтобы нормализовать энтропию
        }
	// Вывод результатов
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