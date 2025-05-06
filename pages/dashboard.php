<?php
include '../views/headeradmin.php';


?>

 <!-- MAIN -->
        <main>
            <div class="head-title">
                <div class="left">
                    <h1>Dashboard</h1>
                    <ul class="breadcrumb">
                        <li><a href="#">Dashboard</a></li>
                        <li><i class='bx bx-chevron-right'></i></li>
                        <li><a class="active" href="#">Home</a></li>
                    </ul>
                </div>
                <a href="#" class="btn-download">
                    <i class='bx bxs-cloud-download'></i>
                    <span class="text">Download Report</span>
                </a>
            </div>

            <ul class="box-info">
                <li>
                    <i class='bx bxs-calendar-check'></i>
                    <span class="text">
                        <h3>1000</h3>
                        <p>New Orders</p>
                    </span>
                </li>
                <li>
                    <i class='bx bxs-group'></i>
                    <span class="text">
                        <h3>2000</h3>
                        <p>Visitors</p>
                    </span>
                </li>
                <li>
                    <i class='bx bxs-dollar-circle'></i>
                    <span class="text">
                        <h3>Rp 25.000.000</h3>
                        <p>Total Sales</p>
                    </span>
                </li>
            </ul>

            <div class="analytics">
                <div class="chart-container">
                    <div class="chart-card">
                        <h3>Sales Analytics</h3>
                        <canvas id="salesChart"></canvas>
                    </div>
                    <div class="chart-card">
                        <h3>Visitor Statistics</h3>
                        <canvas id="visitorChart"></canvas>
                    </div>
                </div>
                <div class="chart-container">
                    <div class="chart-card">
                        <h3>Product Performance</h3>
                        <canvas id="productChart"></canvas>
                    </div>
                    <div class="chart-card">
                        <h3>Order Status</h3>
                        <canvas id="orderChart"></canvas>
                    </div>
                </div>
            </div>

            <div class="table-data">
                <div class="order">
                    <div class="head">
                        <h3>Recent Orders</h3>
                        <i class='bx bx-search'></i>
                        <i class='bx bx-filter'></i>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Order Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src="sakira.webp" alt="User">
                                    <p>Sakira Amirah</p>
                                </td>
                                <td>01-10-2023</td>
                                <td><span class="status completed">Completed</span></td>
                                <td>Rp 250.000</td>
                                <td>
                                    <a href="#" class="btn-edit"><i class='bx bxs-edit'></i></a>
                                    <a href="#" class="btn-delete"><i class='bx bxs-trash'></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="sandi.png" alt="User">
                                    <p>Sandi Waluyo</p>
                                </td>
                                <td>01-10-2023</td>
                                <td><span class="status pending">Pending</span></td>
                                <td>Rp 150.000</td>
                                <td>
                                    <a href="#" class="btn-edit"><i class='bx bxs-edit'></i></a>
                                    <a href="#" class="btn-delete"><i class='bx bxs-trash'></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="Maxwell-COC.jpg" alt="User">
                                    <p>Maxwell Salvador</p>
                                </td>
                                <td>01-10-2023</td>
                                <td><span class="status process">Process</span></td>
                                <td>Rp 350.000</td>
                                <td>
                                    <a href="#" class="btn-edit"><i class='bx bxs-edit'></i></a>
                                    <a href="#" class="btn-delete"><i class='bx bxs-trash'></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

<?php
include '../views/footeradmin.php';
?>

<script src="script.js"></script>

