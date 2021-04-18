const Discord = require("discord.js");
const { getSteam, getSteambans, h2d } = require("../functions");
const ayarlar = require("../config.json");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "wlekle",
    description: "Girilen hexi whiteliste ekler(esx_whitelist)",
    execute(message, args, connection, izinliRol, apikey) {
        const wlEmbed = new Discord.MessageEmbed()
            .setFooter("MrcSQLSystem")
            if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
                let hex = args[1]
                if (!hex) return message.channel.send("Bir hex girmelisin.")
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                connection.query("SELECT * FROM whitelist WHERE identifier = ?",hex,(err,result) => {
                    let user = result[0]
                    if (!user) {
                        connection.query(`INSERT INTO whitelist (identifier) VALUES (\'${hex}\')`, async (err,result) => {
                            wlEmbed.setColor("GREEN")
                            .setDescription(`${hex} ID'si başarıyla whiteliste eklendi.`)
                            .setAuthor("İşlem başarılı!")
                            message.channel.send(wlEmbed)

                            if (ayarlar.wlLogID !== "0") {
                                let sid = h2d(hex.slice(6))
                                let res = await getSteam(sid,apikey)
                                let banres = await getSteambans(sid,apikey)

                                let profil = res.data.response.players[0], banprofil = banres.data.players[0]
                                const wlLogEmbed = new Discord.MessageEmbed()
                                .setFooter("MrcSQLSystem")
                                .setColor("DARK_GREEN")
                                .setAuthor("Whitelist eklendi")
                                .setThumbnail(profil.avatarfull)
                                .addField("Steam ismi",profil.personaname)
                                .addField("Profil linki", profil.profileurl)
                                .addField("Gizlilik", (profil.communityvisibilitystate === 1) ? "Gizli" : "Herkese açık")
                                .addField("VAC ban?", (banprofil.VACBanned) ? "Evet" : "Hayır",true)
                                .addField("VAC ban sayısı", banprofil.NumberOfVACBans,true)
                                .addField("Steam ID",profil.steamid)
                                .addField("Discord", (message.mentions.members.first() !== null) ? message.mentions.members.first() : "Bulunamadı")
                                .addField("Hex ID",hex)
                                .addField("Whitelist ekleyen yetkili",message.member)

                                if (profil.communityvisibilitystate !== 1) {
                                    wlLogEmbed
                                    .addField("Gerçek ismi", profil.realname)
                                    .addField("Hesap kuruluş tarihi", moment.unix(profil.timecreated).format("LLL"))
                                }

                                message.guild.channels.cache.find(c => c.id === ayarlar.wlLogID).send(wlLogEmbed)

                            }
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
    }
}
