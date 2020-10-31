const Discord = require("discord.js");
module.exports = {
    name: "faturabilgi",
    description: "Hexi girilen kişiye ait faturaları gösterir.",
    execute(message, args, connection, izinliRol) {
        const faturaEmbed = new Discord.MessageEmbed()
        .setFooter("MrcSQLSystem")
        if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
            let hex = args[1]
            if (!hex) return
            if (hex.startsWith("steam:") === false) {
                hex = `steam:${hex}`
            }
            connection.query("SELECT * FROM billing WHERE identifier = ?",hex,(err,result) => {
                if (result) {
                    let faturalar = []
                    let i = 1
                    result.forEach(res => {
                        faturalar.push(`${i}) Sebep: ${res.label} --> Miktar: **${res.amount}$**`)
                        i++
                    })
                    faturaEmbed.setColor("GREEN")
                    .setDescription(faturalar)
                    .setAuthor(`${hex.replace("steam:","")} kişisinin faturaları`)
                    message.channel.send(faturaEmbed)
                } else {
                    faturaEmbed.setColor("RED")
                    .setDescription(`Girilen Hex ID ile fatura bulunamadı!`)
                    .setAuthor("İşlem başarısız!")
                    message.channel.send(faturaEmbed)
                    return;
                }
            })
        } else {
            faturaEmbed.setColor("RED")
            .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
            .setAuthor("İşlem başarısız!")
            message.channel.send(faturaEmbed)
            return;
        }
    }
}