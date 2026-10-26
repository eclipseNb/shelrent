javascript
window.addEventListener("load", function () {
    
    // --- Навигация по якорям ---
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

    // --- Кнопка "Наверх" (Пункт 3) ---
    (function() {
        var btn = document.getElementById('vibeScrollTop');
        if (!btn) return;
        
        window.addEventListener('scroll', function() {
            // Реагирует на скролл более 250px
            if (window.pageYOffset > 250) {
                btn.classList.add('is-visible');
            } else {
                btn.classList.remove('is-visible');
            }
        });
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    })();

    // --- Лайтбокс галереи ---
    (function () {
        var root = document.getElementById('katalog');
        if (!root) return;
        var lb = root.querySelector('#vb-x9c-lb');
        if (!lb) return;
        var imgEl = lb.querySelector('.vb-x9c__lb-img');
        var titleEl = lb.querySelector('.vb-x9c__lb-title');
        var closeBtn = lb.querySelector('.vb-x9c__lb-close');
        var veil = lb.querySelector('.vb-x9c__lb-veil');
        var cards = root.querySelectorAll('.vb-x9c__card');
        var photos = [];
        var index = 0;

        function render() {
            var item = photos[index];
            if (!item) return;
            imgEl.src = item.src;
        }

        Array.prototype.forEach.call(cards, function (card) {
            card.addEventListener('click', function (event) {
                if (event.target && event.target.closest('a')) return;
                var media = card.querySelector('.vb-x9c__media');
                var addr = card.querySelector('.vb-x9c__addr');
                var collected = [];
                if (media) {
                    Array.prototype.forEach.call(media.querySelectorAll('img'), function (node) {
                        collected.push({ src: node.src });
                    });
                }
                if (!collected.length) return;
                photos = collected;
                index = 0;
                titleEl.textContent = addr ? addr.textContent.trim() : '';
                lb.classList.add('is-open');
                render();
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', function() { lb.classList.remove('is-open'); });
        if (veil) veil.addEventListener('click', function() { lb.classList.remove('is-open'); });
    })();
});
