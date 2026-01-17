let apiUrl = "https://rickandmortyapi.com/api/character";
let urlParams = new URLSearchParams(window.location.search);
let characterId = urlParams.get('id'); 
const featuresContainer = document.querySelector('.featuresContainer')
const characterImg = document.querySelector('.img');
const characterName = document.querySelector('.name');
const characterStatus = document.querySelector('.status');
const characterSpecies = document.querySelector('.species');
const episodeList = document.querySelector('.episodeList');
let episodes = [];
let totalCharacters = 0;

async function totalCharacterNumber() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    totalCharacters = data.info.count;
}

function clearContent(){
    characterImg.src = ""; 
    characterName.textContent = "";
    characterStatus.textContent = "";
    characterSpecies.textContent = "";
    episodeList.innerHTML = "";
}

async function getEpisodes(link) {
    const response = await fetch(link);
    const data = await response.json();
    const episodeName = data.name;
    const episode = document.createElement('li');
    episode.className = "listElement";
    episode.textContent = episodeName;
    episodeList.appendChild(episode);
}

function displayFeatures(data) {
    characterImg.src = data.image;
    characterName.textContent = data.name;
    characterStatus.textContent = data.status;
    characterSpecies.textContent = data.species;
}

async function getData() {
    const response = await fetch(apiUrl + "/" + characterId);
    const data = await response.json();
    clearContent();
    const episodeLinks = data.episode;

    episodeLinks.forEach(item => {
        getEpisodes(item); 
    });
    displayFeatures(data);
}

totalCharacterNumber();
getData();

function prevCharacter(){

    if(Number(characterId) > 1){
        urlParams.set('id', Number(characterId) - 1);
        characterId = Number(characterId) - 1;
        window.history.pushState({}, '', '?' + urlParams.toString());
        getData();
    } 
    
    else {
        alert("this is first character");
    };
}

function nextCharacter(){

    if(Number(characterId) < Number(totalCharacters)){
        urlParams.set('id', Number(characterId) + 1);
        characterId = Number(characterId) + 1;
        window.history.pushState({}, '', '?' + urlParams.toString());
        getData();
    }
    
    else {
        alert("this is last character");
    }
}