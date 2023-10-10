import nodemailer from "nodemailer";
import config from "../config/config.js";
import __dirname from "./utils.js";

// const transport = nodemailer.createTransport({
//  service: "gmail",
//  port: 587,
//  auth: {
//   user: config.gmail_user_app,
//   pass: config.gmail_pass_app,
//  },
// });

const transport = nodemailer.createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: "andresledesma87@gmail.com",
		pass: "nggtcjuspmbbbgac",
	},
});

export async function sendMail(emailUser, subject, html) {
	return await transport.sendMail({
		from: "Coder Test <andresledesma87@gmail.com>",
		to: "andresledesma87@gmail.com",
		subject: "Correo electronico de prueba",
		html: `
  <h1>Esto es un correo de prueba</h1>
  `,
		attachments: [
			{
				filename: "restructuring.png",
				path: __dirname + "/utils/restructuring.png",
				cid: "restructuring.png",
			},
		],
	});
};


export async function sendMaildefault(emailUser, subject, html) {
	return await transport.sendMail({
		from: "Coder Test <andresledesma87@gmail.com>",
		to: emailUser,
		subject: subject,
		html: html
	});
};


