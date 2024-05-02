const alphabet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`;
const base = alphabet.length;

class UrlShortner {
    constructor(){
        this.urlMap = new Map();
        this.shortUrlLength = 6;
    }

    encodeURl(longURL){
        let shortURL = '';
        do{
            for(let i=0;i<this.shortUrlLength;i++){
                const randomIndex = Math.floor(Math.random() * base);
                shortURL += alphabet[randomIndex];
            }
        } while(this.urlMap.has(shortURL));
        this.urlMap.set(shortURL, longURL);
        return `https://short.url/${shortURL}`;
    }

    decodeURL(shortURL){
        const shortCode = shortURL.substring(shortURL.lastIndexOf('/') + 1);
        if(this.urlMap.has(shortCode)){
            return this.urlMap.get(shortCode);
        } else {
            return "Short URL not found";
        }
    }
}

const shortener = new UrlShortner();

function handleFormSubmit(event){
    event.preventDefault();
    const longURLInput = document.getElementById('long-url');
    const longURL = longURLInput.value;
    const shortenedURl = shortener.encodeURl(longURL);
    document.getElementById('Shortended-url').innerText = shortenedURl;
}

function getOriginalURL(){
    const shortURLInput = document.getElementById('short-url').value;
    const originalURL = shortener.decodeURL(shortURLInput);
    document.getElementById('original-url').innerText = originalURL;
}