export let apiUrl = "https://rickandmortyapi.com/api/character/";

export const paginationBox = document.querySelector('.pagination');
export const loadingState = document.querySelector('.loadingState');

export function clearContent(content) {
    content.innerHTML = "";
}

export function displayNone(content) {
    content.style.display = "none";
}

export function displayBlock(content) {
    content.style.display = "block";
}

export function displayFlex(content) {
    content.style.display = "flex";
}