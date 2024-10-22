const Dlf = (req, res) => {
  const data = req.body;
  return res.status(200).json(data);
};

module.exports = Dlf;
