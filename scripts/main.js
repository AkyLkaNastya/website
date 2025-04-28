console.log('Сайт загружен');

// ========== Бургер-меню =======================================================================

document.addEventListener('DOMContentLoaded', function() {
    const burgerIcon = document.getElementById('burgerIcon');
    const mainNav = document.getElementById('mainNav');
    
    burgerIcon.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        burgerIcon.classList.toggle('active');
    });
    
    const navLinks = document.querySelectorAll('.main-nav a:not(.dropdown > a)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            burgerIcon.classList.remove('active');
        });
    });
});

// ========== Выпадающее меню =======================================================================

document.querySelectorAll('.dropdown > a').forEach(item => {
    item.addEventListener('click', (e) => {
        if (window.innerWidth <= 960) {
            e.preventDefault();
            e.stopPropagation(); // Блокируем всплытие события
            item.parentElement.classList.toggle('active');
        }
    });
});