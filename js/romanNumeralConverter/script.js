const numberInput = document.getElementById('number');
const outputContainer = document.getElementById('output-container');
const form = document.getElementById('form');
const output = document.getElementById('output');

const isNumberEmpty = () => !numberInput.value;

const isNumberPositive = (num) => (num > 0);

const isNumberTooBig = (num) => (num >= 4000);

const showOutput = (msg) => {
    outputContainer.classList.add("error");
    output.innerText = msg;
}

const reset = () => {numberInput.value = ""}

const convertToRoman = (num) => {
    const romans = {
        "1" : "I", "4" : "IV", "5" : "V", "9": "IX", "10" : "X",
        "40" : "XL", "50" : "L", "90" : "XC", "100" : "C",
        "400" : "CD", "500" : "D", "900" : "CM", "1000" : "M",
    }
    const roman = []; // where we're gonna store the conversion
    const keys = Object.keys(romans).sort((a, b) => b - a)
    // keys[i] is the numbers, romans[keys[i]] is the roman numerals
    while (num > 0) {
        for (let i = 0; i < keys.length; i++) {
            while (num >= keys[i]) {
                roman.push(romans[keys[i]]);
                num = num - keys[i];
            }
            if (num == 0) break
        }
    }
    return roman.join("");
}

const convert = () => {
    if (isNumberEmpty()) {
        showOutput("Please enter a valid number");
        return;
    }

    const number = parseInt(numberInput.value);
    if (!isNumberPositive(number)) {
        showOutput("Please enter a number greater than or equal to 1");
        return;
    }
    if (isNumberTooBig(number)) {
        showOutput("Please enter a number less than or equal to 3999");
        return;
    }
    outputContainer.classList.remove("error");
    output.innerText = convertToRoman(number);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    convert();
    reset();
});
