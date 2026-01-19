export let apiUrl = "https://rickandmortyapi.com/api/character/";

export const paginationBox = document.querySelector('.pagination')
export const loadingState = document.querySelector('.loadingState')

export let lastPageNumber = 0;
export let totalCharacters = 0;

export async function totalCharacterNumber() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    totalCharacters = data.info.count;
    lastPageNumber = Math.ceil(totalCharacters/12)
}

export function clearContent(content) {
    content.innerHTML = ""
}

export function displayNone(content) {
    content.style.display = "none"
}

export function displayBlock(content) {
    content.style.display = "block"
}

export function displayFlex(content) {
    content.style.display = "flex"
}

await totalCharacterNumber()