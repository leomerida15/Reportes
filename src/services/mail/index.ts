// modules
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
const key = '_secreto';

/** define mailOptions */
const prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';
const URL_WEB = prod ? `https://www.ceres-cdtec.cl/` : `http://localhost:8080`;
const from = 'proyecto.z.alpha@gmail.com';
const subject = 'latam-node';

/** create conection with email */
const mailer = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'go.code.go.pruebas@gmail.com',
		pass: 'ontlfxpnjagolnml',
	},
});

// this mail is for verify the email a user
export const verify = async (info: any) => {
	try {
		/** define vars */
		const { name, email, _id } = info;
		const token = jwt.sign({ _id }, key);
		const link = `${URL_WEB}/verify/${token}`;
		const to = `${email}`;

		/** Define conten of message */
		const html = /*html*/ `
        <html>
            <h1>Hola ${name}</h1>
            <p>Para terminar si registro haga click en el siguiente link</p>
            <a href="${link}">${link}</a>
        </html>`;

		/** options of email */
		const mailOptions = { from, to, subject, html };

		/** Shipping email */
		await mailer.sendMail(mailOptions);
	} catch (err) {
		console.log(err);
	}
};

// this mail is for valid edition of a password
export const newPass = async (info: any) => {
	try {
		/** define vars */
		const { name, email, _id } = info;
		const token = jwt.sign({ _id }, key);
		const link = `${URL_WEB}/newPass/${token}`;
		const to = `${email}`;

		/** Define conten of message */
		const html = /*html*/ `
		<html>
            <h1>Hola ${name}</h1>
            <p>Para editar tu password haga click en el siguiente link</p>
            <a href="${link}">${link}</a>
        </html>`;

		/** options of email */
		const mailOptions = { from, to, subject, html };

		/** Shipping email */
		await mailer.sendMail(mailOptions);
	} catch (err) {
		console.log(err);
	}
};
