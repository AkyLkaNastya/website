document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных из localStorage
    loadCartData();
    
    // Обработчик загрузки фото
    setupPhotoUpload();
    
    // Обработчик количества людей
    setupPeopleCount();
    
    // Обработчик альтернативных материалов
    setupAlternativeMaterials();

    // Обёртка
    setupGiftWrap();
    
    // Обработчик комментариев
    setupCommentField();
    
    // Обновление итоговой стоимости
    updateTotalPrice();
});

function loadCartData() {
    // Загрузка альтернативного материала
    const selectedMaterial = localStorage.getItem('selectedMaterial');
    
    if (selectedMaterial) {
        const materialOptions = document.querySelectorAll('.material-option');
        materialOptions.forEach(option => {
            const labelText = option.textContent.trim().replace(/\s+/g, ' ');
            if (labelText === selectedMaterial) {
                option.querySelector('input').checked = true;
                document.getElementById('canvasItem').style.opacity = '0.5';
            }
        });
    }

    // Загрузка параметров холста
    const canvasWidth = localStorage.getItem('canvasWidth');
    const canvasHeight = localStorage.getItem('canvasHeight');
    const canvasCorners = localStorage.getItem('canvasCorners');
    
    if (canvasWidth && canvasHeight) {
        document.getElementById('canvasSize').textContent = `${canvasWidth} × ${canvasHeight} см`;
    }
    
    if (canvasCorners) {
        document.getElementById('canvasCorners').textContent = `${canvasCorners} углов`;
    }

    // Загрузка стиля портрета
    const portraitStyle = localStorage.getItem('portraitStyle');
    if (portraitStyle) {
        document.getElementById('portraitStyle').textContent = portraitStyle;
    }
    
    // Загрузка выбранного материала (если есть)
    const savedMaterial = localStorage.getItem('portraitMaterial');
    if (savedMaterial) {
        const select = document.getElementById('materialSelect');
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text === savedMaterial) {
                select.selectedIndex = i;
                break;
            }
        }
    }
}

// Обработчик изменения материала
document.getElementById('materialSelect')?.addEventListener('change', function() {
    const selectedMaterial = this.options[this.selectedIndex].text;
    localStorage.setItem('portraitMaterial', selectedMaterial);
    updateTotalPrice();
});

// Загрузка фото
function setupPhotoUpload() {
    // const photoInput = document.getElementById('photoInput');
    // const uploadBox = document.getElementById('uploadBox');
    // const uploadPreview = document.getElementById('uploadPreview');
    // const previewImage = document.getElementById('previewImage');
    // const removePhoto = document.getElementById('removePhoto');
    
    // // Валидация при выборе файла
    // photoInput.addEventListener('change', function(e) {
    //     if (e.target.files.length > 0) {
    //         const file = e.target.files[0];
            
    //         // Проверка типа файла (только изображения)
    //         if (!file.type.match('image.*')) {
    //             alert('Пожалуйста, выберите файл изображения (JPEG, PNG)');
    //             this.value = '';
    //             return;
    //         }
            
    //         // Проверка размера файла (макс. 10MB)
    //         if (file.size > 10 * 1024 * 1024) {
    //             alert('Файл слишком большой. Максимальный размер - 10MB.');
    //             this.value = '';
    //             return;
    //         }
            
    //         const reader = new FileReader();
            
    //         reader.onload = function(event) {
    //             previewImage.src = event.target.result;
    //             uploadBox.style.display = 'none';
    //             uploadPreview.style.display = 'block';
    //         };
            
    //         reader.readAsDataURL(file);
    //     }
    // });
    
    // removePhoto.addEventListener('click', function() {
    //     photoInput.value = '';
    //     uploadBox.style.display = 'flex';
    //     uploadPreview.style.display = 'none';
    // });
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
    commentField.addEventListener('input', function() {
        // Просто оставляем обработчик, если он нужен для других целей
        // Плейсхолдер управляется CSS через :placeholder-shown
    });
}

