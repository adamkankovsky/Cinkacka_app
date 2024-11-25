if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

function ZmenStranku1(){
    document.getElementById("strana1").className = "page_visible"
    document.getElementById("strana2").className = "page";
}

function ZmenStranku2(){
    document.getElementById("strana1").className = "page"
    document.getElementById("strana2").className = "page_visible";
}

function getRandomZnak(zasobnik_znaku){
    const num = Math.floor(Math.random() * (zasobnik_znaku.length));
    return zasobnik_znaku[num];
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let kredit = 0;

function PridejKredit(){
    kredit = document.getElementById("input_kredit").value;
    document.getElementById("current_kredit").innerText = "Kredit: " + kredit;
    document.getElementById("strana").className = "page_visible";
    document.getElementById("kredit").className = "page";
}

async function Roztoc(){
    let zasobnik_znaku = document.getElementById("znaky").value.split(", ");
    const refresh_rate1 = 10;
    const refresh_rate2 = 20;
    const refresh_rate3 = 30;
    const sazka = document.getElementById("sazka").value;
    kredit = kredit - sazka;
    document.getElementById("current_kredit").innerText = "Kredit: " + kredit;
    
    for (let i = 0; i < 200; i++) {
        if (i % refresh_rate1 == 0){
            document.getElementById("first").textContent = getRandomZnak(zasobnik_znaku);
        }
        if (i % refresh_rate2 == 0){
            document.getElementById("second").textContent = getRandomZnak(zasobnik_znaku);
        }
        if (i % refresh_rate3 == 0){
            document.getElementById("third").textContent = getRandomZnak(zasobnik_znaku);
        }
        await wait(1);
    }

    const first = document.getElementById("first").textContent;
    const second = document.getElementById("second").textContent;
    const third = document.getElementById("third").textContent;

    if (first === second && second === third) {
        const vyhra = (Math.floor((1/Math.pow((1 / zasobnik_znaku.length), 3)) * 0.75)) * sazka;
        document.getElementById("vyhra").textContent = "Vyhra: Vyhral " + vyhra;
        kredit = kredit + vyhra;
        document.getElementById("current_kredit").innerText = "Kredit: " + kredit;
    } else {
        document.getElementById("vyhra").textContent = "Vyhra: Nevyhral";
    }
}

async function Autospin(){
    for (let i = 0; i < 20; i++) {
        await wait(100);
        await Roztoc();
        await wait(500);
    }
}
