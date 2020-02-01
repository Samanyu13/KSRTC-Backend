module.exports = function (sequelize, DataTypes) {
    const BusLog = sequelize
      .define('bus_log', {
        bus_no: {
          type: DataTypes.STRING(10),
          allowNull: false,          
        },
        reg_no: {
          type: DataTypes.STRING(12),
          allowNull: false,
        },
        bus_make: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        employee_code: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
          route_no: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
      });
  
      BusLog.associate = function (models) {
          models.bus_log
          .belongsTo(models.employee, {
            onDelete: 'CASCADE',
            
            foreignKey: {
              name: 'employee_code',
            },
          });
      };
  
    return BusLog;
};