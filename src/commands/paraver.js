const Discord = require("discord.js");
const meslekler = require("../meslekler.json");
module.exports = {
    name: "paraver",
    description: "Hexi girilen kişinin nakit parasını ayarlar.",
    execute(message, args, connection, izinliRol) {
        const paraEmbed = new Discord.MessageEmbed()
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
                    let eskipara = user.money
                    if (!user) {
                        paraEmbed.setColor("RED")
                        .setDescription(`Girilen hex ID'si ile hiçbir kullanıcı bulunamadı.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(paraEmbed)
                        return;
                    }
                    connection.query(`UPDATE users SET money = ${parseInt(para)} WHERE money = ${user.money}`,(err,result) => {
                        if (err) console.log(err)
                        paraEmbed.setColor("GREEN")
                        .setDescription(`${hex} ID'li oyuncunun parası başarıyla \`${eskipara}\` miktarından \`${para}\` miktarına ayarlandı.`)
                        .setAuthor("İşlem başarılı!")
                        message.channel.send(paraEmbed)
                    })
                })

            } else {
                paraEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(paraEmbed)
                return;
            }
    }
}