// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

// ⭐ // // // // //  Déclaration de variables // // // // // // // // // /🍄

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
    wordsList = document.querySelector(".words-list"),
    game = document.querySelector(".game"),
    close = document.querySelector(".close"),
    translate = document.querySelector(".translateSentence"),
    check = document.querySelector(".check"),
    userPropose = document.querySelector(".userPropose"),
    result = document.querySelector(".result"),
    score = document.querySelector(".score"),
    scoreNbr = 0;

// let en = [],
//     nl = [],
//     tr = []

// Remplir le formulaire avec les données du local storage s'il y en a
if (localStorage.getItem("original") && localStorage.getItem("traduction")) {
    original.value = localStorage.getItem("original");
    traduction.value = localStorage.getItem("traduction");
}

// 🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀 

// ⭐ // // // // // // // // Fonctions // // // // // // // // // // // // ⭐

// 🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀 

function displayWord() {
    // Vérifier si les champs ne sont pas vides
    if (original.value !== "" && traduction.value !== "") {
        // Construction du HTML de l'élément li à ajouter
        const newListItem = 
        `<li data-index="${words.length}">
        <strong>Original:</strong> ${original.value} - <strong>Traduction:</strong> ${traduction.value} 
        <span class="remove">❌</span>
        </li>`;

        // Ajout de l'élément li à la liste des mots en injectant dans innerHTML
        wordsList.innerHTML += newListItem;

        console.log(words);

        // Enregistrement des données dans le local storage
        localStorage.setItem("original", original.value);
        localStorage.setItem("traduction", traduction.value);

        // Ajouter le mot à la liste
        words.push(
            { 
            original: original.value,
            traduction: traduction.value 
            }
        )
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

// Fonction pour sélectionner un mot aléatoire
function selectRandomWord() {
    if (words.length > 0) {
        randomWord = Math.floor(Math.random() * words.length);
        translate.innerHTML = `Traduis le mot <span>${words[randomWord].original}</span>`;
    } else {
        translate.innerHTML = "Aucun mot à traduire disponible.";
    }
}

// 🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️  

// ⭐ // // // // // // // Évenements // // // // // // // // // // // //⭐

// 🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️ 

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
    count.innerHTML = `Il y a ${nbr} mot(s) enregistré(s)`;
    ready.style.display = "none";
});

// Événement sur le bouton "Teste tes connaissances"
ready.addEventListener("click", function(){
    game.classList.add("active");
    selectRandomWord(); // Sélectionne un nouveau mot aléatoire
});

// Événement sur le bouton "❌"
close.addEventListener("click", function(){
    game.classList.remove("active")
    scoreNbr = 0;
    score.textContent = `Tu as ${scoreNbr} bonne(s) réponse(s)`
})

// Événement sur le bouton "❌" pour supprimer un mot de la liste
wordsList.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove")) {
        // Définir la const pour récupérer l'index du mot dans la liste
        const index = event.target.parentElement.dataset.index;
        // Supprimer le parent li de l'élément cliqué
        event.target.parentElement.remove();
        // Supprimer le mot correspondant du tableau 'words'
        if (index !== undefined) { // les valeurs sont différentes et les types de données sont différents 
            words.splice(index, 1); // (Enlève la ligne correspondante à l'index, nombre d'éléments enlevés à partir de cet index)
            // Mettre à jour les attributs data-index des éléments restants dans la liste
            const listItems = wordsList.querySelectorAll("li"); // Chercher tous les li de mon ul
            listItems.forEach((item, i) => { //listItems tous mes Li, et item mon li tout seul, i = index
                item.dataset.index = i;
            });
            // Mettre à jour le stockage local
            localStorage.setItem("words", JSON.stringify(words));
            // Mettre à jour le compteur de mots
            nbr--;
            count.innerHTML = `Il y a ${nbr} mot(s) enregistré(s)`;
        }
    }
    console.log(words);
});

// Événement sur le bouton "Proposer"
check.addEventListener("click", function(){
    if (userPropose.value.toUpperCase() == words[randomWord].traduction.toUpperCase()){
        result.innerHTML = `Bien joué !`;
        scoreNbr++;
        score.textContent = `Tu as ${scoreNbr} bonne(s) réponse(s)`;

        // Supprimer le mot de la liste
        words.splice(randomWord, 1);
        localStorage.setItem("words", JSON.stringify(words));

        // Sélectionner un nouveau mot aléatoire si la liste n'est pas vide
        if (words.length > 0) {
            selectRandomWord();
        } else {
            translate.innerHTML = "Aucun mot à traduire disponible";
        }
    } else {
        result.innerHTML = `Mauvaise réponse..`;
    }
    setTimeout(function(){
        result.innerHTML = "";
    }, 3000);
    userPropose.value = "";
}); 

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

// Chargement initial de la page : sélectionne un mot aléatoire
selectRandomWord();