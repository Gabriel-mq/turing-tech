module.exports = (sequelize, dataTypes) => {
    let alias = "Rol"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        rol_name: {
            type: dataTypes.STRING
        }
    }
    let config = {
        timestamps: false,
        tableName: "roles"
    }

    const Rol = sequelize.define(alias,cols,config)

    Rol.associate = function(models){
        Rol.hasMany(models.User,{
            as: "usuarios",
            foreignKey: "rol_id"
        })
    }

    return Rol
}