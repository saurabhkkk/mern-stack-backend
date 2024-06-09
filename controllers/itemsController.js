// controllers/itemController.js
const Item = require("../models/Items");

exports.getAllItems = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const items = await Item.find()
      .sort({ order: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Item.countDocuments();
    res.json({
      items,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createItem = async (req, res) => {
  console.log("bye");
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: "Invalid item data" });
  }
};

exports.updateItem = async (req, res) => {
  console.log("hello in updateItem controller function");
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: "Invalid item data" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.searchItems = async (req, res) => {
  console.log("Reached searchItems controller function");
  const { query } = req.query;
  try {
    const items = await Item.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.reorderItems = async (req, res) => {
  console.log("Reached reorderItems controller function");
  try {
    const { items } = req.body;

    for (let i = 0; i < items.length; i++) {
      await Item.findByIdAndUpdate(items[i]._id, { order: items[i].order });
    }

    res.json({ message: "Items reordered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
