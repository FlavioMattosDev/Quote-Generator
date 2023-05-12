const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Mostrar spinner de carregamento
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Esconder spinner de carregamento
function removeLoadingSpinner(){
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Mostrar nova frase 
function newQuote() {
    //showLoadingSpinner()
    // Pega uma frase aleatória do array apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Verifica se possui autor, caso contrário substitui por 'Unknown'
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Verifica o tamanho da frase para determinar o tamanho
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    //removeLoadingSpinner()
}

// Pegar frases da API
async function getQuote() {
    showLoadingSpinner()
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        removeLoadingSpinner()
    } catch (error){
        // Catch Error Aqui
        getQuote();
    }
}

// Twittar Frase
function tweetQuote() { 
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
