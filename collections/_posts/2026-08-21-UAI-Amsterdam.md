---
layout: post
title: "Presenting at UAI 2026 in Amsterdam"
date: 2026-08-21 18:00:00 +0200
tags: blog
preview_image: /images/2026-08-21-UAI-Amsterdam/oral.jpg
summary: Oral and poster presentation of our OMPB paper at UAI 2026, held at KIT in Amsterdam.
---
<!--more-->
<style>
.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.image-wrapper {
  width: 100%;
  max-width: 800px;
  height: 400px;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.photo-portrait {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 880px;
  margin: 24px auto;
}
.photo-portrait img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
@media (max-width: 600px) {
  .photo-portrait {
    grid-template-columns: 1fr;
  }
}
.poster-wrap {
  display: flex;
  justify-content: center;
  margin: 24px 0 8px 0;
}
.poster-wrap img {
  max-width: 720px;
  width: 100%;
  height: auto;
  border-radius: 4px;
}
.poster-caption {
  text-align: center;
  margin: 0 0 24px 0;
}

.slide-deck {
  max-width: 880px;
  margin: 28px auto 8px;
  outline: none;
}
.slide-deck-window {
  position: relative;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}
.slide-deck-viewport {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  touch-action: pan-y;
  cursor: grab;
}
.slide-deck-viewport.is-dragging {
  cursor: grabbing;
}
.slide-deck-track {
  display: flex;
  height: 100%;
  will-change: transform;
}
.slide-deck-track img {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #fff;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}
.slide-deck-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  background: color-mix(in srgb, var(--bg-color) 88%, transparent);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}
.slide-deck-nav:hover:not(:disabled) {
  border-color: var(--link-color);
  color: var(--link-color);
}
.slide-deck-nav:disabled {
  opacity: 0.28;
  cursor: default;
}
.slide-deck-nav.prev { left: 10px; }
.slide-deck-nav.next { right: 10px; }
.slide-deck-nav svg {
  width: 18px;
  height: 18px;
}
.slide-deck-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 10px 0 24px;
  color: var(--text-secondary);
  font-size: 0.92em;
}
.slide-deck-counter {
  font-variant-numeric: tabular-nums;
}

</style>

<div class="image-container">
  <div class="image-wrapper">
    <img src="/images/2026-08-21-UAI-Amsterdam/oral.jpg" alt="Oral presentation in the Queen Máxima Hall at UAI 2026">
  </div>
</div>

