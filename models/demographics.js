module.exports = function(sequelize, DataTypes) {
    return sequelize.define('demographics', {
        user_id: {type: DataTypes.STRING(36), primaryKey: true}, //CHAR(36)
        birth_year: DataTypes.INTEGER(11),
        gender: DataTypes.STRING(10),
        level: DataTypes.INTEGER(11),
        summoner_name: {
            type: DataTypes.STRING(1000), 
            allowNull: false,
            validate: {
                len: {args: [2,100], msg: "Enter a summoner name of valid length."}
             }
        },
        region: DataTypes.STRING(11),
        position: DataTypes.STRING(11),
        role: DataTypes.STRING(11),
        plays_ai: DataTypes.STRING(11),        
        plays_normal_pvp: DataTypes.STRING(11),
        plays_non_team: DataTypes.STRING(11),
        plays_3v3: DataTypes.STRING(11),
        plays_5v5: DataTypes.STRING(11),
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
                    if (!this.plays_normal_pvp && !this.plays_ai && !this.plays_non_team && !this.plays_3v3 && !this.plays_5v5) {
                        throw new Error("Select your play style!");
                    }
                },
                error_plays_non_team: function() {
                    if (this.plays_non_team && (!this.non_team_queue || !this.non_team_division || !this.non_team_tier)) {
                        throw new Error("Select your queue style, division and tier for non-team games.");
                    }
                },
                error_plays_3v3: function() {
                    if (this.plays_3v3 && (((!this.team_3v3 || (this.team_3v3.length < 2 || this.team_3v3.length > 200)) || !this.division_3v3 || (!this.tier_3v3 && this.division_3v3 != 5)))) {
                        throw new Error("Enter a valid 3v3 team name, division and tier!");
                    }
                },
                error_plays_5v5: function() {
                    if (this.plays_5v5 && (((!this.team_5v5 || (this.team_5v5.length < 2 || this.team_5v5.length > 200)) || !this.division_5v5  || (!this.tier_5v5 && this.division_5v5 != 5)))) {
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