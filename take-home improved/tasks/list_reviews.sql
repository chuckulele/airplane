SELECT reviews.*, banned_words.word, banned_words.severity
FROM reviews
LEFT OUTER JOIN banned_words
ON reviews.comment LIKE Concat('% ',banned_words.word,' %')
WHERE approved = 'Pending'
ORDER BY review_id ASC;