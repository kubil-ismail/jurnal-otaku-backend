const model = require("../../models");
const setRedis = require("../../utils/setRedis");

module.exports = {
  getBanner: (req, res) => {
    model.banner
      .findAll()
      .then((result) => {
        // Set data to redis for 10 seconds
        setRedis(req.originalUrl, JSON.stringify(result));
        res.json({
          status: "OK",
          messages: "",
          data: result,
        });
      })
      .catch((error) =>
        res.json({
          status: "ERROR",
          messages: error.message,
          data: null,
        })
      );
  },
  addBanner: (req, res) => {
    const requestBody = req.body;

    model.banner
      .create(requestBody)
      .then((result) => {
        if (!result) throw new Error("Failed insert data");

        res.status(201).json({
          status: "OK",
          messages: "insert success",
          data: null,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message || "Something wrong",
          data: null,
        })
      );
  },
  editBanner: (req, res) => {
    const id = req.params.id;
    const requestBody = req.body;
    model.banner
      .update(requestBody, {
        where: {
          id,
        },
      })
      .then((result) => {
        if (!result) throw new Error("Failed edit data");

        res.status(200).json({
          status: "OK",
          messages: "edit success",
          data: null,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message || "Something wrong",
          data: null,
        })
      );
  },
  deleteBanner: (req, res) => {
    const id = req.params.id;
    model.banner
      .destroy({ where: { id } })
      .then((result) => {
        if (!result) throw new Error("Failed delete data");

        res.status(200).json({
          status: "OK",
          messages: "delete success",
          data: null,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message || "Something wrong",
          data: null,
        })
      );
  },
};
