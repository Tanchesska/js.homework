function caesarShift(str, amount, type, codding) { // входная строка, сдвиг, en/ru, code/decode
   
    let startUp, endUp, start, end, period;
    
    const englishFrequencies = {
        'a': 0.08167, 'b': 0.01492, 'c': 0.02782, 'd': 0.04253, 'e': 0.12702,
        'f': 0.02228, 'g': 0.02015, 'h': 0.06094, 'i': 0.06966, 'j': 0.00153,
        'k': 0.00772, 'l': 0.04025, 'm': 0.02406, 'n': 0.06749, 'o': 0.07507,
        'p': 0.01929, 'q': 0.00095, 'r': 0.05987, 's': 0.06327, 't': 0.09056,
        'u': 0.02758, 'v': 0.00978, 'w': 0.02360, 'x': 0.00150, 'y': 0.01974,
        'z': 0.00074
    };
    const russianFrequencies = {
        'а': 0.0801, 'б': 0.0159, 'в': 0.0454, 'г': 0.0170, 'д': 0.0298, 'е': 0.0845,
        'ж': 0.0094, 'з': 0.0164, 'и': 0.0735, 'й': 0.0121, 'к': 0.0349, 'л': 0.0429,
        'м': 0.0321, 'н': 0.0670, 'о': 0.1097, 'п': 0.0281, 'р': 0.0473, 'с': 0.0547,
        'т': 0.0619, 'у': 0.0210, 'ф': 0.0029, 'х': 0.0094, 'ц': 0.0048, 'ч': 0.0140,
        'ш': 0.0073, 'щ': 0.0036, 'ъ': 0.0004, 'ы': 0.0181, 'ь': 0.0156, 'э': 0.0032,
        'ю': 0.0064, 'я': 0.0201
    };
    
    if (type === "en") { // аски коды
        startUp = 65; endUp = 90; start = 97; end = 122; period = 26;
    } else if (type === "ru") {
        startUp = 1040; endUp = 1071; start = 1072; end = 1103; period = 32;
    } else {
        console.log("Неверный тип алфавита. Допустимые значения: 'ru' или 'en'");
        return str; 
    }

    if (amount < 0) { // отриц.сдвиг
        return caesarShift(str, amount + period, type, codding);
    }
     
    
    if (codding === "code") {
        let output = "";
        for (let i = 0; i < str.length; i++) {
            let c = str[i]; // текущий символ строки
            if (isNaN(c)) {
                let code = str.charCodeAt(i); // аски код
                if (code >= startUp && code <= endUp) { // заглав б
                    c = String.fromCharCode(((code - startUp + amount) % period) + startUp); // С (((67-65+2)%26)+65)=69 E
                } else if (code >= start && code <= end) { // строч б
                    c = String.fromCharCode(((code - start + amount) % period) + start);
                }
            }
            output += c; // если не буква
        }
         return output;
    } else if (codding === "decode") {
        const frequencies = type === "en" ? englishFrequencies : russianFrequencies; // выбираем таблицу частот
        const textFrequencies = {}; // объект для частот букв в зашифр тек
        let totalLetters = 0; // кол-во букв
        for (let i = 0; i < str.length; i++) {
            let char = str[i].toLowerCase(); // делаем нижний регистр
            if (frequencies[char]) { // символ есть в таблице частот
                textFrequencies[char] = (textFrequencies[char] || 0) + 1; // счетчик кол-ва букв
                totalLetters++;
            }
        }
        for (let char in textFrequencies){
           textFrequencies[char] /= totalLetters // частота каждой буквы
        }
        
        let bestMatch = 0; let bestMatchShift = 0;
         // bestMatch наименьшее отклонение от эталонных частот
        // bestMatchShift сдвиг, которому соответствует наименьшее отклонение
        for (let shift = 0; shift < period; shift++) { // по сдвигам
                let match = 0
                // отклонение частот от эталонных для текущего сдвига
                for (let char in frequencies){ 
                    const code = char.charCodeAt(0);
                    let shiftedChar
                     // Получаем код символа
                    if (code >= startUp && code <= endUp){
                        shiftedChar = String.fromCharCode(((code - startUp + shift) % period) + startUp)
                      } else if (code >= start && code <= end) {
                           shiftedChar = String.fromCharCode(((code - start + shift) % period) + start)
                    } else {continue}
                    if(textFrequencies[shiftedChar]) {
                      // Если сдвинутый символ есть в нашем тексте
                       match += Math.abs(frequencies[char] - textFrequencies[shiftedChar])
                       // то прибавляем абсолютную разницу частот
                    } else {
                        // если нет, то эталонную частоту
                        match += frequencies[char]
                    }
                 }
            if(shift === 0 || match < bestMatch){
              // Если нашли сдвиг с меньшим отклонением, запоминаем его
                bestMatch = match
                 bestMatchShift = shift
             }
        }
         // ищем сдвиг, который будет при наименьшем отклонении
       let output = "";
       for (let i = 0; i < str.length; i++) {
            let c = str[i];
            if (isNaN(c)) {
                 let code = str.charCodeAt(i);
                 if (code >= startUp && code <= endUp) {
                    c = String.fromCharCode(((code - startUp - bestMatchShift + period) % period) + startUp);
                } else if (code >= start && code <= end) {
                    c = String.fromCharCode(((code - start - bestMatchShift + period) % period) + start);
                }
            }
            output += c;
         }
		return output;
    }
    else{console.log("error in type of codding! ")}
}
const fs = require('fs');
const args = process.argv;
const codding = args[2]; // code/decode
const url_file_read = args[3]; // input
const url_write_file = args[4]; // output
try {
    if (codding === "code") {
        const str = fs.readFileSync(url_file_read, "utf-8");
        const amount = parseInt(args[5]); // преобразование сдвига в число
        const type = args[6]; // en/ru
        let code = caesarShift(str, amount, type, codding);
        fs.writeFileSync(url_write_file, code);
     } else if (codding === "decode"){
          const str = fs.readFileSync(url_file_read, "utf-8");
          const type = args[5]; // en/ru
         let code = caesarShift(str, 0, type, codding);
          fs.writeFileSync(url_write_file, code);
     }
} catch (err) {
    if (err) {
         console.log("err!");
     }
}


/*
cd desktop
cd js
cd caesar
node caesar.js code input.txt output.txt 3 ru
node caesar.js decode output.txt result.txt ru
*/