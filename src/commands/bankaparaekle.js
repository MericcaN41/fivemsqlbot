const Discord = require("discord.js");
const meslekler = require("../meslekler.json");
module.exports = {
    name: "bankaparaekle",
    description: "Hexi girilen kişinin bankasına girilen miktar kadar para ekler.",
    execute(message, args, connection, izinliRol) {
        const paraEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let hex = args[1]
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                let eklenecek = args[2]

                connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
                    let user = result[0]
                    let mevcutpara = user.bank
                    let para = mevcutpara + parseInt(eklenecek)
                    if (para > 2147483647) return message.channel.send("Girdiğin miktar çok büyük. Toplam miktar \`2147483647\` miktarından daha az olmalı.")
                    if (!user) {
                        paraEmbed.setColor("RED")
                        .setDescription(`Girilen hex ID'si ile hiçbir kullanıcı bulunamadı.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(paraEmbed)
                        return;
                    }
                    connection.query(`UPDATE users SET bank = ${parseInt(para)} WHERE bank = ${user.bank}`,(err,result) => {
                        if (err) console.log(err)
                        paraEmbed.setColor("GREEN")
                        .setDescription(`${hex} ID'li oyuncunun bankadaki parasına başarıyla \`${eklenecek}\` miktarı eklenmiştir. Yeni miktar \`${para}\`.`)
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