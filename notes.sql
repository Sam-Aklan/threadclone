SELECT
  t._id,
  t.id,
  t.name,
  t.image,
  u._id,
  u.id,
  u.name,
  u.image
FROM threads t
INNER JOIN users u ON t.author_id = u._id
LEFT JOIN threads c1 ON t._id = c1.parent_id
LEFT JOIN users u1 ON c1.author_id = u1._id
LEFT JOIN threads c2 ON c1._id = c2.parent_id
LEFT JOIN users u2 ON c2.author_id = u2._id
WHERE t._id = ?
