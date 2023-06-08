const router = require("express").Router();
const { Category, Product } = require("../../models");

//Category endpoint
// GET all categories
router.get("/", async (req, res) => {
  try {
    const data = await Category.findAll({
      attributes: ["id", "category_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET single category by ID (INCLUDE association)
router.get("/:id", async (req, res) => {
  try {
    const data = await Category.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "category_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });
    if (!data) {
      res.status(404).json({ message: "No Category found with this id! " });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new Category
router.post("/", async (req, res) => {
  try {
    const data = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE Category
router.put("/:id", async (req, res) => {
  try {
    const data = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!data[0]) {
      res.status(404).json({
        message:
          "No Category found with this id, so category name update could not be completed",
      });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE Category of ID
router.delete("/:id", async (req, res) => {
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: "No Category found with this id" });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
