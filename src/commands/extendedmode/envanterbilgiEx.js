const Discord = require("discord.js");
module.exports = {
    name: "envanterbilgi",
    description: "Hexi girilen envanterindeki eşyaları sıralar. (EXTENDEDMODE)",
    execute(message, args, connection, izinliRol) {
        const discEmbed = new Discord.MessageEmbed()
        .setFooter("MrcSQLSystem")
        if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
            let hex = args[1]
            if (hex.startsWith("steam:") === false) {
                hex = `steam:${hex}`
            }
            connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
                let user = result[0]
                if (user) {
                    let dataJson = JSON.parse(user.inventory)
                    let itemler = []
                    Object.keys(dataJson).forEach(key => {
                        itemler.push(`${key} (${dataJson[key]})`)
                    })
                    discEmbed.setColor("GREEN")
                    .setAuthor(`${hex.replace("steam:","")} kişisinin envanteri`)
                    .setDescription(itemler)
                    message.channel.send(discEmbed)
                } else {
                    discEmbed.setColor("RED")
                    .setAuthor("İşlem Başarısız!")
                    .setDescription("Girilen hex ID'si ile hiçbir kullanıcı bulunamadı veya kullanıcının envanteri boş.")
                    message.channel.send(discEmbed)
                    return;
                }
            })
        } else {
            discEmbed.setColor("RED")
            .setAuthor("İşlem Başarısız!")
            .setDescription("Bunu yapmak için gereken yetkiye sahip değilsiniz!")
            message.channel.send(discEmbed)
            return;
        }
    }
}
