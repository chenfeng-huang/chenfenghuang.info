---
layout: post
title: "Kaggle Competition Silver Medal: Child Mind Institute-Detect Behavior with Sensor Data"
date: 2025-09-23 10:00:00 -0500
tags: blog
preview_image: /images/2025-09-23-Kaggle-CMI-DBSD/Kaggle.png
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
</style>

<div class="image-container">
  <div class="image-wrapper">
    <img src="/images/2025-09-23-Kaggle-CMI-DBSD/Kaggle.png" alt="kaggle">
  </div>
</div>

I received my [Silver Medal achievement](https://www.kaggle.com/certification/competitions/alrickh/cmi-detect-behavior-with-sensor-data) in the [Child Mind Institute Detect Behavior with Sensor Data](https://www.kaggle.com/competitions/cmi-detect-behavior-with-sensor-data) Kaggle competition, marking my second participation in a Child Mind Institute challenge and my closest result yet to a gold medal.  

This project leveraged wrist-worn multimodal sensor data—movement, temperature, and proximity—to distinguish body-focused repetitive behaviors (BFRBs) from everyday gestures. The objective was to improve the accuracy of wearable BFRB-detection systems, supporting better diagnosis and treatment of mental health conditions involving compulsive behaviors.

The dataset comprised three modalities: the Inertial Measurement Unit (IMU), including accelerometer, gyroscope, and magnetometer readings; the Thermopile (THM), capturing non-contact infrared temperature; and the Time-of-Flight (ToF) sensor, providing infrared distance measurements. The evaluation metric combined binary F1 (BFRB vs. non-target) and macro F1 (fine-grained gesture classification), each contributing 50% to the final score.

We developed a two-branch model that jointly learns IMU and ToF/THM features and applied subject-level Hungarian matching for optimal label alignment. This approach achieved 16th place among 2,657 teams—less than **0.001** behind the gold-medal threshold.


Our solution pipeline consisted of four key stages:

- **Stage 1 — Data preprocessing**
  - Merged demographic metadata and standardized handedness by mirroring left-handed sequences to a unified right-hand reference frame through channel swapping and sign inversion.
  - Engineered physics-informed IMU features: gravity-free linear acceleration, quaternion-based angular velocity, and angular distance metrics.
  - Aggregated ToF infrared distance maps into statistical features (mean, standard deviation, minimum, maximum) per sensor while preserving missing pixels as NaN.
  - Applied forward/backward fill and zero imputation for missing values, normalized with StandardScaler, and pre-padded sequences to fixed length aligned with action endpoints.

- **Stage 2 — Model architecture and training**
  - Designed a dual-branch Residual SE-CNN architecture:
    - IMU branch: split into acceleration and rotation processing subroutes
    - ToF/THM branch: dedicated to temperature and proximity data fusion
  - Integrated a learnable gating mechanism to dynamically weight the ToF/THM branch, enhancing robustness for IMU-only samples.
  - Optimized with composite loss function: Cross-Entropy + Triplet (hard mining) + gate supervision (0.2×BCE).
  - Employed AdamW optimizer with cosine learning rate scheduling and StratifiedGroupKFold cross-validation (grouped by subject).
  - Augmented training data through temporal jittering, scaling, and random modality dropout (p=0.25) to improve temporal and multimodal generalization.

- **Stage 3 — Inference and postprocessing**
  - Maintained preprocessing consistency during inference and ensemble predictions across 5 cross-validation folds.
  - Applied subject-level Hungarian assignment algorithm to enforce globally optimal label matching across sequences from the same participant, significantly stabilizing fine-grained gesture predictions.

- **Stage 4 — Evaluation and results**
  - Achieved 5-fold cross-validation score of 0.855 and Kaggle leaderboard score of 0.850, surpassing the IMU-only baseline (CV≈0.820) by +0.03–0.04.
  - Demonstrated robust performance across both all-sensor and IMU-only test subsets, validating the effectiveness of gated fusion architecture and physics-informed feature engineering.

You can find the complete implementation and code details on [GitHub](https://github.com/chenfeng-huang/Kaggle_Silver_Medal_Solutioun_CMI-DBSD).