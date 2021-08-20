import { Sequelize, AddScopeOptions } from 'sequelize';

const DB_NAME = process.env.DB_NAME || 'milpagos';
const dialect = 'mssql'; /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' En latam usamos Postgresql */
const DB_PASS = process.env.DB_PASS || 'usr_milpagos';
const host = process.env.DB_HOST || '10.198.72.31';
const user = process.env.DB_USER || 'usr_milpagos';

/**
 * latam trabaja con postgreSQL ->
 * npm i pg pg-hstore
 * npm i mariadb
 * npm i mysql2
 * npm i sqlite3
 * npm i tedius
 */

// conet with database
const web = () =>
	new Sequelize(DB_NAME, user, DB_PASS, {
		host,
		dialect,
		dialectOptions: { ssl: { rejectUnauthorized: false } },
	});

const local = () =>
	new Sequelize(DB_NAME, user, DB_PASS, {
		host,
		dialect,
		dialectOptions: {
			requestTimeout: 30000,
		},
	});

export default process.env.PORT ? web() : local();
