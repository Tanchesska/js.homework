function escape_encode(input) {    
    let result = '';
    let i = 0;    
    while (i < input.length) {
        let currentChar = input[i];        
        let count = 1;
        // Подсчет повторений текущего символа
        while (i + count < input.length && currentChar === input[i + count]) {            
            count++;
        }        
        // Если символы повторяются меньше двух раз, оставляем как есть
        if (count <= 2) {
            result += currentChar.repeat(count);        
        } else {
            result += count + currentChar; // Записываем количество повторений + символ
        }
        i += count;
    }    
    return result;
}

function escape_decode(input) {    
    let result = '';
    let i = 0;    
    while (i < input.length) {
        if (isNaN(parseInt(input[i]))) { // Если текущий символ — это буква
            result += input[i];
            i++;
        } else { // Если текущий символ — это число
            let count = 0;
            // Чтение числа (может быть больше одной цифры, например, "10")
            while (i < input.length && !isNaN(parseInt(input[i]))) {
                count = count * 10 + parseInt(input[i]);
                i++;
            }
            // Следующий символ после числа — это символ, который нужно повторить
            let char = input[i];
            result += char.repeat(count);            
            i++;
        }    
    }
    return result;
}
// вывод закодированной и декодированной строки в файлы code.txt и decoded.txt соответственно
let fs = require('fs');
try {
    let inText = fs.readFileSync('input.txt', 'utf8');    
	let encoded_str = escape_encode(inText);
    fs.writeFileSync('code.txt', encoded_str);
    let decoded_str = escape_decode(encoded_str);    
	fs.writeFileSync('decoded.txt', decoded_str);
    console.log("Коэффициент сжатия =", inText.length / encoded_str.length);
} catch (e) {
    console.error("Ошибка:", e);
	}
