module.exports = function (sequelize, DataTypes) {
    const RouteDetails = sequelize
    .define('route_details', {
        id: {
          type: DataTypes.INTEGER(10),
          allowNull: false,  
          primaryKey: true,        
        },
        route_id: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        busstop_id: {
            type: DataTypes.STRING(40),
            allowNull: false,          
        },
        distance: {
            type: DataTypes.FLOAT(),
            allowNull: false,  
            primaryKey: true,        
          },
        latitude: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        longitude: {
            type: DataTypes.STRING(10),
            allowNull: false,          
        },
    });
    RouteDetails.associate = function (models) {
        models.route_details
        .belongsTo(models.route_master, {
          onDelete: 'CASCADE',
          
          foreignKey: {
            name: 'route_id',
          },
        });
    };

    RouteDetails.associate = function (models) {
        models.route_details
        .belongsTo(models.busstop_master, {
          onDelete: 'CASCADE',
          
          foreignKey: {
            name: 'busstop_id',
          },
        });
    };

    return RouteDetails;
};