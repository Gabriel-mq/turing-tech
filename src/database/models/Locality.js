module.exports = (sequelize,dataTypes) => {
    let alias = "Locality"
    let cols = {
        id: {
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        locality: {
            type:dataTypes.STRING
        }
    }
    let config = {
        tableName: "localities",
        timestamps: false
    }

    const Locality = sequelize.define(alias,cols,config)

    return Locality
}