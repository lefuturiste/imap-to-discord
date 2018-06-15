require("dotenv").config();

//don't touch!
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

function sendWH(url, mail) {
    require("axios").post(url, {
      // content: "New email",
      content: "",
      embeds: [
        {
          title: mail.headers.subject,
          author: {
            name: mail.headers.from,
            icon_url: "https://www.gravatar.com/avatar/" + require("md5")(mail.from[0].address)
          }
        }
      ]
    })
}

const notifier = require('mail-notifier');

const imap = {
  user: process.env.IMAP_USER,
  password: process.env.IMAP_PASSWORD,
  host: process.env.IMAP_HOST,
  port: process.env.IMAP_PORT, //143
  tls: false,
  autotls: 'always',
  markSeen: false
};

notifier(imap)
.on('connected',() => {
  console.log("connected");
})
.on('error', (err) => {
  console.log(err);
})
.on('mail', mail => {
  console.log(" ");
  console.log("===============------ new email =========--------------");
  sendWH(
    process.env.DISCORD_WH_URL, //url of webhook
    mail
  );
})
.start();
