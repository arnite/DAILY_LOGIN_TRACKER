import { Sequelize } from 'sequelize';
// import '../models';

export const sequelize = new Sequelize(
  process.env.DB as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
      underscored: true,
    },
  }
);

export const database = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL!')
  } catch (err) {
    console.error('Unable to connect:', err);
  }
};
