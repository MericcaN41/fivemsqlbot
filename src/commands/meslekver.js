const Discord = require("discord.js");
const meslekler = require("../meslekler.json");
module.exports = {
    name: "meslekver",
    description: "Hexi girilen kişiye meslek verir.",
    execute(message, args, connection, izinliRol) {
        const meslekEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if(message.member.roles.cache.find(r => r.id === izinliRol.id)) {
                let hex = args[1]
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                let meslek = args[2]
                let grade = parseInt(args[3])
                if (!hex || !meslek || !grade) return message.channel.send("Hatalı kullanım ! \nÖRN:!meslekver 11000010aceb57a police 1")
                connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
                    let user = result[0]
                    let eskimeslek = user.job
                    let eskigrade = user.job_grade
                    if (user) {
                        connection.query(`UPDATE users SET job = '${meslek}' WHERE job = '${user.job}'`, (err,result) => {
                            if (err) console.log(err)
                        })
                        connection.query(`UPDATE users SET job_grade = ${grade} WHERE job_grade = ${user.job_grade}`, (err,result) => {
                            if (err) console.log(err)
                        })
                        meslekEmbed.setColor("GREEN")
                        .setDescription(`${hex} ID'li kullanıcının mesleği \`${eskimeslek}(${eskigrade})\` mesleğinden \`${meslek}(${grade})\` olarak ayarlandı!`)
                        .setAuthor("İşlem başarılı!")
                        message.channel.send(meslekEmbed)
                    } else {
                        meslekEmbed.setColor("RED")
                        .setDescription(`Girilen hex ID'si ile hiçbir kullanıcı bulunamadı.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(meslekEmbed)
                        return;
                    }
                })
            } else {
                meslekEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(meslekEmbed)
                return;
            }
    }
}