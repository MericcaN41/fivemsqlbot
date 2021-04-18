const Discord = require("discord.js");
module.exports = {
    name: "bankaparaekle",
    description: "Hexi girilen kişinin bankasına girilen miktar kadar para ekler. (EXTENDEDMODE)",
    execute(message, args, connection, izinliRol) {
        const paraEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let hex = args[1]
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                let eklenecek = parseInt(args[2])
                connection.query(`SELECT * FROM users WHERE identifier = ?`,hex, (err,result) => {
                    let user = result[0]
                    if (!user) {
                        paraEmbed.setColor("RED")
                        .setDescription(`Girilen hex ID'si ile hiçbir kullanıcı bulunamadı.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(paraEmbed)
                        return;
                    }
                    let accounts = JSON.parse(user.accounts)
                    accounts.bank += eklenecek
                    if (accounts.bank >= 2147483647) return message.channel.send("Bu miktar çok büyük ekleme yapamıyorum! (Para > 2147483647)")
                    connection.query(`UPDATE users SET accounts = '${JSON.stringify(accounts)}' WHERE identifier = ?`,hex, (err,result) => {
                        if (err) console.log(err)
                        paraEmbed.setColor("GREEN")
                        .setDescription(`${hex} ID'li oyuncunun bankadaki parasına başarıyla \`${eklenecek}\` miktarı eklenmiştir. Yeni miktar \`${accounts.bank}\`.`)
                        .setAuthor("İşlem başarılı!")
                        message.channel.send(paraEmbed)
                    }); 
                });
            } else {
                paraEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(paraEmbed)
                return;
            }
    }
}