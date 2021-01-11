console.log("Client side javascript file is running");

fetch("http://localhost:3000/weather?address=an giang").then((res) => {
    res.json().then((data) => {
        console.log(data);
    });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const info = document.querySelector("#info");

weatherForm.addEventListener("submit", (e) => {
    info.textContent = `Loading...`;
    e.preventDefault();
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                info.textContent = `${data.error}`;
            } else {
                console.log(data);
                info.textContent = `${data.geocode.name}: ${data.forecast.temp} Celius`;
            }
        });
    });
});
