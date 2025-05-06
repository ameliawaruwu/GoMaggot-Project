
 <link rel="stylesheet" href="../Admin-HTML/css/headerkeranjang.css">

 <?php include '../configdb.php'; ?>


	 <div class="tulisan">
        <h2>Produk Kami</h2>
        </div>
    <div class="container">
        <header>
        </header>
        <!--   <div class="listProduct">
           <div class="item">
           <img src="../Esa-HTML/images/maggot removebg.png" width="250px" height="150px">
           <h2>Maggot Siap Pakai</h2><br><br>
           <div class="harga">Rp.70.000</div>
           <a href="maggot.php">
          <button class="Masukan Keranjang">
              Detail Produk
          </button>
        </a>
        <button class="Masukan Keranjang">
            Masukan Keranjang
       </button>
        </div>
        -->

<?php
// Query untuk mengambil semua produk dari database
$query = "SELECT * FROM produk";
$result = $conn->query($query);

// Menyimpan semua produk dalam array
$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

// Definisi produk dengan gambar dan halaman detail yang sesuai
$productTypes = [
    [
        'name' => 'Maggot Siap Pakai',
        'image' => '../Esa-HTML/images/maggot removebg.png',
        'page' => 'maggot.php'
    ],
    [
        'name' => 'Kompos Organik',
        'image' => '../Esa-HTML/images/kompos remove bg.png',
        'page' => 'kompos.php'
    ],
    [
        'name' => 'Paket Bundling',
        'image' => '../Esa-HTML/images/Bundling Maggot.png',
        'page' => 'paketBundling.php'
    ],
    [
        'name' => 'Bibit Tanaman',
        'image' => '../Esa-HTML/images/Bibit-remove bg.png',
        'page' => 'bibit.php'
    ],
    [
        'name' => 'Kandang Maggot',
        'image' => '../Esa-HTML/images/Kandang.png',
        'page' => 'kandang.php'
    ]
];
?>

<div class="listProduct">
    <?php
    // Menentukan jumlah produk yang akan ditampilkan
    $displayCount = min(count($products), count($productTypes));
    
    // Jika tidak cukup produk, kita akan menggunakan produk yang tersedia
    for ($i = 0; $i < count($productTypes); $i++) {
        // Ambil data produk jika tersedia, gunakan produk terakhir jika tidak cukup
        $productIndex = min($i, count($products) - 1);
        $product = isset($products[$productIndex]) ? $products[$productIndex] : $products[0];
        $productType = $productTypes[$i];
        
        // Jika produk tidak tersedia, gunakan default
        $productName = !empty($product['namaproduk']) ? $product['namaproduk'] : $productType['name'];
        $productPrice = !empty($product['harga']) ? $product['harga'] : 70000;
        $productId = !empty($product['idproduk']) ? $product['idproduk'] : 1;
    ?>
        <div class="item">
            <img src="<?= $productType['image'] ?>" width="250px" height="150px">
            <h2><?= htmlspecialchars($productName); ?></h2><br><br>
            <div class="harga">Rp.<?= number_format($productPrice, 0, ',','.'); ?></div>
            <a href="<?= $productType['page'] ?>?id=<?= $productId; ?>">
                <button class="Masukan Keranjang">Detail Produk</button>
            </a>
            <button class="Masukan Keranjang">Masukan Keranjang</button>
        </div>
    <?php
    }
    ?>

<?php
    // Menentukan jumlah produk yang akan ditampilkan
    $displayCount = min(count($products), count($productTypes));
    
    // Jika tidak cukup produk, kita akan menggunakan produk yang tersedia
    for ($i = 0; $i < count($productTypes); $i++) {
        // Ambil data produk jika tersedia, gunakan produk terakhir jika tidak cukup
        $productIndex = min($i, count($products) - 1);
        $product = isset($products[$productIndex]) ? $products[$productIndex] : $products[0];
        $productType = $productTypes[$i];
        
        // Jika produk tidak tersedia, gunakan default
        $productName = !empty($product['namaproduk']) ? $product['namaproduk'] : $productType['name'];
        $productPrice = !empty($product['harga']) ? $product['harga'] : 70000;
        $productId = !empty($product['idproduk']) ? $product['idproduk'] : 1;
    ?>
        <div class="item">
            <img src="<?= $productType['image'] ?>" width="250px" height="150px">
            <h2><?= htmlspecialchars($productName); ?></h2><br><br>
            <div class="harga">Rp.<?= number_format($productPrice, 0, ',','.'); ?></div>
            <a href="<?= $productType['page'] ?>?id=<?= $productId; ?>">
                <button class="Masukan Keranjang">Detail Produk</button>
            </a>
            <button class="Masukan Keranjang">Masukan Keranjang</button>
        </div>
    <?php
    }
    ?>
</div>
</div>

    <div class="cartTab">
        <h1>Keranjang</h1>
        <div class="ListCart">
            <div class="item" data-price="70000">
                <div class="image">
                     <img src="../Esa-HTML/images/maggot removebg.png" alt="Maggot Siap Pakai">
                </div>
                <div class="name">
                    Maggot Siap Pakai
                </div>
                <div class="totalPrice">
                    Rp.70,000
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span class="qty">1</span> <!-- Span untuk kuantitas -->
                    <span class="plus">></span>
                </div>
            </div>
        </div>
        
        <p id="emptyCartMessage">Keranjang kosong</p>
        
        <div class="btn">
            <button class="close">Tutup</button>
            <button class="checkOut">Check Out</button>
        </div>
    </div>
	
<?php include '../views/footerkeranjang.php'; ?>
