import nodemailer from 'nodemailer';
import user from '../model/user.mjs';
import { Op } from 'sequelize';
import dotenv from 'dotenv';
import cron from "node-cron";

dotenv.config();
const transporter = nodemailer.createTransport({
        host: process.env.SMTP,
        port: process.env.emailPort,
        secure: false, 
        auth: {
          user: process.env.Emailusername,
          pass: process.env.emailPassword,
        },
      });
  
      const SendMail = async () => {
        try {
            const users = await user.findAll({
                where: {
                    completed: "No",
                    // id: {
                    //     [Op.or]: [10, 11],
                    //   },
                },
            });
            let today=new Date();
    
            for (const user of users) {
                const enrollmentDate = new Date(user.enrolment_date);
                const weekAfter = new Date(enrollmentDate);
            weekAfter.setDate(enrollmentDate.getDate() + 7);

            const fifteenDaysAfter = new Date(enrollmentDate);
            fifteenDaysAfter.setDate(enrollmentDate.getDate() + 15);

            const twentySevenDaysAfter = new Date(enrollmentDate);
            twentySevenDaysAfter.setDate(enrollmentDate.getDate() + 27);
            if(today.toDateString()===weekAfter.toDateString()||today.toDateString()===fifteenDaysAfter.toDateString()||today.toDateString()===twentySevenDaysAfter.toDateString())
                {
                    await transporter.sendMail({
                        from: `"ITWorx" <${process.env.Emailusername}>`,
                        to: user.email, 
                        subject: "Reminder: Complete Your Onboarding Course",
                        text: "Hello, This is a reminder to complete your onboarding course. You can access it here:. Best regards, Your Team",
                        html: `<p>Hello ${user.full_name},</p><p>This is a reminder to complete your onboarding course. You can access it here ${user.course_name}.</p><p>Kind Regards,<br>Hr Team</p>`,
                    });
                    // console.log(`Email sent to ${user.email} for interval ${today.toDateString()}`);
                    const options = {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                        hour: 'numeric', minute: 'numeric', hour12: true
                    };
                    const formattedToday = today.toLocaleDateString('en-US', options);
                    await user.update({ last_reminder_date:formattedToday });
                }
            }
            
        } catch (err) {
            console.error("Error sending email:", err.message);
        }
    };
  




  export{SendMail};