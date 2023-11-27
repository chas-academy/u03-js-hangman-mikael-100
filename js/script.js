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

// let gissningar = 0;

// Att bygga spelet Hänga Gubbe innebär att hantera olika delar av spelets logik. Här är några övergripande steg och funktioner du kan överväga att implementera:

// Lista av ord:

// Skapa en lista med ord som spelaren ska gissa.
// Välja ett slumpmässigt ord:

// Skriv en funktion för att välja ett slumpmässigt ord från listan.
// Visa ordet:

// Skapa en funktion för att visa det valda ordet med streck eller underscores för varje bokstav.
// Gissning av bokstav:

// Implementera en funktion som låter spelaren gissa en bokstav.
// Hantera felaktiga gissningar:

// Håll reda på felaktiga gissningar och uppdatera ett hängande gubbe-illustration beroende på antalet felaktiga gissningar.
// Kontrollera vinst/förlust:

// Utvärdera om spelaren har gissat hela ordet eller om antalet felaktiga gissningar har nått en maximal nivå.
// Återställa spelet:

// Efter varje omgång, skapa en funktion för att återställa spelet till en ny omgång.
// När det gäller hur dessa funktioner ska kombineras, överväg att använda ett objekt för att hantera spelets nuvarande tillstånd. Till exempel:

// Ordlista som slumpas
// const ordLista = [
//   "äpple",
//   "klocka",
//   "häftig",
//   "vatten",
//   "mjölk",
//   "spelar",
//   "guitar",
//   "havet",
//   "bollar",
//   "stolar",
// ];

// function valjerOrd(ordLista) {
//   var ord = Math.floor(Math.random() * ordLista.length);
//   return ordLista[ord];
// }

// // Väljer det slumpade ordet
// const slumpatOrd = valjerOrd(ordLista);
// console.log("Slumpat ord:", slumpatOrd);

// // Konverterar ordet till lowercase

// if (slumpatOrd) {
//   const ordTillLowercase = slumpatOrd.toLowerCase();
//   // Resten av din kod som använder ordTillLowercase
// } else {
//   console.error("Inget ord slumpades.");
// }

// Visa ordet som * i Html dokumentet

// function visaOrd() {
//   var ordPaKnapp = document.getElementById("letterBoxes");
//   ordPaKnapp.innerHTML = slumpatOrd;
// }

// // **************************************************************2
// function valjOrd() {
//   var ord = [
//     "äpple",
//     "klocka",
//     "häftig",
//     "vatten",
//     "mjölk",
//     "spelar",
//     "guitar",
//     "havet",
//     "bollar",
//     "stolar",
//   ];
//   var ordRandom = Math.floor(Math.random() * ord.length);
//   return ord[ordRandom];
// }

// function fyllKnapparMedAsterisker(ord) {
//   var inputFalt = document.querySelectorAll("#letterBoxes input");
//   for (var i = 0; i < ord.length; i++) {
//     inputFalt[i].setAttribute("value", "*");
//   }
// }

// function uppdateraKnapparMedBokstav(ord, bokstav) {
//   var inputFalt = document.querySelectorAll("#letterBoxes input");
//   for (var i = 0; i < ord.length; i++) {
//     if (ord[i] === bokstav) {
//       inputFalt[i].setAttribute("value", bokstav);
//     }
//   }
// }

// // Listor och variabler
// var valtOrd = [];
// var gissadeBokstaver = [];
// var gissningar = 6;

// // Fånga upp bokstäver och kolla jämför dom mot ordet som finns sparad i gissadBokstav
// function skickaOrd(ord) {
//   valtOrd = ord;
// }

// // Lägg till en funktion för att uppdatera de gissade bokstäverna i gränssnittet
// function uppdateraGissadeBokstaver() {
//   var guessedLettersElement = document.getElementById("guessedLetters");
//   guessedLettersElement.textContent =
//     "Gissade bokstäver: " + gissadeBokstaver.join(", ");
// }

// // Känn efter vilka tangenter som trycks ner spara dom

// document.addEventListener("keydown", function (event) {
//   if (event.key >= 65 && event.key <= 90) {
//     var gissadBokstav = String.fromCharCode(event.keyCode).toLowerCase();
//     if (!gissadeBokstaver.includes(gissadBokstav)) {
//       // Uppdaterat namn
//       gissadeBokstaver.push(gissadBokstav);
//       gissatPa(gissadBokstav);
//     }
//   }
// });

// // llllllllllllllllllllllllllllllllllllllllllllllllllllllll
// function startaSpel() {
//   var hamtaOrd = valjOrd();
//   skickaOrd(hamtaOrd);
//   fyllKnapparMedAsterisker(hamtaOrd);
//   uppdateraGissadeBokstaver(); // Uppdatera gränssnittet med de gissade bokstäverna
//   // Här kan du lägga till din kod för att hantera användarens gissningar.
// }
// document.getElementById("startGameBtn").addEventListener("click", startaSpel);
// // *******************************************************************************************************2
//
//
//
//
//
//
//
//
// Listor och variablar

const valtOrd = [];

// Slumpar ut ord från listan och länkas vidare till funktion laggInOrdSomStjarna samt pushar ordet till valtOrd.
function valjOrd() {
  var ord = [
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
    stjarna[i].setAttribute("value", "<3");
  }
}
// startar spelet ock kör igång funktionen valjOrd när spelaren trycker på starta i Html documentet
function startaSpel() {
  valjOrd();
}

document.querySelector("#startGameBtn").addEventListener("click", startaSpel);
