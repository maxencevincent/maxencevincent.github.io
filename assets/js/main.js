(function(){
  // Scrollspy only (no theme toggle)
  window.addEventListener('DOMContentLoaded', () => {
    const links = [...document.querySelectorAll('nav a[href^="#"]')];
    const targets = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = '#' + entry.target.id;
        const link = links.find(a => a.getAttribute('href') === id);
        if (link) link.setAttribute('aria-current', entry.isIntersecting ? 'true' : 'false');
      });
    }, { rootMargin: "-30% 0px -55% 0px", threshold: 0.1 });
    targets.forEach(t => io.observe(t));

    // Overlay viewer with high-contrast captions
    const overlay = document.getElementById('overlay');
    const media = document.getElementById('overlay-media');
    const caption = document.getElementById('overlay-caption');
    const closeBtn = document.getElementById('overlay-close');

    window.openOverlay = (el) => {
      if (!overlay || !media) return;
      media.innerHTML = '';
      let node;
      if (el.tagName === 'IMG') {
        node = document.createElement('img'); node.src = el.src; node.alt = el.alt || '';
      } else if (el.tagName === 'VIDEO') {
        node = document.createElement('video');
        node.src = el.src; node.autoplay = true; node.muted = true; node.loop = true; node.controls = true; node.preload = 'none';
      }
      media.appendChild(node);
      const title = el.dataset.title || '';
      const text = el.dataset.caption || el.alt || '';
      caption.innerHTML = title ? `<h3>${title}</h3><p>${text}</p>` : `<p>${text}</p>`;
      overlay.style.display = 'flex';
      overlay.classList.add('visible');
    };

    const closeOverlay = () => {
      overlay.classList.remove('visible');
      overlay.style.display = 'none';
      media.innerHTML = '';
      caption.textContent = '';
    };
    if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
    overlay && overlay.addEventListener('click', (e) => { if (e.target === overlay) closeOverlay(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeOverlay(); });
  });
})();