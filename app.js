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

function Roztoc(){
    let zasobnik_znaku = document.getElementById("znaky").value.split(", ");
    console.log(zasobnik_znaku);
    const refresh_rate1 = 100;
    const refresh_rate2 = 200;
    const refresh_rate3 = 300;
    const sazka = document.getElementById("sazka").value;
    
    for (let i = 0; i < 20000; i++) {
        if (i % refresh_rate1 == 0){
            document.getElementById("first").textContent = getRandomZnak(zasobnik_znaku);
        }
        if (i % refresh_rate2 == 0){
            document.getElementById("second").textContent = getRandomZnak(zasobnik_znaku);
        }
        if (i % refresh_rate3 == 0){
            document.getElementById("third").textContent = getRandomZnak(zasobnik_znaku);
        }
    }

    const first = document.getElementById("first").textContent;
    const second = document.getElementById("second").textContent;
    const third = document.getElementById("third").textContent;

    if (first === second && second === third) {
        const vyhra = (1/Math.pow((1 / zasobnik_znaku.length), 3)) * 0.75;
        console.log(vyhra);
        document.getElementById("vyhra").textContent = "Vyhra: Vyhral " + vyhra;
    } else {
        document.getElementById("vyhra").textContent = "Vyhra: Nevyhral";
    }
}