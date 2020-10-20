const Discord = require("discord.js");
const meslekler = require("../meslekler.json");
module.exports = {
    name: "kimlik",
    description: "Oyuncunun kimliğini gösterir.",
    execute(message, args, connection, izinliRol) {
        const bilgiEmbed = new Discord.MessageEmbed()
        .setFooter("MrcSQLSystem")
        if (izinliRol) {
            if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
                let hex = args[1]
                if (!hex) return message.channel.send("Bilgisini bulmak istediğin oyuncunun HEX ID'sini girmelisin!")
                let arama = "SELECT * FROM users WHERE identifier = ?"
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
    
                connection.query(arama,hex, (err,result) => {
                    let user = result[0]
                    if (!user) {
                        bilgiEmbed.setDescription("Girilen Hex ID'si ile hiçbir kullanıcı bulunamadı.")
                        .setColor("RED")
                        .setTitle("Hata!")
                        message.channel.send(bilgiEmbed)
                        return;
                    }
                    let sex;
                    if (user.sex === "F") {
                        sex = "Bayan"
                    } else {
                        sex = "Erkek"
                    }
                    bilgiEmbed.setColor("GREEN")
                    .setAuthor(`${user.name} steam isimli kişinin bilgileri!`)
                    .addField(`📃・İsim` ,`${user.firstname} ${user.lastname}`)
                    .addField(`📆・Doğum Tarihi` ,`${user.dateofbirth}`)
                    .addField(`👫・Cinsiyet`,sex)
                    .addField(`💼・Meslek`,`${meslekler[user.job] || user.job}`)
                    .addField(`💰・Cüzdan` ,`${user.money}`)
                    .addField(`💳・Banka` ,`${user.bank}`)
                    .addField(`💻・Grup` ,`${user.group}`)
                    message.channel.send(bilgiEmbed)
                })
            } else {
                bilgiEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(bilgiEmbed)
                return;
            }
        } else return

    }
}