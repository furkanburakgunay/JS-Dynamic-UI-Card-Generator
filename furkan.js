// HTML'deki form ve kart alanını seçiyoruz
const form = document.getElementById('veriFormu');
const kartAlani = document.getElementById('kartAlani');

// Kaçıncı kartı eklediğimizi takip etmek için bir sayaç (İndis)
let kartIndisi = 0;

// Rastgele renk (HEX kodu) üreten fonksiyon
function rastgeleRenkUret() {
    const harfler = '0123456789ABCDEF';
    let renk = '#';
    for (let i = 0; i < 6; i++) {
        renk += harfler[Math.floor(Math.random() * 16)];
    }
    return renk;
}

// Form submit edildiğinde çalışacak olay dinleyicisi
form.addEventListener('submit', function(olay) {
    olay.preventDefault(); // Sayfanın yenilenmesini durdur

    kartIndisi++; // Yeni bir submit yapıldı, kart sayısını 1 artır

    // Tüm inputları (text ve color dahil) seç
    const tumGirdiler = form.querySelectorAll('input');
    
    // Kullanıcının seçtiği rengi ayrı bir değişkene al (10. input)
    const secilenRenk = document.getElementById('renkGirdisi').value;

    // --- KART YAPISINI OLUŞTURMA (DOM) ---
    const yeniKart = document.createElement('div');
    
    // Kartın temel görsel ayarları (JS ile dinamik stil)
    yeniKart.style.width = "250px";
    yeniKart.style.padding = "15px";
    yeniKart.style.border = "1px solid #333";
    yeniKart.style.borderRadius = "8px";
    yeniKart.style.color = "#000"; // Yazı rengi siyah
    
    // --- KOŞULLU STİL UYGULAMASI ---
    // Eğer kartın indisi tek sayıysa (1, 3, 5...)
    if (kartIndisi % 2 !== 0) {
        yeniKart.style.backgroundColor = rastgeleRenkUret(); // Kod ile rastgele renk
        yeniKart.style.textAlign = "center";                 // İçerik ortalanmış
    } 
    // Eğer kartın indisi çift sayıysa (2, 4, 6...)
    else {
        yeniKart.style.backgroundColor = secilenRenk;        // Kullanıcının seçtiği renk
        yeniKart.style.textAlign = "left";                   // Normal hizalama
    }

    // --- VERİLERİ ETİKET YAPISINA (<p>) ÇEVİRİP KARTA EKLEME ---
    // 10 verinin hepsini döngüye sokup <p> etiketi içine alıyoruz
    tumGirdiler.forEach(function(girdi) {
        const pEtiketi = document.createElement('p');
        pEtiketi.style.margin = "5px 0"; // <p> etiketleri arasına hafif boşluk
        
        // Eğer input renk seçiciyse, değerini HEX kodu olarak yazdır
        if(girdi.type === 'color') {
             pEtiketi.textContent = "Seçilen Renk Kodu: " + girdi.value;
        } else {
             pEtiketi.textContent = girdi.value;
        }
        
        yeniKart.appendChild(pEtiketi); // <p> etiketini karta ekle
    });

    // Hazırlanan kartı sayfadaki kümeye (kartAlani) ekle
    kartAlani.appendChild(yeniKart);

    // Bir sonraki giriş için formu sıfırla
    form.reset();
});