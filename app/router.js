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
router.post("/addComment", productCon.addComment);
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


// // const upload = multer({ dest: "./public/uploads" });
// router.post("/upload", upload.single("image"), (req, res) => {

//   if (!req.file) {
//     return res.status(400).send("Error: No files found");
//   }

//   const blob = firebase.bucket.file(req.file.originalname);

//   const blobWriter = blob.createWriteStream({
//     metadata: {
//       contentType: req.file.mimetype,
//     },
//   });

//   blobWriter.on("error", (err) => {
//     console.log(err);
//   });
//     console.log(blobWriter);
//   blobWriter.on("finish", () => {
//                   const coverImageLink = `https://firebasestorage.googleapis.com/v0/b/${
//                     firebase.bucket.name
//                   }/o/${encodeURI(blob.name)}?alt=media`;

//     res.status(200).send(coverImageLink);
//   });

//   blobWriter.end(req.file.buffer);
// });


module.exports = router;