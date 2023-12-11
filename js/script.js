// Listor och variablar

var valtOrd = [];
var maxAntalGissningar = 12;
var gissadeBokstaverLista = [];
var knappTryckningTillåten = 0;
var duVannJU = 0;

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
    // Jag var tvungen att lägga in restart på dessa två IF:S för att även om jag disablade knapparna
    // Efter att spelaren för söker tvinga sig fram efter vinst eller förlust så kunde Keydowns forfarande loggas
    // Så jag var tvungen att lägga in dessa för att resetta allt om spelare trillskas med att försöka spela vidare på keydown efter vinst eller förlust.
    if (duVannJU === 3) {
      resetGame();
    }
    if (knappTryckningTillåten === 3) {
      resetGame();
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
// ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ
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

  // Denna funktion kollar när billden är lika med 7 när den är det så lägger den in texten "Du har förlorat! Tryck på STARTA SPELET/RESET För att börja om"
  // Funktionen knappTryckningKlart startas nu varjegång för att se om dess if kondition är uppfyllt.
  if (aktuellBild === 7) {
    let forlust = document.getElementById("message");
    forlust.textContent =
      "Du har förlorat! Tryck på STARTA SPELET/RESET För att börja om";
    knappTryckningTillåten++;
    knappTryckKlart();
  }
}
// När aktuellbild är ökar knappTryckningTillåten med 1 och när den är lika med 2 Skickas en Alert till spelaren att spelet är förlorat.
// den lägger även till plus 1 till knappTryckningTillåten som triggar nästa if som gör att knapparna blir disablade och spelaren kan endast starta om.

function knappTryckKlart() {
  if (knappTryckningTillåten === 2) {
    alert("Du har förlorat! Tryck på STARTA SPELET/RESET För att börja om");
    knappTryckningTillåten++;
  }
  if (knappTryckningTillåten === 3) {
    var knapparRemove = document.querySelectorAll("#letterButtons button");
    knapparRemove.forEach(function (knapp) {
      knapp.disabled = true;
    });
  }
}

// äÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ
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
  aktuellBild = 0;
  removeEnteredLetters();
  clearMessage();
  uppdateraBild();
  valtOrd.length = 0;
  gissadeBokstaverLista.length = 0;
  knappTryckningTillåten = 0;
  duVannJU = 0;
  valjOrd();
  // UnDisablarKnappar
  var knappar = document.querySelectorAll("#letterButtons button");
  knappar.forEach(function (knapp) {
    knapp.style.display = "block";
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
    //  Om alla bokstaver är gissat så läggs "Grattis Du Vann" in på html sidan
    // När alla bokstaver är rättgissade skickas även plus 1 till duVannJu som uppdateras
    // När duVannJu är lika med 2 loggas en Alert som hänvisar spelaren att starta om.
    if (allaGissade) {
      let vinst = document.getElementById("message");
      vinst.textContent = "GRattis Du Vann";
      duVannJU++;

      // När duVannJU är större eller lika med 2 så triggas denna Alert som hänvisar spelaren att starta om och plussar sedan på
      // 1 på duVannJU som triggar nästa if som disablar knappar så spelaren endast kan trycka på starta om knappen.
    }
    if (duVannJU === 2) {
      alert("Du har ju Vunnit! Tryck på STARTA SPELET/RESET för att börja om");
      duVannJU++;
    }
    //
    if (duVannJU === 3) {
      var knappar = document.querySelectorAll("#letterButtons button");
      knappar.forEach(function (knapp) {
        // knapp.style.display = "none";
        knapp.disabled = true;
      });
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
