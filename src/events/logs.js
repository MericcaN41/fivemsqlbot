/* 
Bütün loglar burada yer alır.
*/

const ayarlar = require("../config.json");
const MySQLEvents = require("mysql-events");
var listener = MySQLEvents(ayarlar.sql);

// WEBHOOK
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const whitelistHook = new Webhook(ayarlar.whitelistlogWebhookURL);
const faturaHook = new Webhook(ayarlar.faturalogWebhookURL);

    // ÖZELLEŞTİRME
    whitelistHook.setAvatar() // İstediğiniz resmin linkini koymalısınız.
    whitelistHook.setUsername("MrcSQLSystem") // İstediğinizi yazabilirsiniz. 


    faturaHook.setAvatar()
    faturaHook.setUsername("MrcSQLSystem")

module.exports = {
    logs: () => {
        
        const LogEmbed = new MessageBuilder()
        .setFooter("MrcSQLSystem")

        let green = "#3fd467"
        let red = "#d43f3f"
        
        
        // WHITELIST LOG
        if (ayarlar.whitelistlogAktif === true) {
            
            listener.add("essentialmode.whitelist", (oldRow,newRow,event) =>{
                if (oldRow === null) {
                    LogEmbed.setAuthor("MrcLOG -> Whitelist Eklendi")
                    .setColor(green)
                    .setDescription(`Identifier: **${newRow.fields.identifier}**`)
                    .setTimestamp();
                    whitelistHook.send(LogEmbed)
                }

                if (newRow === null) {
                    LogEmbed.setAuthor("MrcLOG -> Whitelist Silindi")
                    .setColor(red)
                    .setDescription(`Identifier: **${oldRow.fields.identifier}**`)
                    .setTimestamp();
                    whitelistHook.send(LogEmbed)
                }

            })
            console.log("Whitelist log \x1b[32mAKTİF!\x1b[0m")
        } else {
            console.log("Whitelist log \x1b[31mDEAKTİF!\x1b[0m")
        }

        // FATURA LOG
        if (ayarlar.faturalogAktif === true) {
            listener.add("essentialmode.billing",(oldRow,newRow,event) => {

                if (oldRow === null) {
                    LogEmbed.setAuthor("MrcLOG -> Fatura Yazıldı")
                    .setColor(green)
                    .setDescription(`Faturayı alan: **${newRow.fields.identifier}** \nFaturayı yazan: **${newRow.fields.sender}** \nFatura sebebi: **${newRow.fields.label}** \nFatura miktarı: **${newRow.fields.amount}**`)
                    .setTimestamp();
                    faturaHook.send(LogEmbed)
                }

                if (newRow === null) {
                    LogEmbed.setAuthor("MrcLOG -> Fatura Ödendi")
                    .setColor(red)
                    .setDescription(`Ödeyen kişi: **${oldRow.fields.identifier}** \nÖdenen miktar: **${oldRow.fields.amount}** \nFatura sebebi: **${oldRow.fields.label}**`)
                    .setTimestamp();
                    faturaHook.send(LogEmbed)
                }
            })
            console.log("Fatura log \x1b[32mAKTİF!\x1b[0m")
        } else {
            console.log("Fatura log \x1b[31mDEAKTİF!\x1b[0m")
        }
    }
}