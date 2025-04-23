// Обновленный portraits.js
document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Обработчик для кнопки "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            modalOverlay.style.display = 'flex';
        });
    });

    // Закрытие модального окна
    modalOverlay.addEventListener('click', function(e) {
        if(e.target === modalOverlay || e.target.classList.contains('close-modal')) {
            modalOverlay.style.display = 'none';
        }
    });

    // Подтверждение выбора
    document.querySelector('.confirm-add').addEventListener('click', function() {
        const material = document.querySelector('.material-select').value;
        // Здесь логика добавления в корзину
        modalOverlay.style.display = 'none';
        alert(`Добавлено в корзину (${getMaterialName(material)})`);
    });

    function getMaterialName(value) {
        const materials = {
            print: 'Печать',
            paint: 'Краска',
        };
        return materials[value] || 'Печать';
    }

    // Инициализация каруселей
    document.querySelectorAll('.portrait-carousel').forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        let currentSlide = 0;
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[n].classList.add('active');
        }
        
        carousel.querySelector('.carousel-next').addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
        
        carousel.querySelector('.carousel-prev').addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    });
});