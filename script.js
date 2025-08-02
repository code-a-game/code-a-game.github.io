let showDescription = false;

function switchLanguage() {
    const danishContent = document.getElementById('danish-content');
    const englishContent = document.getElementById('english-content');
    const languageFlag = document.getElementById('languageFlag');
    const isDanishVisible = !danishContent.classList.contains('hidden');

    if (isDanishVisible) {
        // Switch to English
        danishContent.classList.add('hidden');
        englishContent.classList.remove('hidden');
        languageFlag.src = 'images/languageIconDK.png';
        languageFlag.alt = 'Switch to Danish';
        document.documentElement.lang = 'en';
        localStorage.setItem('preferredLanguage', 'en');
        if (typeof toggleDescription === 'function') {
            toggleDescription('english');
        }
    } else {
        // Switch to Danish
        englishContent.classList.add('hidden');
        danishContent.classList.remove('hidden');
        languageFlag.src = 'images/languageIconUK.png';
        languageFlag.alt = 'Switch to English';
        document.documentElement.lang = 'da';
        localStorage.setItem('preferredLanguage', 'da');
        if (typeof toggleDescription === 'function') {
            toggleDescription('danish');
        }
    }
}

function initializeLanguage() {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    const danishContent = document.getElementById('danish-content');
    const englishContent = document.getElementById('english-content');
    const languageFlag = document.getElementById('languageFlag');

    if (preferredLanguage === 'en') {
        // Set to English
        danishContent.classList.add('hidden');
        englishContent.classList.remove('hidden');
        languageFlag.src = 'images/languageIconDK.png';
        languageFlag.alt = 'Switch to Danish';
        document.documentElement.lang = 'en';
        if (typeof toggleDescription === 'function') {
            toggleDescription('english');
        }
    } else {
        // Set to Danish (default)
        englishContent.classList.add('hidden');
        danishContent.classList.remove('hidden');
        languageFlag.src = 'images/languageIconUK.png';
        languageFlag.alt = 'Switch to English';
        document.documentElement.lang = 'da';
        if (typeof toggleDescription === 'function') {
            toggleDescription('danish');
        }
    }
}

// Initialize language when the page loads
document.addEventListener('DOMContentLoaded', initializeLanguage);

// From modal.js
// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

document.querySelectorAll('.content-img').forEach(item => {
  item.addEventListener('click', event => {
    modal.style.display = "block";
    modalImg.src = item.src;
    captionText.innerHTML = item.alt;
  });
});


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]; 

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

modal.onclick = function(event) {
    // Close the modal if the user clicks on the background or the image
    if (event.target == modal || event.target == modalImg) {
        modal.style.display = "none";
    }
}

// From p5-describe.js
// This file will contain the p5.js sketch for the describe text.
function setup() {
    let canvas = createCanvas(400, 100);
    canvas.parent('p5-canvas-container');
    noLoop(); // We don't need to draw continuously
}

function draw() {
//    if (showDescription) {
        describe('This page encourages children to set their imagination free through creative coding. My experience is that it can be difficult to get started with text-based programming, and this page makes it easier to begin that journey. The first section — Get Started with Programming — leads the way and shows exactly what to do to get started, including helpful hints, tool usage, and how to use the p5.js documentation. The second section — Explanation of Program Structure — provides a solid understanding of program syntax and the possibilities it offers. The third section — Basic p5.js Exercises — provides 38 basic tasks. For each task, the user first tries out a solution and then attempts to recreate it. There are hints available if needed, as well as a solution example to ensure better understanding. The next section — Bonus Exercises to Test Understanding — includes 11 tasks designed to check the users grasp of the concepts. The following section — Advanced Examples — demonstrates a star system implemented both with and without object-oriented programming, as well as a simple multiplayer game, also shown in both styles. The section — How to Come Up with Programming Ideas — gives useful tips for starting a project, such as the importance of sketching your ideas. In the following sections, there are implementations of several games: Old-School Zelda, HeroMan, Quiz Time, and an Old-School Racing Game. Each game is divided into smaller tasks that the user can try to solve. For each task, there is a solution example, so its possible to make progress and learn even when things get tricky. There is also code for a real multiplayer game that has been published. Finally, the page includes references to helpful resources. This page is available in both Danish and English. It distinguishes itself by focusing on complete beginners and showing how to progress from simple to advanced games, including multiplayer games. It has been used in teaching sessions by the Danish organisation Coding Pirates, and it provided great value by supporting children in using their imagination and following their own ideas.', LABEL);
//    } else {
//        describe('', LABEL);
//    }
}
/*
function toggleDescription(lang) {
    if (lang === 'english') {
        showDescription = true;
    } else {
        showDescription = false;
    }
    redraw();
}
    */
