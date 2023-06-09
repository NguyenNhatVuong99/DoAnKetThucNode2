
import nodeMailer, { Transporter, TransportOptions } from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


const MAIL_ADDRESS: string = process.env.MAIL_ADDRESS || 'nhatvuong0699@gmail.com'
const MAIL_PASSWORD: string = process.env.MAIL_PASSWORD || 'ymlspjfhdpjeemkb'
const MAIL_HOST: string = process.env.MAIL_HOST || 'smtp.gmail.com'
const MAIL_PORT: number = parseInt(process.env.MAIL_PORT || '587', 10);

const transporter = nodeMailer.createTransport({
	host: MAIL_HOST,
	port: MAIL_PORT,
	// nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
	secure: false,
	auth: {
		user: MAIL_ADDRESS,
		pass: MAIL_PASSWORD,
	},
});
const sendMail = (to: string, subject: string, htmlContent: string) => {
	const options = {
		// địa chỉ admin email bạn dùng để gửi
		from: MAIL_ADDRESS,
		// địa chỉ gửi đến
		to: to,
		// Tiêu đề của mail
		subject: subject,
		// Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
		html: htmlContent
	}
	return transporter.sendMail(options)
}
export default {sendMail}