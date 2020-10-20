# Fivem SQL Bot
### FiveM Databaseinizi Discorda taşır !
![image](https://i.imgur.com/MNRbibv.png) ![image2](https://i.imgur.com/9QFENK8.png)

## Nasıl Kurulur ?

Her şeyden önce bilgisayarınızda **Node.js** yüklü olduğundan emin olun. [Node.js](https://nodejs.org/)

Dosyaları indirip bir klasöre attıktan sonra klasörün içinde CMD açıp bunları yazın.
> * npm i discord.js
> * npm i mysql
> * npm i dotenv
> * (İSTEĞE GÖRE) **esx_whitelist** scriptini kurun. [Link](https://github.com/esx-framework/esx_whitelist)

<p>Databaseinizin aktif olduğundan emin olun. (XAMP vs.)</p>
<p>Config.json dosyasından komutları kullanacak rolün ID'sini girin.</p>
<p>Ardından .env dosyasına botun tokenini girip <strong>baslat.bat</strong> dosyasını açın.</p>


## Bütün komutlar

* !kimlik HEX --> Hexi girilen kişinin bilgilerini yazar.
* !telefon telefonNumarası --> Telefon numarası girilen kişinin bilgilerini yazar. Telefondan spam atanları bulmak için iyi bir yöntem.
* !ck HEX --> Hexi girilen kişiye CK atar. Sadece **yöneticiler** kullanabilir.
* !wlekle HEX --> Hexi girilen kişiye whitelist verir. (esx_whitelist)
* !wlsil HEX --> Hexi girilen kişiden whitelistini alır. (esx_whitelist)
* !paraver HEX MIKTAR --> Hexi girilen kişinin parasını belirtilen miktara ayarlar, **EKLEMEZ!**
* !bankaparaver HEX MIKTAR --> Hexi girilen kişinin bankadaki parasını belirtilen miktara ayarlar, **EKLEMEZ!**
* !meslekbilgi meslek**KODU** SEVIYE (Girilmesse **0**) --> Girilen bilgilere göre mesleğin bilgilerini gösterir (Kod,maaş vs.)
* !meslekver HEX meslek**KODU** SEVIYE --> Hexi girilen kişinin mesleğini değiştirir.
* !telnodeğiş HEX NUMARA --> Hexi girilen kişinin telefon numarasını değiştirir. Sadece **yöneticiler** kullanabilir.

## Nasıl meslek eklerim ?

Bunu yapmak zorunda değilsiniz ama meslek kodunun yerine istediğinizi yazdırmak istiyorsanız yapabilirsiniz.
* ÖRN: 
  * police --> Polis
  * ambulance --> Doktor

Meslek eklemek için **meslekler.json** dosyasını açıp **"meslekKodu":"görünecekİsim"** şeklinde eklemeler yapabilirsiniz.

# Güncelleme notları 1.0.5
> * **commands** klasörü eklendi. Bütün komutlar burada bulunmaktadır.
> * **index.js** kısaltıldı.
> * CMD renklendirildi

## Güncelleme notları 1.0.4
> * !bankaparaver eklendi ! (!paraver ile aynı mantıkta çalışmaktadır.)
> * !meslekbilgi eklendi!
>   * ÖRN: !meslekbilgi police 1
> * !telnodeğiş eklendi!
>   * ÖRN: !telnodeğiş 11000010aceb57a 154786
> * Bazı hatalar fixlendi.

### Güncelleme notları 1.0.3
> * !paraver eklendi !
>   * !paraver HEX MIKTAR (**Yönetici** gerekmektedir.)
>     * ÖRN: !paraver 11000013b62aaa6 200000


#### Güncelleme notları 1.0.2
> * esx_whitelist uyumu eklendi !
>   * !wlekle HEX --> Whiteliste ekler. (İzinli rol gerekir.)
>   * !wlsil HEX --> Whitelistten çıkartır. (İzinli rol gerekir.)
> * Bazı hatalar fixlendi.


##### Güncelleme notları 1.0.1
> * CK atma eklendi !
>   * Kullanım: !ck HEX (**Yönetici** gerekmektedir.)
> * İzinli rol eklendi. Rolü değiştirmek için **config.json**'dan ID sini girebilirsiniz. Bu role sahip olmayanlar **kimlik** ve **telefon** komutlarını kullanamaz.
