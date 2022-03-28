module.exports = (sequelize, dataTypes) => {
    let alias = "Adress"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        fiscal_adress: {
            type: dataTypes.STRING
        },
        department: {
            type: dataTypes.STRING,
            allowNull: true
        },
        postal_code: {
            type: dataTypes.INTEGER
        },
        locality: {
            type: dataTypes.STRING
        }
    }
    let config = {
        timestamps: false,
        tableName: "adresses"
    }

    const Adress = sequelize.define(alias,cols,config)

/*     Adress.associate = function(models){
        Adress.belongsTo(models.User,{
            as: "usuario",
            foreignKey: "adress_id"
        })
    } */

    return Adress
}