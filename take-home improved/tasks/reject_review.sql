UPDATE reviews
SET approved = 'Rejected'
WHERE review_id = :review_id;