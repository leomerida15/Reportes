import { Application } from 'express';
// rputers
import { query } from '../controllers/index';

//
export default (app: Application) => {
	app.post('/query', query);
};
