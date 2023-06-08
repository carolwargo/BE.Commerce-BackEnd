const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models/index");

// READ
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    // UPDATE
    await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    const updatedTag = await Tag.findByPk(req.params.id);
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    await Tag.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Tag deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
