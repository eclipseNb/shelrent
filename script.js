javascript
document.addEventListener("DOMContentLoaded", function () {
    
    // --- Плавный скролл для навигации ---
    (function () {
        var root = document.getElementById('oblozhka');
        if (!root) return;
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var links = root.querySelectorAll('a[href^="#"]');
        Array.prototype.forEach.call(links, function (link) {
            link.addEventListener('click', function (event) {
                var hash = link.getAttribute('href');
                if (!hash || hash.length < 2) return;
                var target = document.querySelector(hash);
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
            });
        });
    })();

    // --- Интерактивная галерея (Лайтбокс) ---
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
        var opener = null;
        var isOpen = false;
        var prevOverflow = '';

        function render() {
            var item = photos[index];
            if (!item) return;
            imgEl.src = item.src;
            imgEl.alt = item.alt;
            counterEl.textContent = (index + 1) + ' / ' + photos.length;
            var many = photos.length > 1;
            prevBtn.style.display = many ? '' : 'none';
            nextBtn.style.display = many ? '' : 'none';
        }

        function openLb() {
            if (!photos.length) return;
            isOpen = true;
            prevOverflow = document.documentElement.style.overflow;
            document.documentElement.style.overflow = 'hidden';
            lb.classList.add('is-open');
            lb.setAttribute('aria-hidden', 'false');
            render();
            closeBtn.focus();
        }

        function hideLb() {
            if (!isOpen) return;
            isOpen = false;
            lb.classList.remove('is-open');
            lb.setAttribute('aria-hidden', 'true');
            document.documentElement.style.overflow = prevOverflow;
            if (opener) { try { opener.focus(); } catch (err) {} }
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
                        collected.push({ src: node.currentSrc || node.src, alt: node.alt || '' });
                    });
                }
                if (!collected.length) return;
                photos = collected;
                index = 0;
                var thumb = event.target && event.target.closest ? event.target.closest('.vb-x9c__thumb') : null;
                if (thumb && thumb.parentNode) {
                    var kids = Array.prototype.slice.call(thumb.parentNode.children);
                    var pos = kids.indexOf(thumb);
                    if (pos > -1) index = pos + 1;
                }
                if (index > photos.length - 1) index = 0;
                titleEl.textContent = addr ? addr.textContent.trim() : '';
                opener = card.querySelector('.vb-x9c__main') || card;
                openLb();
            });
        });

        prevBtn.addEventListener('click', function () { move(-1); });
        nextBtn.addEventListener('click', function () { move(1); });
        closeBtn.addEventListener('click', hideLb);
        veil.addEventListener('click', hideLb);

        document.addEventListener('keydown', function (event) {
            if (!isOpen) return;
            if (event.key === 'Escape') { hideLb(); }
            else if (event.key === 'ArrowLeft') { move(-1); }
            else if (event.key === 'ArrowRight') { move(1); }
        });
    })();

    // --- Кнопка скролла "Наверх" ---
    (function() {
        var btn = document.getElementById('vibeScrollTop');
        if (!btn) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                btn.classList.add('is-visible');
            } else {
                btn.classList.remove('is-visible');
            }
        });
        
        btn.addEventListener('click', function() {
            var topElement = document.getElementById('oblozhka');
            if (topElement) {
                topElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    })();
});
