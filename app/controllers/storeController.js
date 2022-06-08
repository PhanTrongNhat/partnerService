const storeModel = require("../models/storesModels");
const firebase = require("../../firebase");
function storeController() {
  const SELF = {};
  return {
    addStore: async (req, res) => {
      console.log(req.files);
      if (req.body.managerId) {
        if (!req.files || req.files?.length != 3) {
          return res.status(400).send("Error: No files found");
        }
        try {
          let blob = firebase.bucket.file(req.files[0].originalname);

          let blobWriter = blob.createWriteStream({
            metadata: {
              contentType: req.files[0].mimetype,
            },
          });

          blobWriter.on("error", (err) => {
            console.log(err);
          });
          let coverImageLink = `https://firebasestorage.googleapis.com/v0/b/${
            firebase.bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`;

          blobWriter.end(req.files[0].buffer);

          blob = firebase.bucket.file(req.files[1].originalname);

          blobWriter = blob.createWriteStream({
            metadata: {
              contentType: req.files[1].mimetype,
            },
          });

          blobWriter.on("error", (err) => {
            console.log(err);
          });
          let GPKDImgae = `https://firebasestorage.googleapis.com/v0/b/${
            firebase.bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`;

          blobWriter.end(req.files[1].buffer);

          blob = firebase.bucket.file(req.files[2].originalname);

          blobWriter = blob.createWriteStream({
            metadata: {
              contentType: req.files[2].mimetype,
            },
          });

          blobWriter.on("error", (err) => {
            console.log(err);
          });
          let CNATTPImgae = `https://firebasestorage.googleapis.com/v0/b/${
            firebase.bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`;

          blobWriter.end(req.files[2].buffer);

          const data = {
            ...req.body,
            image: coverImageLink,
            GPKD: GPKDImgae,
            CNATTP: CNATTPImgae,
          };
          const store = new storeModel(data);
          await store.save();
          res.send(store);
        } catch (error) {
          res.status(500).send(error);
        }
      } else {
        res.status(403).send("user not found!");
      }
    },
    getListStores: async (req, res) => {
      const stores = await storeModel.find({});
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
          data = await storeModel.findOne({ _id: req.query._id });
        } else {
          data = await storeModel.find();
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
        const post = await storeModel.findOneAndUpdate(
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
