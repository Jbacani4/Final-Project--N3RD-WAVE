//404

const nA = (req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
  };
  
  const errHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  };
  
  module.exports = { nA, errHandler };