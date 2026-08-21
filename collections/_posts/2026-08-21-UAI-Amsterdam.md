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
  display: flex;
  justify-content: center;
  margin: 24px 0;
}
.photo-portrait img {
  max-width: 480px;
  width: 100%;
  height: auto;
  border-radius: 4px;
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
</style>

<div class="image-container">
  <div class="image-wrapper">
    <img src="/images/2026-08-21-UAI-Amsterdam/oral.jpg" alt="Oral presentation in the Queen Máxima Hall at UAI 2026">
  </div>
</div>

I presented our paper, [“Model-Agnostic Online Certificate-Driven Calibration for Time Series Forecasting Under Distribution Shift,”](https://proceedings.mlr.press/v337/huang26b.html) as an **oral** at [UAI 2026](https://www.auai.org/uai2026/) this week in Amsterdam. The conference was held at [KIT](https://www.kit.nl/) (the Royal Tropical Institute). Our talk was on August 19 in Oral Session 4: Uncertainty and Calibration, in the Queen Máxima Hall.

After [the acceptance in June](/2026/06/02/UAI-Oral/), preparing the oral meant compressing the story: why i.i.d. PAC-Bayes is the wrong certificate for shifting time series, how a martingale bound gives a usable online certificate, and how a gated Bayesian head can calibrate a frozen backbone without throwing the source model away. The questions, both in the hall and later at the poster, kept coming back to that last point: when you should trust the certificate enough to adapt, and when you should fall back.

Giving the talk in that room was a different experience from [ICDM last fall](/2025/11/13/ICDM_trip/). An oral leaves little time, so every slide has to earn its place. I am grateful it landed in a session on uncertainty and calibration, where the audience already cared about making those statements mean something once you leave the i.i.d. setting.

<div class="photo-portrait">
  <img src="/images/2026-08-21-UAI-Amsterdam/poster-session.jpg" alt="Presenting the OMPB poster in the Marble Hall at UAI 2026">
</div>

The same afternoon I presented the poster in the Marble Hall (Marmeren Hal). Those conversations ran longer: people stayed with the bound, the predict-then-update protocol, and the backbone-agnostic design.

<div class="poster-wrap">
  <a href="/assets/OMPB/OMPB_poster.pdf" target="_blank" rel="noopener noreferrer">
    <img src="/images/2026-08-21-UAI-Amsterdam/poster.jpg" alt="OMPB poster for UAI 2026">
  </a>
</div>
<p class="poster-caption"><a href="/assets/OMPB/OMPB_poster.pdf" target="_blank" rel="noopener noreferrer">Poster (PDF)</a></p>

I am grateful to my advisor, [Dr. George Michailidis](https://georgemichailidis.github.io), for his guidance throughout this work. The paper is in [PMLR](https://proceedings.mlr.press/v337/huang26b.html); code is on [GitHub](https://github.com/chenfeng-huang/OMPB-UAI-2026).
