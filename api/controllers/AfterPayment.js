const AfterPayment = (req, res) => {
  const data = req.body;
  return res.status(200).json(data);
};

module.exports = AfterPayment;