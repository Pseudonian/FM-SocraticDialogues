var user = {}
var quoteTimer = 0;

function loadApp(){

    const save = localStorage.getItem("socraticSave");
    const data = save ? JSON.parse(atob(save)) : null;

    if (data) {user = data; user.currentSong = 0;} // Loads the old save data
    else{ // Initializes the user's save from older sessions.
        user = {
            quotes: generateBaseQuotes(),
            currentSong: 0,
            quoteInterval: 15, // in seconds
        }
    }

}

function saveUserData() { //local saving using localStorage. Saves every 5 seconds or on exit.
    const p = Object.assign({}, user);
    localStorage.setItem("socraticSave", btoa(JSON.stringify(p)))
}

function generateBaseQuotes(){ // These are quotes that are generated using a predefined list.
    let quote = ['Let 1 + 1 = 2. 2 + 2 = 4... Small steps lead to large values!', 'Live laugh love', 'Ipsum Decorum']
    return(quote) // add more quotes above!
}

function addQuote(quote){
    user.quotes.push(quote) //Note that this does not need to be a string. It'll work with numbers too, if you need that.
}

function setQuoteIntervalSpeed(t){
    user.quoteInterval = Math.max(parseInt(t), 5);
}

function setQuote(){
    let el = document.getElementById('displayQuote');
    let randomInt = Math.floor(Math.random() * user.quotes.length);
    el.textContent = user.quotes[randomInt]; 
}

function globalTimer(){
    quoteTimer += 1;
    if(quoteTimer >= user.quoteInterval){
        quoteTimer = 0;
        setQuote();
    }
}

function intervalFunctions(){
    setInterval(globalTimer, 1000);
}

setTimeout(function(){
    intervalFunctions();
    loadApp();
})