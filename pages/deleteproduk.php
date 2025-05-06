<?php
include "../configdb.php";

// Cek apakah ID produk tersedia
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    
    // Dapatkan informasi produk sebelum dihapus
    $sqlSelect = "SELECT * FROM produk WHERE idproduk = '$id'";
    $querySelect = mysqli_query($conn, $sqlSelect);
    $produk = mysqli_fetch_assoc($querySelect);
    
    // Jika form konfirmasi disubmit
    if (isset($_POST['btnConfirm'])) {
        // Hapus gambar jika ada
        if (!empty($produk['gambar']) && file_exists('photos/' . $produk['gambar'])) {
            unlink('photos/' . $produk['gambar']);
        }
        
        // Hapus data produk dari database
        $sqlDelete = "DELETE FROM produk WHERE idproduk = '$id'";
        $queryDelete = mysqli_query($conn, $sqlDelete);
        
        if (mysqli_affected_rows($conn) != 0) {
            // Redirect langsung ke halaman produk dengan parameter status
            header("location:produk.php?status=deleted");
            exit;
        } else {
            $error = "Penghapusan data produk gagal! " . mysqli_error($conn);
        }
    }
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hapus Produk - Admin Panel</title>
    
    <!-- Boxicons -->
    <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
    
    <!-- Include header content here if needed -->
    <?php include '../views/headeradmin.php'; ?>
    
    <style>
        /* Notification styles */
        .notification {
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
            display: none;
            animation: fadeIn 0.5s;
        }
        
        .notification-success {
            background-color: #d4edda;
            color: #155724;
            border-left: 4px solid #28a745;
        }
        
        .notification-error {
            background-color: #f8d7da;
            color: #721c24;
            border-left: 4px solid #dc3545;
        }
        
        .close-btn {
            float: right;
            font-weight: bold;
            font-size: 20px;
            line-height: 20px;
            cursor: pointer;
        }
        
        .product-details {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .product-details h3 {
            margin-top: 0;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            color: #333;
        }
        
        .warning-box {
            background-color: #fff8f8;
            border-left: 4px solid #ff5630;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 3px;
        }
        
        .btn-delete {
            background-color: #ff5630;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn-delete:hover {
            background-color: #e04025;
        }
        
        .btn-cancel {
            background-color: #eee;
            color: #333;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            text-decoration: none;
            margin-left: 10px;
            transition: background-color 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn-cancel:hover {
            background-color: #ddd;
        }
        
        .product-image {
            max-width: 200px;
            margin-top: 10px;
            border: 1px solid #ddd;
            padding: 3px;
            border-radius: 3px;
        }
        
        .product-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .product-table td {
            padding: 8px 0;
        }
        
        .product-table td:first-child {
            width: 150px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Mobile responsive styles */
        @media screen and (max-width: 768px) {
            .product-table td:first-child {
                width: 120px;
            }
            
            .btn-delete, .btn-cancel {
                padding: 12px 15px;
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
    <!-- MAIN CONTENT -->
    <main>
        <div class="head-title">
            <div class="left">
                <h1>Hapus Produk</h1>
                <ul class="breadcrumb">
                    <li><a href="#">Dashboard</a></li>
                    <li><i class='bx bx-chevron-right'></i></li>
                    <li><a href="produk.php">Produk</a></li>
                    <li><i class='bx bx-chevron-right'></i></li>
                    <li><a class="active" href="#">Hapus Produk</a></li>
                </ul>
            </div>
            <a href="produk.php" class="btn-download">
                 <i class='bx bx-arrow-back'></i>
                 <span class="text">Kembali ke Daftar Produk</span>
            </a>
        </div>

        <!-- Notification container -->
        <div id="notification" class="notification">
            <span class="close-btn" onclick="closeNotification()">&times;</span>
            <span id="notification-message"></span>
        </div>

        <h2>Konfirmasi Hapus Produk</h2>
        <?php if (isset($error)): ?>
        <div id="error-msg" class="notification notification-error" style="display: block;">
            <span class="close-btn" onclick="document.getElementById('error-msg').style.display='none'">&times;</span>
            <?php echo $error; ?>
        </div>
        <?php endif; ?>

        <div class="warning-box">
            <p style="font-size: 16px; margin: 0;"><strong>Peringatan:</strong> Anda akan menghapus data produk ini secara permanen. Tindakan ini tidak dapat dibatalkan.</p>
        </div>

        <div class="product-details">
            <h3>Detail Produk</h3>
            <table class="product-table">
                <tr>
                    <td><strong>ID Produk</strong></td>
                    <td>: PRD<?= str_pad($produk['idproduk'], 3, '0', STR_PAD_LEFT) ?></td>
                </tr>
                <tr>
                    <td><strong>Nama Produk</strong></td>
                    <td>: <?= htmlspecialchars($produk['namaproduk']) ?></td>
                </tr>
                <tr>
                    <td><strong>Kategori</strong></td>
                    <td>: <?= htmlspecialchars($produk['kategori']) ?></td>
                </tr>
                <tr>
                    <td><strong>Harga</strong></td>
                    <td>: Rp <?= number_format($produk['harga'], 0, ',', '.') ?></td>
                </tr>
                <tr>
                    <td><strong>Stok</strong></td>
                    <td>: <?= $produk['stok'] ?></td>
                </tr>
                <?php if (isset($produk['berat'])): ?>
                <tr>
                    <td><strong>Berat</strong></td>
                    <td>: <?= $produk['berat'] < 1 ? ($produk['berat'] * 1000) . ' gr' : $produk['berat'] . ' kg' ?></td>
                </tr>
                <?php endif; ?>
                <?php if (isset($produk['masapenyimpanan'])): ?>
                <tr>
                    <td><strong>Masa Simpan</strong></td>
                    <td>: <?= htmlspecialchars($produk['masapenyimpanan']) ?></td>
                </tr>
                <?php endif; ?>
            </table>
            
            <?php if (!empty($produk['gambar']) && file_exists('photos/' . $produk['gambar'])): ?>
            <div style="margin-top: 15px;">
                <strong>Gambar Produk:</strong><br>
                <img src="photos/<?= htmlspecialchars($produk['gambar']) ?>" alt="<?= htmlspecialchars($produk['namaproduk']) ?>" class="product-image">
            </div>
            <?php endif; ?>
        </div>

        <form method="post" id="deleteForm">
            <button type="submit" name="btnConfirm" class="btn-delete">
                <i class='bx bx-trash'></i> Hapus Produk
            </button>
            <a href="editproduk.php" class="btn-cancel">
                <i class='bx bx-x'></i> Batal
            </a>
        </form>

        <!-- JavaScript -->
        <script>
            // Function to show notification
            function showNotification(message, type) {
                const notification = document.getElementById('notification');
                const notificationMessage = document.getElementById('notification-message');
                
                notification.className = 'notification';
                notification.classList.add('notification-' + type);
                notificationMessage.textContent = message;
                notification.style.display = 'block';
                
                // Auto hide after 5 seconds
                setTimeout(function() {
                    notification.style.display = 'none';
                }, 5000);
            }
            
            // Function to close notification
            function closeNotification() {
                document.getElementById('notification').style.display = 'none';
            }
            
            // Add confirmation dialog when form is submitted
            document.getElementById('deleteForm').addEventListener('submit', function(e) {
                if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
                    e.preventDefault();
                }
            });
        </script>
    </main>
</body>
</html>

<?php
} else {
    // Jika ID tidak tersedia, kembali ke halaman produk
    header("location:produk.php");
    exit;
}

mysqli_close($conn);
?>