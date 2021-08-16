export const User = (id?: number) => {
	const base: string = ' el usuario con el id: ' + id;
	return {
		getAll: 'todos los usuarios',
		create: 'Se a creado' + base,
		get: base,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
	};
};
