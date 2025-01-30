// Wyświetlanie bieżącej daty
window.onload = () => {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    dateElement.textContent = now.toLocaleString('pl-PL', options);
};
if (window.location.pathname.includes('adwokat-przepis.html')) {
    SecretSite();
}

document.getElementById('recipe-link').addEventListener('click', () => {
    const password = prompt('Podaj hasło:');
    if (password === 'tajne') {
        location.href = password + '/adwokat-przepis.html';
    } else {
        alert('Nieprawidłowe hasło!');
    }
});

document.getElementById('source-link').addEventListener('click', event => {
    const confirmNavigation = confirm('Czy na pewno chcesz przejść do zewnętrznej strony?');
    if (!confirmNavigation) {
        event.preventDefault();
    }
});

function SecretSite() {
    const timeElement = document.getElementById('time-spent');
    let seconds = 0;
    let timeoutActive = true;

    const interval = setInterval(() => {
        seconds++;
        timeElement.textContent = `Czas na stronie: ${seconds} sekund`;
    }, 1000);

    const timeout = setTimeout(() => {
        if (timeoutActive) {
            location.href = '../adwokat.html';
        }
    }, 10000);

    const likeButton = document.getElementById('like-button');
    likeButton.addEventListener('click', () => {
        timeoutActive = false;
        clearTimeout(timeout);
        clearInterval(interval);
        timeElement.remove();
    });
}

const obraz = document.getElementById('ciasto-img');

document.querySelectorAll('input[name="filtr"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        const obraz = document.getElementById('ciasto-img');
        
        obraz.classList.remove('normal', 'sepia', 'grayscale', 'invert');
        obraz.classList.add(radio.value);        
    });
});
document.getElementById('ramka-checkbox').addEventListener('change', function() {
    if (this.checked) {
        obraz.classList.add('border-active');
    } else {
        obraz.classList.remove('border-active');
    }
});