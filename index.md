---
layout: default
tags: home
headshot: /images/headshot.jpg
---

<!-- Hero Section -->
<div class="profile-layout" style="display: flex; gap: 3em; margin-bottom: 1.5em; align-items: flex-start; padding: 2.5em 0;">
  <div class="profile-card" style="text-align: center; max-width: 300px; min-width: 280px; padding: 0; flex-shrink: 0;">
    <img 
      style="border-radius: 1em; width: 200px; height: 200px; object-fit: cover; margin-bottom: 1.5em; box-shadow: 0 4px 16px rgba(0,0,0,0.1);" 
      src="{{ page.headshot }}"
    >
    <h1 style="margin: 0 0 0.75em 0; color: var(--text-color); font-size: 1.5rem; font-weight: 700;">Chenfeng Huang</h1>
    <p style="color: var(--text-secondary); margin: 0.15em 0; font-weight: 500; font-size: 1.05em;">Master Student</p>
    <p style="color: var(--text-secondary); margin: 0.15em 0; font-weight: 400;">University of Southern California</p>
    <p style="color: var(--text-secondary); margin: 0.15em 0 1.5em 0; font-style: italic;">Applied Data Science</p>
    
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

  <div class="about-content" style="flex: 1; min-width: 0; padding-left: 1em;">
    <h2 style="margin-top: 0; margin-bottom: 1.25em; color: var(--text-color); font-weight: 700; font-size: 1.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5em;">About Me</h2>
    
    <div style="line-height: 1.7; font-size: 1.05em;">
      <p style="margin-bottom: 1.25em;">I am a master student in Applied Data Science at the University of Southern California, working as a research assistant at North Carolina State University under the guidance of <a href="https://math.sciences.ncsu.edu/people/tran/" target="_blank" rel="noopener noreferrer" style="font-weight: 600;">Dr. Tran</a>. My research focuses on <strong style="color: var(--text-color); font-weight: 600;">Interpretable Machine Learning</strong> and I am currently working on <strong style="color: var(--text-color); font-weight: 600;">Time Series OOD Generalization</strong>.</p>

      <p style="margin-bottom: 1.25em;">I am actively participating in <a href="https://www.kaggle.com/alrickh" target="_blank" rel="noopener noreferrer" style="font-weight: 600;">Kaggle</a> competitions and currently hold <strong style="color: var(--text-color); font-weight: 600;">Expert</strong> level status.</p>

      <p style="margin-bottom: 0;">I am also a professional coffee brewer and cupper with SCA certificates. I share brewing techniques and coffee tasting feedback in my <a href="{{ site.baseurl }}/coffee-note/" target="_blank" rel="noopener noreferrer" style="font-weight: 600;">Coffee Notes</a>.</p>
    </div>
  </div>
</div>

<style>
@media screen and (max-width: 768px) {
  .profile-layout {
    flex-direction: column !important;
    align-items: center !important;
    gap: 1.5em !important;
    padding: 1.5em 0 !important;
  }
  .profile-card {
    max-width: 100% !important;
    min-width: unset !important;
  }
  .about-content {
    text-align: left;
    padding-left: 0 !important;
  }
  .about-content h2 {
    margin-top: 0;
    font-size: 1.3rem !important;
  }
  .interests-education {
    flex-direction: column !important;
    gap: 1.5em !important;
  }
  .interests-education > div {
    padding: 1.5em 0 !important;
  }
  .interests-education h2 {
    font-size: 1.2rem !important;
  }
}

/* Interest item hover effects */
.interest-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px var(--shadow-color);
}
</style>

<script>
function toggleInterest(id) {
  const details = document.getElementById('details-' + id);
  const icon = document.getElementById('icon-' + id);
  
  if (details.style.maxHeight === '0px' || details.style.maxHeight === '') {
    // Expand
    details.style.maxHeight = details.scrollHeight + 'px';
    icon.textContent = '▲';
    // Add a slight rotation animation to the icon
    icon.style.transform = 'rotate(180deg)';
    icon.style.transition = 'transform 0.3s ease-out';
  } else {
    // Collapse
    details.style.maxHeight = '0px';
    icon.textContent = '▼';
    icon.style.transform = 'rotate(0deg)';
  }
}
</script>

