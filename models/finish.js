module.exports = function(sequelize, DataTypes, validator) {
    return sequelize.define('finish', {
        user_id: {type: DataTypes.STRING(36), primaryKey: true}, 
        mail: {
            type: DataTypes.STRING(100), 
            default: null, 
            allowNull: true, 
            validate: {
                isEmail: {msg: "Your e-mail address is invalid!"}
            }
        },
        message: {
            type: DataTypes.TEXT, 
            default: null,
            allowNull: true, 
            validate: {
                len: {
                    args: [0,999], 
                    msg: "Your message is too long. You'll have to keep it below 1000 characters."
                }
            }
        },
        wants_results: DataTypes.STRING(4), 
        thank_you: DataTypes.STRING(4), 
        created_at: DataTypes.DATE,
    },
    {   
        validate: {

        },
        timestamps: true,
        updatedAt: false,
        deletedAt: false,
        freezeTableName: true,
        createdAt: 'created_at',
    });
}