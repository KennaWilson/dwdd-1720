let saveEl = document.querySelector("#save-el");
let countEl = document.querySelector("#count-el");
let count = 0;

function increment() {
    count += 1;
    countEl.textContent = count;
}

function save() {
    let countStr = count + " - ";
    saveEl.textContent += countStr;
    countEl.textContent = 0;
    count = 0;
}

// Attach event listeners to buttons
document.querySelector("#increment-btn").addEventListener("click", increment);
document.querySelector("#save-btn").addEventListener("click", save);





let saveEl = document.querySelector("#save-el");
let countEl = document.querySelector("#count-el");
let count = 0;

function increment() {
    count += 1;
    countEl.textContent = count;
}

function save() {
    let countStr = count + " - ";
    saveEl.textContent += countStr;
    countEl.textContent = 0;
    count = 0;
}

// Attach event listeners to buttons
document.querySelector("#increment-btn").addEventListener("click", increment);
document.querySelector("#save-btn").addEventListener("click", save);




