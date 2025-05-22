document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для кнопки "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const portraitCard = this.closest('.portrait-card');
            const portraitTitle = portraitCard.querySelector('h3').textContent;
            
            // Сохраняем только стиль портрета
            localStorage.setItem('portraitStyle', portraitTitle);
            
            // Перенаправляем в корзину
            window.location.href = 'cart.html';
        });
    });

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

    document.querySelectorAll('.carousel-slide').forEach(slide => {
        slide.addEventListener('mousemove', (e) => {
            const rect = slide.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            slide.style.setProperty('--x', `${x}px`);
            slide.style.setProperty('--y', `${y}px`);
        });
    });
});