

const nodemailer =require('nodemailer');


const correo = (req,res)=>{
    var sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'advinjosuev899@gmail.com',
          pass: '41607612'
        }
      });

      var mail = {
        from: "username@gmail.com",
        to: "receiver's_username@gmail.com",
        subject: "Sending Email using Node.js",
        text: "That was easy!"
      };

      sender.sendMail(mail, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent successfully: "
                       + info.response);
        }
      });
}


   
 
   
  



  module.exports={

  }