const prev = document.querySelector("#prev-btn").getAttribute("data-prev");

if (!prev) {
 document.querySelector("#prev-btn").classList.add("disabled");
}

const next = document.querySelector("#next-btn").getAttribute("data-next");

if (!next) {
 document.querySelector("#next-btn").classList.add("disabled");
}

document.querySelector('#btn-search').addEventListener('click', (e) => {
 e.preventDefault()

 window.location.href = `/products_mongo/cards?title=${document.querySelector('#input-search').value}`;

})

