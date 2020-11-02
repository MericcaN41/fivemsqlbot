const Discord = require("discord.js");
module.exports = {
    name: "envanterbilgi",
    description: "Hexi girilen envanterindeki eşyaları sıralar. (ESX)",
    execute(message, args, connection, izinliRol) {
        const envanterEmbed = new Discord.MessageEmbed()
        .setFooter("MrcSQLSystem")
        if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
            let hex = args[1]
            if (hex.startsWith("steam:") === false) {
                hex = `steam:${hex}`
            }
            connection.query("SELECT * FROM user_inventory WHERE identifier = ?",hex,(err,result) => {
                if (result) {
                    let itemler = []
                    result.forEach(item => {
                        if (item.count !== 0 ) {
                            itemler.push(`${item.item} (**${item.count}**)`)
                        }
                    })
                    envanterEmbed.setColor("GREEN")
                    .setAuthor(`${hex.replace("steam:","")} kişisinin envanteri`)
                    .setDescription(itemler)
                    message.channel.send(envanterEmbed)
                } else {
                    envanterEmbed.setColor("RED")
                    .setAuthor("İşlem Başarısız!")
                    .setDescription("Girilen hex ID'si ile hiçbir kullanıcı bulunamadı veya kullanıcının envanteri boş.")
                    message.channel.send(envanterEmbed)
                    return;
                }
            })
        } else {
            envanterEmbed.setColor("RED")
            .setAuthor("İşlem Başarısız!")
            .setDescription("Bunu yapmak için gereken yetkiye sahip değilsiniz!")
            message.channel.send(envanterEmbed)
            return;
        }
    }
}