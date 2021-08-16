import multer from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
const storage = multer.diskStorage({
	//	destination: path.resolve('src/uploads'),
	destination: path.resolve('uploads'),

	filename: (req: Request, file, cb) => cb(null, file.originalname.replace(/ /gi, '_')),
});

export const upload = multer({ storage }).single('image');

export const uploads = multer({ storage }).array('images', 8);
