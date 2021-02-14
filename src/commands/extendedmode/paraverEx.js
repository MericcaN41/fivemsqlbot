const Discord = require("discord.js");
const meslekler = require("../meslekler.json");
module.exports = {
    name: "paraver",
    description: "Hexi girilen kişinin nakit parasını ayarlar. (EXTENDEDMODE)",
    execute(message, args, connection, izinliRol) {
        const bankaEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let hex = args[1]
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                let para = parseInt(args[2])
                if (para > 2147483647) return message.channel.send("Girdiğin miktar çok büyük !") 

                connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
                    let user = result[0]
                    if (!user) {
                        bankaEmbed.setColor("RED")
                        .setDescription(`Girilen hex ID'si ile hiçbir kullanıcı bulunamadı.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(bankaEmbed)
                        return;
                    }
                    let accounts = JSON.parse(user.accounts)
                    let eskipara = accounts.money
                    accounts.money = para
                    connection.query(`UPDATE users SET accounts = '${JSON.stringify(accounts)}' WHERE identifier = '${hex}'`,(err,result) => {
                        if (err) console.log(err)
                        bankaEmbed.setColor("GREEN")
                        .setDescription(`${hex} ID'li oyuncunun parası başarıyla \`${eskipara}\` miktarından \`${para}\` miktarına ayarlandı.`)
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