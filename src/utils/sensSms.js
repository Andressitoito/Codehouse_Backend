import twilio from "twilio";

const twilio_sid = "AC5845cd649fa214f3e6191618e1a023a2";
const twilio_token = "99956c64cb0216ceeff56c63180100e5";
const twilio_phone = "+19892033062";
const my_phone = "+541122431622";

const client = twilio(twilio_sid, twilio_token);

const sendSms = (name, lastName) => {
	client.messages.create({
		body: `${name} ${lastName} Thanks by your purchase`,
		from: twilio_phone,
		to: my_phone,
	});
};

const sendWhatsapp = (name, lastName) => {
	client.messages.create({
		body: `${(name, lastName)} Thanks by your purchase`,
		from: `whatsapp: +14155238886`,
		to: `whatsapp: ${my_phone}`,
	});
};

export default sendSms;
