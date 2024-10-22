
const AfterPayment = (req, res) => {
  try {
    const data = req.params;
    return res.status(200).json({ message: "", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = AfterPayment;
