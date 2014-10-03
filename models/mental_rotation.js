module.exports = function(sequelize, DataTypes) {
    return sequelize.define('mental_rotation', {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        user_id: DataTypes.STRING(36), //CHAR(36)
        trial_index: DataTypes.INTEGER,
        correct: DataTypes.STRING, 
        rt: DataTypes.INTEGER,
        item: DataTypes.STRING,
        type: DataTypes.STRING,
        rotation: DataTypes.INTEGER,
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