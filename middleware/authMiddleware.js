function auth(req, res, next) {
  const { role, pass } = req.body;
  if (role === 'admin' && pass === 'saveEarth') {
    next();
  } else {
    res.status(403).json({ message: 'Not Authorized' });
  }
}

module.exports = auth;
