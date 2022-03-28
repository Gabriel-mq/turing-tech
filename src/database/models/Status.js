module.exports = (sequelize, dataTypes) => {
    let alias = "Status"
    let cols = {
        idstatuses: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        status: {
            type: dataTypes.STRING
        }
    }
    let config = {
        timestamps: false
    }

    const Status = sequelize.define(alias,cols,config)

    return Status
}