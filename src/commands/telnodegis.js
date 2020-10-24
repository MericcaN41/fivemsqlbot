const Discord = require("discord.js");
const meslekler = require("../meslekler.json");
module.exports = {
    name: "telnodeğiş",
    description: "Hexi girilen kişinin telefon numarasını değiştirir.",
    execute(message, args, connection, izinliRol) {
        const telEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let hex = args[1]
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                let no = args[2]

                connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
                    let user = result[0]
                    let eskino = user.phone_number
                    if (user) {
                        connection.query(`UPDATE users SET phone_number = ${no} WHERE phone_number = ${user.phone_number}`,(err,result) => {
                            if (err) console.log(err)
                            telEmbed.setColor("GREEN")
                            .setAuthor("İşlem başarılı!")
                            .setDescription(`${hex} ID'li kullanıcının telefon numarası \`${eskino}\` değerinden \`${no}\` olarak değiştirildi!`)
                            message.channel.send(telEmbed)
                        })
                    } else {
                        telEmbed.setColor("RED")
                        .setDescription(`Girilen hex ID'si ile hiçbir kullanıcı bulunamadı.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(telEmbed)
                        return;
                    }
                })
            } else {
                telEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(telEmbed)
                return;
            }
    }
}