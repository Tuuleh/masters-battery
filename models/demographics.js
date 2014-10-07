module.exports = function(sequelize, DataTypes) {
    return sequelize.define('demographics', {
        user_id: {type: DataTypes.STRING(36), primaryKey: true}, //CHAR(36)
        birth_year: DataTypes.INTEGER(11),
        gender: DataTypes.INTEGER(11),
        summoner_name: {
            type: DataTypes.STRING(1000), 
            allowNull: false,
            validate: {
                notEmpty: {msg: "Please enter your summoner name."},
                len: {args: [2,100], msg: "Name is of invalid length."}
             }
        },
        region: DataTypes.INTEGER(11),
        position: DataTypes.INTEGER(11),
        role: DataTypes.INTEGER(11),
        plays_non_team: DataTypes.INTEGER(11),
        plays_3v3: DataTypes.INTEGER(11),
        plays_5v5: DataTypes.INTEGER(11),
        non_team_queue: DataTypes.INTEGER(11),
        non_team_division: DataTypes.INTEGER(11), 
        non_team_tier: DataTypes.INTEGER(11),
        team_3v3:  DataTypes.STRING(1000),
        division_3v3: DataTypes.INTEGER(11),
        tier_3v3: DataTypes.INTEGER(11),
        team_5v5: DataTypes.STRING(1000),
        division_5v5: DataTypes.INTEGER(11),
        tier_5v5: DataTypes.INTEGER(11),
        created_at: DataTypes.DATE
        },{   
            validate: {
                ranked_games: function() {
                    if ((this.plays_non_team === null) && (this.plays_3v3 === null) && (this.plays_5v5 === null)) {
                        throw new Error("Select what kinds of ranked games you play.");
                    }
                }
            },
            timestamps: true,
            updatedAt: false,
            deletedAt: false,
            freezeTableName: true,
            createdAt: 'created_at',
        });
}