module.exports = (sequelize, dataTypes) => {
    let alias = "Payment"
    let cols = {
        idpayments: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        payments_methods: {
            type: dataTypes.STRING
        }
    }
    let config = {
        timestamps: false
    }

    const Payment = sequelize.define(alias,cols,config)

    return Payment
}