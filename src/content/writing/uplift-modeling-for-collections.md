---
title: "Uplift modeling for collections: who should we actually call?"
description: Predicting who will pay is the wrong target for a collections team. Predicting who will pay *because you called* is the right one.
date: 2026-10-29
tags: [causal inference, uplift modeling]
draft: true
---

A collections team has a fixed number of agents and a long list of late accounts. The intuitive model ranks accounts by probability of repayment. The problem: the customers most likely to pay are often the ones who would have paid anyway. Calling them spends capacity and changes nothing.

## Four kinds of customers

Uplift modeling splits the population by how they respond to a treatment (a call, an SMS, a payment-plan offer):

- **Persuadables** pay only if contacted. This is where the effort belongs.
- **Sure things** pay either way. Contacting them is wasted cost.
- **Lost causes** won't pay either way.
- **Sleeping dogs** respond *worse* when contacted. They exist, and a response model will happily target them.

## What changes in practice

The target becomes the difference between two outcomes, treated and untreated, which you never observe for the same person. That makes randomized holdout groups non-negotiable: without them there is nothing to learn the counterfactual from and nothing to evaluate against.

Evaluation changes too. Instead of ROC-AUC, uplift models are judged with Qini or uplift curves, which show the incremental repayments gained as you contact more of the ranked list.

*Draft. To be expanded with modeling approaches (T-learner, X-learner, direct uplift trees) and lessons from production.*
