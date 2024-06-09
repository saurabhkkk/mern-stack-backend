const express = require("express");
const itemController = require("../controllers/itemsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, itemController.getAllItems);
router.get("/search", authMiddleware, itemController.searchItems);
router.post("/", authMiddleware, itemController.createItem);
router.get("/:id", authMiddleware, itemController.getItemById);
router.put("/reorder", authMiddleware, itemController.reorderItems);
router.put("/:id", authMiddleware, itemController.updateItem);
router.delete("/:id", authMiddleware, itemController.deleteItem);

module.exports = router;
