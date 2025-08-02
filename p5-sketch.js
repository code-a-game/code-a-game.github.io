// This file will contain the p5.js sketch for the index page.

let danishContent;
let englishContent;
let currentContent;
let language = 'danish'; // 'danish' or 'english'

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-canvas-container');
    
    danishContent = [
        { text: 'Kom i gang med programmering', href: 'getStarted.html', icon: '🎨' },
        { text: 'Forklaring af program struktur', href: 'programStructure.html', icon: '📜' },
        { text: 'Opgaver i grundlæggende programmering', href: 'basicExercises.html', icon: '🧩' },
        { text: 'Opgaver til at teste forståelse', href: 'bonusExercises.html', icon: '🧠' },
        { text: 'Avancerede eksempler', href: 'advancedExamples.html', icon: '🚀' },
        { text: 'Opgave ideer', href: 'taskIdeas.html', icon: '💡' },
        { text: 'Old school Zelda spil (easy)', href: 'zelda.html', icon: '⚔️' },
        { text: 'HeroMan (medium)', href: 'heroMan.html', icon: '🦸' },
        { text: 'Quiz time (advanced)', href: 'quiz.html', icon: '❓' },
        { text: 'Old school bibib spil - Grand Prix Race (hard)', href: 'grandPrixRace.html', icon: '🏎️' },
        { text: 'Grafik bibliotek til Grand Prix Race (hard)', href: 'grandPrixRaceLibrary.html', icon: '🏎️' },
        { text: 'Space Stratego (beast mode)', href: 'spaceStratego.html', icon: '🪐' },
        { text: 'Space Stratego - Grafikken', href: 'spaceStrategoGraphics.html', icon: '✨' },
        { text: 'Links and referencer', href: 'references.html', icon: '📚' },
        { text: 'Betingelser for brug af denne side og de tilhørende ressourcer', href: 'conditions.html', icon: '📄' },
        { text: 'Kontakt', href: 'contact.html', icon: '✉️' }
    ];

    englishContent = [
        { text: 'Get started with programming', href: 'getStarted.html', icon: '🎨' },
        { text: 'Explanation of program structure', href: 'programStructure.html', icon: '📜' },
        { text: 'Tasks in basic programming', href: 'basicExercises.html', icon: '🧩' },
        { text: 'Tasks to test understanding', href: 'bonusExercises.html', icon: '🧠' },
        { text: 'Advanced examples', href: 'advancedExamples.html', icon: '🚀' },
        { text: 'Task ideas', href: 'taskIdeas.html', icon: '💡' },
        { text: 'Old school Zelda game (easy)', href: 'zelda.html', icon: '⚔️' },
        { text: 'HeroMan (medium)', href: 'heroMan.html', icon: '🦸' },
        { text: 'Quiz time (advanced)', href: 'quiz.html', icon: '❓' },
        { text: 'Old school racing game - Grand Prix Race (hard)', href: 'grandPrixRace.html', icon: '🏎️' },
        { text: 'Graphics library for Grand Prix Race (hard)', href: 'grandPrixRaceLibrary.html', icon: '🏎️' },
        { text: 'Space Stratego (beast mode)', href: 'spaceStratego.html', icon: '🪐' },
        { text: 'Space Stratego - The graphics', href: 'spaceStrategoGraphics.html', icon: '✨' },
        { text: 'Links and references', href: 'references.html', icon: '📚' },
        { text: 'Terms of use for this site and its associated resources', href: 'conditions.html', icon: '📄' },
        { text: 'Contact', href: 'contact.html', icon: '✉️' }
    ];

    currentContent = danishContent;
    textAlign(LEFT, TOP);
}

function draw() {
    background(255);
    let y = 20;
    let x = 20;
    let itemHeight = 40;
    let itemWidth = 400;

    for (let i = 0; i < currentContent.length; i++) {
        let item = currentContent[i];
        
        // Simple layout
        if (y + itemHeight > height) {
            y = 20;
            x += itemWidth + 20;
        }

        // Draw background box for interaction
        fill(240);
        noStroke();
        if (mouseX > x && mouseX < x + itemWidth && mouseY > y && mouseY < y + itemHeight) {
            fill(220); // Highlight on hover
        }
        rect(x, y, itemWidth, itemHeight, 5);

        // Draw icon and text
        fill(0);
        textSize(24);
        text(item.icon, x + 10, y + 5);
        textSize(16);
        text(item.text, x + 50, y + 10);

        y += itemHeight + 10; // next item position
    }
}

function mousePressed() {
    let y = 20;
    let x = 20;
    let itemHeight = 40;
    let itemWidth = 400;

    for (let i = 0; i < currentContent.length; i++) {
        if (y + itemHeight > height) {
            y = 20;
            x += itemWidth + 20;
        }
        if (mouseX > x && mouseX < x + itemWidth && mouseY > y && mouseY < y + itemHeight) {
            window.location.href = currentContent[i].href;
            break;
        }
        y += itemHeight + 10;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// The language switching will be handled by the existing switchLanguage function in script.js
// We need to make sure it calls a function in this sketch.
function setLanguage(lang) {
    if (lang === 'danish') {
        currentContent = danishContent;
        language = 'danish';
    } else {
        currentContent = englishContent;
        language = 'english';
    }
    redraw();
}
