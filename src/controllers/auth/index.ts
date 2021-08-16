import { NextFunction, Request, Response } from 'express';
import { User } from '../../db/models';
import bcrypt from 'bcrypt';
import * as intf from '../../config/interfaces';
import * as Msg from '../../hooks/messages/index.ts';
import pool from '../../db/index';

// getter a user
export const register = async (
	req: Request<any, any, intf.User>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		// encript password
		const salt: string = await bcrypt.genSalt();
		req.body.password = await bcrypt.hash(req.body.password, salt);

		// define data
		const keys: string = Object.keys(req.body)
			.map((key: any) => `'${key}'`)
			.join(', ');

		const values: string = Object.keys(req.body)
			// @ts-ignore
			.map((key: any) => `'${req.body[key]}'`)
			.join(', ');

		// query for save data
		const data: any = await pool.query(`INSERT INTO 'fm_user' (${keys}) VALUES (${values})`);

		// email for valid registe
		// await mail.verify(data);

		// response
		res.status(200).json({ status: true, message: 'Usuario registrado Revise su correo por favor' });
	} catch (err) {
		next(err);
	}
};
