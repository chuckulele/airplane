SELECT *
FROM
	reviews
	LEFT OUTER JOIN products
		ON reviews.product_id = products.product_id
WHERE review_id = :review_id;