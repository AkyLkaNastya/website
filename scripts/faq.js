// Анимация вопросов-ответов
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Анимация конверта
const envelopeIcon = document.getElementById('envelopeIcon');
const contactForm = document.getElementById('contactForm');

envelopeIcon.addEventListener('click', () => {
    contactForm.classList.toggle('active');
    envelopeIcon.textContent = contactForm.classList.contains('active') ? '✉️' : '✉️';
});