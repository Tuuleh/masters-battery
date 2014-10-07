module.exports = function(sequelize, DataTypes) {
    return sequelize.define('spatial_span', {
        user_id: {type: DataTypes.STRING(36), primaryKey: true}, //CHAR(36)
        created_at: DataTypes.DATE,
        max_correct: DataTypes.INTEGER,
        trials_run: DataTypes.INTEGER,
        max_length: DataTypes.INTEGER
    },
    {
        timestamps: true,
        updatedAt: false,
        deletedAt: false,
        freezeTableName: true,
        createdAt: 'created_at',
    });
}