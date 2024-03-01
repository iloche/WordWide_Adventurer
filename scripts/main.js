// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

// ⭐ // // // // // // // Début de l'exercice // // // // // // // // // /🍄

// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

// Récupération de la liste de mots depuis le localStorage s'il existe
let words = JSON.parse(localStorage.getItem("words")) || [];

// Déclaration de variables
let original = document.querySelector(".original"),
    traduction = document.querySelector(".traduction"),
    count = document.querySelector(".count"),
    nbr = 0,
    send = document.querySelector(".send"),
    clear = document.querySelector(".clear"),
    ready = document.querySelector(".ready"),
    game = document.querySelector(".game"),
    close = document.querySelector(".close"),
    translate = document.querySelector(".translateSentence"),
    check = document.querySelector(".check"),
    userPropose = document.querySelector(".userPropose"),
    result = document.querySelector(".result"),
    score = document.querySelector(".score"),
    scoreNbr = 0;

// Remplir le formulaire avec les données du local storage s'il y en a
if (localStorage.getItem("original") && localStorage.getItem("traduction")) {
    original.value = localStorage.getItem("original");
    traduction.value = localStorage.getItem("traduction");
}

function displayWord() {
    // Vérifier si les champs ne sont pas vides
    if (original.value !== "" && traduction.value !== "") {
        // Injection du contenu en HTML
        console.log(words);
        
        // Enregistrement des données dans le local storage
        localStorage.setItem("original", original.value);
        localStorage.setItem("traduction", traduction.value);

        // Ajouter le mot à la liste
        words.push({ original: original.value, traduction: traduction.value })
        localStorage.setItem("words", JSON.stringify(words));

        // Réinitialisation des valeurs du formulaire
        original.value = "";
        traduction.value = "";
        nbr++;
        count.innerHTML = `Il y a ${nbr} mot(s) enregistré(s)`;
        ready.style.display = "block";
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

// Événement sur le bouton "Envoyer"
send.addEventListener("click", function(){
    displayWord();
});

// Événement sur le bouton "Effacer"
clear.addEventListener("click", function(){
    localStorage.clear();
    words = [];
    original.value = "";
    traduction.value = "";
    nbr = 0; 
    count.innerHTML = `Il y a 0 mot(s) enregistré(s)`;
    ready.style.display = "none";
});

// Fonction pour sélectionner un mot aléatoire
function selectRandomWord() {
    if (words.length > 0) {
        randomWord = Math.floor(Math.random() * words.length);
        translate.innerHTML = `Traduis le mot <span>${words[randomWord].original}</span>`;
    } else {
        translate.innerHTML = "Aucun mot à traduire disponible.";
    }
}

// Événement sur le bouton "Teste tes connaissances"
ready.addEventListener("click", function(){
    game.classList.add("active");
    selectRandomWord(); // Sélectionne un nouveau mot aléatoire
});

// Événement sur le bouton "❌"
close.addEventListener("click", function(){
    game.classList.remove("active")
})

// Événement sur le bouton "Proposer"
check.addEventListener("click", function(){
    if (userPropose.value.toUpperCase() == words[randomWord].traduction.toUpperCase()){
        result.innerHTML = `Bien joué !`;
        scoreNbr++;
        score.textContent = `Tu as ${scoreNbr} bonne(s) réponse(s)`
        selectRandomWord()
    } else {
        result.innerHTML = `Mauvaise réponse..`;
    }
    setTimeout(function(){
        result.innerHTML = "";
    }, 3000);
    userPropose.value = "";
}); 

// Chargement initial de la page : sélectionne un mot aléatoire
selectRandomWord();

// Événement de validation à la touche "Enter"
traduction.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        displayWord()
    }
})
// Événement de validation à la touche "Enter"
userPropose.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        check.click()
    }
})