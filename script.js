const container = document.querySelector("#container");
const showImg = document.querySelector("#showImg")
const showQuote = document.querySelector("#showQuote");
const showAuthor = document.querySelector("#showAuthor");
const tweetQuoteBtn = document.querySelector("#tweetQuote");
const newQuoteBtn = document.querySelector("#newQuote");
const subContainer = document.querySelector("#subContainer");
const loader = document.querySelector("#loader");

// https://cors-anywhere.herokuapp.com --- NOT WORKING (so create own proxy from Heroku) 
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const proxyUrl = 'https://sheltered-hamlet-08877.herokuapp.com/';
const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

function showLoadingSpinner(){
    loader.hidden = false;
    subContainer.hidden = true;
}

function removeLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden = true;
        subContainer.hidden = false;
    }
}

function getQuote(){
    showLoadingSpinner();
    fetch(proxyUrl + apiUrl)
    // .then( response => response.json()) --- GOT ERROR FROM \' IN THE QUOTES
    .then(response => response.text())
    .then( text => {
        const cleanText = text.replaceAll("\\'", "'");
        console.log(cleanText);
        const data = JSON.parse(cleanText);
        displayQuote(data);
        removeLoadingSpinner();
    })
}

function displayQuote(data){
    const randomNum = getRandomNum();

    if(data.quoteAuthor === ""){
        showAuthor.innerText = "Unknown";
    }else{
        showAuthor.innerText = data.quoteAuthor;
    }

    if(data.quoteText.length > 150){
        showQuote.classList.add("longQuote");
    }else{
        showQuote.classList.remove("longQuote");
    }

    showQuote.innerText = data.quoteText;

    showImg.src = "images/img" + randomNum + ".png";
    
}

function getRandomNum(){
    const randomNum = Math.floor(Math.random() * 10) + 1;
    return randomNum;
}

function tweetQuote(){
    const quote = showQuote.innerText;
    const author = showAuthor.innerText 
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetUrl, '_blank');
}

tweetQuoteBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuote);

getQuote();