---
title: Reading an ROC curve as a lending decision
description: Every point on a credit model's ROC curve is a policy someone has to sign off on. Here is how to read it that way.
date: 2026-10-29
tags: [credit risk, model evaluation]
---

ROC-AUC is the number credit-risk teams report most, and the one that tells a lending business the least on its own. An AUC of 0.78 says how well the model *ranks* applicants. It doesn't say how many people to approve, how much fraud will slip through, or what the portfolio will lose. Those answers sit on the curve, not under it.

## The curve is a menu of policies

A scoring model gives each applicant a probability of default. To make a decision you pick a cutoff: approve everyone below it, decline everyone above it. Every cutoff produces two numbers:

- **True positive rate**: the share of eventual defaulters you declined.
- **False positive rate**: the share of good customers you declined along with them.

Slide the cutoff from strict to lenient and you trace the ROC curve. Every point on it is a real, shippable policy. The curve on the [home page](/#lab) is interactive for this reason. Drag the threshold and watch the trade-off move.

## Where the business lives on the curve

A model with a high AUC can still be a bad fit if it's only strong in the wrong region. Lenders rarely operate at the "balanced" point. A growth-stage lender approving 80% of applicants cares about the far end of the curve, where it declines only the riskiest slice. A conservative bank lives at the other end.

So before comparing two models, ask which approval rate the business will actually run at, and compare the curves *there*. Partial AUC over the relevant false-positive range, or plainly the default rate at the target approval rate, often settles a debate that full AUC can't.

## Translate rates into money

The final step is the one auditors and CFOs care about. At a given cutoff:

- Declined defaulters × average loss given default = **losses avoided**
- Declined good customers × expected margin per loan = **revenue forgone**

The best threshold is wherever the marginal loss avoided stops paying for the marginal revenue forgone. That point moves with interest rates, collection efficiency and the marketing budget, while the model stays the same. This is why the threshold should be a business parameter that someone owns, not a constant buried in the deployment code.

## In short

Report AUC to compare ranking quality. Make decisions on the curve: pick the operating region first, evaluate models there, and price every cutoff in currency before anyone signs off on it.
