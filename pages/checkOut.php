<?php include '../views/header.php'; ?>
  <link rel="stylesheet" href="../Esa-HTML/css/checkOut.css">
  
  <div class="container">
    <div class="checkoutLayout">
        <div class="returnCart">
            <a href="keranjang.php">Ayo belanja
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path></svg></a>
            <h2>Keranjang Saya</h2>
            <div class="list">
                <div class="item">
                    <img src="../Esa-HTML/images/maggot.jpg" alt="" width="100" height="70">
                    <div class="info">
                        <div class="name">PRODUCT 1</div>
                        <div class="price">Rp70.000</div>
                    </div>
                    <div class="quantity">1</div>
                    <div class="returnPrice">Rp70.000</div>
                </div>
            </div>
        </div>
   
        <div class="right">
            <h1>CHECKOUT</h1>
            <div class="form">
                <div class="group">
                    <label for="namaLengkap">Nama Lengkap</label>
                    <input type="text" name="namaLengkap" id="namaLengkap">
                </div>
                <div class="group">
                    <label for="nomorTelepon">Nomor Telepon</label>
                    <input type="text" name="nomorTelepon" id="nomorTelepon">
                </div>
                <div class="group">
                    <label for="alamat">Alamat</label>
                    <input type="text" name="alamat" id="alamat">
                </div>
                <div class="group">
                    <label for="kota">Kota</label>
                    <select name="kota" id="kota">
                        <option value="">Pilih..</option>
                        <option value="Bandung">Bandung</option>
                        <option value="Jakarta">Jakarta</option>
                        <option value="Bogor">Bogor</option>
                        <option value="Bekasi">Bekasi</option>
                        <option value="Garut">Garut</option>
                    </select>
                 </div>
            </div>
            
            <div class="return">
                <div class="row">
                    <div>Total Produk</div>
                    <div class="totalQuantity"></div>
                </div>
                <div class="row">
                    <div>Total harga</div>
                    <div class="totalPrice"></div>
                </div>
            </div>
        
            <a href="formCo.php">
            <button class="buttonCheckout" id="checkoutButton">
                CHECKOUT
            </button>
            </a>
        </div>
    </div>
</div>

	  
 <?php include '../views/footer.php'; ?>
 <script src="../Esa-HTML/js/checkOut.js"></script>
 <script src="../Esa-HTML/js/keranjang.js"></script>
      
      