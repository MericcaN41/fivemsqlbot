# Fivem SQL Bot
### FiveM Databaseinizden bilgi almaya yarar.

![image](https://i.imgur.com/MNRbibv.png)

## Nasıl Kurulur ?

Dosyaları indirip bir klasöre attıktan sonra klasörün içinde CMD açıp bunları yazın.
> * npm i discord.js
> * npm i mysql
> * npm i dotenv

Ardından .env dosyasına botun tokenini girip **baslat.bat** dosyasını açın.

## Nasıl kullanılır ?

* !kimlik HEX --> Hexi girilen kişinin bilgilerini yazar.
* !telefon telefonNumarası --> Telefon numarası girilen kişinin bilgilerini yazar. Telefondan spam atanları bulmak için iyi bir yöntem.
* !ck HEX --> Hexi girilen kişiye CK atar. Sadece **yöneticiler** kullanabilir.

## Nasıl meslek eklerim ?

Bunu yapmak zorunda değilsiniz ama meslek kodunun yerine istediğinizi yazdırmak istiyorsanız yapabilirsiniz.
* ÖRN: 
  * police --> Polis
  * ambulance --> Doktor

Meslek eklemek için **meslekler.json** dosyasını açıp **"meslekKodu":"görünecekİsim"** şeklinde eklemeler yapabilirsiniz.


# Güncelleme notları 1.0.1
> * CK atma eklendi !
>   * Kullanım: !ck HEX (**Yönetici** gerekmektedir.)
> * İzinli rol eklendi. Rolü değiştirmek için **config.json**'dan ID sini girebilirsiniz. Bu role sahip olmayanlar **kimlik** ve **telefon** komutlarını kullanamaz.
