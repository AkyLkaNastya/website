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

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownLink = dropdown.querySelector('a');
    const submenu = dropdown.querySelector('.submenu');
    
    // Закрываем подменю при клике вне его области
    document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target)) {
            submenu.style.display = 'none';
            dropdown.classList.remove('active');
        }
    });
    
    // Обработчик клика по пункту "ОСНОВА"
    dropdownLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (submenu.style.display === 'block') {
            submenu.style.display = 'none';
            dropdown.classList.remove('active');
        } else {
            submenu.style.display = 'block';
            dropdown.classList.add('active');
        }
    });
    
    // Для мобильной версии оставляем стандартное поведение
    if (window.innerWidth <= 960) {
        dropdownLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
    }
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 960) {
            submenu.style.display = 'none';
            dropdown.classList.remove('active');
        }
    });
});