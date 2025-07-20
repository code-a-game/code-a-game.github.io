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
    } else {
        // Switch to Danish
        englishContent.classList.add('hidden');
        danishContent.classList.remove('hidden');
        languageFlag.src = 'images/languageIconUK.png';
        languageFlag.alt = 'Switch to English';
        document.documentElement.lang = 'da';
        localStorage.setItem('preferredLanguage', 'da');
    }
}

function initializeLanguage() {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    const danishContent = document.getElementById('danish-content');
    const englishContent = document.getElementById('english-content');
    const languageFlag = document.getElementById('languageFlag');

    if (preferredLanguage === 'da') {
        // Set to Danish
        englishContent.classList.add('hidden');
        danishContent.classList.remove('hidden');
        languageFlag.src = 'images/languageIconUK.png';
        languageFlag.alt = 'Switch to English';
        document.documentElement.lang = 'da';
    } else {
        // Set to English (default)
        danishContent.classList.add('hidden');
        englishContent.classList.remove('hidden');
        languageFlag.src = 'images/languageIconDK.png';
        languageFlag.alt = 'Switch to Danish';
        document.documentElement.lang = 'en';
    }
}

// Initialize language when the page loads
document.addEventListener('DOMContentLoaded', initializeLanguage);
