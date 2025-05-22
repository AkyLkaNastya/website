document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.order-button').forEach(button => {
        button.addEventListener('click', function() {
            const exhibitFrame = this.closest('.exhibit-frame');
            const materialType = exhibitFrame.querySelector('.exhibit-label').textContent.trim();
            
            // Сохраняем тип материала и его название
            localStorage.setItem('selectedMaterialType', materialType);
            localStorage.setItem('selectedMaterial', materialType); // Для совместимости
            
            // Очищаем данные о холсте
            localStorage.removeItem('canvasWidth');
            localStorage.removeItem('canvasHeight');
            localStorage.removeItem('canvasCorners');
            
            window.location.href = 'cart.html';
        });
    });
});