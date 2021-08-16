/**
 * este hook se enfoca en el manejo de archivos en el servidor como
 * moverlos de carpetas, extraer el id del archivo y la url
 */

import fs from 'fs/promises';
import path from 'path';
import { host } from './host';
import { v4 as uuidv4 } from 'uuid';
// import svg2png from 'svg2png';

const base: string = path.resolve('static');
//
export const ImgToFile: any = async (file: string | string[], title: string): Promise<string> => {
	const svg: string = (() => {
		if (typeof file == 'string') {
			return file;
		} else {
			return file.join(' ');
		}
	})();

	const id: string = uuidv4() + '@' + title.replace(/ /gi, '_') + '.svg';
	const url: string = path.join('static', id);

	await fs.writeFile(url, svg);
	return id;
};
//
export const fileExistin = async (folder: string) => {
	try {
		await fs.lstat(`${base}/${folder}`);
	} catch (err) {
		await fs.mkdir(`${base}/${folder}`);
	}
};
//
export const Img64ToFile = async (file: string, title: string, folder?: string): Promise<string> => {
	const id: string = uuidv4() + '@' + title.replace(/ /gi, '_') + '.png';

	const image: string = file.replace(/^data:image\/png;base64,/, '');

	const URL: string = await (async () => {
		if (folder) {
			await fileExistin(folder);
			return path.join(base, folder, id);
		} else {
			return path.join(base, id);
		}
	})();

	await fs.writeFile(URL, image, 'base64');

	return ImgRoute({ filename: id }, folder);
};
//
export const ImgID = (file: string) => file.split('/')[file.split('/').length - 1];
//
export const ImgIDs = (files: string[]) =>
	files.map((file: string) => file.split('/')[file.split('/').length - 1]);
//
export const ImgMove = async (file: string, folder: string) => {
	if (folder) await fileExistin(folder);

	await fs.rename(path.join(base, file), path.join(base, folder, file));
	return `${host}/${folder}/${file}`;
};
//
export const ImgMoves = async (files: string[], folder: string) => {
	if (folder) await fileExistin(folder);

	const resp: any = files.map(
		async (file: string) => await fs.rename(`${base}/${file}`, `${base}/${folder}/${file}`)
	);
	await Promise.all(resp);

	return files.map((file: any) => `${host}static/${folder}/${file}`);
};
//
export const ImgRoute = (file: any, folder?: string) => {
	return `${host}static/${folder ? folder + '/' : ''}${file.filename}`;
};
//
export const ImgMoveRoute = async (file: any, folder: string) => {
	const resp: string = ImgRoute(file, folder);
	const id = ImgID(resp);
	await ImgMove(id, folder);
	return resp;
};
//
export const ImgRoutes = (files: any, folder?: string) => {
	return files ? files.map((a: any) => `${host}static/${folder ? folder + '/' : ''}${a.filename}`) : [];
};
//
export const ImgDelete = async (file: string, folder?: string) => {
	try {
		const route: string = (() => {
			if (folder) {
				return path.join(base, folder, file);
			} else {
				return path.join(base, file);
			}
		})();

		await fs.unlink(route);

		return true;
	} catch (err) {
		return false;
	}
};
//
export const ImgDeletes = async (files: string[], folder?: string) => {
	try {
		const stop = files.map(async (file: string) => {
			const route: string = (() => {
				if (folder) {
					return path.join(base, folder, file);
				} else {
					return path.join(base, file);
				}
			})();

			await fs.unlink(route);
		});

		await Promise.all(stop);

		return true;
	} catch (err) {
		return false;
	}
};
//s
export const ImgCatch = async (file: any, folder: string): Promise<string | false> => {
	if (file) {
		const routesIMG: string = ImgRoute(file, folder);

		const id = ImgID(routesIMG);

		await ImgMove(id, folder);
		//
		return routesIMG;
		//
	} else {
		return false;
	}
};
//
export const ImgCatchs = async (files: any[], folder: string): Promise<string[]> => {
	const stop: Promise<string | false>[] = files.map(async (file: any) => {
		if (file) {
			const routesIMG: string = ImgRoute(file, folder);
			const id = ImgID(routesIMG);
			//
			return await ImgMove(id, folder);
			//
		} else {
			return false;
		}
	});

	const resps: (string | false)[] = await Promise.all(stop);

	const data: any[] = resps.filter((resp: string | false) => resp);

	return data;
};
//
export const ImgPath = (route: any) => {
	let valid: boolean = false;
	const split: string = route
		.split('/')
		.filter((item: string) => {
			if (item == 'static') valid = !valid;
			return valid && item != 'static';
		})
		.join('/');

	const direction: string = path.join(base, split);

	return direction;
};
