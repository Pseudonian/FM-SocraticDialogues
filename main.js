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

function saveUserData() { //local saving using localStorage. Saves every 5 seconds or on exit.
    const p = Object.assign({}, user);
    localStorage.setItem("socraticSave", btoa(JSON.stringify(p)))
}

function generateBaseQuotes(){ // These are quotes that are generated using a predefined list. Generated at random from https://wisdomquotes.com/life-quotes/
    let quote = ['Change your thoughts and you change your world. -Norman Vincent Peale',
                'Life is from the inside out. When you shift on the inside, life shifts on the outside. -Kamal Ravikant',
                'Life can only be understood backwards; but it must be lived forwards. -Soren Kierkegaard',
                'Keep your eyes on the stars and your feet on the ground. -Theodore Roosevelt',
                'Life is a question and how we live it is our answer. -Gary Keller',
                'Keep looking up… that’s the secret of life. -Snoopy',
                'Life isn’t a matter of milestones, but of moments. -Rose Kennedy',
                'My life is my message. -Mahatma Gandhi',
                'In the end, it’s not the years in your life that count. It’s the life in your years. -Abraham Lincoln',
                'To live is the rarest thing in the world. Most people exist, that is all. -Oscar Wilde',
                'Don’t cry because it’s over, smile because it happened. -Ludwig Jacobowski',
                'You only live once, but if you do it right, once is enough. -Mae West',
                'The journey of a thousand miles begins with one step. -Lao Tzu',
                'The unexamined life is not worth living. -Socrates',
                'You must be the change you wish to see in the world. -Mahatma Gandhi',
                'Life isn’t about finding yourself. Life is about creating yourself. -George Bernard Shaw',
                'Good friends, good books, and a sleepy conscience: this is the ideal life. -Mark Twain',
                'If you want to live a happy life, tie it to a goal, not to people or things. -Albert Einstein',
                'Never let the fear of striking out keep you from playing the game. -Babe Ruth',
                'Keep calm and carry on. -Winston Churchill',
                'The greatest pleasure of life is love. -Euripides',
                'I alone cannot change the world, but I can cast a stone across the water to create many ripples. -Mother Teresa',
                'Doing is a quantum leap from imagining. Barbara Sher',
                'All our dreams can come true if we have the courage to pursue them. -Walt Disney',
                'If you say you can or you can’t, you are right either way. -Henry Ford',
                'Everything has beauty, but not everyone sees it. -Confucius',
                'In the midst of winter, I found there was within me an invincible summer. -Albert Camus',
                'You have just one life to live. It is yours. Own it, claim it, live it, do the best you can with it. -Hillary Clinton',
                'I’ve failed over and over and over again in my life. And that is why I succeed. -Michael Jordan',
                'Once you choose hope, anything’s possible. -Christopher Reeve',
                'All you need is love. But a little chocolate now and then doesn’t hurt. -Charles Schulz',
                'In the book of life, the answers aren’t in the back. Charlie Brown',
                'If my life is going to mean anything, I have to live it myself. -Rick Riordan',
                'What do you want a meaning for? Life is a desire, not a meaning. -Charlie Chaplin',
                'You get in life what you have the courage to ask for. -Oprah Winfrey',
                'In this life we cannot do great things. We can only do small things with great love. -Mother Teresa',
                'A drop of love can bring an ocean of tears. -Jewish Proverb',]
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
    el.textContent = "''"+user.quotes[randomInt]+"''"; 
}

function globalTimer(){
    quoteTimer += 1;
    if(quoteTimer >= user.quoteInterval){
        quoteTimer = 0;
        setQuote();
    }
}

creditArray = ['Almost New', 'Angevin', 'Ashton Manor', 'Clean Soul', 'Dreams Become Real', 'Fresh Air', 'Mystery Bazaar', 'Summer Day', 'Water Lily']

function audioChange(i){ //perhaps spaghetti code but I am too tired to fix this right now lol
    musicStop()

    let la = document.getElementsByClassName('radio');
    for(let k=0; k<la.length; k++){
        ((i-1) === k) ? (la[k].style.backgroundColor = "purple") : (la[k].style.backgroundColor = "#111111")
    }

    document.getElementById('songCredit').style.display = "block"
    document.getElementById('songName').textContent = creditArray[i-1]

    let el = document.getElementById('audio'+i);
    el.play();
}

function musicStop(){
    var silence = document.getElementsByTagName('audio'); //We're going to need to pause all music before we can play the next song.
    for(let j=0; j<silence.length; j++){silence[j].pause();}
}

function intervalFunctions(){
    setInterval(globalTimer, 1000);
}

setTimeout(function(){
    intervalFunctions();
    loadApp();
})

//lightbox functionality
var lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

var radio_shows = document.querySelectorAll('img')
radio_shows.forEach(show => {
    show.addEventListener('click', e => {
        lightbox.classList.add('active')
        var box = document.createElement("img")
        box.src = show.src
        while (lightbox.firstChild){
            lightbox.removeChild(lightbox.firstChild)
        }
        lightbox.appendChild(box)
    })
})

lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
    lightbox
})