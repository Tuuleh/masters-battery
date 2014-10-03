module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tol', {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        user_id: DataTypes.STRING(36), //CHAR(36)
        trial_index: DataTypes.INTEGER,
        rt: DataTypes.INTEGER,
        moves: DataTypes.INTEGER,
        missed_by: DataTypes.INTEGER,
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