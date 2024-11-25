function escape_encode(input){ // функция, которая выполняет сжатие строки
    let result = ''; // запихиваем результат сжатой строки в result
    
    let i = 0;
    while (i<input.length) { // цикл перебирает каждый символ строки input
        let count = input[i]; // currentSimbol сохраняет символ строки input
        // подсчитываем количество одинаковых символов, которые идут друг за другом
        let length = 1;
        while (count == input[length+i]){
            length++; // перемення увеличивается, пока символы совпадают
        }
    // Добавляем результат в result
        if (length<=2){
            result += count.repeat(length);
        }
        else{
            result += length + count;
        }
        // переход к следующим символам
        i += length;        
    }
    return result;
}

let fs = require('fs'); //подключили библиотеку

var inText = fs.readFileSync('input.txt'); //считали из файла
var a = inText.toString() //сохранили в переменную как строку

encode_str = escape_encode(a);
fs.writeFileSync('output.txt', encode_str);

console.log("Коэффициент сжатия = ", a.length/encode_str.length); // выводим степень сжатия