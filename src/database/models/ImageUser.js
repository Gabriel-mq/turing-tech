module.exports= (sequelize, dataTypes) => {
    let alias = 'ImageUser'
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        user_image_route: {
            type: dataTypes.STRING,
        }
    }
    let config = {
        timestamps: false
    }
    const ImageUser = sequelize.define(alias,cols,config)

    return ImageUser
}