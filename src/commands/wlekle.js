const Discord = require("discord.js");
const meslekler = require("../meslekler.json");
module.exports = {
    name: "wlekle",
    description: "Girilen hexi whiteliste ekler(esx_whitelist)",
    execute(message, args, connection, izinliRol) {
        const wlEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
                let hex = args[1]
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                if (!hex) return message.channel.send("Bir hex girmelisin.")
                connection.query("SELECT * FROM whitelist WHERE identifier = ?",hex,(err,result) => {
                    let user = result[0]
                    if (!user) {
                        connection.query(`INSERT INTO whitelist (identifier) VALUES (\'${hex}\')`,(err,result) => {
                            wlEmbed.setColor("GREEN")
                            .setDescription(`${hex} ID'si başarıyla whiteliste eklendi.`)
                            .setAuthor("İşlem başarılı!")
                            message.channel.send(wlEmbed)
                        })
                    } else {
                        wlEmbed.setColor("RED")
                        .setDescription(`${hex} ID'si zaten whitelistte bulunmakta.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(wlEmbed)
                    }
                })
            } else {
                wlEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(wlEmbed)
                return;
            }
    }
}