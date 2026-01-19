import * as Main from './main.js';

let urlParams = new URLSearchParams(window.location.search);
let characterId = urlParams.get('id');

const featuresContainer = document.querySelector('.featuresContainer')
const characterImg = document.querySelector('.img');
const characterName = document.querySelector('.name');
const characterStatus = document.querySelector('.status');
const characterSpecies = document.querySelector('.species');
const episodeList = document.querySelector('.episodeList');
const prevCharacterButton = document.querySelector('#prevCharacterButton')
const nextCharacterButton = document.querySelector('#nextCharacterButton')

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
    const response = await fetch(Main.apiUrl + characterId);
    const data = await response.json();

    Main.clearContent(characterImg);
    Main.clearContent(characterName);
    Main.clearContent(characterStatus);
    Main.clearContent(characterSpecies);
    Main.clearContent(episodeList);

    Main.displayNone(Main.loadingState);
    Main.displayFlex(featuresContainer);
    Main.displayFlex(Main.paginationBox);

    const episodeLinks = data.episode;

    episodeLinks.forEach(item => {
        getEpisodes(item); 
    });
    displayFeatures(data);
}

function prevCharacter() {

    if(Number(characterId) > 1) {
        urlParams.set('id', Number(characterId) - 1);
        characterId = Number(characterId) - 1;
        window.history.pushState({}, '', '?' + urlParams.toString());
        getData();
    } 
    
    else {
        alert("this is first character");
    };
}

function nextCharacter() {

    if(Number(characterId) < Number(Main.totalCharacters)){
        urlParams.set('id', Number(characterId) + 1);
        characterId = Number(characterId) + 1;
        window.history.pushState({}, '', '?' + urlParams.toString());
        getData();
    }
    
    else {
        alert("this is last character");
    }
}

prevCharacterButton.addEventListener("click", prevCharacter);
nextCharacterButton.addEventListener("click", nextCharacter);

getData()