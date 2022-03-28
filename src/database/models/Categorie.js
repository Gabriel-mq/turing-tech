module.exports = (sequelize, dataTypes) => {
    let alias = "Categorie"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        categorie_name: {
            type: dataTypes.STRING
        }
    }
    let config = {
        timestamps: false,
        tableName: "categories"
    }

    const Categorie = sequelize.define(alias,cols,config)

    Categorie.associate = function(models){
        Categorie.hasMany(models.Product,{
            as: "productos",
            foreignKey: "categorie_id"
        })
    }

    return Categorie
}