module.exports = (sequelize, dataTypes) => {
    let alias = "Product"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        product_name: {
            type: dataTypes.STRING
        },
        product_description: {
            type: dataTypes.STRING
        },
        product_descriptionplus: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.DECIMAL
        },
        stock: {
            type: dataTypes.INTEGER
        },
        visibility: {
            type:dataTypes.BOOLEAN
        },
        imageProduct: {
            type:dataTypes.STRING
        },
        sliced: {
            type:dataTypes.STRING
        },
        product_fees: {
            type:dataTypes.INTEGER
        },
        product_main: {
            type:dataTypes.BOOLEAN
        },
        categorie_id: {
            type: dataTypes.INTEGER
        },
        brand_id: {
            type: dataTypes.INTEGER
        },
        discount_id: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        timestamps: false,
        tableName: "products"
    }

    const Product = sequelize.define(alias,cols,config)

    Product.associate = function(models) {
        Product.belongsTo(models.Categorie,{
            as: "categorie",
            foreignKey: "categorie_id"
        })

        Product.belongsTo(models.Brand, {
            as: "brand",
            foreignKey: "brand_id"
        })

        Product.belongsTo(models.Discount,{
            as: "discount",
            foreignKey: "discount_id"
        })
    }

    return Product
}