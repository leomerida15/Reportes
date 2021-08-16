// modules
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import list from './list';
const Key: string = process.env.KEY || 'user';

/** this middleware is for convert json web token in Objet format */
export default (req: Request, res: Response, next: NextFunction) => {
	try {
		// define array route
		const route: string[] = req.path.split('/');

		// valid use
		const result: boolean = list.includes(route[1]);
		// use
		if (result) {
			if (req.headers.token) {
				const { token }: any = req.headers;
				const resp: any = jwt.verify(token, Key);

				req.headers.token = resp;

				next();
				//
			} else throw { status: false, message: 'the JWT in require', code: 400 };
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
};
