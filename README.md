# Fivem SQL Bot
# MericcaN41#0652
### FiveM Databaseinizi Discorda taşır !
#### NOT: Bu bot bedavadır, editlenmesi serbesttir, satılması kesinlikle yasaktır.
<img src="https://i.imgur.com/MNRbibv.png" width="200"  height="300"> <img src="https://i.imgur.com/cM5iYkR.png" width="200"  height="300"> <img src="https://i.imgur.com/9QFENK8.png" width="400" height="300">


<img src="https://i.imgur.com/3HqfULc.png" width="400" height="200"> <img src="https://i.imgur.com/VemlW50.png" width="400" height="200">
<img src="https://i.imgur.com/NiLMMd8.png" width="400" height="200"> <img src="https://i.imgur.com/95TmOCt.png" width="400" height="200">






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
* !paraekle HEX MIKTAR --> Hexi girilen kişinin mevcut parasına girilen miktarı **EKLER**
* !bankaparaekle HEX MIKTAR --> Hexi girilen kişinin bankadaki mevcut parasına girilen miktarı **EKLER**
* !meslekbilgi meslek**KODU** SEVIYE (Girilmesse **0**) --> Girilen bilgilere göre mesleğin bilgilerini gösterir (Kod,maaş vs.)
* !meslekver HEX meslek**KODU** SEVIYE --> Hexi girilen kişinin mesleğini değiştirir.
* !telnodeğiş HEX NUMARA --> Hexi girilen kişinin telefon numarasını değiştirir. Sadece **yöneticiler** kullanabilir.
* !isimdeğiştir HEX İSİM SOYİSİM --> Hexi girilen kişinin ismini ve soy ismini değiştirir.

## Nasıl meslek eklerim ?

Bunu yapmak zorunda değilsiniz ama meslek kodunun yerine istediğinizi yazdırmak istiyorsanız yapabilirsiniz.
* ÖRN: 
  * police --> Polis
  * ambulance --> Doktor

Meslek eklemek için **meslekler.json** dosyasını açıp **"meslekKodu":"görünecekİsim"** şeklinde eklemeler yapabilirsiniz.


# Güncelleme notları 1.0.7
> * !faturabilgi eklendi!
>   * Kullanım: !faturabilgi 11000010aceb57a <-- Kişinin tüm faturalarını gösterir
>   * <img src="https://i.imgur.com/7l3CQDV.png" width="250" height="150">
> * !plakadeğiş eklendi!
>   * Kullanım: !plakadeğiş ASD_123 FGH_456 <-- Boşluk yerine _ yazılmaktadır.
>   * <img src="https://i.imgur.com/HJUYCja.png" width="250" height="150">
