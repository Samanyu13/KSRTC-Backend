module.exports = function (sequelize, DataTypes) {
    const AllRoutes = sequelize
      .define('all_routes', {
        bus_id: {
          type: DataTypes.STRING(10),
          allowNull: true,
          unique: 'compositeIndex',
        },
        busstop: {
          type: DataTypes.STRING(30),
          allowNull: true,
          unique: 'compositeIndex',
        },
        onwards: {
          type: DataTypes.STRING(50),
          allowNull: true,
          unique: 'compositeIndex',
        },
        distance: {
          type: DataTypes.STRING(10),
          allowNull: true,
          unique: 'compositeIndex',
        },
        latitude: {
          type: DataTypes.STRING(20),
          allowNull: true,
          unique: 'compositeIndex',
        },
        longitude: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: 'compositeIndex',
        },
        return_busstop: {
            type: DataTypes.STRING(30),
            allowNull: true,
            unique: 'compositeIndex',
        },
        return_onwards: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: 'compositeIndex',
        },
        return_distance: {
            type: DataTypes.STRING(10),
            allowNull: true,
            unique: 'compositeIndex',
        },
        return_latitude: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: 'compositeIndex',
        },
        return_longitude: {
              type: DataTypes.STRING(20),
              allowNull: true,
              unique: 'compositeIndex',
          },
      // implement [index6 specified in db design] compositeIndex when sequelize
      // supports it.
      // https://github.com/sequelize/sequelize/issues/8148
      });
  
    return AllRoutes;
};
  