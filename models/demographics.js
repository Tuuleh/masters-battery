module.exports = function(sequelize, DataTypes) {
    return sequelize.define('demographics', {
        user_id: {type: DataTypes.STRING(36), primaryKey: true}, //CHAR(36)
        birth_year: DataTypes.INTEGER(11),
        gender: DataTypes.INTEGER(11),
        summoner_name: DataTypes.STRING(1000),
        region: DataTypes.INTEGER(11),
        position: DataTypes.INTEGER(11),
        role: DataTypes.INTEGER(11),
        non_team_queue: DataTypes.INTEGER(11),
        non_team_division: DataTypes.INTEGER(11), 
        non_team_tier: DataTypes.INTEGER(11),
        team_3v3:  DataTypes.STRING(1000),
        division_3v3: DataTypes.INTEGER(11),
        tier_3v3: DataTypes.INTEGER(11),
        team_5v5: DataTypes.STRING(1000),
        division_5v5: DataTypes.INTEGER(11),
        tier_5v5: DataTypes.INTEGER(11),
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