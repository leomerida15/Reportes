import { Application } from 'express';

// rputers
import auth from './auth/auth.routes';

//
export default (app: Application) => {
	app.use('auth', auth);
};
