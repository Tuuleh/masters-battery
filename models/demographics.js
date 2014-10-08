module.exports = function(sequelize, DataTypes) {
    return sequelize.define('demographics', {
        user_id: {type: DataTypes.STRING(36), primaryKey: true}, //CHAR(36)
        birth_year: DataTypes.INTEGER(11),
        gender: DataTypes.STRING(10),
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
        non_team_queue: DataTypes.STRING(10),
        non_team_division: DataTypes.INTEGER(11), 
        non_team_tier: DataTypes.INTEGER(11),
        team_3v3:  {
            type: DataTypes.STRING(1000), 
            allowNull: true, 
        },
        division_3v3: DataTypes.INTEGER(11),
        tier_3v3: DataTypes.INTEGER(11),
        team_5v5: {
            type: DataTypes.STRING(1000), 
            allowNull: true, 
        },
        division_5v5: DataTypes.INTEGER(11),
        tier_5v5: DataTypes.INTEGER(11),
        created_at: DataTypes.DATE
        },{   
            validate: {
                error_ranked_games: function() {
                    if (!this.plays_non_team && !this.plays_3v3 && !this.plays_5v5) {
                        throw new Error("Select what kinds of ranked games you play.");
                    }
                },
                error_plays_non_team: function() {
                    if (this.plays_non_team && !this.non_team_queue) {
                        throw new Error("Select your queue style for non-team games.");
                    }
                },
                error_plays_3v3: function() {
                    if (this.plays_3v3 && (!this.team_3v3 || (this.team_3v3.length < 2 || this.team_3v3.length > 100))) {
                        throw new Error("Enter a valid 3v3 team name, division and tier!");
                    }
                },
                error_plays_5v5: function() {
                    if (this.plays_5v5 && (!this.team_5v5 || (this.team_5v5.length < 2 || this.team_5v5.length > 100))) {
                        throw new Error("Enter a valid 5v5 team name, division and tier!");
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