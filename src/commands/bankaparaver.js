const Discord = require("discord.js");
const meslekler = require("../meslekler.json");
module.exports = {
    name: "bankaparaver",
    description: "Hexi girilen kişinin bankadaki parasını ayarlar.",
    execute(message, args, connection, izinliRol) {
        const bankaEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let hex = args[1]
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                let para = args[2]
                if (parseInt(para) > 2147483647) return message.channel.send("Girdiğin miktar çok büyük !") 

                connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
                    let user = result[0]
                    let eskipara = user.bank
                    if (!user) {
                        bankaEmbed.setColor("RED")
                        .setDescription(`Girilen hex ID'si ile hiçbir kullanıcı bulunamadı.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(bankaEmbed)
                        return;
                    }
                    connection.query(`UPDATE users SET bank = ${parseInt(para)} WHERE bank = ${user.bank}`,(err,result) => {
                        if (err) console.log(err)
                        bankaEmbed.setColor("GREEN")
                        .setDescription(`${hex} ID'li oyuncunun bankadaki parası başarıyla \`${eskipara}\` miktarından \`${para}\` miktarına ayarlandı.`)
                        .setAuthor("İşlem başarılı!")
                        message.channel.send(bankaEmbed)
                    })
                })

            } else {
                bankaEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(bankaEmbed)
                return;
            }
    }
}