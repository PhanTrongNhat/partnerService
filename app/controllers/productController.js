const productModel = require("../models/productsModel");
const userModel = require("../models/userModel");
const firebase = require("../../firebase");
function ProductController() {
  const SELF = {};
  return {
    addProduct: async (req, res) => {
   
      if (req.file && req.body) {
        try {
          console.log(req.file);
          const blob = firebase.bucket.file(req.file.originalname);

          const blobWriter = blob.createWriteStream({
            metadata: {
              contentType: req.file.mimetype,
            },
          });
console.log(1);
          blobWriter.on("error", (err) => {
            console.log(err);
          });
          const coverImageLink = `https://firebasestorage.googleapis.com/v0/b/${
            firebase.bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`;
          console.log(coverImageLink);

          blobWriter.end(req.file.buffer);
          const data = {
            ...req.body,
            image: coverImageLink,
          };
console.log(data);
          const product = new productModel(data);

          const result = await product.save();
          res.status(200).send(result);
        } catch (error) {
          res.status(500).send(error);
        }
      }else{
        res.status(403).send("data not found!");
      }
     
    },
    getProductsList: async (req, res) => {
       try {
           const pageOptions = {
             page: parseInt(req.query.page, 10) || 0,
             limit: parseInt(req.query.limit, 10) || 10,
           };

        //  const products = 
          productModel
           .find({})
           .skip(pageOptions.page * pageOptions.limit)
           .limit(pageOptions.limit)
           .exec(function (err, doc) {
             if (err) {
               res.status(500).json(err);
               return;
             }
             res.status(200).json(doc);
           });


       



        //  res.send(products);
       } catch (error) {
         res.status(500).send(error);
       }
    },
    getProduct: async (req, res) => {
      try {
        let data;
        if (req.query._id) {
          data = await productModel.findOne({ _id: req.query._id });
        } else {
          data = await productModel.find();
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

    addComment: async (req, res) => {
      console.log(req.body);
      if (req.body.userId && req.body.productId) {
        try {
          const data = req.body;
          const productId = await productModel.findOne({ _id: data.productId });
          if (!productId) {
            throw "sản phẩm không tồn tại!";
          }
          const userId = await userModel.findOne({ _id: data.userId });
          if (!userId) {
            throw "user không tồn tại!";
          }
          const result = await productModel.findOneAndUpdate(
            { _id: data.productId },
            {
              $push: { comments: data },
            },
            { upsert: true }
          );

          res.status(200).send(result);
        } catch (err) {
          console.log(err);
          res.status(500).send(err);
        }
      } else {
        res.status(404).send("data not found!");
      }
    },
    updateProduct: async (req, res) => {
      try {
        const data = req.body;
        const post = await productModel.findOneAndUpdate(
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
  //   updateComment: async (req, res) => {
  //     if (req.body.commentId && req.body.productId && req.body.content) {
  //       const data = req.body;
  //       try {
  //         const data = req.body;

  //         // await itemModel.findOneAndDelete({ _id: data._id });
  //         // const productId = await itemModel.findOneAndDelete({
  //         //   _id: data._id,
  //         // });
  //         const productId = await productModel.findOne({
  //           _id: data.productId,
  //         });
  //         if (!productId) {
  //           throw "sản phẩm không tồn tại!";
  //         }
  //         // const userId = await userModel.findOne({ _id: data.userId });
  //         // if (!userId) {
  //         //   throw "user không tồn tại!";
  //         // }
  //         console.log(data);
  //         const result = await productModel.findOneAndUpdate(
  //           {_id: data.productId}, {comments[_id]:data.commentId } ,
  //           { $set:{content : data.content}  },
  //           { new: true }
  //         );

  //         res.status(200).send(result);
  //       } catch (err) {
  //         console.log(err);
  //         res.status(500).send(err);
  //       }
  //     } else {
  //       res.status(404).send("data not found!");
  //     }
  // },
  
  findProducts:async(req, res)=>{
    console.log(req.query);
      if(req.query.name){
           const pageOptions = {
             page: parseInt(req.query.page, 10) || 0,
             limit: parseInt(req.query.limit, 10) || 10,
           };
       const result = await productModel
         .find({
           name: { $regex: req.query.name },
         })
         .skip(pageOptions.page * pageOptions.limit)
         .limit(pageOptions.limit)
         .exec(function (err, doc) {
           if (err) {
             res.status(500).json(err);
             return;
           }
           res.status(200).json(doc);
         });
        // res.status(200).send(result);
      }else{
        res.status(403).send("no data input!");
      }
  },
    deleteComment: async (req, res) => {
      if (req.body.commentId && req.body.productId) {
        const data = req.body;
        try {
          const data = req.body;
 
   
          // await itemModel.findOneAndDelete({ _id: data._id });
          // const productId = await itemModel.findOneAndDelete({
          //   _id: data._id,
          // });
           const productId = await productModel.findOne({
             _id: data.productId,
           });
          if (!productId) {
            throw "sản phẩm không tồn tại!";
          }
          // const userId = await userModel.findOne({ _id: data.userId });
          // if (!userId) {
          //   throw "user không tồn tại!";
          // }
          console.log(data);
        const result = await productModel.findOneAndUpdate(
          { _id: data.productId },
          { $pull: { comments: { _id: data.commentId } } },
          { new: true }
        );

          res.status(200).send(result);
        } catch (err) {
          console.log(err);
          res.status(500).send(err);
        }
      } else {
        res.status(404).send("data not found!");
      }
  },
}
}
module.exports = new ProductController();
