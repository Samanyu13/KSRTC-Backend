module.exports = function (sequelize, DataTypes) {
    const BusstopMaster = sequelize
    .define('busstop_master', {
        busstop_id: {
          type: DataTypes.STRING(10),
          allowNull: false,
          primaryKey: true,                 
        },
        busstop: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
    });

    // BusstopMaster.associate = function(models) {
    //   models.busstop_master
    //   .hasMany(models.route_details, {
    //       onDelete: 'CASCADE',
    //       foreignKey: {
    //           name: 'busstop_id'
    //       }
    //   });
    // };
  
    return BusstopMaster;
};