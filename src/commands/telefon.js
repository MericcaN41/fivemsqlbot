const Discord = require("discord.js");
const meslekler = require("../meslekler.json");
module.exports = {
    name: "telefon",
    description: "Telefon numarası ile oyuncu aratır.",
    execute(message, args, connection, izinliRol) {
        const numaraEmbed = new Discord.MessageEmbed()
        .setFooter("MrcSQLSystem")
        if (izinliRol) {
            if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
                let numara = args[1]
                if (!numara) return message.channel.send("Bir numara girmelisin.")
                let aranacak = "SELECT * FROM users WHERE phone_number = ?"
                connection.query(aranacak,numara, (err,result) => {
                    let user = result[0]
                    if (!user) {
                        numaraEmbed.setColor("RED")
                        .setAuthor("Hata !")
                        .setDescription("Belirtilen numara ile bir kişi bulunamadı. Lütfen numarayı kontrol edip tekrar deneyiniz.")
                        message.channel.send(numaraEmbed)
                        return;
                    }
                    numaraEmbed.setAuthor(`${numara} numarasının bilgileri`)
                    .addField("Steam ismi",user.name)
                    .addField("Hex ID",user.identifier)
                    .addField("IC İsmi",`${user.firstname} ${user.lastname}`)
                    .addField("Grup",user.group)
                    .setColor("GREEN")
                    message.channel.send(numaraEmbed)
                })
            } else {
                numaraEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(numaraEmbed)
                return;
            }
        } else return
    }
}