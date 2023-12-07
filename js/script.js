// Listor och variablar

var valtOrd = [];
var maxAntalGissningar = 12;
var gissadeBokstaverLista = [];

// Slumpar ut ord från listan och länkas vidare till funktion laggInOrdSomStjarna samt pushar ordet till valtOrd.
function valjOrd() {
  const ord = [
    "ÄPPLET",
    "BOLLEN",
    "SKOGEN",
    "STOLEN",
    "GURKAN",
    "BLOMMA",
    "HAVETS",
    "MÖSSAN",
    "TÅRTAN",
    "FÅGELN",
  ];
  let ordRandom = Math.floor(Math.random() * ord.length);
  let slumpatOrd = ord[ordRandom];
  valtOrd.push(slumpatOrd);
  laggInOrdSomStjarna(slumpatOrd);
}

// Tar ordet som slumpas ut från listan och lägger in det i html documentet och lägger till <3

function laggInOrdSomStjarna(slumpatOrd) {
  var stjarna = document.querySelectorAll("#letterBoxes input");
  for (let i = 0; i < slumpatOrd.length; i++) {
    stjarna[i].setAttribute("value", "<3");
  }
}

// Kontrollar tangent tryck
// Omvanldar bokstaven till UpperCase
// Kollar så att tangenterna som trycks ner är från A -Ö annars loggar den inte tangenten
// Om tangenten är från A-Ö så disablar funktionen tangenten
// Den 3e If-sattsen Kollar ifall bokstaven redan finns med i gissadeBokstaverLista om den gör det loggas en Alert

document.addEventListener("keydown", function (event) {
  const key = event.key.toUpperCase();
  if (/^[A-Ö]$/.test(key)) {
    knappar.forEach((knapp) => {
      if (knapp.value === key) {
        knapp.disabled = true;
      }
    });
    if (gissadeBokstaverLista.includes(key)) {
      alert("Du har redan gissat på " + key);
      return;
    }

    gissadeBokstaverLista.push(key);
    kollaGissadBokstav(key);

    // Lägg in bokstaven i html
    const bokstavContainer = document.getElementById("gissade-bokstaver");
    const li = document.createElement("li");
    li.textContent = key;
    bokstavContainer.appendChild(li);
    // Kör igång duVann funktionen för att kolla om ordet är gissat och du har Vunnit
    duVann();
  }
});
// Mus CLick för att logga tangenter i lista och på skärm
// Går igenom knapparna i letterbuttons och skickar bokstaven till funktionen musClick
// Skickar även bokstaven till funktionen KollaGissadBokstav.
// Disablar den knappen så man inte kan trycka på den igen.
// Skickar bokstav till kollaGissadBokstav funktionen som kollar om bokstaven finns i ordet och ersätter stjärnor med rätt bokstav om den är gissad

const knappar = document.querySelectorAll("#letterButtons button");
knappar.forEach(function (knap) {
  knap.addEventListener("click", function () {
    const bokstav = knap.textContent.toUpperCase();
    musClick(bokstav);
    kollaGissadBokstav(bokstav);
    knap.disabled = true;
  });
});

// MusClick tar emot bokstav som skickas från addventlisternern åvan, byter sedan namn på bokstav till musTangent.

// Kollar om bokstaven finns i gissadebokstaverLista, om den inte gör det skickas den till gissadebokstaverLista.

function musClick(musTangent) {
  // Kontrollera om bokstaven redan är gissad
  if (gissadeBokstaverLista.includes(musTangent)) {
    return;
  } else {
    gissadeBokstaverLista.push(musTangent.toUpperCase());
  }

  // Kollar om Bokstaven finns i valtOrd
  if (valtOrd.includes(musTangent)) {
    ersattBokstav(valtOrd[0], musTangent);
    visaGissadBokstav(musTangent);
  }

  // Kollar så att musTangent är en bokstav från A-Ö
  if (musTangent >= "a" && musTangent <= "ö") {
    gissadeBokstaverLista.push(musTangent.toUpperCase());
  }
  if (duVann()) {
    return;
  }

  const gissadeBokstaver = document.getElementById("gissade-bokstaver");
  const laggInBokstav = document.createElement("LI");
  laggInBokstav.textContent = musTangent.toUpperCase();
  gissadeBokstaver.appendChild(laggInBokstav);
}

