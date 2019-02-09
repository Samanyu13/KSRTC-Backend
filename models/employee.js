module.exports = function (sequelize, DataTypes) {
    const Employee = sequelize
      .define('employee', {
        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: 'compositeIndex',
        },
        employee_code: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
          unique: 'compositeIndex',
        },
        email: {
          type: DataTypes.STRING(40),
          allowNull: false,
          unique: 'compositeIndex',
        },
        mobile_no: {
          type: DataTypes.STRING(13),
          allowNull: false,
          unique: 'compositeIndex',
        },
        address: {
          type: DataTypes.STRING(60),
          allowNull: false,
          unique: 'compositeIndex',
        },
        city: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: 'compositeIndex',
        },
        state: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: 'compositeIndex',
        },
        pin: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            unique: 'compositeIndex',
        },
      // implement [index6 specified in db design] compositeIndex when sequelize
      // supports it.
      // https://github.com/sequelize/sequelize/issues/8148
      });
  
    return Employee;
};
  