<!-- Interests & Education Section -->
<div style="margin-top: 0em;">
  <div class="interests-education" style="display: flex; gap: 2.5em; max-width: 100%;">
    
    <!-- Interests Section -->
    <div style="flex: 1;">
      <h2 style="color: var(--text-color); margin-top: 0; margin-bottom: 1.5em; font-weight: 700; font-size: 1.3rem; display: flex; align-items: center; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5em;">
        Interests
      </h2>
      <div style="padding: 0; color: var(--text-secondary);">
        <div class="interest-item" style="font-weight: 600; color: var(--text-color); font-size: 1em; margin-bottom: 0.8em; border-left: 3px solid var(--link-color); background: var(--code-bg); border-radius: 0.5em; cursor: pointer; transition: all 0.3s ease;" onclick="toggleInterest('iml')">
          <div style="padding: 0.5em 1em; display: flex; justify-content: space-between; align-items: center;">
            <span>Interpretable Machine Learning</span>
            <span id="icon-iml" style="font-size: 0.8em; color: var(--text-secondary); transition: transform 0.3s ease-out;">▼</span>
          </div>
          <div id="details-iml" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out, padding 0.3s ease-out; color: var(--text-secondary); font-size: 0.9em; font-weight: 400; line-height: 1.5;">
            <div style="padding: 0.8em 1em; border-top: 1px solid var(--border-color);">
              Developing machine learning models that provide clear explanations for their predictions. My research focuses on creating interpretable algorithms that maintain high performance while offering transparency in decision-making processes, particularly for critical applications in healthcare and finance.
            </div>
          </div>
        </div>
        
        <div class="interest-item" style="font-weight: 600; color: var(--text-color); font-size: 1em; margin-bottom: 0.8em; border-left: 3px solid var(--link-color); background: var(--code-bg); border-radius: 0.5em; cursor: pointer; transition: all 0.3s ease;" onclick="toggleInterest('tsa')">
          <div style="padding: 0.5em 1em; display: flex; justify-content: space-between; align-items: center;">
            <span>Time Series Analysis</span>
            <span id="icon-tsa" style="font-size: 0.8em; color: var(--text-secondary); transition: transform 0.3s ease-out;">▼</span>
          </div>
          <div id="details-tsa" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out, padding 0.3s ease-out; color: var(--text-secondary); font-size: 0.9em; font-weight: 400; line-height: 1.5;">
            <div style="padding: 0.8em 1em; border-top: 1px solid var(--border-color);">
              Analyzing temporal data patterns and developing forecasting models for sequential data. I work on novel approaches for time series decomposition, anomaly detection, and generation, with applications in financial markets, sensor data, and economic forecasting.
            </div>
          </div>
        </div>
        
        <div class="interest-item" style="font-weight: 600; color: var(--text-color); font-size: 1em; margin-bottom: 0.8em; border-left: 3px solid var(--link-color); background: var(--code-bg); border-radius: 0.5em; cursor: pointer; transition: all 0.3s ease;" onclick="toggleInterest('ood')">
          <div style="padding: 0.5em 1em; display: flex; justify-content: space-between; align-items: center;">
            <span>OOD Generalization</span>
            <span id="icon-ood" style="font-size: 0.8em; color: var(--text-secondary); transition: transform 0.3s ease-out;">▼</span>
          </div>
          <div id="details-ood" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out, padding 0.3s ease-out; color: var(--text-secondary); font-size: 0.9em; font-weight: 400; line-height: 1.5;">
            <div style="padding: 0.8em 1em; border-top: 1px solid var(--border-color);">
              Developing robust machine learning models that perform well on out-of-distribution data. My research addresses domain shift, distribution mismatch, and model generalization challenges to create more reliable AI systems that work across different environments and datasets.
            </div>
          </div>
        </div>
        
        <div class="interest-item" style="font-weight: 600; color: var(--text-color); font-size: 1em; margin-bottom: 0; border-left: 3px solid #8B4513; background: var(--code-bg); border-radius: 0.5em; cursor: pointer; transition: all 0.3s ease;" onclick="toggleInterest('coffee')">
          <div style="padding: 0.5em 1em; display: flex; justify-content: space-between; align-items: center;">
            <span>Professional Coffee Brewing and Cupping</span>
            <span id="icon-coffee" style="font-size: 0.8em; color: var(--text-secondary); transition: transform 0.3s ease-out;">▼</span>
          </div>
          <div id="details-coffee" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out, padding 0.3s ease-out; color: var(--text-secondary); font-size: 0.9em; font-weight: 400; line-height: 1.5;">
            <div style="padding: 0.8em 1em; border-top: 1px solid var(--border-color);">
              Certified SCA professional specializing in coffee brewing techniques and sensory evaluation. I explore the science behind extraction parameters, grind consistency, and water chemistry to achieve optimal flavor profiles. My expertise includes cupping protocols, brewing method optimization, and coffee quality assessment.
            </div>
          </div>
        </div>
      </div>
    </div>
      
    <!-- Education Section -->
    <div style="flex: 1; ">
      <h2 style="color: var(--text-color); margin-top: 0; margin-bottom: 1.5em; font-weight: 700; font-size: 1.3rem; display: flex; align-items: center; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5em;">
        Education
      </h2>
      <div style="color: var(--text-secondary);">
        <a href="https://viterbigradadmission.usc.edu/programs/masters/msprograms/data-science/ms-applied-data-science/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit; display: block; transition: all 0.2s ease;">
          <div style="margin-bottom: 0.8em; display: flex; align-items: center; padding: 0.5em 1em; background: var(--code-bg); border-radius: 0.5em; border-left: 3px solid var(--link-color); cursor: pointer; transition: all 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px var(--shadow-color)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="margin-right: 0.8em; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
              <img src="/images/school_icons/USC.jpg" alt="USC Logo" style="width: 60px; height: 60px; object-fit: contain;" />
            </div>
            <div style="flex: 1;">
              <div style="font-weight: 600; color: var(--text-color); font-size: 1em;">M.S. in Applied Data Science</div>
              <div style="font-size: 0.9em; color: var(--text-secondary); font-weight: 400;">University of Southern California, 2023-2025</div>
            </div>
          </div>
        </a>
        <a href="https://www.scu.edu/cas/mathcs/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit; display: block; transition: all 0.2s ease;">
          <div style="margin-bottom: 0; display: flex; align-items: center; padding: 0.5em 1em; background: var(--code-bg); border-radius: 0.5em; border-left: 3px solid var(--link-color); cursor: pointer; transition: all 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px var(--shadow-color)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="margin-right: 0.8em; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
              <img src="/images/school_icons/SCU.jpg" alt="Santa Clara University Logo" style="width: 60px; height: 60px; object-fit: contain;" />
            </div>
            <div style="flex: 1;">
              <div style="font-weight: 600; color: var(--text-color); font-size: 1em;">B.S. in Computer Science</div>
              <div style="font-size: 0.9em; color: var(--text-secondary); font-weight: 400;">Santa Clara University, 2020-2022</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- <h3><a href="{{ site.baseurl }}/cv/">View my Resume</a></h3> -->