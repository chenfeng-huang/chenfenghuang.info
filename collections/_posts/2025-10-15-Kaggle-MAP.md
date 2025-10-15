---
layout: post
title: "Kaggle Competition Silver Medal: MAP - Charting Student Math Misunderstandings"
date: 2025-10-15 10:00:00 -0500
tags: blog
preview_image: /images/2025-10-15-Kaggle-MAP/Kaggle.png
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
    <img src="/images/2025-10-15-Kaggle-MAP/Kaggle.png" alt="kaggle">
  </div>
</div>

I received my [Silver Medal achievement](https://www.kaggle.com/certification/competitions/alrickh/map-charting-student-math-misunderstandings) in the [MAP - Charting Student Math Misunderstandings](https://www.kaggle.com/competitions/map-charting-student-math-misunderstandings) Kaggle competition, marking my first participation in LLM language model competition. 

The challenge required identifying whether a student’s free-text explanation exhibited a mathematical misconception and, if so, classifying the specific misconception type. Predictions were evaluated using MAP@3, emphasizing high-precision top-rank retrieval.

The task required building NLP models capable of generalizing across diverse math problems, handling long-tail misconception categories, and integrating question context, student choices, and open-ended explanations.

Our solution pipeline consisted of four key stages:

## Stage 1 — Data Preprocessing

### Unified Joint Label Space
All training targets were mapped into a **single multi-class space**:  
`Category:Misconception` (with `NA` for non-misconception cases).  
This avoided cascading errors inherent to multi-stage models.

### Question-Level Correctness Prior
From training data, the **most frequently correct MC answer** was computed for each `QuestionId`.  
This enabled:

- A strong structural feature: **`Is Correct Answer: Yes/No`**  
- Later **family prefix filtering** (`True_` vs `False_`)

### Input Construction
Each model input concatenated:

- Question text  
- Selected answer  
- Correctness hint  
- Student explanation  

Tokenized with **max_length=256** using dynamic truncation.

---

## Stage 2 — Model Architecture and Training

### LLM Backbone (Qwen3 4B / 8B / 14B)
Since ttudent explanations contain free-form reasoning, linguistic variation, and mathematical logic, a single unified classifier captures all semantics and avoids misalignment across multi-step pipelines. Models were finetuned using **HuggingFace AutoModelForSequenceClassification**, producing a single-head classifier over the full joint label set.

### Parameter-Efficient LoRA Training
All experiments used **LoRA** applied to Q/V/O/gate/up/down projections.

Key training details:

- Precision: **4-bit (nf4)** or **BF16**
- LR schedule: **cosine** with warmup
- Gradient checkpointing + dynamic padding
- 2–3 epochs, batch size 8–16
- LoRA rank scaled by model size (e.g., r=512 for 4B → r=16 for 14B)



---

## Stage 3 — Inference and Postprocessing

### Top-25 Candidate Preservation
Each model exported a **Top-25 probability table**, allowing richer uncertainty modeling in the ensemble stage.

### Family Prefix Filtering (Key Innovation)
Using the correctness prior:

- If a row’s prefix should be `True_`, filter out all `False_*`
- If it should be `False_`, filter out all `True_*`

This sharply constrained the error space and reflected domain structure.

### Cross-Model Consistency Weighted Ensemble
Outputs from 4B, 8B, and 14B models were fused using:

1. **Weighted total probability** (0.34)  
2. **Cross-model consistency ratio** (0.33)  
3. **Max confidence across models** (0.33)

This balanced global support, agreement, and peak reliability.

### Completion Heuristics
If fewer than 3 predictions remained:

- Add `Neither:NA`
- For `True_` cases, optionally add `Correct:NA`

Ensuring fully valid MAP@3 submissions.

---

## Stage 4 — Evaluation and Results

### Leaderboard Scores

| Model | Precision | Method | Private LB |
|------|-----------|--------|------------|
| Qwen3-14B | 4-bit + LoRA | single model | **0.945** |
| Qwen3-8B | 4-bit + LoRA | single model | 0.944 |
| Qwen3-4B | FP16 + LoRA | single model | 0.944 |
| **Ensemble (4B + 8B + 14B)** | + family filtering | fused | **0.946** |

The ensemble improved upon the best individual model by **+0.001**, validating the benefit of structural priors and cross-model agreement.

---

## Code Reference

Full implementation of training, inference, LoRA configuration, quantization setup, and ensemble logic is detailed in [Github](https://github.com/chenfeng-huang/Kaggle_Silver_Medal_Solution_MAP)
