const sequelize = require('../configs/mysql');

const Studio = require('./studio')(sequelize);
const Film = require('./film')(sequelize);
const Showtime = require('./showtime')(sequelize);
const Ticket = require('./ticket')(sequelize);

// Relationships
Studio.hasMany(Film, { foreignKey: 'studio_id' });
Film.belongsTo(Studio, { foreignKey: 'studio_id' });

Film.hasMany(Showtime, { foreignKey: 'film_id' });
Showtime.belongsTo(Film, { foreignKey: 'film_id' });

Showtime.hasMany(Ticket, { foreignKey: 'showtime_id' });
Ticket.belongsTo(Showtime, { foreignKey: 'showtime_id' });

sequelize.sync({ alter: true });

module.exports = { sequelize, Studio, Film, Showtime, Ticket };
