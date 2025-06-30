// Menü verilerini yükleyen fonksiyon
async function menuYukle() {
    // Menülerin ekleneceği ana container'ı seçiyoruz
    const container = document.getElementById('menu-container');
    try {
        // menu.json dosyasını fetch ile çekiyoruz
        const res = await fetch('menu.json');
        // Gelen cevabı JSON formatına çeviriyoruz
        const data = await res.json();
        // Container'ın içeriğini temizliyoruz
        container.innerHTML = '';
        // Her kategori için dönüyoruz (ör: Çorbalar, Ana Yemekler)
        Object.keys(data).forEach(kategori => {
            // Yeni bir section elementi oluşturuyoruz
            const section = document.createElement('section');
            section.className = 'menu-category';
            // Kategori başlığını ekliyoruz
            section.innerHTML = `<h2>${kategori}</h2>`;
            // Kategorideki her ürün için dönüyoruz
            data[kategori].forEach(urun => {
                // Her ürün için bir div oluşturuyoruz
                const item = document.createElement('div');
                item.className = 'menu-item';
                // Ürün resmi varsa ekliyoruz
                let imgHTML = '';
                if (urun.resim) {
                    imgHTML = `<img src="${urun.resim}" alt="${urun.isim}" class="menu-img">`;
                }
                // Ürün ismi, açıklaması ve fiyatını HTML olarak ekliyoruz
                item.innerHTML = `
                    ${imgHTML}
                    <div>
                        <h3>${urun.isim}</h3>
                        <p>${urun.aciklama}</p>
                    </div>
                    <span class="price">${urun.fiyat}₺</span>
                `;
                // Ürün divini section'a ekliyoruz
                section.appendChild(item);
            });
            // Section'ı ana container'a ekliyoruz
            container.appendChild(section);
        });
    } catch (e) {
        // Eğer bir hata olursa kullanıcıya hata mesajı gösteriyoruz
        container.innerHTML = '<p>Menü yüklenemedi.</p>';
    }
}
// Sayfa yüklendiğinde menüyü getiriyoruz
document.addEventListener('DOMContentLoaded', menuYukle);