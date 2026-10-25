javascript
// Гарантируем, что скрипт сработает только ПОСЛЕ полной загрузки структуры страницы
window.addEventListener("load", function () {
    
    // --- Плавный скролл для меню навигации ---
    (function () {
        var root = document.getElementById('oblozhka');
        if (!root) return;
        var links = root.querySelectorAll('a[href^="#"]');
        Array.prototype.forEach.call(links, function (link) {
            link.addEventListener('click', function (event) {
                var hash = link.getAttribute('href');
                if (!hash || hash.length < 2) return;
                var target = document.querySelector(hash);
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    })();

    // --- Интерактивная галерея квартир (Lightbox) ---
    (function () {
        var root = document.getElementById('katalog');
        if (!root) return;
        var lb = root.querySelector('#vb-x9c-lb');
        if (!lb) return;
        var imgEl = lb.querySelector('.vb-x9c__lb-img');
        var titleEl = lb.querySelector('.vb-x9c__lb-title');
        var counterEl = lb.querySelector('.vb-x9c__lb-counter');
        var closeBtn = lb.querySelector('.vb-x9c__lb-close');
        var prevBtn = lb.querySelector('.vb-x9c__lb-prev');
        var nextBtn = lb.querySelector('.vb-x9c__lb-next');
        var veil = lb.querySelector('.vb-x9c__lb-veil');
        var cards = root.querySelectorAll('.vb-x9c__card');
        var photos = [];
        var index = 0;
        var isOpen = false;

        function render() {
            var item = photos[index];
            if (!item) return;
            imgEl.src = item.src;
            imgEl.alt = item.alt;
            counterEl.textContent = (index + 1) + ' / ' + photos.length;
        }

        function openLb() {
            if (!photos.length) return;
            isOpen = true;
            lb.classList.add('is-open');
            render();
        }

        function hideLb() {
            isOpen = false;
            lb.classList.remove('is-open');
        }

        function move(step) {
            if (photos.length < 2) return;
            index = (index + step + photos.length) % photos.length;
            render();
        }

        Array.prototype.forEach.call(cards, function (card) {
            card.addEventListener('click', function (event) {
                if (event.target && event.target.closest && event.target.closest('a')) return;
                var media = card.querySelector('.vb-x9c__media');
                var addr = card.querySelector('.vb-x9c__addr');
                var collected = [];
                if (media) {
                    Array.prototype.forEach.call(media.querySelectorAll('img'), function (node) {
                        collected.push({ src: node.src, alt: node.alt || '' });
                    });
                }
                if (!collected.length) return;
                photos = collected;
                index = 0;
                titleEl.textContent = addr ? addr.textContent.trim() : '';
                openLb();
            });
        });

        if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); move(-1); });
        if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); move(1); });
        if (closeBtn) closeBtn.addEventListener('click', hideLb);
        if (veil) veil.addEventListener('click', hideLb);

        document.addEventListener('keydown', function (event) {
            if (!isOpen) return;
            if (event.key === 'Escape') hideLb();
            else if (event.key === 'ArrowLeft') move(-1);
            else if (event.key === 'ArrowRight') move(1);
        });
    })();

    // --- Логика появления и работы кнопки "Наверх" ---
    (function() {
        var btn = document.getElementById('vibeScrollTop');
        if (!btn) return;
        
        // Отслеживаем скролл страницы
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                btn.classList.add('is-visible');
            } else {
                btn.classList.remove('is-visible');
            }
        });
        
        // Клик по кнопке плавно перемещает в самый верх
        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    })();
});
