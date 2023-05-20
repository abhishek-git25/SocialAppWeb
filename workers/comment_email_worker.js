const queue =  require('../config/kue');


const commentsMailer=  require('../mailer/comments-mailer');

queue.process('emails' , function(job ,  done){
    console.log("Emails worker is processing a jobs" , job.data);
    commentsMailer.newComment(job.data);
    done();
})