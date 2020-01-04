export default (sequelize, DataTypes) => {
  const Team = sequelize.define(
    'team',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: {
            args: [3, 25],
            msg: 'The team name should be between 3 and 25 characters long',
          },
        },
      },
    },
  );

  Team.associate = (models) => {
    Team.belongsToMany(models.User, {
      through: 'member',
      foreignKey: {
        name: 'teamId',
        field: 'team_id',
      },
    });
    Team.belongsTo(models.User, {
      foreignKey: 'owner',
    });
  };

  return Team;
};
