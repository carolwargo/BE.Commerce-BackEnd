const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

//Product endpoint
// GET all / FIND allProduct (INCLUDE associations: Category & Tag)
router.get("/", async (req, res) => {
  try {
    const data = await Product.findAll({   
      include: [{model: Category, model: Tag}]   
    })
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET single Product by ID (INCLUDE associations: Category & Tag)
router.get("/:id", async (req, res) => {
  try {
    const data = await Product.findOne({
      include: [{model: Category, model: Tag}]        
    })
    if (!data) {
      res.status(404).json({ message: "No Product found with this id!" });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE a new Product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      return ProductTag.bulkCreate(productTagIdArr);
    }
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
      await ProductTag.bulkCreate(
        req.body.tagIds.map((tag_id) => ({
          product_id: req.params.id,
          tag_id,
        }))
      );
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
