import user from './user';
import Sql from '../connections';
import { DataTypes as Types } from 'sequelize';
//

export default (Sql: any, Types: any) => {
	return {
		User: user(Sql, Types),
	};
};

export const User = user(Sql, Types);
