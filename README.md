# OpenlayersMapDrawApplication

# OpenLayers ile Harita Pinleme Uygulaması

Bu proje, OpenLayers kütüphanesini kullanarak interaktif bir harita çizim uygulaması geliştirmek için  frontend de React ve  backend de .NET Core teknolojilerini bir araya getirmektedir. Kullanıcılar, harita üzerinde konum pinleyebilir , line ile çizim yapabilir veya polygon kullanarak alan çizimleri yapabilir.
Uygulamayı canlı olarak görmek için [buraya tıklayın](https://abdullahmutllu.github.io/OpenlayerMapDrawApplication/).
Uygulamanın api projesine ulaşmak için [buraya tıklayın](https://github.com/abdullahmutllu/DrawApplicationApi/).

## Proje Açıklaması

OpenLayers ile Haritada çizim  Uygulaması, kullanıcılara interaktif bir harita üzerinde belirli konumları pinleme, güncelleme ve silme imkanı sağlar. React kullanarak dinamik ve kullanıcı dostu bir frontend geliştirilmiş olup, backend tarafında ise .NET Core API ile veri işleme ve saklama işlemleri gerçekleştirilmiştir. Bu uygulama, harita tabanlı projelerde temel bir yapı taşını oluşturmakta ve coğrafi verilerin yönetimini kolaylaştırmaktadır.

## Özellikler

- 🗺️ **Harita Üzerinde Çizim**: Kullanıcılar harita üzerinde Point , Line veya Polygon çizimleri yapabilir.
- ✏️ **Çizim Güncelleme**: Kullanıcılar çizimlerini ,  konumların bilgilerini güncelleyebilir.
- 🗑️ **Pin Silme**: Kullanıcılar, artık ihtiyaç duymadıkları çizimleri haritadan silebilir.
- 📊 **Veri Saklama ve Yönetim**: Çizilen geometriler ile ilgili veriler .NET Core backend ile yönetilir.
- 🔍 **Kullanıcı Dostu Arayüz**: React ile geliştirilen dinamik ve modern kullanıcı arayüzü.

## Teknolojiler

- **Frontend**: React
- **Backend**: .NET Core
- **Harita Kütüphanesi**: OpenLayers
- **Veritabanı**: PostgreSQL (PostGIS ile coğrafi veri desteği)
- **Diğer Araçlar**: Docker, SCSS

## Porje Görüntüleri
*Ana Sayfa*
![Ana Ekran](https://github.com/user-attachments/assets/f757d702-362b-4da1-b19b-7bddad2f633f)

![ÇizimTablosu](https://github.com/user-attachments/assets/5e74e20a-b527-4e4a-b8d5-d6558550e4a9)

![hartitaÇizim](https://github.com/user-attachments/assets/cf43348d-c48c-45d0-a1e3-bc56507fae06)

![GeometriKaydet](https://github.com/user-attachments/assets/ed254e3c-8269-4c92-a30e-35c30effaeed)

![GeometriGüncelle](https://github.com/user-attachments/assets/a4371ae3-0355-4f07-bc48-ffe12cac1d76)

![EditData](https://github.com/user-attachments/assets/ac24834c-6703-4b3b-9c31-334000f148cc)



## Kullanım

1. **Adım 1**: Uygulamayı başlattığınızda, ana ekranda haritayı göreceksiniz.
2. **Adım 2**: Uygulamanın navbar kısmından çizim yapmak istediğiniz geometriyi seçin ve haritada çizim yapın.
3. **Adım 3**: Çizim ekledikten sonra, ilgili formu doldurun ve kaydedin.
4. **Adım 4**: Eklediğiniz pinleri güncellemek veya silmek için pin üzerine tıklayın ve ilgili seçenekleri kullanın.


## İletişim

Sorularınız veya geri bildirimleriniz için benimle iletişime geçebilirsiniz:

- **Email**: [abdullah.mutllu@gmail.com]