I presented our paper, [“Model-Agnostic Online Certificate-Driven Calibration for Time Series Forecasting Under Distribution Shift,”](https://proceedings.mlr.press/v337/huang26b.html) as an **oral** at [UAI 2026](https://www.auai.org/uai2026/) this week in Amsterdam. The conference was held at [KIT](https://www.kit.nl/) (the Royal Tropical Institute). Our talk was on August 19 in Oral Session 4: Uncertainty and Calibration, in the Queen Máxima Hall.

After [the acceptance in June](/2026/06/02/UAI-Oral/), preparing the oral meant compressing the story: why i.i.d. PAC-Bayes is the wrong certificate for shifting time series, how a martingale bound gives a usable online certificate, and how a gated Bayesian head can calibrate a frozen backbone without throwing the source model away. The questions, both in the hall and later at the poster, kept coming back to that last point: when you should trust the certificate enough to adapt, and when you should fall back.

Giving the talk in that room was a different experience from [ICDM last fall](/2025/11/13/ICDM_trip/). An oral leaves little time, so every slide has to earn its place. I am grateful it landed in a session on uncertainty and calibration, where the audience already cared about making those statements mean something once you leave the i.i.d. setting.

<div class="slide-deck" data-slide-deck tabindex="0" role="region" aria-roledescription="carousel" aria-label="UAI 2026 oral slides">
  <div class="slide-deck-window">
    <button type="button" class="slide-deck-nav prev" aria-label="Previous slide" disabled>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <div class="slide-deck-viewport">
      <div class="slide-deck-track">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-01.jpg" alt="Title slide: Model-Agnostic Online Certificate-Driven Calibration for Time Series Forecasting Under Distribution Shift" width="1600" height="900">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-02.jpg" alt="UAI 2026 oral slide 2" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-03.jpg" alt="UAI 2026 oral slide 3" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-04.jpg" alt="UAI 2026 oral slide 4" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-05.jpg" alt="UAI 2026 oral slide 5" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-06.jpg" alt="UAI 2026 oral slide 6" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-07.jpg" alt="UAI 2026 oral slide 7" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-08.jpg" alt="UAI 2026 oral slide 8" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-09.jpg" alt="UAI 2026 oral slide 9" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-10.jpg" alt="UAI 2026 oral slide 10" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-11.jpg" alt="UAI 2026 oral slide 11" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-12.jpg" alt="UAI 2026 oral slide 12" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-13.jpg" alt="UAI 2026 oral slide 13" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-14.jpg" alt="UAI 2026 oral slide 14" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-15.jpg" alt="UAI 2026 oral slide 15" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-16.jpg" alt="UAI 2026 oral slide 16" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-17.jpg" alt="UAI 2026 oral slide 17" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-18.jpg" alt="UAI 2026 oral slide 18" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-19.jpg" alt="UAI 2026 oral slide 19" width="1600" height="900" loading="lazy">
        <img src="/images/2026-08-21-UAI-Amsterdam/slides/slide-20.jpg" alt="UAI 2026 oral slide 20" width="1600" height="900" loading="lazy">
      </div>
    </div>
    <button type="button" class="slide-deck-nav next" aria-label="Next slide">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </div>
  <div class="slide-deck-meta">
    <span class="slide-deck-counter" aria-live="polite">1 / 20</span>
    <a href="/assets/OMPB/OMPB_slides.pptx">Slides (PPTX)</a>
  </div>
</div>

<div class="photo-portrait">
  <img src="/images/2026-08-21-UAI-Amsterdam/poster-session.jpg" alt="Explaining the OMPB poster in the Marble Hall at UAI 2026">
  <img src="/images/2026-08-21-UAI-Amsterdam/poster-session-2.jpg" alt="Presenting the OMPB poster to an attendee in the Marble Hall at UAI 2026">
</div>

The same afternoon I presented the poster in the Marble Hall (Marmeren Hal). Those conversations ran longer: people stayed with the bound, the predict-then-update protocol, and the backbone-agnostic design.

<div class="poster-wrap">
  <a href="/assets/OMPB/OMPB_poster.pdf" target="_blank" rel="noopener noreferrer">
    <img src="/images/2026-08-21-UAI-Amsterdam/poster.jpg" alt="OMPB poster for UAI 2026">
  </a>
</div>
<p class="poster-caption"><a href="/assets/OMPB/OMPB_poster.pdf" target="_blank" rel="noopener noreferrer">Poster (PDF)</a></p>

I am grateful to my advisor, [Dr. George Michailidis](https://georgemichailidis.github.io), for his guidance throughout this work. The paper is in [PMLR](https://proceedings.mlr.press/v337/huang26b.html); code is on [GitHub](https://github.com/chenfeng-huang/OMPB-UAI-2026).

<script>
(function () {
  var deck = document.querySelector('[data-slide-deck]');
  if (!deck) return;

  var viewport = deck.querySelector('.slide-deck-viewport');
  var track = deck.querySelector('.slide-deck-track');
  var slides = track.querySelectorAll('img');
  var counter = deck.querySelector('.slide-deck-counter');
  var prevBtn = deck.querySelector('.slide-deck-nav.prev');
  var nextBtn = deck.querySelector('.slide-deck-nav.next');
  var total = slides.length;
  var index = 0;
  var dragX = 0;
  var startX = 0;
  var startY = 0;
  var dragging = false;
  var axis = null;
  var pointerId = null;

  function width() {
    return viewport.clientWidth || 1;
  }

  function render(animate) {
    track.style.transition = animate ? 'transform 280ms ease' : 'none';
    track.style.transform = 'translate3d(' + ((-index * width()) + dragX) + 'px, 0, 0)';
    counter.textContent = (index + 1) + ' / ' + total;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === total - 1;
    var neighbor = slides[index + 1];
    if (neighbor && neighbor.loading === 'lazy') neighbor.loading = 'eager';
  }

  function go(next) {
    index = Math.max(0, Math.min(total - 1, next));
    dragX = 0;
    render(true);
  }

  prevBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    go(index - 1);
    deck.focus();
  });
  nextBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    go(index + 1);
    deck.focus();
  });

  deck.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    }
  });

  viewport.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    if (e.target.closest('.slide-deck-nav')) return;
    dragging = true;
    axis = null;
    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    dragX = 0;
    viewport.classList.add('is-dragging');
    try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
    render(false);
  });

  viewport.addEventListener('pointermove', function (e) {
    if (!dragging || e.pointerId !== pointerId) return;
    var dx = e.clientX - startX;
    var dy = e.clientY - startY;
    if (axis === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }
    if (axis !== 'x') return;
    e.preventDefault();
    var w = width();
    dragX = dx;
    if (index === 0 && dragX > 0) dragX *= 0.35;
    if (index === total - 1 && dragX < 0) dragX *= 0.35;
    if (Math.abs(dragX) > w) dragX = dragX > 0 ? w : -w;
    render(false);
  }, { passive: false });

  function endDrag(e) {
    if (!dragging || (e && e.pointerId !== pointerId)) return;
    dragging = false;
    viewport.classList.remove('is-dragging');
    var threshold = Math.max(48, width() * 0.18);
    if (axis === 'x' && dragX > threshold) go(index - 1);
    else if (axis === 'x' && dragX < -threshold) go(index + 1);
    else go(index);
    axis = null;
    pointerId = null;
  }

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  window.addEventListener('resize', function () { render(false); });
  render(false);
})();
</script>

