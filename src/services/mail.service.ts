import {mailOptions, transporter} from "../configs/mail.config";

export function sendTestEmail(): void {
    transporter.sendMail({
        ...mailOptions,
        to: '9eoclzhztv8zyld@tutamail.com',
        subject: 'Hello World',
        // TODO: move this to /templates/emails/test.html
        html:
            `
            <html>
                <body>
                    <h1>Hello World!</h1>
                    <p>Hello World from RandomMovie! <b>HTML</b> content.</p>
                    <p>Visit our <a href="https://example.com">website</a> for more information.</p>
                    <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
                </body>
            </html>
            `,
    }, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}