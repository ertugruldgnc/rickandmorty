let apiUrl = "https://rickandmortyapi.com/api/character";
let characterList = []; 
const cardsContainer = document.querySelector('.cardsContainer');
const pages = document.querySelector('.pages');
let activePage = 0;

function clearContent() {
    cardsContainer.innerHTML = "";
    pages.innerHTML = "";
}

function displayCharacters(characterList){
    characterList[activePage].forEach(item => {   
        const card = document.createElement("article");
        const imgBox = document.createElement("div");
        const nameBox = document.createElement("div");
        const statusBox = document.createElement("div");
        const speciesBox = document.createElement("div");
        const img = document.createElement("img");
        const name = document.createElement("h2");
        const statusHeader = document.createElement("h3");
        const status = document.createElement("p");
        const speciesHeader = document.createElement("h3");
        const species = document.createElement("p");
        card.className = "card";
        imgBox.className = "imgBox";
        nameBox.className = "nameBox";
        statusBox.className ="statusBox";
        speciesBox.className = "speciesBox";
        img.src = item.imgUrl;
        img.alt = "character image";
        name.textContent = item.name;
        statusHeader.textContent = "Status";
        status.textContent = item.status;
        speciesHeader.textContent = "Species";
        species.textContent = item.species;
        imgBox.appendChild(img)
        nameBox.appendChild(name)
        statusBox.append(statusHeader, status)
        speciesBox.append(speciesHeader, species)
        card.append(imgBox, nameBox, statusBox, speciesBox)
        cardsContainer.appendChild(card)
    });
}

function pagination(){
    const totalPages = characterList.length;
    let startPage = Math.max(0, activePage - 2);
    let endPage = Math.min(totalPages - 1, startPage + 4);
    if (endPage - startPage < 4) {
        startPage = Math.max(0, endPage - 4);
    }
    for(let i = startPage; i <= endPage; i++){
        const pageButton = document.createElement("button");
        pageButton.className = "paginationButton";
        pageButton.textContent = i + 1;
        pageButton.addEventListener('click', () => {
            activePage = i;
            renderUI();
        });
        pages.appendChild(pageButton);
    }
}

async function getData() {
    let group = []
    while(apiUrl){
        const response = await fetch(apiUrl);
        const data = await response.json();
        data.results.forEach(item => {
            const character = {
                imgUrl: item.image,
                name: item.name,
                status: item.status,
                species: item.species
            };
            group.push(character);
            if(group.length === 12){
                characterList.push(group);
                group = []
            }
        });
        apiUrl = data.info.next;
    }
    if(group.length > 0){
        characterList.push(group);
    }
    displayCharacters(characterList)
    pagination()
}

function renderUI() {
    clearContent();
    displayCharacters(characterList);
    pagination();
}

function firstPage() {
    activePage = 0;
    renderUI();
}

function lastPage() {
    activePage = characterList.length - 1;
    renderUI();
}

function prev(){
    activePage = Math.max(activePage - 1, 0)
    renderUI();
}

function next(){
    activePage = Math.min(activePage + 1, characterList.length - 1)
    renderUI();
}

getData()