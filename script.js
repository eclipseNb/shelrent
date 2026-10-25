document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('vibeScrollTop');
    if (!btn) return;

    // Показываем кнопку при прокрутке ниже 400px
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            btn.classList.add('is-visible');
        } else {
            btn.classList.remove('is-visible');
        }
    });

    // Плавный скролл наверх при клике на летающую кнопку
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Плавный переход по ссылкам меню шапки
    var menuLinks = document.querySelectorAll('.header-container a[href^="#"]');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
