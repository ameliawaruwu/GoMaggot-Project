<?php
session_start();

// Cek apakah user sudah login
if (!isset($_SESSION['role'])) {
    header("Location: ../pages/login.php");
    exit;
}

$role = $_SESSION['role'];
$currentPage = basename($_SERVER['PHP_SELF']); // nama file halaman saat ini

// Daftar halaman yang boleh diakses oleh role 'konsumen'
$allowedPagesKonsumen = [
    'home.php',
    'about.php',
    'products.php',
    'help.php',
    'feedback.php',
    'blog.php',
    'portofolios.php',
    'qna.php',
    'contact.php',
    'profile.php'
];

// Kalau role konsumen, cek apakah halaman sekarang boleh diakses
if ($role === 'konsumen' && !in_array($currentPage, $allowedPagesKonsumen)) {
    echo "❌ Anda tidak punya akses ke halaman ini.";
    exit;
}

// Kamu bisa tambah rule lain untuk role 'admin' kalau mau
?>
