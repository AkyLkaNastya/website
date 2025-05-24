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
    // Инициализация слайдеров
    setupSlider('widthSlider', 'widthValue');
    setupSlider('heightSlider', 'heightValue');
    setupSlider('angleSlider', 'angleValue');
    setupSlider('mobileWidthSlider', 'mobileWidthValue');
    setupSlider('mobileHeightSlider', 'mobileHeightValue');
    setupSlider('mobileAngleSlider', 'mobileAngleValue');

    // Инициализируем отображение цены
    updatePriceDisplay();

    // Обработчик для десктопной кнопки
    document.querySelector('.add-to-cart').addEventListener('click', addToCartHandler);
    
    // Обработчик для мобильной кнопки
    const mobileAddToCartBtn = document.querySelector('.mobile-controls .add-to-cart');
    if (mobileAddToCartBtn) {
        mobileAddToCartBtn.addEventListener('click', addToCartHandler);
    }

    // Показываем блок при скролле (мобильная версия)
    if (window.innerWidth <= 960) {
        document.getElementById('mobileScrollBlock').style.marginTop = 
            window.innerHeight - document.querySelector('header').offsetHeight + 'px';
        
        window.addEventListener('scroll', function() {
            const scrollBlock = document.getElementById('mobileScrollBlock');
            const rect = scrollBlock.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                scrollBlock.classList.add('visible');
            }
        });
    }
});

// Выносим общую логику в отдельную функцию
function addToCartHandler() {
    // Получаем значения с десктопных или мобильных слайдеров
    const width = window.innerWidth > 960 ? 
        document.getElementById('widthSlider').value : 
        document.getElementById('mobileWidthSlider').value;
    
    const height = window.innerWidth > 960 ? 
        document.getElementById('heightSlider').value : 
        document.getElementById('mobileHeightSlider').value;
    
    const corners = window.innerWidth > 960 ? 
        document.getElementById('angleSlider').value : 
        document.getElementById('mobileAngleSlider').value;

    // Сохраняем параметры холста в localStorage
    localStorage.setItem('canvasWidth', width);
    localStorage.setItem('canvasHeight', height);
    localStorage.setItem('canvasCorners', corners);
    
    // Удаляем выбранный альтернативный материал (если был)
    localStorage.removeItem('selectedMaterial');

    // Рассчитываем и сохраняем стоимость холста
    const price = calculateCanvasPrice(width, height, corners);
    localStorage.setItem('canvasPrice', price);
    
    // Перенаправляем в корзину
    window.location.href = 'cart.html';
}

// ================ Ползунки ===========================================================

// Функция для настройки слайдеров
function setupSlider(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    
    if (slider && valueDisplay) {
        valueDisplay.textContent = slider.value;
        
        const updateHandler = () => {
            valueDisplay.textContent = slider.value;
            updatePriceDisplay();
        };
        
        slider.addEventListener('input', updateHandler);
        slider.addEventListener('change', updateHandler);
        
        slider.addEventListener('touchstart', function() {
            this.addEventListener('touchmove', updateHandler);
        });
        
        slider.addEventListener('touchend', function() {
            this.removeEventListener('touchmove', updateHandler);
        });

        // Добавьте анимацию здесь
        slider.addEventListener('input', function() {
            animateValue(valueDisplay, this.value);
        });
    }
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

// Функция для расчета стоимости холста
function calculateCanvasPrice(width, height, corners) {
    // Преобразуем параметры в числа
    width = parseInt(width);
    height = parseInt(height);
    corners = parseInt(corners);
    
    // Расчет стоимости печати холста
    const printCost = Math.ceil((width + 5) * (height + 5) * 0.0001 * 1000);
    
    // Расчет стоимости брусьев (рамы)
    const frameCost = Math.ceil((width * 2 + height * 2) / 200) * 100;
    
    // Базовая стоимость (печать + рама) с наценкой
    const baseCost = Math.ceil((printCost + frameCost) * 2);
    
    // Учет дополнительных углов (4 угла - база, каждый дополнительный +20%)
    const priceBeforeRounding = baseCost * (1 + (corners - 4) * 0.2);
    
    // Округляем вверх до сотен
    const finalPrice = Math.ceil(priceBeforeRounding / 100) * 100;
    
    return finalPrice;
}

function updatePriceDisplay() {
    const width = window.innerWidth > 960 ? 
        document.getElementById('widthSlider').value : 
        document.getElementById('mobileWidthSlider').value;
    
    const height = window.innerWidth > 960 ? 
        document.getElementById('heightSlider').value : 
        document.getElementById('mobileHeightSlider').value;
    
    const corners = window.innerWidth > 960 ? 
        document.getElementById('angleSlider').value : 
        document.getElementById('mobileAngleSlider').value;
    
    const price = calculateCanvasPrice(width, height, corners);
    const formattedPrice = new Intl.NumberFormat('ru-RU').format(price);
    
    // Дебаг-логи
    console.log('Current price:', { width, height, corners, price });
    
    // Обновляем оба блока
    document.getElementById('priceValue').textContent = formattedPrice + ' ₽';
    document.getElementById('mobilePriceValue').textContent = formattedPrice + ' ₽';

    localStorage.setItem('canvasPrice', price);
}