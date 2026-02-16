import * as reviewService from '../services/reviewsService.js';

export async function getReviews(req, res, next) {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
}

export async function getReview(req, res, next) {
  try {
    const review = await reviewService.getReviewById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(review);
  } catch (err) {
    next(err);
  }
}

export async function createReview(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Bad request" });
    }

    const newReview = await reviewService.createReview(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
}

export async function updateReview(req, res, next) {
  try {
    const updated = await reviewService.updateReview(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteReview(req, res, next) {
  try {
    await reviewService.deleteReview(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
}
