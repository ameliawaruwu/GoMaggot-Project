 <?php
 include '../views/headeradmin.php';
 ?> 
  
  
  
  
  <!-- MAIN -->
  <main>
            <div class="head-title">
                <div class="left">
                    <h1>User Management</h1>
                    <ul class="breadcrumb">
                        <li><a href="#">Dashboard</a></li>
                        <li><i class='bx bx-chevron-right'></i></li>
                        <li><a class="active" href="#">Produk</a></li>
                    </ul>
                </div>
                <a href="#" class="btn-download">
                    <i class='bx bxs-plus-circle'></i>
                    <span class="text">Add New User</span>
                </a>
            </div>

            <div class="table-data">
                <div class="order">
                    <div class="head">
                        <h3>User List</h3>
                        <i class='bx bx-search'></i>
                        <i class='bx bx-filter'></i>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Join Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src="sakira.webp">
                                    <p>Sakira Amirah</p>
                                </td>
                                <td>shakiramirah@gmail.com</td>
                                <td>01-10-2023</td>
                                <td><span class="status completed">Active</span></td>
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
    </section>
    <!-- Add User Modal -->
    <div class="modal" id="addUserModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add New User</h3>
                <span class="close" onclick="closeModal('addUserModal')">&times;</span>
            </div>
            <form id="addUserForm">
                <div class="form-group">
                    <label for="userName">Name</label>
                    <input type="text" id="userName" name="userName" placeholder="Enter full name" required>
                </div>
                <div class="form-group">
                    <label for="userEmail">Email</label>
                    <input type="email" id="userEmail" name="userEmail" placeholder="Enter email address" required>
                </div>
                <div class="form-group">
                    <label for="joinDate">Join Date</label>
                    <input type="date" id="joinDate" name="joinDate" required>
                </div>
                <div class="form-group">
                    <label for="userStatus">Status</label>
                    <select id="userStatus" name="userStatus" required>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="userPhoto">Photo</label>
                    <input type="file" id="userPhoto" name="userPhoto" accept="image/*" required>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary close-btn">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save User</button>
                </div>
                                
            </form>
        </div>
    </div>

<?php
include '../views/footeradmin.php';
?>