const express = require('express');
const router = express.Router();
const axios = require('axios');

// const detailApi = "https://www.dalipan.com/api/private?id=9360cf50be9991e6e8788489348a9c26";
// const resultApi = "https://www.dalipan.com/api/search?kw=%E7%94%B5%E5%BD%B1&page=1";

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/getList", async (req, res, next) => {
  try{
    const query = req.query.query;
    const page = req.query.page;
    const apiRes = await axios.get("https://www.dalipan.com/api/search", {
      params: {
        kw: query,
        page
      }
    });
    res.send(apiRes.data);
  }
  catch(err) {
    console.log(err);
  }
});

router.get("/getDetail", async (req, res, next) => {
  try {
    const id = req.query.id;
    console.log(id);
    const apiRes = await axios.get("https://www.dalipan.com/api/private", {
      params: {
        id: id
      },
      headers: {
        Referer: `https://www.dalipan.com/detail/${id}`,
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
      }
    });
    console.log(apiRes);
    res.send(apiRes.data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
