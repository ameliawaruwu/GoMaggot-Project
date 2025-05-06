  <?php
   include '../views/headeradmin.php';
 
  
  
  ?>
  
  
  
  <!-- MAIN -->
  <main>
            <div class="head-title">
                <div class="left">
                    <h1>Documentation</h1>
                    <ul class="breadcrumb">
                        <li><a href="#">Dashboard</a></li>
                        <li><i class='bx bx-chevron-right'></i></li>
                        <li><a class="active" href="#">Dokumentasi</a></li>
                    </ul>
                </div>
                <a href="#" class="btn-download" id="addDocumentationBtn">
                    <i class='bx bxs-plus-circle'></i>
                    <span class="text">Add New Documentation</span>
                </a>
            </div>

            <!-- Documentation List -->
            <div class="documentation-list" id="documentationList">
                <!-- Items will be dynamically added here -->
            </div>

            <!-- Add Documentation Modal -->
            <div id="addDocumentationModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Add New Documentation</h2>
                    <form id="documentationForm">
                        <label for="docImage">Image:</label>
                        <input type="file" id="docImage" name="docImage" required>
                        
                        <label for="docTitle">Title:</label>
                        <input type="text" id="docTitle" name="docTitle" required>
                        
                        <label for="docDescription">Description:</label>
                        <textarea id="docDescription" name="docDescription" required></textarea>
                        
                        <label for="docPrice">Price:</label>
                        <input type="text" id="docPrice" name="docPrice" required>
                        
                        <button type="submit">Add Documentation</button>
                    </form>
                </div>
            </div>
        </main>
    </section>




<?php
include '../views/footeradmin.php';
?>