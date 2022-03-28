module.exports = (sequelize, dataTypes) => {
    let alias = "Discount"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        timestamps: false,
        tableName: "discounts"
    }

    const Discount = sequelize.define(alias,cols,config)

    Discount.associate = function(models){
        Discount.hasMany(models.Product,{
            as: "productos",
            foreignKey: "discount_id"
        })
    }

    return Discount
}