module.exports = function(sequelize, DataTypes) {
    return sequelize.define('finish', {
        user_id: {type: DataTypes.STRING(36), primaryKey: true}, //CHAR(36)
        mail: {type: DataTypes.STRING(100), allowNull: true, validate: {isEmail: {msg: "Please enter a valid e-mail address!"}}}, //VARCHAR(100),
        message: DataTypes.TEXT,
        wants_results: DataTypes.INTEGER, //TINYINT,
        thank_you: DataTypes.INTEGER, //TINYINT
        created_at: DataTypes.DATE,
    },
    {
        timestamps: true,
        updatedAt: false,
        deletedAt: false,
        freezeTableName: true,
        createdAt: 'created_at',
    });
}