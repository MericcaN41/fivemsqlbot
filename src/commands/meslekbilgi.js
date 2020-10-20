const Discord = require("discord.js");
const meslekler = require("../meslekler.json");
module.exports = {
    name: "meslekbilgi",
    description: "Aratılan meslek hakkında bilgi verir.",
    execute(message, args, connection, izinliRol) {
        const mbilgiEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
                let meslek = args[1]
                let grade = args[2]
                if (!grade) {
                    grade = 0
                }
                connection.query(`SELECT * FROM job_grades WHERE job_name = '${meslek}' AND grade = ${grade}`,(err,result) => {
                    if (err) console.log(err)
                    let bMeslek = result[0]
                    if (bMeslek) {
                        mbilgiEmbed.setColor("GREEN")
                        .setAuthor(`${bMeslek.job_name} mesleğinin bilgileri.`)
                        .addField("Meslek kodu",bMeslek.job_name)
                        .addField("Meslek ismi",`${bMeslek.job_name} - ${bMeslek.label}`)
                        .addField("Meslek seviyesi",bMeslek.grade)
                        .addField("Meslek maaşı",bMeslek.salary)
                        message.channel.send(mbilgiEmbed)
                    } else {
                        mbilgiEmbed.setColor("RED")
                        .setAuthor("İşlem başarısız!")
                        .setDescription("Girilen isimle herhangi bir meslek bulunamadı!")
                        message.channel.send(mbilgiEmbed)
                        return;
                    }
                })
            } else {
                mbilgiEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(mbilgiEmbed)
                return;
            }
    }
}