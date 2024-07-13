// Load HTML elements
const textDiv = document.getElementById("text");
const authorDiv = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const tweetQuote = document.getElementById("tweet-quote");

let quotes = [];
let quotesNumber = 0;
let currentQuote = "";

// Pick a random quotes
const showRandomQuote = () => {
    const randomNumber = Math.floor(Math.random() * quotesNumber);
    currentQuote = quotes[randomNumber];

    textDiv.innerHTML = currentQuote.quote;
    authorDiv.innerHTML = currentQuote.author;

    formatTweet();
}

// Fetch all the available quotes
const fetchAllData = async () => {
    try {
        const res = await fetch('https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
        const data = await res.json();
        quotes = data.quotes;
        quotesNumber = quotes.length;
        showRandomQuote();
    } catch (err) {
        console.log(err);
    }
};

fetchAllData();

// Prepare the current quote to be tweeted
const formatTweet = () => {
    tweetQuote.href = "https://twitter.com/intent/tweet?text=";
    tweetQuote.href += `${currentQuote.quote.split(" ").join("%20")}%20${currentQuote.author.split(" ").join("%20")}`;
}

newQuoteButton.addEventListener("click", showRandomQuote);