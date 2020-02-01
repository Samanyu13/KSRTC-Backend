module.exports = function (sequelize, DataTypes) {
    const BusLiveStatus = sequelize
      .define('bus_live_status', {
        bus_no: {
          type: DataTypes.STRING(10),
          primaryKey: true,
          
        },
        reg_no: {
          type: DataTypes.STRING(12),
          allowNull: false,
          unique: 'compositeIndex',

        },
        bus_make: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: 'compositeIndex',
        },
        employee_code: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: 'compositeIndex',
        },
          route_no: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: 'compositeIndex',
        },
      });
  
      BusLiveStatus.associate = function (models) {
          models.bus_live_status
          .belongsTo(models.employee, {
            onDelete: 'CASCADE',
            
            foreignKey: {
              name: 'employee_code',
            },
          });
      };
  
    return BusLiveStatus;
};
  