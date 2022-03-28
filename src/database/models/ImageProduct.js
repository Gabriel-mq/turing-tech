module.exports = (sequelize, dataTypes) => {
    let alias = "ImageProduct"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        product_id: {
            type:dataTypes.INTEGER
        },
        product_image_route: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        timestamps: false
    }

    const ImageProduct = sequelize.define(alias,cols,config)

    return ImageProduct
}