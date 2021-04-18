const axios = require("axios");

module.exports = {
     getSteam: (steamid,steamapikey) => {
        try {
            return axios({
                url: `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamapikey}&steamids=${steamid}`,
                method: "get",
                timeout: 10000,
                responseType: "json"
            })
        } catch {
            return "Hata, kullanıcı bulunamadı";
        }
    },

    getSteambans: (steamid,steamapikey) => {
        try {
            return axios({
                url: `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${steamapikey}&steamids=${steamid}`,
                method: "get",
                timeout: 10000,
                responseType: "json"
            })
        } catch {
            return "Hata, kullanıcı bulunamadı";
        }
    },


    // https://stackoverflow.com/a/12533838
    h2d: (s) => {
        function add(x, y) {
            var c = 0, r = [];
            var x = x.split('').map(Number);
            var y = y.split('').map(Number);
            while(x.length || y.length) {
                var s = (x.pop() || 0) + (y.pop() || 0) + c;
                r.unshift(s < 10 ? s : s - 10); 
                c = s < 10 ? 0 : 1;
            }
            if(c) r.unshift(c);
            return r.join('');
        }
    
        var dec = '0';
        s.split('').forEach(function(chr) {
            var n = parseInt(chr, 16);
            for(var t = 8; t; t >>= 1) {
                dec = add(dec, dec);
                if(n & t) dec = add(dec, '1');
            }
        });
        return dec;
    }
}