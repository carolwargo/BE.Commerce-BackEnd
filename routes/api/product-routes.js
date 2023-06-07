const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// GET all Products (INCLUDE associations: Category & Tag)
router.get("/", (req, res) => {
  Product.findAll({
    attributes: ["id", "product_name", "price", "stock"],
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"],
      },
      {
        model: Tag,
        as: "product_tags",
        attributes: ["id", "tag_name"],
        through: { attributes: [] }, // Exclude join table attributes
      },
    ],
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single Product by ID (INCLUDE associations: Category & Tag)
router.get("/:id", (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "product_name", "price", "stock"],
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"],
      },
      {
        model: Tag,
        as: "product_tags",
        attributes: ["id", "tag_name"],
        through: { attributes: [] }, // Exclude join table attributes
      },
    ],
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No Product found with this id!" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a new Product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => ({
          product_id: product.id,
          tag_id,
        }));
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATE a Product by ID
router.put("/:id", (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      if (req.body.tagIds && req.body.tagIds.length) {
        return ProductTag.destroy({ where: { product_id: req.params.id } })
          .then(() =>
            ProductTag.bulkCreate(
              req.body.tagIds.map((tag_id) => ({
                product_id: req.params.id,
                tag_id,
              }))
            )
          )
          .then(() =>
            res.status(200).json({ message: "Product updated successfully." })
          )
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      } else {
        res.status(200).json({ message: "Product updated successfully." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// DELETE a Product by ID
router.delete("/:id", (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No Product found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
