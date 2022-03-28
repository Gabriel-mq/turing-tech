// ESTO SERIA EL GESTOR DEL MODELO
const db = require('../database/models')
const path = require('path')
const fs = require('fs'),
  { validationResult } = require('express-validator')

const productController = {
  index: (req, res) => {
    res.render('products/index')
  },
  productCart: (req, res) => {
    res.render('products/productCart')
  },
  productDetail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        { association: 'brand' },
        { association: 'categorie' },
        { association: 'discount' },
      ],
    }).then((productDetail) => {
      return res.render('products/productDetail', { productDetail })
    })
  },
  productos: (req, res) => {
    res.render('products/productos')
  },
  productAddGet: (req, res) => {
    let brands = db.Brand.findAll(),
      categories = db.Categorie.findAll(),
      discounts = db.Discount.findAll()

    Promise.all([brands, categories, discounts]).then(
      ([brands, categories, discounts]) => {
        return res.render('products/productAdd', {
          brands,
          categories,
          discounts,
        })
      },
    )
  },
  productAddPost: (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      let sliced

      if (req.file) {
        sliced = req.file.path.slice(
          req.file.path.indexOf('productos-assets'),
          req.file.path.length,
        )
      } else {
        sliced = 'productos-assets/default-incorrect.png'
      }

      db.Product.create({
        product_name: req.body.productName,
        product_description: req.body.productDescription,
        product_descriptionplus: req.body.productDescriptionLong,
        price: req.body.productPrice,
        stock: req.body.productStock,
        visibility: req.body.productVisibility,
        imageProduct: req.file.filename,
        sliced: sliced,
        product_fees: req.body.productFees,
        product_main: req.body.productImportant,
        categorie_id: req.body.productCategory,
        brand_id: req.body.productBrand,
        discount_id: req.body.productDiscount,
      }).then(() => {
        return res.redirect(`/products/${req.body.productCategory}`)
      })
    } else {
      let brands = db.Brand.findAll(),
        categories = db.Categorie.findAll(),
        discounts = db.Discount.findAll()

      Promise.all([brands, categories, discounts]).then(
        ([brands, categories, discounts]) => {
          return res.render('products/productAdd', {
            brands,
            categories,
            discounts,
            errors: errors.mapped(),
            old: req.body,
          })
        },
      )
    }
  },
  productEdit: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        { association: 'brand' },
        { association: 'categorie' },
        { association: 'discount' },
      ],
    }).then((productEdit) => {
      let brands = db.Brand.findAll(),
        categories = db.Categorie.findAll(),
        discounts = db.Discount.findAll()

      Promise.all([brands, categories, discounts]).then(
        ([brands, categories, discounts]) => {
          return res.render('products/productEdit', {
            brands,
            categories,
            discounts,
            productEdit,
            old: req.body,
          })
        },
      )
    })
  },
  productPut: (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      db.Product.findOne({
        where: {
          id: req.params.id,
        },
      }).then((product) => {
        let sliced

        if (
          req.file &&
          product.sliced !== 'productos-assets/default-incorrect.png'
        ) {
          fs.unlinkSync(
            path.resolve(__dirname, `../../public/images/${product.sliced}`),
          )

          sliced = req.file.path.slice(
            req.file.path.indexOf('productos-assets'),
            req.file.path.length,
          )
        }

        db.Product.update(
          {
            product_name: req.body.productName,
            product_description: req.body.productDescription,
            product_descriptionplus: req.body.productDescriptionLong,
            price: req.body.productPrice,
            stock: req.body.productStock,
            visibility: req.body.productVisibility,
            imageProduct: req.file.filename,
            sliced: sliced,
            product_fees: req.body.productFees,
            product_main: req.body.productImportant,
            categorie_id: req.body.productCategory,
            brand_id: req.body.productBrand,
            discount_id: req.body.productDiscount,
          },
          {
            where: {
              id: req.params.id,
            },
          },
        ).then(() => {
          return res.redirect('/products/Procesadores')
        })
      })
    } else {
      let brands = db.Brand.findAll(),
        categories = db.Categorie.findAll(),
        discounts = db.Discount.findAll()

      Promise.all([brands, categories, discounts]).then(
        ([brands, categories, discounts]) => {
          return res.render('products/productAdd', {
            brands,
            categories,
            discounts,
            errors: errors.mapped(),
            old: req.body,
          })
        },
      )
    }
  },
  productDelete: (req, res) => {
    db.Product.findOne({
      where: {
        id: req.params.id,
      },
    }).then((product) => {
      if (product.sliced !== 'default-incorrect.png') {
        fs.unlinkSync(
          path.resolve(
            __dirname,
            `../../public/images/${product.sliced}`,
          ),
        )
      }

      db.Product.destroy({
        where: {
          id: req.params.id,
        },
      }).then(() => {
        return res.redirect('/products/Procesadores')
      })
    })
  },
  productCategory: (req, res) => {
    let products = db.Product.findAll(),
      categories = db.Categorie.findAll()

    Promise.all([products, categories]).then(([products, categories]) => {
      let productsFiltered = []

      for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < categories.length; j++) {
          if (
            products[i].categorie_id === categories[j].id &&
            categories[j].categorie_name === req.params.productCategory
          ) {
            productsFiltered.push(products[i])
          }
        }
      }

      res.render('products/productos', { productsFiltered })
    })
  },
  search: (req, res) => {
    let searched = req.query.search.toLowerCase()

    db.Product.findAll().then((products) => {
      let productsResults = []

      for (let i = 0; i < products.length; i++) {
        if (products[i].product_name.toLowerCase().includes(searched)) {
          productsResults.push(products[i])
        }
      }

      res.render('products/results', { productsResults })
    })
  },
}

module.exports = productController
