import nodemailer from 'nodemailer';

const trasporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'nestor80@ethereal.email',
        pass: 'UvFhgPBDF8yXfFPx3v'
    }
});


const sendEmail = async (subject, text, to) =>{
    const info = trasporter.sendMail({
        from: 'Shubham More',
        to,
        subject,
        text,
    });

    console.log('Email sent:', (await info).messageId);
};

export default sendEmail;