console.log('Сайт загружен');

// ========== Бургер-меню =======================================================================

document.addEventListener('DOMContentLoaded', function() {
    const burgerIcon = document.getElementById('burgerIcon');
    const mainNav = document.getElementById('mainNav');
    
    // Обработчик клика по бургеру
    burgerIcon.addEventListener('click', function() {
        // Переключаем класс active у меню
        mainNav.classList.toggle('active');
        
        // Анимация бургера в "крестик"
        burgerIcon.classList.toggle('active');
    });
    
    // Закрываем меню при клике на ссылку
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            burgerIcon.classList.remove('active');
        });
    });
});

// ========== Выпадающее меню =======================================================================

// Добавить обработчик для мобильного меню
document.querySelectorAll('.dropdown > a').forEach(item => {
    item.addEventListener('click', (e) => {
        if (window.innerWidth <= 960) {
            e.preventDefault();
            item.parentElement.classList.toggle('active');
        }
    });
});