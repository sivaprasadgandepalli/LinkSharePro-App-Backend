const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middlewares/linksMiddleware");
const { addLink,editLink,removeLink,getAllLinks } = require("../controllers/linksController")



router.post("/addNewLink", verifyUser,addLink);
router.post("/updateLink",editLink);
router.post("/removeLink",removeLink);
router.get("/getAllLinks/:userId",getAllLinks);
module.exports = router;