// modules
import { Request, Response, NextFunction } from 'express';
// scripts 
import codes, { errCodes } from './code';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
	if (!err) next();
	// define vars
	const descripts: any = codes;
	const code: number = err.code ? err.code : err.response ? err.response.status : 500;
	const message: string = err.response ? err.response : err.message ? err.message : err;
	const code_descript: string = descripts[code] ? descripts[code] : `${code}`;

	// create obj for response
	const obj = { status: false, message, code, code_descript, path: req.originalUrl, method: req.method };

	// to write response in the consol
	const length = obj.message.length + obj.code_descript.length + obj.path.length;
	if (length < 80) console.table([obj]);
	else console.log(obj);

	// response
	res.status(code).json(obj);
};
