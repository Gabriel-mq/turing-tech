module.exports = (sequelize, dataTypes) => {
    let alias = "Brand"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        brand_name: {
            type: dataTypes.STRING
        }
    }
    let config = {
        timestamps: false,
        tableName: "brands"
    }

    const Brand = sequelize.define(alias,cols,config)

    Brand.associate = function(models){
        Brand.hasMany(models.Product,{
            as: "productos",
            foreignKey: "brand_id"
        })
    }

    return Brand
}