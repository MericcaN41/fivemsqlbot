const Discord = require("discord.js");
const client = new Discord.Client()
const ayarlar = require("./config.json");
const meslekler = require("./meslekler.json"); /* Meslek eklemek için 'meslekler.json' dan "meslekKodu":"gözükecekİsim" formatında ekleme yapabilirsiniz*/
const fs = require("fs");

// MYSQL //
const mysql = require("mysql");
const connection = mysql.createConnection(ayarlar.sql)

connection.connect(err => {
    if (err) {
        console.log("\x1b[32mDatabase \x1b[0mile bağlantı \x1b[31msağlanamadı ! \x1b[0mBot kapanacaktır. Lütfen database bağlantınızı kontrol edip tekrar deneyiniz.") // XAMPP açın.
        setTimeout(() => {
            process.exit(1)
        },3000)
        return;
    }
    console.log("\x1b[32mDatabase \x1b[0mile bağlantı başarıyla sağlandı !")
})
//////////////////////////////////


// ENVIRONMENT VARIABLES (.env) //
require("dotenv").config()
var token = process.env.TOKEN;
var prefix = process.env.PREFIX;
//////////////////////////////////

// ANA KOD //
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
  console.log(`\x1b[33m${prefix}\x1b[31m${command.name} \x1b[0m-- \x1b[32m${command.description}\x1b[0m`)
}

client.on("ready", () => {
    console.log(`\x1b[31m${client.user.tag} \x1b[0molarak Discord'a bağlanıldı!`)
});

client.on("message", async (message) => {
    let args = message.content.substring(prefix.length).split(" ")
    let command = client.commands.get(args[0])
    let izinliRol = message.guild.roles.cache.get(ayarlar.izinliRolid)

<<<<<<< HEAD
    if (command) {
        command.execute(message,args,connection,izinliRol)
    } else return
=======
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
                    silEmbed.setColor("RED")
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
                message.channel.send(paraEmbed)
                return;
            }
            break;
            // PARAVER BİTİŞ
        case "bankaparaver":
            const bankaEmbed = new Discord.MessageEmbed()
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
                        bankaEmbed.setColor("RED")
                        .setDescription(`Girilen hex ID'si ile hiçbir kullanıcı bulunamadı.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(bankaEmbed)
                        return;
                    }
                    connection.query(`UPDATE users SET bank = ${parseInt(para)} WHERE bank = ${user.bank}`,(err,result) => {
                        if (err) console.log(err)
                        bankaEmbed.setColor("GREEN")
                        .setDescription(`${hex} ID'li oyuncunun bankadaki parası başarıyla \`${para}\` miktarına ayarlandı.`)
                        .setAuthor("İşlem başarılı!")
                        message.channel.send(bankaEmbed)
                    })
                })

            } else {
                bankaEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(bankaEmbed)
                return;
            }
            break;
            // BANKAPARAVER BİTİŞ

            
        case "meslekver":
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
                    if (user) {
                        connection.query(`UPDATE users SET job = '${meslek}' WHERE job = '${user.job}'`, (err,result) => {
                            if (err) console.log(err)
                        })
                        connection.query(`UPDATE users SET job_grade = ${grade} WHERE job_grade = ${user.job_grade}`, (err,result) => {
                            if (err) console.log(err)
                        })
                        meslekEmbed.setColor("GREEN")
                        .setDescription(`${hex} ID'li kullanıcının mesleği ${meslek}(${grade}) olarak ayarlandı!`)
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
            break;
            // MESLEKVER BİTİŞ

        case "meslekbilgi":
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
            break;
            // MESLEKBİLGİ BİTİŞ
            
        case "telnodeğiş":
            const telEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let hex = args[1]
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                let no = args[2]

                connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
                    let user = result[0]
                    if (user) {
                        connection.query(`UPDATE users SET phone_number = ${no} WHERE phone_number = ${user.phone_number}`,(err,result) => {
                            if (err) console.log(err)
                            telEmbed.setColor("GREEN")
                            .setAuthor("İşlem başarılı!")
                            .setDescription(`${hex} ID'li kullanıcının telefon numarası ${no} olarak değiştirildi!`)
                            message.channel.send(telEmbed)
                        })
                    } else {
                        telEmbed.setColor("RED")
                        .setDescription(`Girilen hex ID'si ile hiçbir kullanıcı bulunamadı.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(telEmbed)
                        return;
                    }
                })
            } else {
                telEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(telEmbed)
                return;
            }
            break;
            // TELNO BİTİŞ

    }
>>>>>>> 34407130a39ab8cdd34322d74c2d7a575bdc27d5
});



client.login(token)
