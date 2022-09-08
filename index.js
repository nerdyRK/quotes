let quote = document.querySelector(".quote");
let author = document.querySelector(".author");
let btn = document.querySelector(".btn");
let list = document.querySelector(".list");
let count = document.querySelector(".count");

let url = "https://api.quotable.io/random";

// let ff = [
//   "cursive",
//   "tahoma",
//   "serif",
//   "fantasy",
//   "impact",
//   "courier",
//   "helvetica",
// ];

btn.addEventListener("click", generate);

async function generate() {
  let res = await fetch(url);
  let data = await res.json();
  //   console.log(data);
  fillText(data);
  if (count.innerHTML == "Total quotes : 1") {
    btn.addEventListener("click", animate);
  }
}
// https://quotable.io/random?author=buddha
function animate() {
  count.classList.add("animate");
  setTimeout(() => {
    count.classList.remove("animate");
  }, 2000);
}

async function getAuthors() {
  let authors = await fetch("https://quotable.io/authors?limit=150");
  authors = await authors.json();
  // console.log(authors.results);
  makeList(authors.results);
}

getAuthors();

function makeList(authors) {
  list.innerHTML = ` <option>Select Author</option>
  <option>RANDOM Author</option>
  ${authors.map((author) => {
    if (author.quoteCount != 0) {
      return `<option>${author.name}</option>`;
    }
  })}`;
}

function fillText(data) {
  quote.textContent = data.content;
  author.textContent = "✒📜" + data.author;
}

list.addEventListener("change", changeUrl);

function changeUrl(e) {
  let name = e.target.value;
  if (name == "RANDOM Author") {
    url = "https://api.quotable.io/random";
    count.innerHTML = "";
  } else if (name == "Select Author") {
    url = "https://api.quotable.io/random";
    count.innerHTML = "";
  } else {
    url = `https://api.quotable.io/random?author=${name}`;
    countQ(e.target.value);
  }
  generate();
}
async function countQ(name) {
  let res = await fetch(`https://quotable.io/authors?name=${name}`);
  let data = await res.json();
  console.log(data.results[0].quoteCount);
  count.innerHTML = `Total quotes : ${data.results[0].quoteCount}`;
}
