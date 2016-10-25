/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('tblusers', {
	id: {
	    type: DataTypes.INTEGER(11),
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true
	},
	username: {
	    type: DataTypes.STRING,
	    allowNull: true
	},
	password: {
	    type: DataTypes.STRING,
	    allowNull: true
	},
	salt: {
	    type: DataTypes.STRING,
	    allowNull: true
	}
    }, {
	tableName: 'tblusers',
	timestamps: false,
	createdAt: false,
	updatedAt: false
    });
};
