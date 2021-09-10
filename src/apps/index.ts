// Modules
import express, { Application } from 'express';
//database
import '../db/';
import { posRoutes, preRoutes } from '../Middlewares';
import Routes from '../router';

const app: Application = express();

// middleware preRoutes
preRoutes(app);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Routes
Routes(app);

// meddleware posRutes
posRoutes(app);

// Settings
app.set('port', process.env.PORT || 5050);

export default app;
