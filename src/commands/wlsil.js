const Discord = require("discord.js");
const meslekler = require("../meslekler.json");
module.exports = {
    name: "wlsil",
    description: "Girilen hexi whitelistten çıkartır(esx_whitelist)",
    execute(message, args, connection, izinliRol) {
        const silEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (izinliRol) {
                if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
                    let hex = args[1]
                    if (hex.startsWith("steam:") === false) {
                        hex = `steam:${hex}`
                    }
                    
                    connection.query("SELECT * FROM whitelist WHERE identifier = ?",hex,(err,result) => {
                        let user = result[0]
                        if (user) {
                            connection.query("DELETE FROM whitelist WHERE identifier = ?",hex,(err,result,fields) => {
                                if (!err) {
                                    silEmbed.setColor("GREEN")
                                    .setAuthor("İşlem başarılı!")
                                    .setDescription(`${hex} ID'si başarıyla whitelistten çıkartıldı.`)
                                    message.channel.send(silEmbed)
                                } else return
                            })
                        } else {
                            silEmbed.setColor("RED")
                            .setAuthor("İşlem başarısız!")
                            .setDescription(`${hex} ID'si zaten whitelistte değil.`)
                            message.channel.send(silEmbed)
                        }
                    })
                }  else {
                    silEmbed.setColor("RED")
                    .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                    .setAuthor("İşlem başarısız!")
                    message.channel.send(silEmbed)
                    return;
                }
            } else return
    }
}