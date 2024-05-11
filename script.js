// JavaScript source code

function toHome() {
    window.open("index.html", "_self")
}

function back() {
    history.back();   //¦^¤W­¶
}

function openQuiz() {
    window.open("quiz_play.html", "_self");
}

function exitQuiz() {
    check = confirm("\nWARNING!\n\nExiting now will lose all your progress.\n\nExit now?");
    if (check == true) toHome();
}