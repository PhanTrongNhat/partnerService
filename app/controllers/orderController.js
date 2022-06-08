const orderModel = require("../models/orderModels");
const userModel = require("../models/userModel");
const productModel = require("../models/productsModel");
function storeController() {
  const SELF = {};
  return {
    addOrder: async (req, res) => {
console.log(req.body);
      if (req.body && req.body.customerId) {
        let user = await userModel.findOne({ _id: req.body.customerId });

        if (!user) {
          res.status(403).send("user not found!");
        }
        for (let i = 0; i < req.body.listProducts.length; i++) {
          let products = await productModel.findOne({
            _id: req.body.listProducts[i]._id,
          });
        //   console.log(products);
          if (!products) {
              res.status(403).send("product not found!");
          }
        }


        const store = new orderModel(req.body);
        console.log(store);
        try {
          await store.save();
          res.send(store);
        } catch (error) {
          res.status(500).send(error);
        }
      } else {
        res.status(403).send("error1");
      }
    },
    getListStores: async (req, res) => {
      const stores = await orderModel.find({});
      try {
        res.send(stores);
      } catch (error) {
        res.status(500).send(error);
      }
    },
    getStore: async (req, res) => {
      try {
        let data;
        if (req.query._id) {
          data = await orderModel.findOne({ _id: req.query._id });
        } else {
          data = await orderModel.find();
        }

        if (req.query.page) {
          data = data.slice(req.query.page * 3, req.query.page * 3 + 3);
        }
        //console.log(data)
        res.status(200).send(data);
      } catch (err) {
        console.log(err);
        res.status(500).send("err");
      }
    },

    updateStore: async (req, res) => {
      console.log(req.body);
      try {
        const data = req.body;
        const post = await orderModel.findOneAndUpdate(
          { _id: data._id },
          data,
          {
            new: true,
          }
        );
        res.status(200).send(post);
      } catch (err) {
        console.log(err);
        res.status(500).send("err");
      }
    },
  };
}

module.exports = new storeController();
