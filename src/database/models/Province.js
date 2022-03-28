module.exports = (sequelize,dataTypes) => {
    let alias = "Province"
    let cols = {
        id: {
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        province: {
            type:dataTypes.STRING
        }
    }
    let config = {
        tableName: "provinces",
        timestamps: false
    }

    const Province = sequelize.define(alias,cols,config)

    return Province
}