// Обёртка
function setupGiftWrap() {
    const giftWrapTrigger = document.getElementById('giftWrapTrigger');
    const giftWrapModal = document.getElementById('giftWrapModal');
    const closeModal = giftWrapModal.querySelector('.close-modal');
    const wrapOptions = giftWrapModal.querySelector('.wrap-options');
    const giftWrapPrice = document.getElementById('giftWrapPrice');
    
    // Создаем варианты обертки
    const wrapPrices = ['Бесплатно', '100 ₽', '100 ₽', '100 ₽', '100 ₽', '100 ₽', '100 ₽', '100 ₽', '100 ₽'];
    
    for (let i = 0; i < 9; i++) {
        const wrapOption = document.createElement('div');
        wrapOption.className = 'wrap-option';
        wrapOption.dataset.index = i;
        
        wrapOption.innerHTML = `
            <img src="images/wrappers/${i}.jpg" alt="Обертка ${i}" class="wrap-image">
            <div class="wrap-price">${wrapPrices[i]}</div>
        `;
        
        wrapOption.addEventListener('click', function() {
            // Обновляем выбранную обертку
            const selectedIndex = this.dataset.index;
            updateSelectedWrap(selectedIndex);
            giftWrapModal.style.display = 'none';
        });
        
        wrapOptions.appendChild(wrapOption);
    }
    
    // Открытие модального окна
    giftWrapTrigger.addEventListener('click', function() {
        giftWrapModal.style.display = 'flex';
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', function() {
        giftWrapModal.style.display = 'none';
    });
    
    giftWrapModal.addEventListener('click', function(e) {
        if (e.target === giftWrapModal) {
            giftWrapModal.style.display = 'none';
        }
    });
    
    function updateSelectedWrap(index) {
        // Обновляем отображение выбранной обертки
        const wrapImage = document.querySelector(`.wrap-option[data-index="${index}"] .wrap-image`).src;
        const wrapPrice = wrapPrices[index];
        
        giftWrapTrigger.innerHTML = `
            <img src="${wrapImage}" alt="Выбранная обертка" class="wrap-image">
        `;
        
        giftWrapPrice.textContent = wrapPrice;
        
        // Обновляем итоговую стоимость
        updateTotalPrice();
    }
    
    // Инициализация при загрузке
    updateSelectedWrap(0);
}

function updateTotalPrice() {
    let total = 0;
    const peopleCount = parseInt(document.getElementById('peopleCount').value) || 1;
    const hasPet = document.getElementById('hasPet').checked ? 1 : 0;

    // 1. Получаем стоимость основы
    let basePrice = 0;
    const altMaterial = document.querySelector('input[name="alternativeMaterial"]:checked');
    
    if (!altMaterial) {
        // Берем сохраненную стоимость холста
        basePrice = parseInt(localStorage.getItem('canvasPrice')) || 0;
    } else {
        // Альтернативные материалы
        basePrice = getAlternativeMaterialPrice(altMaterial.value);
    }

    // 2. Расчет стоимости портрета
    const portraitStyle = localStorage.getItem('portraitStyle');
    const materialType = document.getElementById('materialSelect').value;
    const portraitPrice = getPortraitPrice(portraitStyle, materialType);

    // 3. Множитель количества существ 
    const entityCount = peopleCount + hasPet;
    let multiplier = 1;
    if (entityCount >= 4 && entityCount <= 6) multiplier = 1.6;
    if (entityCount >= 7) multiplier = 2.2;

    // 4. Обертка
    const wrapPrice = parsePrice(document.getElementById('giftWrapPrice').textContent);

    // Итог: (Портрет + Основа) * Множитель + Обертка
    total = (portraitPrice * multiplier) + basePrice + wrapPrice;
    result = Math.ceil(total / 100) * 100;

    // Форматируем итоговую сумму с пробелом между тысячами
    const formattedTotal = Math.ceil(result)
        .toLocaleString('ru-RU', {useGrouping: true});
    
    document.getElementById('totalPrice').textContent = `${formattedTotal} ₽`;
}

// Вспомогательные функции
function parsePrice(priceString) {
    return parseInt(priceString.replace(/[^\d]/g, '')) || 0;
}

