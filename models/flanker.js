module.exports = function(sequelize, DataTypes) {
    return sequelize.define('flanker', {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        user_id: DataTypes.STRING(36), //CHAR(36)
        trial_index: DataTypes.INTEGER, 
        rt: DataTypes.INTEGER,
        type: DataTypes.STRING,
        direction: DataTypes.STRING,
        correct: DataTypes.STRING,
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