// ========== Блок для ползунков =======================================================================

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


document.addEventListener('DOMContentLoaded', function() {
    // Инициализация десктопных слайдеров
    setupSlider('widthSlider', 'widthValue');
    setupSlider('heightSlider', 'heightValue');
    setupSlider('angleSlider', 'angleValue');
    
    // Инициализация мобильных слайдеров
    setupSlider('mobileWidthSlider', 'mobileWidthValue');
    setupSlider('mobileHeightSlider', 'mobileHeightValue');
    setupSlider('mobileAngleSlider', 'mobileAngleValue');
    
    // Инициализация при загрузке (мобильная версия)
    if (window.innerWidth <= 960) {
        document.getElementById('mobileScrollBlock').style.marginTop = 
            window.innerHeight - document.querySelector('header').offsetHeight + 'px';
    }
});

// ================ Ползунки ===========================================================

// Универсальная функция для настройки слайдеров
function setupSlider(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    
    if (slider && valueDisplay) {
        // Обновляем значение сразу
        valueDisplay.textContent = slider.value;
        
        // Обработчик для всех событий изменения
        const updateHandler = () => {
            valueDisplay.textContent = slider.value;
        };
        
        slider.addEventListener('input', updateHandler);
        slider.addEventListener('change', updateHandler);
        
        // Для touch-устройств
        slider.addEventListener('touchstart', function() {
            this.addEventListener('touchmove', updateHandler);
        });
        
        slider.addEventListener('touchend', function() {
            this.removeEventListener('touchmove', updateHandler);
        });
    }
}

// Остальной код (анимации, scroll и т.д.) остается без изменений

function updateValues() {
    gsap.to(widthValue, {textContent: widthSlider.value, duration: 0.3});
    gsap.to(heightValue, {textContent: heightSlider.value, duration: 0.3});
    gsap.to(angleValue, {textContent: angleSlider.value, duration: 0.3});
}

// Анимация чисел при изменении
function animateValue(element, newValue) {
    gsap.to(element, {
        textContent: newValue,
        duration: 0.3,
        snap: { textContent: 1 },
        onUpdate: function() {
            element.textContent = Math.round(this.targets()[0].textContent);
        }
    });
}

// Использование:
slider.addEventListener('input', function() {
    animateValue(valueDisplay, this.value);
});