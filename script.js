'use strict';

(() => {
  const properties = window.PROPERTIES || [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const grid = document.getElementById('property-grid');
  const dialog = document.getElementById('property-dialog');
  const galleryImage = document.getElementById('dialog-image');
  let selectedProperty = null;
  let galleryIndex = 0;
  let galleryLoad = 0;
  let dialogTrigger = null;

  // Listing facts remain visible on touch screens; hover adds a preview cue.
  grid.innerHTML = properties.map((property, index) => `
    <article class="property-card reveal" style="--reveal-delay:${index * 0.09}s">
      <button class="property-photo-button" type="button" data-property="${escapeHTML(property.id)}" aria-label="Explore ${escapeHTML(property.address)}, ${escapeHTML(property.city)} — ${money(property.price)}" aria-haspopup="dialog">
        <img src="${escapeHTML(property.photos[0].src)}" alt="${escapeHTML(property.photos[0].alt)}" width="960" height="850" loading="lazy" decoding="async">
        <span class="property-gradient"></span><span class="property-tag">${escapeHTML(property.type)}</span>
        <span class="property-hover">Take a closer look</span>
        <span class="property-price"><small>ASKING PRICE</small>${money(property.price)}</span>
        <span class="property-open" aria-hidden="true">↗</span>
      </button>
      <div class="property-info"><p class="property-location">${escapeHTML(property.city)}, ${escapeHTML(property.stateName)}</p>
        <h3 class="property-title"><button type="button" data-property="${escapeHTML(property.id)}" aria-haspopup="dialog">${escapeHTML(property.address)}</button></h3>
        <p class="property-facts">${escapeHTML(property.facts)}</p>
        <div class="property-bottom"><span>Make room for what’s next.</span><a href="${escapeHTML(property.url)}" class="zillow-link" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHTML(property.address)} on Zillow (opens in a new tab)">View on Zillow <span aria-hidden="true">↗</span></a></div>
      </div>
    </article>`).join('');

  document.getElementById('property-count').textContent = `${properties.length} ${properties.length === 1 ? 'property' : 'properties'} to explore`;
  document.getElementById('listing-date').textContent = `Prices checked ${window.LISTING_UPDATED}. Confirm availability on Zillow.`;
  document.getElementById('year').textContent = new Date().getFullYear();
  if (properties.length) {
    const featured = properties[0];
    const heroPhoto = featured.photos[1] || featured.photos[0];
    document.getElementById('hero-image').src = heroPhoto.src;
    document.getElementById('hero-image').alt = heroPhoto.alt;
    document.getElementById('hero-location').textContent = `${featured.city}, ${featured.stateName}`;
    document.getElementById('hero-property-detail').textContent = `${featured.facts} · ${money(featured.price)}`;
  }

  // Native dialog provides keyboard focus containment and Escape handling.
  function showPhoto() {
    if (!selectedProperty) return;
    const property = selectedProperty;
    const photo = property.photos[galleryIndex];
    const requestId = ++galleryLoad;
    const nextImage = new Image();
    nextImage.onload = () => {
      if (requestId !== galleryLoad) return;
      galleryImage.src = photo.src;
      galleryImage.alt = photo.alt;
    };
    nextImage.onerror = () => {
      if (requestId !== galleryLoad) return;
      galleryImage.src = property.photos[0].src;
      galleryImage.alt = property.photos[0].alt;
      document.getElementById('gallery-position').textContent = 'Photo unavailable';
    };
    nextImage.src = photo.src;
    document.getElementById('gallery-position').textContent = `${galleryIndex + 1} / ${property.photos.length}`;
    document.getElementById('gallery-prev').disabled = property.photos.length < 2;
    document.getElementById('gallery-next').disabled = property.photos.length < 2;
  }
  function movePhoto(direction) {
    if (!selectedProperty) return;
    galleryIndex = (galleryIndex + direction + selectedProperty.photos.length) % selectedProperty.photos.length;
    showPhoto();
  }
  function openProperty(id, trigger) {
    const property = properties.find(item => item.id === id);
    if (!property) return;
    selectedProperty = property;
    galleryIndex = 0;
    dialogTrigger = trigger;
    galleryImage.src = property.photos[0].src;
    galleryImage.alt = property.photos[0].alt;
    document.getElementById('dialog-location').textContent = `${property.city}, ${property.stateName} / ${property.type}`;
    document.getElementById('dialog-title').textContent = property.address;
    document.getElementById('dialog-price').textContent = money(property.price);
    document.getElementById('dialog-facts').textContent = property.facts;
    document.getElementById('dialog-description').textContent = property.description;
    document.getElementById('dialog-zillow').href = property.url;
    document.getElementById('dialog-zillow').setAttribute('aria-label', `View ${property.address} on Zillow (opens in a new tab)`);
    document.getElementById('dialog-email').href = `mailto:romanpapadopoulos1@gmail.com?subject=${encodeURIComponent(`Question about ${property.address}, ${property.city}`)}`;
    showPhoto();
    dialog.showModal();
    dialog.querySelector('.dialog-scroll').scrollTop = 0;
    document.body.classList.add('modal-open');
    dialog.querySelector('.dialog-close').focus({ preventScroll: true });
  }
  grid.addEventListener('click', event => {
    const trigger = event.target.closest('[data-property]');
    if (trigger) openProperty(trigger.dataset.property, trigger);
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  let backdropPointerDown = false;
  dialog.addEventListener('pointerdown', event => {
    const bounds = dialog.getBoundingClientRect();
    backdropPointerDown = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (backdropPointerDown && outside) dialog.close();
    backdropPointerDown = false;
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    galleryLoad++;
    dialogTrigger?.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); movePhoto(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); movePhoto(1); }
  });
  document.getElementById('gallery-prev').addEventListener('click', () => movePhoto(-1));
  document.getElementById('gallery-next').addEventListener('click', () => movePhoto(1));

  // Collection scroll controls on smaller screens.
  const previous = document.querySelector('[data-scroll="-1"]');
  const next = document.querySelector('[data-scroll="1"]');
  function updateCollectionControls() {
    previous.disabled = grid.scrollLeft <= 2;
    next.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 3;
  }
  [previous, next].forEach(button => button.addEventListener('click', () => {
    const card = grid.querySelector('.property-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(grid).gap) || 18;
    grid.scrollBy({ left: (card.getBoundingClientRect().width + gap) * Number(button.dataset.scroll), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }));
  grid.addEventListener('scroll', updateCollectionControls, { passive: true });
  window.addEventListener('resize', updateCollectionControls, { passive: true });
  updateCollectionControls();

  // Mobile navigation and lightweight section reveals.
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  function closeMenu() {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
  menuButton.addEventListener('click', () => {
    const opening = mobileNav.hidden;
    mobileNav.hidden = !opening;
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
  });
  mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
  });
  window.matchMedia('(min-width: 921px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.replace('reveal-ready', 'reveal-visible');
      observer.unobserve(entry.target);
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => { element.classList.add('reveal-ready'); observer.observe(element); });
    reducedMotion.addEventListener('change', event => {
      if (!event.matches) return;
      observer.disconnect();
      document.querySelectorAll('.reveal-ready').forEach(element => element.classList.remove('reveal-ready'));
    });
  }

  // A successful HTTP response alone does not confirm delivery: check provider success.
  document.querySelectorAll('[data-offer-form]').forEach(form => {
    let sending = false;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (sending || !form.reportValidity()) return;
      const data = new FormData(form);
      if (String(data.get('_honey') || '').trim()) return;
      const button = form.querySelector('[type="submit"]');
      const label = button.querySelector('span');
      const status = form.querySelector('.form-status');
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      sending = true;
      button.disabled = true;
      form.setAttribute('aria-busy', 'true');
      label.textContent = 'Sending your request…';
      status.className = 'form-status';
      status.textContent = '';
      try {
        const response = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: data, signal: controller.signal });
        if (!response.ok) throw new Error('Provider request failed');
        const result = await response.json();
        if (result.success !== true && result.success !== 'true') throw new Error('Provider did not confirm success');
        form.reset();
        status.className = 'form-status success';
        status.textContent = 'Thank you! Your request was submitted. We aim to get back to you within 24–48 hours.';
      } catch (error) {
        status.className = 'form-status error';
        status.textContent = 'We couldn’t confirm your request. Please try again, or email us at romanpapadopoulos1@gmail.com.';
      } finally {
        clearTimeout(timeout);
        sending = false;
        button.disabled = false;
        form.removeAttribute('aria-busy');
        label.textContent = 'Request my cash offer';
      }
    });
  });
})();
