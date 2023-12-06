// Globala variabler

// const wordList;      // Array: med spelets alla ord
// let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

// let guesses = 0;     // Number: håller antalet gissningar som gjorts
// let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

// let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över
// let startGameBtnEl;  // DOM-nod: knappen som du startar spelet med
// let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
// let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
// Funktion som slumpar fram ett ord
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på

// Listor och variablar

var valtOrd = [];
var maxAntalGissningar = 12;
var antalGissningar = 0;
var gissadeBokstaverLista = [];
var rattGissadBokstav = 0;

// Slumpar ut ord från listan och länkas vidare till funktion laggInOrdSomStjarna samt pushar ordet till valtOrd.
function valjOrd() {
  const ord = [
    "äpple",
    "klocka",
    "häftig",
    "vatten",
    "mjölk",
    "spelar",
    "guitar",
    "havet",
    "bollar",
    "stolar",
  ];
  var ordRandom = Math.floor(Math.random() * ord.length);
  var slumpatOrd = ord[ordRandom];
  valtOrd.push(slumpatOrd);
  laggInOrdSomStjarna(slumpatOrd);
}

// Tar ordet som slumpas ut från listan och lägger in det i html documentet och lägger till <3
function laggInOrdSomStjarna(ord) {
  var stjarna = document.querySelectorAll("#letterBoxes input");
  for (let i = 0; i < ord.length; i++) {
    // Endast sätt värdet om det är en bokstav, annars behåll det nuvarande värdet
    if (ord[i].match(/[a-ö]/i)) {
      stjarna[i].setAttribute("value", "<3");
    }
  }
}

// // startar spelet ock kör igång funktionen valjOrd när spelaren trycker på starta i Html documentet

document.querySelector("#startGameBtn").addEventListener("click", startaSpel);

// funktion som loggar varje tangettryck jämför och lägger den i en lista och räknar ner gissningar
//
document.addEventListener("keydown", function (tangent) {
  const key = tangent.key.toUpperCase();
  kollaGissadBokstav(key);

  if (duVann(key)) {
    return; // Om spelet är vunnet, undvik att utföra andra handlingar
  }

  if (valtOrd.includes(key)) {
    visaGissadBokstav(key);
  }

  if (antalGissningar >= maxAntalGissningar) {
    speletArKlart();
    return; // Returnera här för att undvika att utföra andra handlingar
  }

  const keyLowerCase = key.toLowerCase(); // Konvertera till små bokstäver

  if (
    key >= "A" &&
    key <= "Ö" &&
    !gissadeBokstaverLista.includes(keyLowerCase)
  ) {
    gissadeBokstaverLista.push(keyLowerCase);
    antalGissningar++;
    rattGissadBokstav++;

    const gissadeBokstaver = document.getElementById("gissade-bokstaver");
    const laggInBokstav = document.createElement("li");
    laggInBokstav.textContent = keyLowerCase.toUpperCase();
    gissadeBokstaver.appendChild(laggInBokstav);
    duVann();

    const knappar = document.querySelectorAll("#letterButtons button");
    for (const knapp of knappar) {
      if (knapp.textContent.trim().toLocaleLowerCase() === keyLowerCase) {
        knapp.disabled = true;
        break;
      }
    }
  }
  if (gissadeBokstaverLista.includes(tangent)) {
    alert(
      "Du har redan gissat på bokstaven " +
        keyLowerCase +
        "\n se Gissade Bokstäver"
    );
  }
});

// Mus CLick för att logga tangenter i lista och på skärm

const knappar = document.querySelectorAll("#letterButtons button");
knappar.forEach(function (knap) {
  knap.addEventListener("click", function () {
    const bokstav = knap.textContent;
    musClick(bokstav);
    kollaGissadBokstav(bokstav);
    // Ändrar Färg på den klickade knappen
    knap.disabled = true;
  });
});

// Loggar Musclick och vilken bokstav som trycks ned.
// Kollar om bokstaven finns i valtOrd
// Kontrollerar och spelet är klart

