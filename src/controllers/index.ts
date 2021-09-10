import { NextFunction, Request, Response } from 'express';
// @ts-ignore
import numeral from 'numeral';
import pool from '../db';
import { dateRang, FormatQuery, selectQuery } from '../functions/index';

interface body {
	keys: string[];
}

interface Querys {
	init: string;
	end: string;
}

interface msg {
	message: string;
	info: any;
}

export const query = async (
	req: Request<any, msg, body, Querys>,
	res: Response<msg>,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('body', req.body);
		console.log('query', req.query);
		console.log('headers', req.headers);

		// definimos variables
		const { keys } = req.body;
		const { init, end } = req.query;

		// formateamos la data
		const Dates = dateRang(init, end);
		const selects = selectQuery(keys);
		const query = FormatQuery(Dates, selects);

		// ejecucion del querys ya formateado
		const resp: any = await pool.query(query);

		const info: any[] = resp[0].map((item: any) => {
			Object.keys(item).forEach((key: any) => {
				if (typeof item[key] === 'number') {
					item[key] = 'Bs' + numeral(item[key]).format('0.0,00');
				}
			});

			return item;
		});

		// retornar data al cliente
		res.json({ message: 'reporte exitoso', info });
	} catch (err) {
		next(err);
	}
};
