export interface id {
	id?: number;
}

export interface User extends id {
	name?: string;
	roles_id?: number;
	password?: string;
	ident_type_id?: number;
	nro_ident?: number;
	depart_id?: number;
	email?: string;
}
