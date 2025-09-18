---
layout: post
title: "Kaggle Competition Silver Medal: Child Mind Institute-Problematic Internet Use"
date: 2024-12-20 10:00:00 -0500
tags: blog
preview_image: /images/2024-12-20-Kaggle-CMI-PIU/Kaggle.png
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
    <img src="/images/2024-12-20-Kaggle-CMI-PIU/Kaggle.png" alt="kaggle">
  </div>
</div>

I am excited to announce my [Silver Medal achievement](https://www.kaggle.com/certification/competitions/alrickh/child-mind-institute-problematic-internet-use) in the [Child Mind Institute Problematic Internet Use](https://www.kaggle.com/competitions/child-mind-institute-problematic-internet-use) Kaggle competition, which is my first medal gained from Kaggle competition.

The project aimed to predict problematic internet usage patterns in children and adolescents by analyzing physical activity data, with the goal of identifying early signs and promoting healthy digital habits. Unlike my previous research on time series analysis, this work focused on mining a combination of time series and tabular data, with greater emphasis on data cleaning and feature engineering rather than model design, which closely reflects practical industrial scenarios. Due to noisy data quality and the risk of domain shift in the private test set, my team chose tree-based models over neural networks to reduce overfitting and improve robustness against out-of-distribution data. This strategy proved effective as our public leaderboard rank was 1032 out of 3599 teams, which was far from a bronze medal, yet our private leaderboard rank improved to 111th place and earned us a silver medal in the top 3 percent. I sincerely appreciate my teammate’s commitment to this approach instead of pursuing a high public score at the expense of overfitting.

To counter overfitting, we developed two derivations and combined their results:

- Stage 1 — Data loading and preprocessing
  - Method 1: Read training and test CSVs; convert “Season” to categorical; process accelerometer parquet files in parallel using ThreadPoolExecutor; compute descriptive statistics; merge aggregates back to the main dataset by ID. Select relevant demographic and physical features; remove rows with missing SII; fill missing categorical values with “Missing”; cast categorical columns.
  - Method 2: Reload datasets for consistency; apply the same time-series processing as Method 1; use KNNImputer (n=5) to fill missing numeric values; round SII to integers; keep non-numeric features unchanged; remove season-related features; create interaction and ratio features (e.g., BMI × Age); replace infinite values with NaN; drop rows with excessive missing data.

- Stage 2 — Feature encoding
  - Method 1: Encode categorical features into integers using mapping dictionaries, with separate mappings for train and test sets.
  - Method 2: Incorporate categorical encoding within the expanded feature set created during preprocessing, relying less on isolated encoding steps.

- Stage 3 — Modeling and prediction
  - Method 1: Train LightGBM, XGBoost, and CatBoost; combine with VotingRegressor; apply class weights in LightGBM to address imbalance; use StratifiedKFold to produce out-of-fold and test predictions.
  - Method 2: Use the same cross-validation; expand the ensemble to include RandomForestRegressor and GradientBoostingRegressor; wrap each model in a pipeline containing SimpleImputer for consistent preprocessing; average predictions with VotingRegressor for stability.

- Stage 4 — Threshold optimization and submission
  - Both: Optimize thresholds to map continuous predictions to discrete SII classes, maximizing Quadratic Weighted Kappa; generate the submission file.

- Final combination
  - Merge predictions from both methods using majority voting; when there is disagreement, average and round to the nearest integer; save `final_submission.csv`.

You can find the complete implementation and code details on [GitHub](https://github.com/chenfeng-huang/Kaggle_Silver_Medal_Solutioun_CMI-PIU).