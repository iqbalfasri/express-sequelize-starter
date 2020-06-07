function isAuthenticated (req, res, next) {
  const token = req.body.token || req.query.token || req.headers.authorization; // mengambil token di antara request
  if (token) { // jika ada token
    jwt.verify(token, 'jwtsecret', function (err, decoded) { // jwt melakukan verify
      if (err) { // apa bila ada error
        res.json({ message: 'Failed to authenticate token' }); // jwt melakukan respon
      } else { // apa bila tidak error
        req.decoded = decoded; // menyimpan decoded ke req.decoded
        next(); // melajutkan proses
      }
    });
  } else { // apa bila tidak ada token
    return res.status(403).send({ message: 'No token provided.' }); // melkukan respon kalau token tidak ada
  }
}