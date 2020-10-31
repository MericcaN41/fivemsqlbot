const Discord = require("discord.js");
module.exports = {
    name: "plakadeğiş",
    description: "Girilen plakayı değiştirir.",
    execute(message, args, connection, izinliRol) {
        const plakaEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.permissions.has("ADMINISTRATOR")) {
                let mevcutPlaka = args[1].replace("_"," ")
                let yapilacakPlaka = args[2].replace("_"," ")
                if (!mevcutPlaka || !yapilacakPlaka) return message.channel.send("Hatalı kullanım ! \n ÖRN: !plakadeğiş BIN_392 FKA_589")
                if (yapilacakPlaka.length >= 9) {
                    message.channel.send("Bu plaka çok büyük ! Maksimum plaka uzunluğu : \`8\`")
                    return;
                }
                connection.query("SELECT * FROM owned_vehicles WHERE plate = ?",mevcutPlaka,(err,result) => {
                    let vehicle = result[0]
                    if (vehicle) {
                        let model = vehicle.vehicle.replace(mevcutPlaka,yapilacakPlaka)
                        connection.query(`UPDATE owned_vehicles SET plate = \'${yapilacakPlaka}\' WHERE plate = \'${vehicle.plate}\'`,(err,result) => {if (err) console.log(err)})
                        connection.query(`UPDATE owned_vehicles SET vehicle = \'${model}\' WHERE vehicle = \'${vehicle.vehicle}\'`,(err,result) => {if (err) console.log(err)})
                        plakaEmbed.setColor("GREEN")
                        .setDescription(`\`${mevcutPlaka}\` plakası başarıyla \`${yapilacakPlaka}\` ile değiştirildi!`)
                        .setAuthor("İşlem başarılı!")
                        message.channel.send(plakaEmbed)
                        return;
                     } else {
                        plakaEmbed.setColor("RED")
                        .setDescription(`Girilen plaka ile bir araç bulunamadı!`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(plakaEmbed)
                        return;
                    }
                })   
            } else {
                plakaEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(plakaEmbed)
                return;
            }
    }
}
