const nodemailer = require('../config/nodemailer');




exports.newComment = (comment) => {

    let htmlString =  nodemailer.renderedTemplate({ comment : comment} , '/comments/new_comments.ejs')
    console.log('Inside new comment mailer');
    nodemailer.transporter.sendMail({
        from: 'yadavabhi050198@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Mail sent', info);
        return;
    }
    )
}