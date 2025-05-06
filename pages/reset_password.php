<?php
require_once __DIR__ . '/../logic/update/koneksi.php';
 include '../partials/headers.php'; 
?>

<link rel="stylesheet" href="/MAGGOT/css/reset.css">

<?php
if (isset($_GET['token'])) {
    $token = $_GET['token'];

    $stmt = mysqli_prepare($koneksi, "SELECT * FROM pengguna WHERE reset_token = ?");
    mysqli_stmt_bind_param($stmt, "s", $token);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $new_password = password_hash($_POST['password'], PASSWORD_DEFAULT);
            $stmt = mysqli_prepare($koneksi, "UPDATE pengguna SET password=?, reset_token=NULL WHERE reset_token=?");
            mysqli_stmt_bind_param($stmt, "ss", $new_password, $token);
            mysqli_stmt_execute($stmt);
            echo '
            <div class="wrapper">
              <div class="form-box">
                <div class="alert-success">
                  ✅ Password berhasil direset. Silakan <a href="login.php">login</a>.
                </div>
              </div>
            </div>';            
        exit;                
        }
?>

<form method="POST">
<div class="wrapper">
    <div class="image-container">
        <img src="../images/foto login.jpg" alt="Login Illustration"> 
    </div>
    <div class="form-box login">
        <h2>Reset Password</h2>
        <div class="input-box">
            <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
            <input type="password" name="password" required>
            <label>Password Baru</label>
        </div>
        <button type="submit" class="btn">Reset Password</button>
        <div class="login-register">
            <p><a href="login.php">Kembali ke Login</a></p>
        </div>
    </div>
</div>
</form>


























<?php
    } else {
        echo "❌ Token tidak valid atau sudah digunakan.";
    }
} else {
    echo "⚠️ Token tidak ditemukan.";
}
?>
