const telNumber = document.getElementById('tel-number');
const resultsDiv = document.getElementById('results-div');
const userInput = document.getElementById('user-input');
const clearBtn = document.getElementById('clear-btn');
const checkBtn = document.getElementById('check-btn');
const form = document.getElementById('form');

// clear input and result
const clearResults = () => {
    telNumber.textContent = "";
    telNumber.style.display = "none";
    resultsDiv.textContent = "";
    resultsDiv.style.display = "none";
}

const clearInput = () => {
    userInput.value = "";
}

// checks whether userInput is empty
const isInputEmpty = () => !userInput.value;

// checks whether a number is a valid telephone number
const isNumberValid = (number)  => {
    return (/^(1\s?)?((\(\d{3}\))|(\d{3}))\s?-?\d{3}\s?-?\d{4}$/).test(number);
}

const checkTelephoneNumber = () => {
    if (isInputEmpty()) {
        window.alert("Please provide a phone number");
        return;
    }

    // retrieve user input and display it on screen
    const number = userInput.value;
    telNumber.textContent = number;
    telNumber.style.display = "block";

    // print the result based on the validity of the number
    if (isNumberValid(number)) {
        resultsDiv.textContent = `okay thanks!! i'll call it later`;
    } else {
        resultsDiv.textContent = `babe that's not a number`;
    }
    resultsDiv.style.display = "block";
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearResults();
    checkTelephoneNumber();
    clearInput();
});

// clear results
clearBtn.addEventListener("click", () => {
    clearResults();
    clearInput();
});
