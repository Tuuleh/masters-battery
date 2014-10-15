module.exports = function(sequelize, DataTypes) {
    return sequelize.define('participants', {
        user_id: {type: DataTypes.STRING(36), primaryKey: true}, //CHAR(36)
        user_agent: DataTypes.STRING(200)
    },
    {
        timestamps: false,
        freezeTableName: true
    });
}