const express = require("express");
const router = express.Router();
const productCon = require("./controllers/productController");
const storeController = require("./controllers/storeController");
const orderController = require("./controllers/orderController");
const multer = require("multer");
const firebase = require("../firebase");
const upload = multer({
  storage: multer.memoryStorage(),
});
//Product
router.post("/addProduct",upload.single("image"), productCon.addProduct);
router.get("/getProductList", productCon.getProductsList);
router.get("/findProducts", productCon.findProducts);
router.get("/getProduct", productCon.getProduct);
router.post("/updateProduct", productCon.updateProduct);
router.post("/addComment", productCon.addComment);
router.post("/deleteProduct", productCon.deleteProduct);

router.post("/deleteComment", productCon.deleteComment);
// router.post("/updateComment", productCon.updateComment);
//Store
router.post("/addStore", upload.array("image", 3), storeController.addStore);
router.get("/getListStores", storeController.getListStores);
router.get("/getStore", storeController.getStore);
router.post("/updateStore", storeController.updateStore);
//order
router.post("/addOrder", orderController.addOrder);
router.get("/getListOrder", storeController.getListStores);
router.get("/getOrder", storeController.getStore);
router.post("/updateOrder", storeController.updateStore);


module.exports = router;