require("dotenv").config();

//don't touch!
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

function sendWH(url, mail) {
    console.log("from: " + mail.from[0].address)
    var avatar = ""
    // var addrs = require("email-addresses")
    // var favicon = require('favicon')
    // var url = "http://" + addrs.parseOneAddress(mail.from[0].address).domain
    // favicon(url, (err, favicon_url) => {
      // console.log(url)
      // var avatar = favicon_url;
    // })
    console.log(avatar);
    require("axios").post(url, {
      // content: "New email",
      content: "",
      embeds: [
        {
          title: mail.headers.subject,
          author: {
            name: mail.headers.from,
            icon_url: avatar
          }
        }
      ]
    }).then((response) => {
    }).catch((err) => {
      console.log("err");
      console.log(err);
    })
    console.log("*************End of new email***************");
    console.log("");
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
