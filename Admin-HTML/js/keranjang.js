let iconCart = document.querySelector('.icon-cart');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let listProductHTML = document.querySelector('.listProduct');

let cart = []; // array untuk menyimpan barang di keranjang

// Menampilkan atau menyembunyikan keranjang saat klik ikon keranjang
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Menutup keranjang
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Fungsi untuk merender keranjang
function renderCart() {
    const cartContainer = document.querySelector('.ListCart');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartCount = document.querySelector(".icon-cart span");

    cartContainer.innerHTML = "";  // Menghapus isi keranjang sebelumnya
    let total = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
    } else {
        emptyCartMessage.style.display = "none";
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            cartContainer.innerHTML += `
                <div class="item">
                    <div class="image">
                        <img src="${item.image}" alt="">
                    </div>
                    <div class="name">${item.name}</div>
                    <div class="totalPrice">Rp. ${itemTotal.toLocaleString()}</div>
                    <div class="quantity">
                        <span class="minus" onclick="changeQuantity(${index}, -1)">&#60;</span>
                        <span class="qty">${item.quantity}</span>
                        <span class="plus" onclick="changeQuantity(${index}, 1)">&#62;</span>
                    </div>
                </div>
            `;
        });
    }
    cartCount.textContent = cart.length;

    // Mengupdate total harga jika ada elemen untuk itu
    document.querySelector('.totalPriceDisplay').textContent = `Total: Rp. ${total.toLocaleString()}`;
}

// Fungsi untuk menambah produk ke keranjang
document.querySelectorAll('.Masukan.Keranjang').forEach((button) => {
    button.addEventListener('click', (e) => {
        const itemElement = e.target.closest(".item");
        const name = itemElement.querySelector("h2").innerText;
        const price = parseInt(itemElement.querySelector(".harga").innerText.replace('Rp.', '').replace('.', ''));
        const image = itemElement.querySelector("img").src;

        const existingItem = cart.find((cartItem) => cartItem.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }
        renderCart();
    });
});

// Fungsi untuk mengubah kuantitas produk di keranjang
window.changeQuantity = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);  // Menghapus produk jika kuantitasnya 0 atau kurang
    }
    renderCart(); 
};

// Fungsi untuk melakukan checkout
document.querySelector('.checkOut').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Keranjang Anda Kosong!");
    } else {
        // Mengubah URL dengan menambahkan data keranjang sebagai parameter
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('cartData', JSON.stringify(cart));
        window.location.href = "checkOut.php?" + urlParams.toString();
    }
});




// Inisialisasi keranjang ketika halaman dimuat
renderCart();


