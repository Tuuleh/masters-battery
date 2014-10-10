function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

module.exports = function(sequelize, DataTypes, validator) {
    return sequelize.define('finish', {
        user_id: {type: DataTypes.STRING(36), primaryKey: true}, 
        mail: {
            type: DataTypes.STRING(100), 
            default: null, 
            allowNull: true, 
        },
        message: {
            type: DataTypes.TEXT, 
            default: null,
            allowNull: true, 
            validate: {
                len: {
                    args: [0,999], 
                    msg: "Your message is too long. You'll have to keep it below 1000 characters."
                }
            }
        },
        wants_results: DataTypes.STRING(4), 
        thank_you: DataTypes.STRING(4), 
        created_at: DataTypes.DATE,
    },
    {   
        validate: {
            mail_error: function() {
                if ((isEmail(this.mail) === false) && (this.mail != "")) {
                    throw new Error("The e-mail address you entered is invalid.");
                }
                else if ((this.mail == "") && (this.wants_results == 'true')) {
                    throw new Error("You will have to enter a valid e-mail address so I can send you the results.");
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