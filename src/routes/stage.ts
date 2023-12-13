import express from "express";
const router = express.Router();
import stageController from "../controllers/stageController";
const {verifyToken} = require("../middlewares/verifyToken")

// CREATE STAGE 
router.post("/", verifyToken ,stageController.createStage);
//UPDATE STAGE
router.put("/:id", verifyToken ,stageController.updateStage);
//DELETE STAGE
router.delete("/:id", verifyToken , stageController.deleteStage);
//GET STAGE BY ID
router.get("/:id" ,stageController.getStageById);


module.exports = router