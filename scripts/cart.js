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
    
    // Добавляем стоимость портрета
    const portraitStyle = localStorage.getItem('portraitStyle');
    const materialSelect = document.getElementById('materialSelect');
    const portraitMaterial = materialSelect?.options[materialSelect.selectedIndex]?.text;
    
    if (portraitStyle) {
        total += getPortraitPrice(portraitStyle, portraitMaterial);
    }
    
     // Добавляем стоимость холста или альтернативного материала
    const alternativeMaterial = document.querySelector('input[name="alternativeMaterial"]:checked');
    if (!alternativeMaterial) {
        const canvasWidth = localStorage.getItem('canvasWidth');
        if (canvasWidth) {
            total += getCanvasPrice(canvasWidth);
        }
    } else {
        total += getAlternativeMaterialPrice(alternativeMaterial.value);
    }
    
    // Добавляем стоимость подарочной упаковки
    const giftWrapPrice = document.getElementById('giftWrapPrice').textContent;
    if (giftWrapPrice !== 'Бесплатно') {
        total += parseInt(giftWrapPrice);
    }
    
    // Обновляем отображение
    document.getElementById('totalPrice').textContent = `${total} ₽`;
}

function getCanvasPrice(width) {
    // Пример расчета цены: базовая стоимость + цена за см²
    const basePrice = 500;
    const pricePerCm = 10;
    return basePrice + (width * pricePerCm);
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

// Вспомогательные функции для расчета цены
function getPortraitPrice(style) {
    // Здесь должна быть логика определения цены по стилю
    // Пока возвращаем примерные значения
    const prices = {
        'Одной линией': 800,
        'Скетч': 800,
        'Векторный': 1500,
        'Love is...': 1500,
        'Комикс': 1500,
        'Стилизованный': 1500,
        'Портрет питомца': 1500,
        'Белым карандашом': 2000,
        'Акцентный': 2000,
        'Шарж': 2000,
        'Портрет': 2000,
        'Восстановление ЧБ фото': 2500,
        'Неоновый': 3000,
        'В образе': 3000,
    };
    
    return prices[style] || 0;
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
});

document.getElementById('commentField').addEventListener('input', function() {
    localStorage.setItem('comment', this.value);
});

document.querySelectorAll('input[name="alternativeMaterial"]').forEach(input => {
    input.addEventListener('change', function() {
        localStorage.setItem('selectedMaterial', this.value);
    });
});

document.getElementById('saveCart').addEventListener('click', function() {
    const cartData = {
        peopleCount: document.getElementById('peopleCount').value,
        hasPet: document.getElementById('hasPet').checked,
        comment: document.getElementById('commentField').value,
        wrapType: document.getElementById('giftWrapPrice').textContent
    };
    localStorage.setItem('cartData', JSON.stringify(cartData));
    alert('Данные сохранены!');
});

// ==================== Отправка заказа ====================================

document.querySelector('.checkout-button').addEventListener('click', function() {
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
    
    // Отправка на почту (используем Formspree или аналогичный сервис)
    sendOrderEmail(orderData);
});

function sendOrderEmail(orderData) {
    const formData = new FormData();
    const photoFile = document.getElementById('photoInput').files[0];
    
    // Добавляем текстовые данные
    formData.append('_subject', `Новый заказ от ${orderData.client.name}`);
    formData.append('name', orderData.client.name);
    formData.append('phone', orderData.client.phone);
    formData.append('email', orderData.client.email);
    formData.append('message', formatOrderMessage(orderData));
    
    // Добавляем файл фото, если есть
    if (photoFile) {
        formData.append('photo', photoFile);
    }
    
    // Отправка через Formspree
    fetch('https://formspree.io/f/meogwkvz', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            alert('Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');
            document.getElementById('orderModal').style.display = 'none';
        } else {
            throw new Error('Ошибка отправки заказа');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.');
    });
}

function formatOrderMessage(orderData) {
    const savedData = JSON.parse(localStorage.getItem('cartData'));
    const photoFile = document.getElementById('photoInput').files[0];
    
    let message = `🎨 НОВЫЙ ЗАКАЗ 🎨\n\n`;
    message += `👤 Клиент:\n`;
    message += `- Имя: ${orderData.client.name}\n`;
    message += `- Телефон: ${orderData.client.phone}\n`;
    message += `- Email: ${orderData.client.email}\n\n`;
    
    message += `🖼️ Портрет:\n`;
    message += `- Стиль: ${orderData.portrait.style || 'Не выбран'}\n`;
    message += `- Материал: ${orderData.portrait.material || 'Не выбран'}\n`;
    message += `- Людей: ${savedData.peopleCount || 1}\n`;
    message += `- Питомец: ${savedData.hasPet ? 'Да' : 'Нет'}\n\n`;
    
    if (orderData.canvas.width) {
        message += `🖌️ Холст:\n`;
        message += `- Размер: ${orderData.canvas.width} × ${orderData.canvas.height} см\n`;
        message += `- Углы: ${orderData.canvas.corners}\n\n`;
    }
    
    if (orderData.alternativeMaterial) {
        message += `📌 Альтернативный материал: ${orderData.alternativeMaterial}\n\n`;
    }
    
    message += `💌 Пожелания:\n${savedData.comment || 'Не указано'}\n\n`;
    message += `🎁 Обёртка: ${savedData.wrapType || 'Стандартная'}\n\n`;
    message += `💰 Стоимость: ${orderData.totalPrice}\n\n`;
    message += `📅 Дата: ${new Date().toLocaleString('ru-RU')}\n\n`;
    message += `📸 Фото: ${photoFile ? photoFile.name : 'Не загружено'}`;
    
    return message;
}