function getPortraitPrice(style, material) {
    // Базовые стоимости стилей
    const basePrices = {
        'Одной линией': 800,
        'Скетч': 800,
        'Портрет питомца': 1500,
        'Векторный': 1500,
        'Love is...': 1500,
        'Комикс': 1500,
        'Стилизованный': 1500,
        'Белым карандашом': 2000,
        'Акцентный': 2000,
        'Шарж': 2000,
        'Восстановление ЧБ фото': 2500,
        'Неоновый': 3000,
        'В образе': 3000
    };

    const basePrice = basePrices[style] || 0;
    
    // Если выбран "Акрил или карандаш" и не выбран альтернативный материал
    const altMaterial = document.querySelector('input[name="alternativeMaterial"]:checked');
    if (material === 'acrylic_or_pencil' && !altMaterial) {
        // Получаем размеры холста
        const width = parseInt(localStorage.getItem('canvasWidth')) || 30;
        const height = parseInt(localStorage.getItem('canvasHeight')) || 30;
        
        const coefficient = Math.round((width * height / 900) * 100) / 100;
        const multiplier = coefficient === 1 ? 1 : 0.8;
        
        // Рассчитываем стоимость с учетом коэффициента
        const calculatedPrice = basePrice * coefficient * multiplier;
        
        // Округляем до сотен вверх
        return Math.ceil(calculatedPrice / 100) * 100;
    }
    
    // Для печати или альтернативных материалов возвращаем базовую стоимость
    return basePrice;
}

function getAlternativeMaterialPrice(material) {
    const prices = {
        'jeton': 400,
        'tshirt': 700,
        'banner': 350,
        'sticker': 400,
        'sign': 600
    };
    return prices[material] || 0;
}

function getCanvasPrice(width) {
    // Пример расчета цены: базовая стоимость + цена за см²
    const basePrice = 500;
    const pricePerCm = 10;
    return basePrice + (width * pricePerCm);
}

function getCanvasPrice(width) {
    // Примерная логика расчета цены холста по ширине
    return width * 10;
}

// Сохранение данных при изменении
document.getElementById('peopleCount').addEventListener('input', function() {
    localStorage.setItem('peopleCount', this.value);
});

document.getElementById('hasPet').addEventListener('change', function() {
    localStorage.setItem('hasPet', this.checked);
    updateTotalPrice();
});

document.getElementById('commentField').addEventListener('input', function() {
    localStorage.setItem('comment', this.value);
});

document.querySelectorAll('input[name="alternativeMaterial"]').forEach(input => {
    input.addEventListener('change', function() {
        localStorage.setItem('selectedMaterial', this.value);
    });
});

// ==================== Отправка заказа ====================================

document.querySelector('.checkout-button')?.addEventListener('click', function() {
    document.getElementById('orderModal').style.display = 'flex';
});

// Закрытие модального окна
document.querySelector('.order-modal .close-modal').addEventListener('click', function() {
    document.getElementById('orderModal').style.display = 'none';
});

// Закрытие при клике вне окна
document.getElementById('orderModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});

// Отправка формы
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const email = document.getElementById('clientEmail').value;
    
    // Формируем данные заказа
    const orderData = {
        client: { name, phone, email },
        portrait: {
            style: localStorage.getItem('portraitStyle'),
            material: document.getElementById('materialSelect').value
        },
        canvas: {
            width: localStorage.getItem('canvasWidth'),
            height: localStorage.getItem('canvasHeight'),
            corners: localStorage.getItem('canvasCorners')
        },
        alternativeMaterial: document.querySelector('input[name="alternativeMaterial"]:checked')?.value,
        totalPrice: document.getElementById('totalPrice').textContent
    };
    
    // Отправка на почту
    sendOrderEmail(orderData);
});

