const textInput = document.getElementById('text-input');
const form = document.getElementById('form');
const result = document.getElementById('result');

const reset = () => textInput.value = "";

// checks whether textInput is empty
const IsInputEmpty = () => !textInput.value;

// checks whether a str is a palindrome
const palindrome = (str) => {
    str = str.replace(/[^a-zA-Z0-9]/g,"").toLowerCase();
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - i - 1]) return false;
    }
    return true;
}

const checkPalindrome = () => {
    if (IsInputEmpty()) {
        window.alert("Please input a value");
    } else {
        const text = textInput.value;
        if (palindrome(text)) {
            result.innerHTML= `<strong>${text}</strong> is a palindrome.`;
        } else {
            result.innerHTML= `<strong>${text}</strong> is not a palindrome.`;
        }
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkPalindrome();
    reset()
});