function musClick(bokstav) {
  const clickBokstavLiten = bokstav.toLocaleLowerCase();

  // Kontrollera om bokstaven redan är gissad
  if (gissadeBokstaverLista.includes(clickBokstavLiten)) {
    alert("Du har redan gissat på bokstaven " + clickBokstavLiten);
    return; // Avbryt funktionen om bokstaven redan är gissad
  }

  // Kollar om Bokstaven finns i valtOrd
  if (valtOrd.includes(clickBokstavLiten)) {
    ersattBokstav(valtOrd[0], clickBokstavLiten);
    visaGissadBokstav(clickBokstavLiten);
  }

  // Kontrollera om spelet redan är klart
  if (antalGissningar >= maxAntalGissningar) {
    speletArKlart();
    return; // Returnera här för att undvika att utföra andra handlingar
  }

  if (clickBokstavLiten >= "a" && clickBokstavLiten <= "ö") {
    gissadeBokstaverLista.push(clickBokstavLiten);
    antalGissningar++;
    rattGissadBokstav++;
  }
  if (duVann(bokstav)) {
    return; // Om spelet är vunnet, undvik att utföra andra handlingar
  }

  const gissadeBokstaver = document.getElementById("gissade-bokstaver");
  const laggInBokstav = document.createElement("LI");
  laggInBokstav.textContent = clickBokstavLiten.toUpperCase();
  gissadeBokstaver.appendChild(laggInBokstav);
}

//
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
  } else {
    console.error("Valt ord är inte korrekt satt."); // Logga ett felmeddelande om valtOrd inte är satt korrekt
  }

  // Uppdaterar bild endast om man gissar fel
  if (!bokstavHittad) {
    uppdateraBild();
  }
}
// Uppdaterarbild funnktion

var aktuellBild = 0;

var bilder = [
  "images/h0.png",
  "images/h1.png",
  "images/h2.png",
  "images/h3.png",
  "images/h4.png",
  "images/h5.png",
  "images/h6.png",
];

function uppdateraBild() {
  var bild = document.querySelector("#hangman");

  if (aktuellBild < bilder.length) {
    bild.src = bilder[aktuellBild];
    aktuellBild++;
  }

  // Gör en async funktion för att kunna logga bild
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

  // Ta bort alla listelement från container
  while (gissadeBokstaverContainer.firstChild) {
    gissadeBokstaverContainer.removeChild(gissadeBokstaverContainer.firstChild);
  }
}

// Funktion för att återställa spelet till det ursprungliga tillståndet
function resetGame() {
  removeEnteredLetters();
  valtOrd.length = 0;
  antalGissningar = 0;
  gissadeBokstaverLista.length = 0;
  aktuellBild = 0;
  rattGissadBokstav = 0;
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
// Funktionen tar in bokstav från musClick & Keydown och
// kollar om det finns med i det valda ordet och ger Alert om man har Vunnit.
function duVann(bokstav) {
  if (valtOrd && valtOrd[0]) {
    var bokstaverIordet = valtOrd[0].split("");
    var allaGissade = bokstaverIordet.every(function (bokstavIordet) {
      return gissadeBokstaverLista.includes(bokstavIordet);
    });

    // Uppdatering: Använd bokstav eller key i alert-meddelandet
    if (allaGissade) {
      alert("Grattis, du har vunnit! Ordet var: " + valtOrd[0].toUpperCase());
      startaSpel();
    }
  }
}
//
//
//

//
//
//
//
//
//
//
//

// äääääääääääääääääääääääääääääääääääääääääääääääääääääääääääääääääääääääää
// Funktion för att starta spelet
function startaSpel() {
  resetGame();
}

document.querySelector("#startGameBtn").addEventListener("click", startaSpel);

// Avslutar spelet om Max antal gissningar är uppnåd
function speletArKlart() {
  // Implementera logiken för när spelet är klart
  alert("Spelet är klart! Du har nått det maximala antalet gissningar.");
  // ... (andra åtgärder du vill vidta när spelet är klart)
  startaSpel();
}

// Kunna jämföra med ordet som slumpatsfram och lägga fram den nokstaven

// Om bokstaven är fel vli av med en gissning och lägga fram en bild på gubben som skall hängas

// Visa ordet när spelaren gissar rätt ord i letter box filtrera genom gissade ord och i sånna fall visa ord

//  bygg upp rutor beoende på ord
