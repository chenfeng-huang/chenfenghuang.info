---
layout: post
title: "Certificate Collection"
# date: 2024-12-25 10:00:00 -0500
tags: coffee-note
preview_image: /images/Certificate-Collection/SCA_logo_header.jpg
pinned: true
no_date: true
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
  height: 600px;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.image-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.image-item {
  flex: 1 1 300px;
  max-width: 500px;
  min-width: 300px;
}

.image-item .image-wrapper {
  width: 100%;
  max-width: 100%;
  height: 400px;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.image-item .image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.image-caption {
  text-align: center;
  margin-top: 8px;
  color: #666;
}

/* Dark mode support for image captions */
@media (prefers-color-scheme: dark) {
  .image-caption {
    color: #ccc;
  }
}

/* Also support explicit dark mode class if used */
.dark .image-caption,
[data-theme="dark"] .image-caption {
  color: #ccc;
}

.pdf-wrapper {
  width: 100%;
  max-width: 800px;
  height: 600px;
}

.image-item .pdf-wrapper {
  width: 100%;
  max-width: 100%;
  height: 400px;
}

.pdf-wrapper iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.pdf-fallback {
  text-align: center;
  margin-top: 6px;
  font-size: 0.9em;
}

.pdf-fallback a {
  color: #2563eb;
}

@media (prefers-color-scheme: dark) {
  .pdf-fallback a {
    color: #93c5fd;
  }
}

.dark .pdf-fallback a,
[data-theme="dark"] .pdf-fallback a {
  color: #93c5fd;
}
</style>

<div class="image-grid">
  <div class="image-item">
    <div class="image-wrapper">
      <img src="/images/Certificate-Collection/SCA-certificate-Brewing-Professional.jpg" alt="SCA Brewing Professional certificate">
    </div>
    <div class="image-caption">SCA Brewing Professional</div>
  </div>
  
  <div class="image-item">
    <div class="image-wrapper">
      <img src="/images/Certificate-Collection/SCA-certificate-Sensory-Professional.jpg" alt="SCA Sensory Professional certificate">
    </div>
    <div class="image-caption">SCA Sensory Professional</div>
  </div>
  
</div>

<hr>

<div class="image-container">
  <div class="image-item">
    <div class="image-wrapper">
      <img src="/images/Certificate-Collection/SCA-CVA.jpg" alt="sca">
    </div>
    <div class="image-caption">SCA CVA</div>
  </div>
</div>

<hr>

<div class="image-grid">
  <div class="image-item">
    <div class="pdf-wrapper">
      <iframe src="/images/Certificate-Collection/Q_grader.pdf" title="CQI Q Grader certificate"></iframe>
    </div>
    <div class="image-caption">CQI Q Grader</div>
    <p class="pdf-fallback"><a href="/images/Certificate-Collection/Q_grader.pdf" target="_blank" rel="noopener noreferrer">Open PDF in new tab</a></p>
  </div>

  <div class="image-item">
    <div class="pdf-wrapper">
      <iframe src="/images/Certificate-Collection/SCA-certificate-GreenCoffee-Intermediate.pdf" title="SCA Green Coffee Intermediate certificate"></iframe>
    </div>
    <div class="image-caption">SCA Green Coffee Intermediate</div>
    <p class="pdf-fallback"><a href="/images/Certificate-Collection/SCA-certificate-GreenCoffee-Intermediate.pdf" target="_blank" rel="noopener noreferrer">Open PDF in new tab</a></p>
  </div>
</div>

