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
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      await ProductTag.destroy({ where: { product_id: req.params.id } });
      const productTagIdArr = req.body.tagIds.map((tagId) => ({
        product_id: req.params.id,
        tag_id: tagId,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json({ message: "Product updated successfully." });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
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
