const Discord = require("discord.js");
const client = new Discord.Client()
const ayarlar = require("./config.json");
const meslekler = require("./meslekler.json"); /* Meslek eklemek için 'meslekler.json' dan "meslekKodu":"gözükecekİsim" formatında ekleme yapabilirsiniz*/

// MYSQL //
const mysql = require("mysql");
const connection = mysql.createConnection(ayarlar.sql)

connection.connect(err => {
    if (err) {
        console.log("Database ile bağlantı sağlanamadı ! Bot kapanacaktır. Lütfen database bağlantınızı kontrol edip tekrar deneyiniz.") // XAMPP açın.
        process.exit(1)
    }
    console.log("Database ile bağlantı başarıyla sağlandı !")
})
//////////////////////////////////


// ENVIRONMENT VARIABLES (.env) //
require("dotenv").config()
var token = process.env.TOKEN;
var prefix = process.env.PREFIX;
//////////////////////////////////

// ANA KOD //

client.on("ready", () => {
    console.log(`${client.user.tag} olarak Discord'a bağlanıldı!`)
});

client.on("message", async (message) => {
    let args = message.content.substring(prefix.length).split(" ")
    let izinliRol = message.guild.roles.cache.get(ayarlar.izinliRolid)

    switch(args[0]) {
        case "kimlik":
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
            break;
        // KİMLİK BİTİŞ

        case "telefon":
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
            break;
        //TELEFON BİTİŞ
            
        case "ck":
            const ckEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let hex = args[1]
                if (!hex) return message.channel.send("Bir hex girmelisin.")
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                message.channel.send("Eminmisin ? Eminsen bu mesajı \`evet\` yazarak cevapla. 10 saniyen var.")
                message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max:1,
                    time:10000
                }).then(c => {
                    if (c.first().content.toLowerCase() === "evet") {
                        connection.query("SELECT * FROM users WHERE identifier = ?",hex, (err,result) => {
                           let user = result[0]
                           if (user) {
                                connection.query("DELETE FROM users WHERE identifier = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM addon_account_data WHERE owner = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM characters WHERE identifier = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM datastore_data WHERE owner = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM user_accounts WHERE identifier = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM user_inventory WHERE identifier = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM user_licenses WHERE owner = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM characters_motel WHERE userIdentifier = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM owned_vehicles WHERE owner = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM phone_users_contacts WHERE identifier = ?",hex, (err,results,fields) => {
                                })
                                ckEmbed.setAuthor("İşlem başarılı!")
                                .setColor("GREEN")
                                .setDescription(`${hex} ID'li kişiye başarıyla CK atıldı !`)
                                message.channel.send(ckEmbed)
                            } else {
                                ckEmbed.setAuthor("Hata !")
                                .setColor("RED")
                                .setDescription("Girilen ID ile bir kullanıcı bulunamadı! Lütfen tekrar deneyiniz.")
                                message.channel.send(ckEmbed)
                                return;
                            }
                        })
                    }
                })
            }  else {
                ckEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(ckEmbed)
                return;
            }
            break;
        // CK BİTİŞ


        case "wlekle":
            const wlEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
                let hex = args[1]
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                if (!hex) return message.channel.send("Bir hex girmelisin.")
                connection.query("SELECT * FROM whitelist WHERE identifier = ?",hex,(err,result) => {
                    let user = result[0]
                    if (!user) {
                        connection.query(`INSERT INTO whitelist (identifier) VALUES (\'${hex}\')`,(err,result) => {
                            wlEmbed.setColor("GREEN")
                            .setDescription(`${hex} ID'si başarıyla whiteliste eklendi.`)
                            .setAuthor("İşlem başarılı!")
                            message.channel.send(wlEmbed)
                        })
                    } else {
                        wlEmbed.setColor("RED")
                        .setDescription(`${hex} ID'si zaten whitelistte bulunmakta.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(wlEmbed)
                    }
                })
            } else {
                wlEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(wlEmbed)
                return;
            }
            break;
        // WL EKLE BİTİŞ


        case "wlsil":
            const silEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (izinliRol) {
                if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
                    let hex = args[1]
                    if (hex.startsWith("steam:") === false) {
                        hex = `steam:${hex}`
                    }
                    
                    connection.query("SELECT * FROM whitelist WHERE identifier = ?",hex,(err,result) => {
                        let user = result[0]
                        if (user) {
                            connection.query("DELETE FROM whitelist WHERE identifier = ?",hex,(err,result,fields) => {
                                if (!err) {
                                    silEmbed.setColor("GREEN")
                                    .setAuthor("İşlem başarılı!")
                                    .setDescription(`${hex} ID'si başarıyla whitelistten çıkartıldı.`)
                                    message.channel.send(silEmbed)
                                } else return
                            })
                        } else {
                            silEmbed.setColor("RED")
                            .setAuthor("İşlem başarısız!")
                            .setDescription(`${hex} ID'si zaten whitelistte değil.`)
                            message.channel.send(silEmbed)
                        }
                    })
                }  else {
                    wlEmbed.setColor("RED")
                    .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                    .setAuthor("İşlem başarısız!")
                    message.channel.send(silEmbed)
                    return;
                }
            } else return
            break;
        //WL SİL BİTİŞ

        case "paraver":
            const paraEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let hex = args[1]
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                let para = args[2]
                if (parseInt(para) > 2147483647) return message.channel.send("Girdiğin miktar çok büyük !")

                connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
                    let user = result[0]
                    if (!user) {
                        paraEmbed.setColor("RED")
                        .setDescription(`Girilen hex ID'si ile hiçbir kullanıcı bulunamadı.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(paraEmbed)
                        return;
                    }
                    connection.query(`UPDATE users SET money = ${parseInt(para)} WHERE money = ${user.money}`,(err,result) => {
                        if (err) console.log(err)
                        paraEmbed.setColor("GREEN")
                        .setDescription(`${hex} ID'li oyuncunun parası başarıyla \`${para}\` miktarına ayarlandı.`)
                        .setAuthor("İşlem başarılı!")
                        message.channel.send(paraEmbed)
                    })
                })

            } else {
                paraEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(para)
                return;
            }
            break;
    }
});



client.login(token)
