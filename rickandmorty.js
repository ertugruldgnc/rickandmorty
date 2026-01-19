import * as Main from './main.js';

const cardsContainer = document.querySelector('.cardsContainer');
const firstButton = document.querySelector('#firstButton');
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');
const lastButton = document.querySelector('#lastButton');
const pages = document.querySelector('.pages');

let activePage = 1;
let fetchingIds = [];

async function getData() {
    fetchingIds = [];

    const firstCharacterOfPage = activePage * 12 - 11;
    const lastCharacterOfPage = firstCharacterOfPage + 11;

    for(let i = firstCharacterOfPage; i <= lastCharacterOfPage; i ++) {
        fetchingIds.push(i);
    }

    const response = await fetch(Main.apiUrl + String(fetchingIds));
    const data = await response.json();

    Main.displayNone(Main.loadingState);
    Main.displayFlex(Main.paginationBox);
    renderCards(data);
    pagination();
}

function renderCards(data){
    Main.clearContent(cardsContainer);

    data.forEach(item => {
        const cardLink = document.createElement('a');
        const card = document.createElement('article');
        const imageBox = document.createElement('div');
        const nameBox = document.createElement('div');
        const statusBox = document.createElement('div');
        const speciesBox = document.createElement('div');
        const characterImg = document.createElement('img');
        const characterName = document.createElement('h2');
        const characterStatusHeader = document.createElement('h3');
        const characterStatus = document.createElement('p');
        const characterSpeciesHeader = document.createElement('h3');
        const characterSpecies = document.createElement('p');

        cardLink.href = `features.html?id=${item.id}`;
        card.className = "card";
        imageBox.className = "imgBox";
        nameBox.className = "nameBox";
        statusBox.className = "statusBox";
        speciesBox.className = "speciesBox";

        characterImg.src = item.image;
        characterName.textContent = item.name;
        characterStatusHeader.textContent = "Status";
        characterStatus.textContent = item.status;
        characterSpeciesHeader.textContent = "Species";
        characterSpecies.textContent = item.species;

        imageBox.appendChild(characterImg);
        nameBox.appendChild(characterName);
        statusBox.appendChild(characterStatus);
        speciesBox.appendChild(characterSpecies);
        card.append(imageBox, nameBox, statusBox, speciesBox);
        cardLink.appendChild(card);
        cardsContainer.appendChild(cardLink);
    });
}

function pagination() {
    Main.clearContent(pages);

    let firstButtonNumber = 1;

     if (Main.lastPageNumber - activePage < 2) {
        firstButtonNumber = Main.lastPageNumber - 4;
    } else if (activePage > 3) {
        firstButtonNumber = Math.max(0, activePage - 2);
    }

    for(let i = firstButtonNumber; i < (firstButtonNumber + 5); i++) {
        const pageButton = document.createElement('button');
        pageButton.className = "paginationButton";
        pageButton.textContent = i;

        pageButton.addEventListener('click', () => {
            activePage = i;
            Main.clearContent(cardsContainer);
            Main.displayNone(Main.paginationBox);
            Main.displayFlex(Main.loadingState);
            getData();
        });

        pages.appendChild(pageButton);
    }
}

function firstPage() {
    activePage = 1;
    getData();
}

function lastPage() {
    activePage = Main.lastPageNumber;
    getData();

}

function prev( ){
    if(activePage == 1) {
        alert("this is first page");
    } else {
        activePage = activePage - 1;
        getData();
    }
}

function next() {
    if(activePage == Main.lastPageNumber) {
        alert("this is last page");
    } else {
    activePage = activePage + 1;
    getData()}
}

firstButton.addEventListener("click", firstPage);
prevButton.addEventListener("click", prev);
nextButton.addEventListener("click", next);
lastButton.addEventListener("click", lastPage);

getData();