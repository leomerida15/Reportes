export default (Sql: any, Type: any) => {
	const { INTEGER, STRING } = Type;

	return Sql.define(
		'Users',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			firstname: { type: STRING, unique: true },
			lastname: { type: STRING },
		},
		{ freezeTableName: true, timestamps: true }
	);
};
