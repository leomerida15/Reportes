import { body, validationResult, oneOf, check } from 'express-validator';

const NoSQL = (v: any): boolean => !['SELECT', 'DELETE', 'INSERT', 'UPDATE', 'WHERE', 'DROP', 'add'].includes(v);

export const register = [
	//
	check('name').exists().custom(NoSQL),
	//
	check('roles_id').exists().isNumeric().custom(NoSQL),
	//
	check('password').exists().isLength({ min: 6, max: 10 }).custom(NoSQL),
	//
	check('ident_type_id').exists().isNumeric().custom(NoSQL),
	//
	check('nro_ident').exists().isNumeric().custom(NoSQL),
	//
	check('depart_id').exists().isNumeric().custom(NoSQL),
	//
	check('email').exists().isEmail().custom(NoSQL),
];
