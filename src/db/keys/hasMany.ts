export default (model: any) => {
	// ejemplo
	const { Sections, Products, Users, Products_Sections } = model;

	// usuarios at Roles_has_usuarios
	Sections.hasMany(Products_Sections, { foreignKey: 'id_section' });
};
