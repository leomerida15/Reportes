import { DataTypes } from 'sequelize';
import sequelize from './connections';
import init_models from './models';
import keys from './keys';
import pre_into from './contents';
//

// inits se buscan y creon o conecta con las tablas en la db
// const model = init_models(sequelize, DataTypes);

// crea la sllaves foraneas y primarias
// keys(model);

// determina si la db se borrara completa y quedara limpia eliminar al subir a produccion
// const force = false;
// se inicia la db
sequelize.sync().then((resp: any) => {
	if (resp) console.log('Init DB SUCCESS');
	else console.log('Init DB err');

	// if (force) pre_into(model);
});

export default sequelize;
