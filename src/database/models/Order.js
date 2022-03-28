module.exports = (sequelize, dataTypes) => {
    let alias = "Order"
    let cols = {
        idorders: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        users_idusers: {
            type: dataTypes.INTEGER
        },
        products_idproducts: {
            type: dataTypes.INTEGER
        },
        statuses_idstatuses: {
            type: dataTypes.INTEGER
        },
        payments_idpayments: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        timestamps: false
    }

    const Order = sequelize.define(alias,cols,config)

    return Order
}