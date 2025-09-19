---
layout: default
tags: home
headshot: /images/headshot.jpg
---

<div style="text-align: center; max-width: 300px; float: left; margin: 1em 2em 2em 0; padding: 1.5em;">
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

## About Me
I am a master student in Applied Data Science at the University of Southern California, currently working as a research assistant at North Carolina State University under the guidance of [Dr. Tran](https://math.sciences.ncsu.edu/people/tran/). My research focuses on **Interpretable Machine Learning** and I am currently working on **Time Series OOD Generalization**.

I am actively participating in [Kaggle](https://www.kaggle.com/alrickh) competitions and currently hold **Expert** level status.

I am also a professional coffee brewer and cupper with SCA certificates. I share brewing techniques and coffee tasting feedback in my [Coffee Notes]({{ site.baseurl }}/coffee-note/). 


<div style="clear: both; margin-top: 3em;">
  <div style="display: flex; gap: 3em; max-width: 100%;">
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
              <div style="font-weight: 600; color: var(--text-color); font-size: 0.95em;">M.S. in <a href="https://viterbigradadmission.usc.edu/programs/masters/msprograms/data-science/ms-applied-data-science/" target="_blank" rel="noopener noreferrer" style="color: var(--link-color); text-decoration: none;">Applied Data Science</a>, 2023-2025</div>
              <div style="font-size: 0.9em; margin-top: 0.2em;">University of Southern California</div>
            </div>
          </div>
          <div style="margin-bottom: 1.2em; display: flex; align-items: flex-start;">
            <div style="margin-right: 0.8em; margin-top: 0.2em; filter: grayscale(100%); font-size: 0.9em;">
              🎓
            </div>
            <div>
              <div style="font-weight: 600; color: var(--text-color); font-size: 0.95em;">B.S. in <a href="https://www.scu.edu/cas/mathcs/" target="_blank" rel="noopener noreferrer" style="color: var(--link-color); text-decoration: none;">Computer Science</a>, 2020-2022</div>
              <div style="font-size: 0.9em; margin-top: 0.2em;">Santa Clara University</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>

<!-- <h3><a href="{{ site.baseurl }}/cv/">View my Resume</a></h3> -->