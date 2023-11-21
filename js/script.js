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

// Ordlista som slumpas
const ordLista = [
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

function valjerOrd(ordLista) {
  var ord = Math.floor(Math.random() * ordLista.length);
  return ordLista[ord];
}

// Väljer det slumpade ordet
const slumpatOrd = valjerOrd(ordLista);
console.log("Slumpat ord:", slumpatOrd);

// Konverterar ordet till lowercase

if (slumpatOrd) {
  const ordTillLowercase = slumpatOrd.toLowerCase();
  // Resten av din kod som använder ordTillLowercase
} else {
  console.error("Inget ord slumpades.");
}
// Hittar DOM-elementet "letterBoxes"
// const letterBoxes = document.getElementById("letterBoxes");
// Sparar gissade bokstäver
// console.log("letterBoxes:", letterBoxes);

// const gissadBokstaver = Array.from(ordTillLowercase).map(function () {
//   return "_";
// });