// Kolla gissadbokstav och lägg in rätt gissad bokstav i html
function kollaGissadBokstav(key) {
  var stjarna = document.querySelectorAll("#letterBoxes input");
  var bokstavHittad = false;

  if (valtOrd && valtOrd[0]) {
    // Kontrollera om valtOrd och valtOrd[0] är satta
    for (let i = 0; i < valtOrd[0].length; i++) {
      if (valtOrd[0][i].toLowerCase() === key.toLowerCase()) {
        // Endast ersätt om bokstaven matchar den gissade bokstaven (stor- eller småbokstav)
        stjarna[i].setAttribute("value", key);
        bokstavHittad = true;
      }
    }
  }

  // Uppdaterar bild endast om man gissar fel
  if (!bokstavHittad) {
    uppdateraBild();
  }
}
// Uppdaterarbild funnktion
//
// Här sätts en variabel för vilekn bild som visas och för att man ska kunna Nollställa den vid reset.
var aktuellBild = 0;
// Här har jag skapat sökvägen till varjebild och lagt dom i en lista
var bilder = [
  "images/h0.png",
  "images/h1.png",
  "images/h2.png",
  "images/h3.png",
  "images/h4.png",
  "images/h5.png",
  "images/h6.png",
];
// Denna funktion kopplar ID-hangman till bild.
function uppdateraBild() {
  var bild = document.querySelector("#hangman");
  // Denna If kollar så att aktuell bild inte är större än antalet bilder i bilder arrayen.
  // och uppdaterar bilden och aktuellbil genom ++
  if (aktuellBild < bilder.length) {
    bild.src = bilder[aktuellBild];
    aktuellBild++;
  }
  // ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ
  //  GÖr om denna och lägg text att man förklorat och gör att man inte kan göra något mer än resetta.
  // Gör en async funktion för att kunna logga bild
  // Skicka in texten i html istället att spelaren har vunnit
  // Denn funktion avgör när spelet är slut och att den som gissar har lika många gissningar som antalet bilder som finns.
  if (aktuellBild === 7) {
    setTimeout(function () {
      alert("Spelet är Slut");
      resetGame();
    }, 10);
  }
}

// Funktion för att ta bort inmatade bokstäver
function removeEnteredLetters() {
  var gissadeBokstaverContainer = document.getElementById("gissade-bokstaver");

  // Ta bort alla li från ID gissade bokstäver
  while (gissadeBokstaverContainer.firstChild) {
    gissadeBokstaverContainer.removeChild(gissadeBokstaverContainer.firstChild);
  }
}

// Funktion för att återställa spelet till det ursprungliga tillståndet
function resetGame() {
  removeEnteredLetters();
  valtOrd.length = 0;
  gissadeBokstaverLista.length = 0;
  aktuellBild = 0;
  clearMessage();
  uppdateraBild();
  valjOrd();
  // UnDisablarKnappar
  var knappar = document.querySelectorAll("#letterButtons button");
  knappar.forEach(function (knapp) {
    knapp.disabled = false;
  });
}
// äääääääääääääääääääääääääääääääääääääääääääääääääääääääääääääääääääää

//
//
//
// Funktionen kollar om alla boksäver i valtOrd har gissats
function duVann() {
  if (valtOrd && valtOrd[0]) {
    var bokstaverIordet = valtOrd[0].split("");
    var allaGissade = bokstaverIordet.every(function (bokstavIordet) {
      return gissadeBokstaverLista.includes(bokstavIordet);
    });

    // Uppdatering: Använd bokstav eller key i alert-meddelandet
    if (allaGissade) {
      let vinst = document.getElementById("message");
      vinst.textContent = "GRattis Du Vann";

      // alert("Grattis, du har vunnit! Ordet var: " + valtOrd[0].toUpperCase());
      // resetGame();
    }
  }
}

function clearMessage() {
  let vinst = document.getElementById("message");
  vinst.textContent = " ";
}
// Funktion för att starta spelet
document.querySelector("#startGameBtn").addEventListener("click", resetGame);

// Avslutar spelet om Max antal gissningar är uppnåd
function speletArKlart() {
  // Implementera logiken för när spelet är klart
  alert("Spelet är klart! Du har nått det maximala antalet gissningar.");
  // ... (andra åtgärder du vill vidta när spelet är klart)
  resetGame();
}

// Kunna jämföra med ordet som slumpatsfram och lägga fram den nokstaven

// Om bokstaven är fel vli av med en gissning och lägga fram en bild på gubben som skall hängas

// Visa ordet när spelaren gissar rätt ord i letter box filtrera genom gissade ord och i sånna fall visa ord

//  bygg upp rutor beoende på ord

// Måste jag ha meddelade i elemtet i HTML???? funkar det med mina alerts??

// När spelet börjar om så har jag gjort att när man trycker okej på alertknappen så startar allt om.

// vad är fel på min alert på musClick?
//
//
//
//
//
//
// Kolla så spelet fungerar på firefox
// Gör så att meddelande kommer upp inne i html
//
//
//
//
//
// I duVann fixa så arr det logga ut på datorn i Html
