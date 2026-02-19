import * as Main from './main.js';

const sideBar = document.querySelector('.sideBar');
const filterOptions = document.querySelector('#filterOptions');
const resetButton = document.querySelector('#resetButton');
const submitButton = document.querySelector('#submitButton');

const cardsContainer = document.querySelector('.cardsContainer');

const pages = document.querySelector('.pages');
const firstButton = document.querySelector('#firstButton');
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');
const lastButton = document.querySelector('#lastButton');

let lastPageNumber = Number;
let activePage = 1;

let currentFilter = { 
    nameFilter : "",
    speciesFilter : "", 
    statusFilter : ""
}

async function getData(selectedFilters) {
    let url = [`${Main.apiUrl}?page=${activePage}`];

    if (selectedFilters.nameFilter) {
        url.push(`&name=${selectedFilters.nameFilter}`);
    }

    if (selectedFilters.speciesFilter) {
        url.push(`&species=${selectedFilters.speciesFilter}`);
    }

    if (selectedFilters.statusFilter) {
        url.push(`&status=${selectedFilters.statusFilter}`);
    }

    const response = await fetch(url.join(""));
    const data = await response.json();
    lastPageNumber = data.info.pages;

    Main.displayNone(Main.loadingState);
    Main.displayBlock(sideBar);
    Main.displayFlex(Main.paginationBox);

    renderCards(data.results);
    disableButtons();
    pagination();
}

async function renderCards(data) {
    Main.clearContent(cardsContainer);

    for (const item of data){
        const response = await fetch(item.episode[0]);
        const data = await response.json();

        const cardLink = document.createElement('a');
        const card = document.createElement('article');
        const imageBox = document.createElement('div');
        const characterData = document.createElement('div');
        const nameBox = document.createElement('div');
        const statsBox = document.createElement('div');
        const locationBox = document.createElement('div');
        const locationHeader = document.createElement('h3');
        const location = document.createElement('p');
        const firstEpisodeBox = document.createElement('div');
        const firstEpisodeHeader = document.createElement('h3');
        const firstEpisode = document.createElement('p');
        const characterImg = document.createElement('img');
        const characterName = document.createElement('h2');
        const characterStatus = document.createElement('p');
        const characterSpecies = document.createElement('p');

        cardLink.href = `features.html?id=${item.id}`;
        card.className = "card";
        characterData.className = "characterData";
        imageBox.className = "imgBox";
        nameBox.className = "nameBox";
        statsBox.className = "statsBox";
        
        locationHeader.textContent  = "Last known location:";
        location.textContent = item.location.name;
        firstEpisodeHeader.textContent  = "First seen in:";
        firstEpisode.textContent = data.name;
        characterImg.src = item.image;
        characterName.textContent = item.name;
        characterStatus.textContent = item.status;
        characterSpecies.textContent = item.species;

        locationBox.append(locationHeader, location);
        firstEpisodeBox.append(firstEpisodeHeader, firstEpisode);
        imageBox.appendChild(characterImg);
        nameBox.appendChild(characterName);
        statsBox.append(`${item.status} - ${item.species}`);
        characterData.append(nameBox, statsBox, locationBox, firstEpisodeBox);
        card.append(imageBox, characterData);
        cardLink.appendChild(card);
        cardsContainer.appendChild(cardLink);
    };
}

function pagination() {
    Main.clearContent(pages);

    let firstButtonNumber = 1;

    if (lastPageNumber - activePage < 2 && lastPageNumber >= 5) {
        firstButtonNumber = lastPageNumber - 4;
    } else if (activePage > 3) {
        firstButtonNumber = Math.max(1, activePage - 2);
    }

    for (let i = firstButtonNumber; i < (firstButtonNumber + 5); i++) {
        if (i > lastPageNumber){
            return;
        }

        const pageButton = document.createElement('button');
        if (i === activePage){
            pageButton.style.backgroundColor = 'rgb(175, 249, 136)'
        }

        pageButton.className = "paginationButton";
        pageButton.textContent = i;

        pageButton.addEventListener('click', () => {
            activePage = i;
            Main.clearContent(cardsContainer);
            Main.displayNone(Main.paginationBox);
            Main.displayFlex(Main.loadingState);
            getData(currentFilter);
        });

        pages.appendChild(pageButton);
    }
}

function firstPage() {
    activePage = 1;
    updateData();
}

function lastPage() {
    activePage = lastPageNumber;
    updateData();

}

function prev( ) {
    activePage = activePage - 1;
    updateData();
}

function next() {
    activePage = activePage + 1;
    updateData();
}

function disableButtons(){
    if (activePage === 1){
        firstButton.disabled = true;
        prevButton.disabled = true;
    } else {
        firstButton.disabled = false;
        prevButton.disabled = false;
    } 
        
    if (activePage === lastPageNumber){
        lastButton.disabled = true;
        nextButton.disabled = true;
    } else {
        lastButton.disabled = false;
        nextButton.disabled = false;
    }
    
}
function getFormData() {
    const filters = new FormData(filterOptions);
    const name = filters.get('searchName');
    const species = filters.get('searchSpecies');
    const status = filters.get('searchStatus');
    
    currentFilter.nameFilter = name ;
    currentFilter.speciesFilter = species ;
    currentFilter.statusFilter = status;
}

function updateData() {
    getFormData();
    getData(currentFilter);
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    activePage = 1;
    updateData();
})  

resetButton.addEventListener('click', (event) => {
    event.preventDefault();
    filterOptions.reset(); 
    activePage = 1; 
    updateData();
}) 

firstButton.addEventListener("click", firstPage);
prevButton.addEventListener("click", prev);
nextButton.addEventListener("click", next);
lastButton.addEventListener("click", lastPage);

getData(currentFilter);