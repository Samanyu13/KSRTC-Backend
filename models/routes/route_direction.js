module.exports = function (sequelize, DataTypes) {
    const RouteDirection = sequelize
    .define('route_direction', {
        id: {
          type: DataTypes.STRING(10),
          allowNull: false,  
          primaryKey: true,        
        },
        route_id: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        direction: {
            type: DataTypes.INTEGER(),
            allowNull: false,          
        },
    });

    return RouteDirection;
};