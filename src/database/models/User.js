module.exports = (sequelize, dataTypes) => {
    let alias = 'User'
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        rol_id: {
            type: dataTypes.INTEGER
        },
/*         adress_id: {
            type: dataTypes.INTEGER,
        }, */
        user_fullname: {
            type: dataTypes.STRING,
        },
        user_nickname: {
            type: dataTypes.STRING,
        },
        user_email: {
            type: dataTypes.STRING,
        },
        user_dni: {
            type: dataTypes.INTEGER,
        },
        user_cellphone: {
            type: dataTypes.INTEGER,
        },
        user_lock: {
            type:dataTypes.STRING
        },
        user_lockrepeat: {
            type:dataTypes.STRING
        },
        imageUser: {
            type:dataTypes.STRING
        },
        administrator: {
            type: dataTypes.BOOLEAN
        }
    }
    let config = {
        timestamps: false,
        tableName: "users"
    }
    const User = sequelize.define(alias,cols,config)

    User.associate = function(models){
        User.belongsTo(models.Rol,{
            as: "rol",
            foreignKey: "rol_id"
        })
        
        /* User.belongsTo(models.Adress,{
            as: "direccion",
            foreignKey: "adress_id"
        }) */
    }

    return User
}