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

// ========== Ползунки =======================================================================

// Показываем блок при скролле (мобильная версия)
window.addEventListener('scroll', function() {
    const scrollBlock = document.getElementById('mobileScrollBlock');
    if (window.innerWidth <= 960) {
        const rect = scrollBlock.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            scrollBlock.classList.add('visible');
        }
    }
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 960) {
        document.getElementById('mobileScrollBlock').style.marginTop = 
            window.innerHeight - document.querySelector('header').offsetHeight + 'px';
    }
});