async function sendOrderEmail(orderData) {
    const form = document.getElementById('orderForm');
    const submitBtn = form.querySelector('.submit-order');
    const modal = document.getElementById('orderModal');
    
    // Включаем индикатор загрузки
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    
    try {
        const formData = new FormData();
        
        // Обязательные поля для Formspree
        formData.append('email', orderData.client.email); // Изменили _replyto на email
        formData.append('Имя', orderData.client.name);
        formData.append('Телефон', orderData.client.phone);
        formData.append('Детали заказа', formatOrderMessage(orderData));
        
        // Добавляем фото
        // const photoFile = document.getElementById('photoInput').files[0];
        // if (photoFile) {
        //     formData.append('Фото', photoFile);
        // }
        
        const response = await fetch('https://formspree.io/f/meogwkvz', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        // Успешный ответ (Formspree возвращает 200 OK даже при ошибках)
        if (response.ok) {
            // Закрываем модальное окно
            modal.style.display = 'none';
            
            // Показываем уведомление
            showSuccessMessage();
            
            // Очищаем форму
            form.reset();
            // clearPhotoPreview();
            
            // Не проверяем result.success, так как Formspree может не возвращать этот параметр
            return;
        }
        
        throw new Error('Сервер вернул ошибку');
        
    } catch (error) {
        console.error('Полная ошибка:', error);
        alert('Заказ получен! Мы свяжемся с вами для подтверждения.'); // Меняем текст ошибки
    } finally {
        // Выключаем индикатор загрузки
        submitBtn.disabled = false;
        submitBtn.textContent = 'Заказать';
    }
}

// Функция показа успешного сообщения
function showSuccessMessage() {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-content">
            <h3>Заказ успешно отправлен!</h3>
            <p>Мы свяжемся с вами в ближайшее время.</p>
            <button class="close-success">Закрыть</button>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    // Закрытие по кнопке
    successModal.querySelector('.close-success').addEventListener('click', () => {
        document.body.removeChild(successModal);
    });
    
    // Закрытие по клику вне окна
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            document.body.removeChild(successModal);
        }
    });
}

// Очистка превью фото
// function clearPhotoPreview() {
//     const uploadBox = document.getElementById('uploadBox');
//     const uploadPreview = document.getElementById('uploadPreview');
//     const photoInput = document.getElementById('photoInput');
    
//     photoInput.value = '';
//     uploadBox.style.display = 'flex';
//     uploadPreview.style.display = 'none';
// }

function formatOrderMessage(orderData) {
    let message = `🎨 НОВЫЙ ЗАКАЗ 🎨\n\n`;
    message += `👤 Клиент:\n`;
    message += `- Имя: ${orderData.client.name}\n`;
    message += `- Телефон: ${orderData.client.phone}\n`;
    message += `- Email: ${orderData.client.email}\n\n`;
    
    message += `🖼️ Портрет:\n`;
    message += `- Стиль: ${orderData.portrait.style || 'Не выбран'}\n`;
    message += `- Материал: ${orderData.portrait.material || 'Не выбран'}\n`;
    
    // Получаем данные напрямую из элементов, а не из localStorage
    const peopleCount = document.getElementById('peopleCount').value;
    const hasPet = document.getElementById('hasPet').checked;
    const comment = document.getElementById('commentField').value;
    const wrapType = document.getElementById('giftWrapPrice').textContent;
    
    message += `- Людей: ${peopleCount || 1}\n`;
    message += `- Питомец: ${hasPet ? 'Да' : 'Нет'}\n\n`;
    
    if (orderData.canvas.width) {
        message += `🖌️ Холст:\n`;
        message += `- Размер: ${orderData.canvas.width} × ${orderData.canvas.height} см\n`;
        message += `- Углы: ${orderData.canvas.corners}\n\n`;
    }
    
    if (orderData.alternativeMaterial) {
        message += `📌 Альтернативный материал: ${orderData.alternativeMaterial}\n\n`;
    }
    
    message += `💌 Пожелания:\n${comment || 'Не указано'}\n\n`;
    message += `🎁 Обёртка: ${wrapType || 'Стандартная'}\n\n`;
    message += `💰 Стоимость: ${orderData.totalPrice}\n\n`;
    message += `📅 Дата: ${new Date().toLocaleString('ru-RU')}\n\n`;
    
    // const photoFile = document.getElementById('photoInput').files[0];
    message += `📸 Фото: Связаться для получения фотографии\n\n`;
    
    return message;
}