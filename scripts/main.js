// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

// ⭐ // // // // // // // Début de l'exercice // // // // // // // // // /🍄

// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

// Déclaration de variables
let original = document.querySelector(".original"),
    traduction = document.querySelector(".traduction"),
    count = document.querySelector(".count"),
    nbr = 0,
    send = document.querySelector(".send"),
    clear = document.querySelector(".clear"),
    start = document.querySelector(".start");

// Remplir le formulaire avec les données du local storage s'il y en a
if (localStorage.getItem("original") && localStorage.getItem("traduction")) {
    original.value = localStorage.getItem("original");
    traduction.value = localStorage.getItem("traduction");
}

// Récupération de la liste de mots depuis le localStorage s'il existe
let words = JSON.parse(localStorage.getItem("words")) || [];

function displayWord() {
    // Vérifier si les champs ne sont pas vides
    if (original.value !== "" && traduction.value !== "") {
        // Injection du contenu en HTML
        console.log(words);
        
        // Enregistrement des données dans le local storage
        localStorage.setItem("original", original.value);
        localStorage.setItem("traduction", traduction.value);

        // Ajouter le mot à la liste
        words.push(original.value + " - " + traduction.value);
        localStorage.setItem("words", JSON.stringify(words));

        // Réinitialisation des valeurs du formulaire
        original.value = "";
        traduction.value = "";
        nbr++;
        count.innerHTML = `Il y a ${nbr} mot(s) enregistré(s)`;
        start.style.display = "block";
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
    start.style.display = "none";
});
