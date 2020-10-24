const Discord = require("discord.js");
module.exports = {
    name: "isimdeğiştir",
    description: "Hexi girilen kullanıcının ismini değiştirir.",
    execute(message,args,connection,izinliRol) {
        const isimEmbed = new Discord.MessageEmbed()
        .setFooter("MrcSQLSystem")
        if (message.member.hasPermission("ADMINISTRATOR")) {
            let hex = args[1]
            if (hex.startsWith("steam:") === false) {
                hex = `steam:${hex}`
            }
            let isim1 = args[2]
            let isim2 = args[3]
            if (!isim1 || !isim2) return message.channel.send("Hatalı kullanım! \nÖRN: !isimdeğiştir 11000010aceb57a Ahmet Bekçi")

            connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
                let user = result[0]
                let eskiisim = user.firstname
                let eskisoy = user.lastname
                if (!user) {
                    isimEmbed.setColor("RED")
                    .setDescription(`Girilen hex ID'si ile hiçbir kullanıcı bulunamadı.`)
                    .setAuthor("İşlem başarısız!")
                    message.channel.send(isimEmbed)
                    return;
                }
                connection.query(`UPDATE users SET firstname = '${isim1}' WHERE firstname = '${user.firstname}'`,(err,result) => {if (err) console.log(err)})
                connection.query(`UPDATE users SET lastname = '${isim2}' WHERE lastname = '${user.lastname}'`,(err,result) => {if (err) console.log(err)})
                isimEmbed.setColor("GREEN")
                .setDescription(`${hex} ID'li oyuncunun ismi \`${eskiisim} ${eskisoy}\` değerinden \`${isim1} ${isim2}\` olarak değiştirildi.`)
                .setAuthor("İşlem başarılı!")
                message.channel.send(isimEmbed)
            })

        } else {
            isimEmbed.setColor("RED")
            .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
            .setAuthor("İşlem başarısız!")
            message.channel.send(isimEmbed)
            return;
        }
    }
}