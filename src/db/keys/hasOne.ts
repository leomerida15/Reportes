export default (model: any) => {
	const { WN_roles_usuarios, Roles_has_usuarios } = model;

	// usuarios at Roles_has_usuarios
	WN_roles_usuarios.hasOne(Roles_has_usuarios, { foreignKey: 'id_rol' });
};
