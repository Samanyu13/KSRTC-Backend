module.exports = function (sequelize, DataTypes) {
    const EmployeeCredentials = sequelize
      .define('employee_credentials', {
        id: {
          type: DataTypes.INTEGER(),
          primaryKey: true,
          autoIncrement: true,
        },
        employee_code: {
          type: DataTypes.INTEGER(),
          allowNull: false,
          unique: 'compositeIndex',

        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: 'compositeIndex',
        },
      // implement [index6 specified in db design] compositeIndex when sequelize
      // supports it.
      // https://github.com/sequelize/sequelize/issues/8148
      });
  
      EmployeeCredentials.associate = function (models) {
          models.employee_credentials
          .belongsTo(models.employee, {
            onDelete: 'CASCADE',
            
            foreignKey: {
              name: 'employee_code',
            },
          });
      };
  
    return EmployeeCredentials;
};
  