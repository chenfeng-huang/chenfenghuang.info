---
layout: default
tags: home
headshot: /images/headshot.jpg
---

<div class="profile-layout" style="display: flex; gap: 2em; margin-bottom: 2em; align-items: center;">
  <div class="profile-card" style="text-align: center; max-width: 300px; min-width: 280px; padding: 1.5em; flex-shrink: 0;">
    <img 
      style="border-radius: 1em; width: 200px; height: 200px; object-fit: cover; margin-bottom: 1em;" 
      src="{{ page.headshot }}"
    >
    <h2 style="margin: 0.5em 0; color: var(--text-color);">Chenfeng Huang</h2>
    <p style="color: var(--text-secondary); margin: 0.25em 0;">Master Student</p>
    <p style="color: var(--text-secondary); margin: 0.25em 0;">University of Southern California</p>
    <p style="color: var(--text-secondary); margin: 0.25em 0 1em 0;">Applied Data Science</p>
    
    <div style="margin-top: 1em;">
      <a href="mailto:chengfengeric@gmail.com" style="color: var(--text-secondary); font-size: 1.2em; margin: 0 0.3em; text-decoration: none;" target="_blank" rel="noopener noreferrer" title="Email">
        <i class="fa fa-envelope"></i>
      </a>
      {% if site.linkedin_username %}
        <a href="https://www.linkedin.com/in/{{ site.linkedin_username }}" style="color: #0077B5; font-size: 1.2em; margin: 0 0.3em; text-decoration: none;" target="_blank" rel="noopener noreferrer">
          <i class="fa fa-linkedin"></i>
        </a>
      {% endif %}
      {% if site.github_username %}
        <a href="https://github.com/{{ site.github_username }}" style="color: var(--text-color); font-size: 1.2em; margin: 0 0.3em; text-decoration: none;" target="_blank" rel="noopener noreferrer">
          <i class="fa fa-github"></i>
        </a>
      {% endif %}
      {% if site.kaggle_username %}
        <a href="https://www.kaggle.com/{{ site.kaggle_username }}" style="color: #20BEFF; font-size: 1.2em; margin: 0 0.3em; text-decoration: none; font-family: 'Inter', sans-serif; font-weight: bold;" target="_blank" rel="noopener noreferrer">K</a>
      {% endif %}
      {% if site.google_scholar_id %}
        <a href="https://scholar.google.com/citations?user={{ site.google_scholar_id }}" style="color: #4285F4; font-size: 1.2em; margin: 0 0.3em; text-decoration: none;" target="_blank" rel="noopener noreferrer">
          <i class="ai ai-google-scholar"></i>
        </a>
      {% endif %}
    </div>
  </div>

  <div class="about-content" style="flex: 1; min-width: 0;">
    <h2>About Me</h2>
    <p>I am a master student in Applied Data Science at the University of Southern California, currently working as a research assistant at North Carolina State University under the guidance of <a href="https://math.sciences.ncsu.edu/people/tran/" target="_blank" rel="noopener noreferrer">Dr. Tran</a>. My research focuses on <strong>Interpretable Machine Learning</strong> and I am currently working on <strong>Time Series OOD Generalization</strong>.</p>

    <p>I am actively participating in <a href="https://www.kaggle.com/alrickh" target="_blank" rel="noopener noreferrer">Kaggle</a> competitions and currently hold <strong>Expert</strong> level status.</p>

    <p>I am also a professional coffee brewer and cupper with SCA certificates. I share brewing techniques and coffee tasting feedback in my <a href="{{ site.baseurl }}/coffee-note/" target="_blank" rel="noopener noreferrer">Coffee Notes</a>.</p>
  </div>
</div>

<style>
@media screen and (max-width: 768px) {
  .profile-layout {
    flex-direction: column !important;
    align-items: center !important;
    gap: 1em !important;
  }
  .profile-card {
    max-width: 100% !important;
    min-width: unset !important;
  }
  .about-content {
    text-align: left;
  }
  .about-content h2 {
    margin-top: 0;
  }
  .interests-education {
    flex-direction: column !important;
    gap: 2em !important;
  }
}
</style>

<div style="margin-top: 0em;">
  <div class="interests-education" style="display: flex; gap: 1em; max-width: 100%;">
    <div style="flex: 1;">
      <h2 style="color: var(--text-color); margin-bottom: 0.8em;">Interests</h2>
      <ul style="list-style: none; padding: 0; color: var(--text-secondary);">
        <li style="font-weight: 600; color: var(--text-color); font-size: 0.95em;">• Interpretable Machine Learning</li>
        <li style="font-weight: 600; color: var(--text-color); font-size: 0.95em;">• Sequential Data Analysis</li>
        <li style="font-weight: 600; color: var(--text-color); font-size: 0.95em;">• OOD Generalization</li>
        <li style="font-weight: 600; color: var(--text-color); font-size: 0.95em;">• Professional Coffee Brewing and Cupping</li>
      </ul>
    </div>
      <div style="flex: 1;">
        <h2 style="color: var(--text-color); margin-bottom: 0.8em;">Education</h2>
        <div style="color: var(--text-secondary);">
          <div style="margin-bottom: 1.2em; display: flex; align-items: flex-start;">
            <div style="margin-right: 0.8em; margin-top: 0.2em; filter: grayscale(100%); font-size: 0.9em;">
              🎓
            </div>
            <div>
              <div style="font-weight: 600; color: var(--text-color); font-size: 0.95em;">M.S. in <a href="https://viterbigradadmission.usc.edu/programs/masters/msprograms/data-science/ms-applied-data-science/" target="_blank" rel="noopener noreferrer" style="color: var(--text-color); text-decoration: none;">Applied Data Science</a>, 2023-2025</div>
              <div style="font-size: 0.9em; margin-top: 0.2em;">University of Southern California</div>
            </div>
          </div>
          <div style="margin-bottom: 1.2em; display: flex; align-items: flex-start;">
            <div style="margin-right: 0.8em; margin-top: 0.2em; filter: grayscale(100%); font-size: 0.9em;">
              🎓
            </div>
            <div>
              <div style="font-weight: 600; color: var(--text-color); font-size: 0.95em;">B.S. in <a href="https://www.scu.edu/cas/mathcs/" target="_blank" rel="noopener noreferrer" style="color: var(--text-color); text-decoration: none;">Computer Science</a>, 2020-2022</div>
              <div style="font-size: 0.9em; margin-top: 0.2em;">Santa Clara University</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>

<!-- <h3><a href="{{ site.baseurl }}/cv/">View my Resume</a></h3> -->