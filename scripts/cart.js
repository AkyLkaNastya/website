document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных из localStorage
    loadCartData();
    
    // Обработчик загрузки фото
    setupPhotoUpload();
    
    // Обработчик количества людей
    setupPeopleCount();
    
    // Обработчик альтернативных материалов
    setupAlternativeMaterials();
    
    // Обработчик комментариев
    setupCommentField();
    
    // Обновление итоговой стоимости
    updateTotalPrice();
});

function loadCartData() {
    // Загрузка данных о портрете
    const portraitStyle = localStorage.getItem('portraitStyle');
    const portraitMaterial = localStorage.getItem('portraitMaterial');
    
    if (portraitStyle) {
        document.getElementById('portraitStyle').textContent = portraitStyle;
    }
    
    if (portraitMaterial) {
        document.getElementById('portraitMaterial').textContent = portraitMaterial;
    }
    
    // Загрузка данных о холсте
    const canvasWidth = localStorage.getItem('canvasWidth');
    const canvasHeight = localStorage.getItem('canvasHeight');
    const canvasCorners = localStorage.getItem('canvasCorners');
    
    if (canvasWidth && canvasHeight) {
        document.getElementById('canvasSize').textContent = `${canvasWidth} × ${canvasHeight} см`;
    }
    
    if (canvasCorners) {
        document.getElementById('canvasCorners').textContent = canvasCorners;
    }
}

// Загрузка фото
function setupPhotoUpload() {
    const photoInput = document.getElementById('photoInput');
    const uploadBox = document.getElementById('uploadBox');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    const removePhoto = document.getElementById('removePhoto');
    
    photoInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                previewImage.src = event.target.result;
                uploadBox.style.display = 'none';
                uploadPreview.style.display = 'block';
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    removePhoto.addEventListener('click', function() {
        photoInput.value = '';
        uploadBox.style.display = 'flex';
        uploadPreview.style.display = 'none';
    });
}

// Количество людей на портрете
function setupPeopleCount() {
    const peopleCount = document.getElementById('peopleCount');
    const peopleCountValue = document.getElementById('peopleCountValue');
    
    peopleCount.addEventListener('input', function() {
        peopleCountValue.textContent = this.value;
        updateTotalPrice();
    });
}

// Выбор альтернативной основы
function setupAlternativeMaterials() {
    const alternativeMaterials = document.querySelectorAll('input[name="alternativeMaterial"]');
    const canvasItem = document.getElementById('canvasItem');
    
    alternativeMaterials.forEach(material => {
        material.addEventListener('change', function() {
            if (this.checked) {
                // Снимаем выбор с других материалов
                alternativeMaterials.forEach(m => {
                    if (m !== this) m.checked = false;
                });
                canvasItem.style.opacity = '0.5';
            } else {
                canvasItem.style.opacity = '1';
            }
            updateTotalPrice();
        });
    });
}

// Поле для комментариев
function setupCommentField() {
    const commentField = document.getElementById('commentField');
    const placeholder = document.querySelector('.comment-placeholder');
    
    // Инициализация при загрузке
    if (commentField.value.trim() !== '') {
        placeholder.style.opacity = '0';
    }
    
    commentField.addEventListener('input', function() {
        placeholder.style.opacity = this.value.trim() !== '' ? '0' : '0.7';
    });
}

function updateTotalPrice() {
    // Здесь будет логика расчета стоимости
    // Пока просто пример
    let total = 0;
    
    // Добавляем стоимость портрета (пример)
    const portraitStyle = localStorage.getItem('portraitStyle');
    if (portraitStyle) {
        total += getPortraitPrice(portraitStyle);
    }
    
    // Добавляем стоимость холста (если выбран)
    const alternativeMaterial = document.querySelector('input[name="alternativeMaterial"]:checked');
    if (!alternativeMaterial) {
        const canvasWidth = localStorage.getItem('canvasWidth');
        if (canvasWidth) {
            total += getCanvasPrice(canvasWidth);
        }
    } else {
        // Добавляем стоимость альтернативного материала
        total += getAlternativeMaterialPrice(alternativeMaterial.value);
    }
    
    // Добавляем стоимость подарочной упаковки
    const giftWrap = document.getElementById('giftWrap');
    if (giftWrap.checked) {
        total += 500;
    }
    
    // Обновляем отображение
    document.getElementById('totalPrice').textContent = `${total} р`;
}

// Вспомогательные функции для расчета цены
function getPortraitPrice(style) {
    // Здесь должна быть логика определения цены по стилю
    // Пока возвращаем примерные значения
    const prices = {
        'Одной линией': 800,
        'Белым карандашом': 2000,
        'Портрет питомца': 1500,
        'В образе': 3000,
        'Векторный': 1500,
        'Шарж': 2000,
        'Восстановление ЧБ фото': 2500,
        'Скетч': 800,
        'Акцентный': 2000,
        'Неоновый': 200,
        'Love is...': 1500,
        'Комикс': 1500,
        'Стилизованный': 1500,
        'Готовое фото': 150
    };
    
    return prices[style] || 0;
}

function getCanvasPrice(width) {
    // Примерная логика расчета цены холста по ширине
    return width * 10;
}

function getAlternativeMaterialPrice(material) {
    // Примерные цены для альтернативных материалов
    const prices = {
        'jeton': 500,
        'tshirt': 1000,
        'banner': 1500,
        'sticker': 300,
        'sign': 800
    };
    
    return prices[material] || 0;
}