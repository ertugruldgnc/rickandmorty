import * as Main from './main.js';

let episodeUrl = "https://rickandmortyapi.com/api/episode/"
let urlParams = new URLSearchParams(window.location.search);
let characterId = urlParams.get('id');
let episodes = []; 

const featuresContainer = document.querySelector('.featuresContainer')
const characterImg = document.querySelector('.img');
const characterName = document.querySelector('.name');
const characterStatus = document.querySelector('.status');
const characterSpecies = document.querySelector('.species');
const episodeList = document.querySelector('.episodeList');
const prevCharacterButton = document.querySelector('#prevCharacterButton')
const nextCharacterButton = document.querySelector('#nextCharacterButton')

async function getEpisodes(episodes) {
    const response = await fetch(`${episodeUrl}${episodes}`);
    const data = await response.json();

    const characterData = [].concat(data);
    
    characterData.forEach (item => {
        const episodeName = item.name;
        const episode = document.createElement('li');
        episode.className = "listElement";
        episode.textContent = episodeName;
        episodeList.appendChild(episode);
    });
}

function displayFeatures(data) {
    characterImg.src = data.image;
    characterName.textContent = data.name;
    characterStatus.textContent = data.status;
    characterSpecies.textContent = data.species;
}

async function getData() {
    const response = await fetch(Main.apiUrl + characterId);
    
    if (response.status == 404){
        return;
    }
    
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
    episodeLinks.forEach (item => {
        let linkParts = item.split('/');
        let episodeID = linkParts.pop();
        episodes.push(episodeID)
    });

    getEpisodes(episodes);
    displayFeatures(data);
}

function changeCharacter(direction) {
    episodes = [];
    urlParams.set('id', Number(characterId) + direction);
    characterId = Number(characterId) + direction;
    window.history.pushState({}, '', '?' + urlParams.toString());
    getData();
}

prevCharacterButton.addEventListener("click", () => changeCharacter(-1));
nextCharacterButton.addEventListener("click", () => changeCharacter(1));

getData();