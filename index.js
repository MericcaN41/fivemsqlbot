const Discord = require("discord.js");
const client = new Discord.Client()
const ayarlar = require("./config.json");
const meslekler = require("./meslekler.json"); /* Meslek eklemek için 'meslekler.json' dan "meslekKodu":"gözükecekİsim" formatında ekleme yapabilirsiniz*/

// MYSQL //
const mysql = require("mysql");
const connection = mysql.createConnection(ayarlar.sql)

connection.connect(err => {
    if (err) {
        console.log("Database ile bağlantı sağlanamadı ! Bot kapanacaktır. Lütfen database bağlantınızı kontrol edip tekrar deneyiniz.") // XXAMP açın.
        process.exit(1)
    }
    console.log("Database ile bağlantı başarıyla sağlandı !")
})
//////////////////////////////////


// ENVIRONMENT VARIABLES (.env) //
require("dotenv").config()
var token = process.env.TOKEN;
var prefix = process.env.PREFIX;
//////////////////////////////////

// ANA KOD //

client.on("ready", () => {
    console.log(`${client.user.tag} olarak Discord'a bağlanıldı!`)
});

client.on("message", async (message) => {
    let args = message.content.substring(prefix.length).split(" ")

    switch(args[0]) {
        case "kimlik":
            let hex = args[1]
            if (!hex) return message.channel.send("Bilgisini bulmak istediğin oyuncunun HEX ID'sini girmelisin!")
            const bilgiEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            let arama = "SELECT * FROM users WHERE identifier = ?"
            if (hex.startsWith("steam:") === false) {
                hex = `steam:${hex}`
            }

            connection.query(arama,hex, (err,result) => {
                let user = result[0]
                if (!user) {
                    bilgiEmbed.setDescription("Girilen Hex ID'si ile hiçbir kullanıcı bulunamadı.")
                    .setColor("RED")
                    .setTitle("Hata!")
                    message.channel.send(bilgiEmbed)
                    return;
                }
                let sex;
                if (user.sex === "F") {
                    sex = "Bayan"
                } else {
                    sex = "Erkek"
                }
                bilgiEmbed.setColor("GREEN")
                .setAuthor(`${user.name} steam isimli kişinin bilgileri!`)
                .addField(`📃・İsim` ,`${user.firstname} ${user.lastname}`)
                .addField(`📆・Doğum Tarihi` ,`${user.dateofbirth}`)
                .addField(`👫・Cinsiyet`,sex)
                .addField(`💼・Meslek`,`${meslekler[user.job] || user.job}`)
                .addField(`💰・Cüzdan` ,`${user.money}`)
                .addField(`💳・Banka` ,`${user.bank}`)
                .addField(`💻・Grup` ,`${user.group}`)
                message.channel.send(bilgiEmbed)
            })
            break;

        /*-----------*/
        case "telefon":
            let numara = args[1]
            if (!numara) return message.channel.send("Bir numara girmelisin.")
            let aranacak = "SELECT * FROM users WHERE phone_number = ?"
            const numaraEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            connection.query(aranacak,numara, (err,result) => {
                let user = result[0]
                if (!user) {
                    numaraEmbed.setColor("RED")
                    .setAuthor("Hata !")
                    .setDescription("Belirtilen numara ile bir kişi bulunamadı. Lütfen numarayı kontrol edip tekrar deneyiniz.")
                    message.channel.send(numaraEmbed)
                    return;
                }
                numaraEmbed.setAuthor(`${numara} numarasının bilgileri`)
                .addField("Steam ismi",user.name)
                .addField("Hex ID",user.identifier)
                .addField("IC İsmi",`${user.firstname} ${user.lastname}`)
                .addField("Grup",user.group)
                .setColor("GREEN")
                message.channel.send(numaraEmbed)
            })
            break;
    }
});



client.login(token)