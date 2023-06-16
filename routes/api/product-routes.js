const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// GET all products (INCLUDE associations: Category & Tag)
router.get("/", async (req, res) => {
  try {
    const data = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag },
      ],
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET single product by ID (INCLUDE associations: Category & Tag)
router.get("/:id", async (req, res) => {
  try {
    const data = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: Category },
        {
          model: Tag,
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!data) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE a new product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// UPDATE a Product
router.put("/:id", async (req, res) => {
  try {
    const data = await Product.update(
      {
        product_name: req.body.category_name,
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
          "No Category found with this id, so Product name update could not be completed",
      });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE a Product by ID
router.delete("/:id", async (req, res) => {
  try {
    const data = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: "No Product found with this id" });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
