const { db } = require("../database/db.js");

const addOrder = async (req, res) => {
  const addOrders = "INSERT INTO `cafeorders` (`price`,`items`,`address`) VALUES (?,?,?)";

  const values = [req.body.price, JSON.stringify(req.body.items), JSON.stringify(req.body.address)];
  try {
    await new Promise((resolve, reject) => {
      db.query(addOrders, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    res.status(200).json("Your order added");
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error)
  }
};

const getOrders = (req, res) => {
  const getOrders = "SELECT * FROM `cafeorders`";
  try{
    db.query(getOrders, (err, data) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(data);
      }
    });
  }catch(err){
    res.status(500).json(err)
  }
};

const getSingleOrder = (req, res) => {
  const { id } = req.params;
  const getSingleOrder = "SELECT * FROM `cafeorders` WHERE `id`=?";
  db.query(getSingleOrder, [id], (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

const deleteOrder = (req, res) => {
  const { id } = req.params;
  const getSingleOrder = "DELETE FROM `cafeorders` WHERE `id`=?";
  db.query(getSingleOrder, [id], (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

const updateStatus = (req, res) => {
  const { id } = req.params;
  const updateStatus = "UPDATE `cafeorders` SET `status`=? WHERE `id`=?";

  const values = [req.body.status, id];
  db.query(updateStatus, values, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

module.exports = {
  addOrder,
  getOrders,
  getSingleOrder,
  updateStatus,
  deleteOrder,
};
