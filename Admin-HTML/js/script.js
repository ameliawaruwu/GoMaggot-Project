const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})

if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})

// Dark Mode Management
function initDarkMode() {
	const switchMode = document.getElementById('switch-mode');
	
	// Check for saved dark mode preference
	const darkMode = localStorage.getItem('darkMode');
	
	// Set initial dark mode state
	if (darkMode === 'enabled') {
		document.body.classList.add('dark');
		if (switchMode) switchMode.checked = true;
	}

	// Add event listener to toggle
	if (switchMode) {
		switchMode.addEventListener('change', function() {
			if (this.checked) {
				document.body.classList.add('dark');
				localStorage.setItem('darkMode', 'enabled');
				alertSystem.show({
					type: 'info',
					title: 'Dark Mode',
					message: 'Dark mode has been enabled'
				});
			} else {
				document.body.classList.remove('dark');
				localStorage.setItem('darkMode', null);
				alertSystem.show({
					type: 'info',
					title: 'Light Mode',
					message: 'Light mode has been enabled'
				});
			}
		});
	}
}

// Product Management
function initProductManagement() {
    // Check if current page is produk.html
    if (!window.location.pathname.includes('produk.html')) {
        return; // Exit if not on produk.html
    }

    const addProductBtn = document.querySelector('.btn-download');
    const modal = document.getElementById('addProductModal');
    const closeBtn = document.querySelector('.close');
    const closeBtnSecondary = document.querySelector('.close-btn');
    const addProductForm = document.getElementById('addProductForm');
    const productTable = document.querySelector('.table-data table tbody');

    // Clear existing table content
    if (productTable) {
        productTable.innerHTML = '';
    }

    // Open modal
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            modal.style.display = "block";
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    if (closeBtnSecondary) {
        closeBtnSecondary.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const productName = document.getElementById('productName').value;
            const productPrice = document.getElementById('productPrice').value;
            const productStock = document.getElementById('productStock').value;
            const productImage = document.getElementById('productImage').files[0];
            const productDescription = document.getElementById('productDescription').value;

            // Create image URL
            const imageURL = URL.createObjectURL(productImage);

            // Create new product row
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>
                    <img src="${imageURL}" alt="${productName}">
                    <p>${productName}</p>
                </td>
                <td>Rp ${parseInt(productPrice).toLocaleString('id-ID')}</td>
                <td>${productStock}</td>
                <td><span class="status completed">Available</span></td>
                <td>
                    <a href="#" class="btn-edit"><i class='bx bxs-edit'></i></a>
                    <a href="#" class="btn-delete"><i class='bx bxs-trash'></i></a>
                </td>
            `;

            // Add new row to table
            if (productTable) {
                productTable.appendChild(newRow);
            }

            // Save to localStorage
            saveProduct({
                name: productName,
                price: productPrice,
                stock: productStock,
                image: imageURL,
                description: productDescription,
                status: 'Available',
                dateAdded: new Date().toISOString()
            });

            // Reset form and close modal
            addProductForm.reset();
            modal.style.display = "none";
            alertSystem.show({
                type: 'success',
                title: 'Success',
                message: 'Product has been added successfully'
            });
        });
    }

    // Add delete functionality
    if (productTable) {
        productTable.addEventListener('click', function(e) {
            if (e.target.closest('.btn-delete')) {
                e.preventDefault();
                const row = e.target.closest('tr');
                const productName = row.querySelector('p').textContent;
                
                if (confirm(`Are you sure you want to delete ${productName}?`)) {
                    deleteProduct(productName);
                    row.remove();
                }
                alertSystem.show({
                    type: 'warning',
                    title: 'Deleted',
                    message: `Product ${productName} has been deleted`
                });
            }
        });
    }

    // Add edit functionality
    if (productTable) {
        productTable.addEventListener('click', function(e) {
            if (e.target.closest('.btn-edit')) {
                e.preventDefault();
                const row = e.target.closest('tr');
                const productName = row.querySelector('p').textContent;
                const product = findProductByName(productName);
                
                if (product) {
                    openEditProductModal(product, row);
                }
            }
        });
    }

    // Load existing products
    loadProducts();
}

// Save product to localStorage
function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

// Delete product from localStorage
function deleteProduct(productName) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.name !== productName);
    localStorage.setItem('products', JSON.stringify(products));
}

// Load products from localStorage
function loadProducts() {
    // Only load if we're on the product page
    if (!window.location.pathname.includes('produk.html')) {
        return;
    }

    const productTable = document.querySelector('.table-data table tbody');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (productTable) {
        products.forEach(product => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name}</p>
                </td>
                <td>Rp ${parseInt(product.price).toLocaleString('id-ID')}</td>
                <td>${product.stock}</td>
                <td><span class="status completed">${product.status}</span></td>
                <td>
                    <a href="#" class="btn-edit"><i class='bx bxs-edit'></i></a>
                    <a href="#" class="btn-delete"><i class='bx bxs-trash'></i></a>
                </td>
            `;
            productTable.appendChild(newRow);
        });
    }
}

// Find product by name
function findProductByName(name) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products.find(product => product.name === name);
}

// Open edit product modal and populate with product data
function openEditProductModal(product, row) {
    const editModal = document.getElementById('editProductModal');
    const editForm = document.getElementById('editProductForm');
    
    // Populate form fields
    document.getElementById('editProductId').value = product.name; // Using name as ID
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductStock').value = product.stock;
    document.getElementById('editProductStatus').value = product.status;
    document.getElementById('editProductDescription').value = product.description || '';

    // Show modal
    editModal.style.display = "block";

    // Close modal handlers
    const closeBtn = editModal.querySelector('.close');
    const closeBtnSecondary = editModal.querySelector('.close-btn');

    closeBtn.onclick = function() {
        editModal.style.display = "none";
    }

    closeBtnSecondary.onclick = function() {
        editModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == editModal) {
            editModal.style.display = "none";
        }
    }

    // Add image preview functionality
    const imagePreviewContainer = document.createElement('div');
    imagePreviewContainer.className = 'image-preview';
    const currentImage = document.createElement('img');
    currentImage.src = product.image;
    currentImage.alt = 'Current product image';
    imagePreviewContainer.appendChild(currentImage);

    const imageInput = document.getElementById('editProductImage');
    // Create container for better alignment
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    
    // Wrap existing input and preview in container
    imageInput.parentNode.insertBefore(imageContainer, imageInput);
    imageContainer.appendChild(imagePreviewContainer);
    imageContainer.appendChild(imageInput);
    imageContainer.appendChild(document.querySelector('small')); // Move the helper text

    // Update preview when new image is selected
    imageInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                currentImage.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Handle form submission
    editForm.onsubmit = function(e) {
        e.preventDefault();

        const updatedProduct = {
            name: document.getElementById('editProductName').value,
            price: document.getElementById('editProductPrice').value,
            stock: document.getElementById('editProductStock').value,
            status: document.getElementById('editProductStatus').value,
            description: document.getElementById('editProductDescription').value,
            image: product.image, // Keep existing image by default
            dateAdded: product.dateAdded
        };

        // Handle new image if uploaded
        const newImage = document.getElementById('editProductImage').files[0];
        if (newImage) {
            updatedProduct.image = URL.createObjectURL(newImage);
        }

        // Update product in localStorage
        updateProduct(product.name, updatedProduct);

        // Update table row
        row.innerHTML = `
            <td>
                <img src="${updatedProduct.image}" alt="${updatedProduct.name}">
                <p>${updatedProduct.name}</p>
            </td>
            <td>Rp ${parseInt(updatedProduct.price).toLocaleString('id-ID')}</td>
            <td>${updatedProduct.stock}</td>
            <td><span class="status ${getStatusClass(updatedProduct.status)}">${updatedProduct.status}</span></td>
            <td>
                <a href="#" class="btn-edit"><i class='bx bxs-edit'></i></a>
                <a href="#" class="btn-delete"><i class='bx bxs-trash'></i></a>
            </td>
        `;

        // Close modal
        editModal.style.display = "none";
    };
}

// Update product in localStorage
function updateProduct(oldName, updatedProduct) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const index = products.findIndex(product => product.name === oldName);
    
    if (index !== -1) {
        products[index] = updatedProduct;
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// Helper function to get status class
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'available':
            return 'completed';
        case 'low stock':
            return 'pending';
        case 'out of stock':
            return 'process';
        default:
            return 'completed';
    }
}

// Admin Management
function initAdminManagement() {
    // Check if current page is admin.html
    if (!window.location.pathname.includes('admin.html')) {
        return; // Exit if not on admin.html
    }

    const addAdminBtn = document.querySelector('.btn-download');
    const modal = document.getElementById('addAdminModal');
    const closeBtn = document.querySelector('.close');
    const closeBtnSecondary = document.querySelector('.close-btn');
    const addAdminForm = document.getElementById('addAdminForm');
    const adminTable = document.querySelector('.table-data table tbody');

    // Clear existing table content
    if (adminTable) {
        adminTable.innerHTML = '';
    }

    // Open modal
    if (addAdminBtn) {
        addAdminBtn.addEventListener('click', function() {
            modal.style.display = "block";
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    if (closeBtnSecondary) {
        closeBtnSecondary.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission
    if (addAdminForm) {
        addAdminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const adminName = document.getElementById('adminName').value;
            const adminEmail = document.getElementById('adminEmail').value;
            const adminPassword = document.getElementById('adminPassword').value;
            const adminRole = document.getElementById('adminRole').value;
            const adminImage = document.getElementById('adminImage').files[0];

            // Create image URL
            const imageURL = URL.createObjectURL(adminImage);

            // Create new admin row
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>
                    <img src="${imageURL}" alt="${adminName}">
                    <p>${adminName}</p>
                </td>
                <td>${adminRole}</td>
                <td><span class="status completed">Active</span></td>
                <td>
                    <a href="#" class="btn-edit"><i class='bx bxs-edit'></i></a>
                    <a href="#" class="btn-delete"><i class='bx bxs-trash'></i></a>
                </td>
            `;

            // Add new row to table
            if (adminTable) {
                adminTable.appendChild(newRow);
            }

            // Save to localStorage
            saveAdmin({
                name: adminName,
                email: adminEmail,
                password: adminPassword, // In real application, this should be hashed
                role: adminRole,
                image: imageURL,
                status: 'Active',
                dateAdded: new Date().toISOString()
            });

            // Reset form and close modal
            addAdminForm.reset();
            modal.style.display = "none";
            alertSystem.show({
                type: 'success',
                title: 'Success',
                message: 'Admin has been added successfully'
            });
        });
    }

    // Add delete functionality
    if (adminTable) {
        adminTable.addEventListener('click', function(e) {
            if (e.target.closest('.btn-delete')) {
                e.preventDefault();
                const row = e.target.closest('tr');
                const adminName = row.querySelector('p').textContent;
                
                if (confirm(`Are you sure you want to delete admin ${adminName}?`)) {
                    deleteAdmin(adminName);
                    row.remove();
                }
            }
        });
    }

    // Add edit functionality
    if (adminTable) {
        adminTable.addEventListener('click', function(e) {
            if (e.target.closest('.btn-edit')) {
                e.preventDefault();
                const row = e.target.closest('tr');
                const adminName = row.querySelector('p').textContent;
                const admin = findAdminByName(adminName);
                
                if (admin) {
                    openEditModal(admin, row);
                }
            }
        });
    }

    // Load existing admins
    loadAdmins();
}

// Save admin to localStorage
function saveAdmin(admin) {
    let admins = JSON.parse(localStorage.getItem('admins')) || [];
    admins.push(admin);
    localStorage.setItem('admins', JSON.stringify(admins));
}

// Delete admin from localStorage
function deleteAdmin(adminName) {
    let admins = JSON.parse(localStorage.getItem('admins')) || [];
    admins = admins.filter(admin => admin.name !== adminName);
    localStorage.setItem('admins', JSON.stringify(admins));
}

// Load admins from localStorage
function loadAdmins() {
    if (!window.location.pathname.includes('admin.html')) {
        return;
    }

    const adminTable = document.querySelector('.table-data table tbody');
    const admins = JSON.parse(localStorage.getItem('admins')) || [];

    if (adminTable) {
        admins.forEach(admin => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>
                    <img src="${admin.image}" alt="${admin.name}">
                    <p>${admin.name}</p>
                </td>
                <td>${admin.role}</td>
                <td><span class="status completed">${admin.status}</span></td>
                <td>
                    <a href="#" class="btn-edit"><i class='bx bxs-edit'></i></a>
                    <a href="#" class="btn-delete"><i class='bx bxs-trash'></i></a>
                </td>
            `;
            adminTable.appendChild(newRow);
        });
    }
}

// Find admin by name
function findAdminByName(name) {
    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    return admins.find(admin => admin.name === name);
}

// Open edit modal and populate with admin data
function openEditModal(admin, row) {
    const editModal = document.getElementById('editAdminModal');
    const editForm = document.getElementById('editAdminForm');
    
    // Populate form fields
    document.getElementById('editAdminId').value = admin.name; // Using name as ID
    document.getElementById('editAdminName').value = admin.name;
    document.getElementById('editAdminEmail').value = admin.email;
    document.getElementById('editAdminRole').value = admin.role;
    document.getElementById('editAdminStatus').value = admin.status;

    // Show modal
    editModal.style.display = "block";

    // Close modal handlers
    const closeBtn = editModal.querySelector('.close');
    const closeBtnSecondary = editModal.querySelector('.close-btn');

    closeBtn.onclick = function() {
        editModal.style.display = "none";
    }

    closeBtnSecondary.onclick = function() {
        editModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == editModal) {
            editModal.style.display = "none";
        }
    }

    // Handle form submission
    editForm.onsubmit = function(e) {
        e.preventDefault();

        const updatedAdmin = {
            name: document.getElementById('editAdminName').value,
            email: document.getElementById('editAdminEmail').value,
            role: document.getElementById('editAdminRole').value,
            status: document.getElementById('editAdminStatus').value,
            image: admin.image, // Keep existing image by default
            password: admin.password, // Keep existing password
            dateAdded: admin.dateAdded
        };

        // Handle new image if uploaded
        const newImage = document.getElementById('editAdminImage').files[0];
        if (newImage) {
            updatedAdmin.image = URL.createObjectURL(newImage);
        }

        // Update admin in localStorage
        updateAdmin(admin.name, updatedAdmin);

        // Update table row
        row.innerHTML = `
            <td>
                <img src="${updatedAdmin.image}" alt="${updatedAdmin.name}">
                <p>${updatedAdmin.name}</p>
            </td>
            <td>${updatedAdmin.role}</td>
            <td><span class="status ${updatedAdmin.status.toLowerCase()}">${updatedAdmin.status}</span></td>
            <td>
                <a href="#" class="btn-edit"><i class='bx bxs-edit'></i></a>
                <a href="#" class="btn-delete"><i class='bx bxs-trash'></i></a>
            </td>
        `;

        // Close modal
        editModal.style.display = "none";
    };
}

// Update admin in localStorage
function updateAdmin(oldName, updatedAdmin) {
    let admins = JSON.parse(localStorage.getItem('admins')) || [];
    const index = admins.findIndex(admin => admin.name === oldName);
    
    if (index !== -1) {
        admins[index] = updatedAdmin;
        localStorage.setItem('admins', JSON.stringify(admins));
    }
}

// Add CSS for different status colors
function addStatusStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .status.active { background: var(--success); }
        .status.inactive { background: var(--dark-grey); }
        .status.suspended { background: var(--danger); }
    `;
    document.head.appendChild(style);
}

// Chat Management
function initChatManagement() {
    // Check if current page is chat.html
    if (!window.location.pathname.includes('chat.html')) {
        return;
    }

    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendMessage');
    const messageArea = document.getElementById('messageArea');

    // Load existing messages
    loadMessages();

    // Send message function
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (!messageText) return;

        const message = {
            text: messageText,
            sender: 'admin',
            timestamp: new Date().toISOString(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Add message to UI
        addMessageToUI(message);
        
        // Save message
        saveMessage(message);
        
        // Clear input
        messageInput.value = '';
        alertSystem.show({
            type: 'info',
            title: 'Message Sent',
            message: 'Your message has been sent successfully'
        });
    }

    // Add message to UI
    function addMessageToUI(message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender === 'admin' ? 'sent' : 'received'}`;
        
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message.text}</p>
                <span class="message-time">${message.time}</span>
            </div>
        `;

        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    // Save message to localStorage
    function saveMessage(message) {
        let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push(message);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    // Load messages from localStorage
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.forEach(message => addMessageToUI(message));
    }

    // Event Listeners
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

// Alert System
class AlertSystem {
    constructor() {
        this.init();
    }

    init() {
        if (!document.querySelector('.alert-container')) {
            const container = document.createElement('div');
            container.className = 'alert-container';
            document.body.appendChild(container);
        }
    }

    show(options) {
        const { type = 'info', title, message, duration = 3000 } = options;
        
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        
        alert.innerHTML = `
            <i class='bx ${this.getIconClass(type)} alert-icon'></i>
            <div class="alert-content">
                <div class="alert-title">${title}</div>
                <div class="alert-message">${message}</div>
            </div>
            <i class='bx bx-x alert-close'></i>
        `;

        const container = document.querySelector('.alert-container');
        container.appendChild(alert);

        // Add click event to close button
        const closeBtn = alert.querySelector('.alert-close');
        closeBtn.addEventListener('click', () => this.close(alert));

        // Auto close after duration
        if (duration) {
            setTimeout(() => this.close(alert), duration);
        }
    }

    close(alert) {
        alert.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => alert.remove(), 300);
    }

    getIconClass(type) {
        switch (type) {
            case 'success':
                return 'bxs-check-circle';
            case 'warning':
                return 'bxs-error';
            case 'error':
                return 'bxs-x-circle';
            default:
                return 'bxs-info-circle';
        }
    }
}

// Initialize Alert System
const alertSystem = new AlertSystem();

// Chart Management
function initCharts() {
    // Check if we're on the dashboard page
    if (!window.location.pathname.includes('adminfix.html')) {
        return;
    }

    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales 2023',
                data: [15000000, 18000000, 22000000, 25000000, 28000000, 30000000],
                borderColor: '#4CAF50',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(76, 175, 80, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'Rp ' + value.toLocaleString('id-ID');
                        }
                    }
                }
            }
        }
    });

    // Visitor Chart
    const visitorCtx = document.getElementById('visitorChart').getContext('2d');
    new Chart(visitorCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Visitors',
                data: [450, 580, 690, 890, 750, 630, 520],
                backgroundColor: '#2E7D32',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    // Product Performance Chart
    const productCtx = document.getElementById('productChart').getContext('2d');
    new Chart(productCtx, {
        type: 'doughnut',
        data: {
            labels: ['Maggot BSF', 'Pupa BSF', 'Dried BSF', 'BSF Eggs'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: [
                    '#4CAF50',
                    '#2E7D32',
                    '#1B5E20',
                    '#8BC34A'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });

    // Order Status Chart
    const orderCtx = document.getElementById('orderChart').getContext('2d');
    new Chart(orderCtx, {
        type: 'pie',
        data: {
            labels: ['Completed', 'Pending', 'Processing', 'Cancelled'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: [
                    '#36B37E',  // success
                    '#FFAB00',  // warning
                    '#3C91E6',  // primary
                    '#FF5630'   // danger
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
	initDarkMode();
	initProductManagement(); // Will only run on produk.html
	initAdminManagement(); // Add this line
	initChatManagement(); // Add this line
	initCharts(); // Add this line
	addStatusStyles();
});

// dropdown
// Toggle Profile Dropdown
function toggleDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Toggle Notification Menu
function toggleNotificationMenu(event) {
    event.stopPropagation();
    const notificationMenu = document.getElementById('notificationMenu');
    notificationMenu.style.display = notificationMenu.style.display === 'block' ? 'none' : 'block';
}

// Close Dropdowns When Clicking Outside
document.addEventListener('click', (event) => {
    const profileDropdown = document.getElementById('profileDropdown');
    const notificationMenu = document.getElementById('notificationMenu');
    
    if (!event.target.closest('.profile')) {
        profileDropdown.style.display = 'none';
    }

    if (!event.target.closest('.notification')) {
        notificationMenu.style.display = 'none';
    }
});


//user management
document.addEventListener('DOMContentLoaded', () => {
    const addUserForm = document.getElementById('addUserForm');
    const userTable = document.querySelector('.table-data tbody');

    // Show the Add User modal
    document.querySelector('.btn-download').addEventListener('click', () => {
        document.getElementById('addUserModal').style.display = 'block';
    });

    // Close modal
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    // Close modal when Cancel button is clicked
    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', () => closeModal('addUserModal'));
    });

    // Add user form submission
    addUserForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;
        const joinDate = document.getElementById('joinDate').value;
        const userStatus = document.getElementById('userStatus').value;
        const userPhoto = document.getElementById('userPhoto').files[0];

        const newRow = document.createElement('tr');

        const reader = new FileReader();
        reader.onload = function (e) {
            newRow.innerHTML = `
                <td>
                    <img src="${e.target.result}" alt="User Photo">
                    <p>${userName}</p>
                </td>
                <td>${userEmail}</td>
                <td>${joinDate}</td>
                <td><span class="status ${userStatus.toLowerCase()}">${userStatus}</span></td>
                <td>
                    <a href="#" class="btn-edit"><i class='bx bxs-edit'></i></a>
                    <a href="#" class="btn-delete"><i class='bx bxs-trash'></i></a>
                </td>
            `;

            userTable.appendChild(newRow);
            closeModal('addUserModal');
            addUserForm.reset();
        };

        if (userPhoto) {
            reader.readAsDataURL(userPhoto);
        }

        // Attach event listeners to the new row's Edit and Delete buttons
        newRow.querySelector('.btn-edit').addEventListener('click', () => editUser(newRow));
        newRow.querySelector('.btn-delete').addEventListener('click', () => deleteUser(newRow));
    });

    // Edit user
    function editUser(row) {
        const userName = row.querySelector('td:nth-child(1) p').textContent;
        const userEmail = row.querySelector('td:nth-child(2)').textContent;
        const joinDate = row.querySelector('td:nth-child(3)').textContent;
        const userStatus = row.querySelector('td:nth-child(4) .status').textContent;

        // Fill the form with current data
        document.getElementById('userName').value = userName;
        document.getElementById('userEmail').value = userEmail;
        document.getElementById('joinDate').value = joinDate;
        document.getElementById('userStatus').value = userStatus;

        // Show the modal
        document.getElementById('addUserModal').style.display = 'block';

        // Update row on form submit
        addUserForm.onsubmit = (e) => {
            e.preventDefault();

            row.querySelector('td:nth-child(1) p').textContent = document.getElementById('userName').value;
            row.querySelector('td:nth-child(2)').textContent = document.getElementById('userEmail').value;
            row.querySelector('td:nth-child(3)').textContent = document.getElementById('joinDate').value;
            row.querySelector('td:nth-child(4) .status').textContent = document.getElementById('userStatus').value;

            closeModal('addUserModal');
            addUserForm.reset();
            addUserForm.onsubmit = null; // Reset the form's behavior
        };
    }

    // Delete user
    function deleteUser(row) {
        if (confirm('Are you sure you want to delete this user?')) {
            row.remove();
        }
    }

    // Attach event listeners to existing rows (if any)
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', (e) => editUser(e.target.closest('tr')));
    });

    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', (e) => deleteUser(e.target.closest('tr')));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const addUserModal = document.getElementById('addUserModal');
    const addUserForm = document.getElementById('addUserForm');

    // Show the Add User modal
    document.querySelector('.btn-download').addEventListener('click', () => {
        addUserModal.style.display = 'block';
    });

    // Close modal function
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Close modal when Cancel button is clicked
    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', () => closeModal(addUserModal));
    });

    // Cancel button in Add User form
    document.querySelector('.btn-secondary.close-btn').addEventListener('click', () => {
        closeModal(addUserModal);
        addUserForm.reset(); // Reset the form fields
    });

    const addDocumentationBtn = document.getElementById("addDocumentationBtn");
const formModal = document.getElementById("formModal");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const documentationCards = document.querySelector(".documentation-cards");

// Show Modal
addDocumentationBtn.addEventListener("click", () => {
    formModal.style.display = "block";
});

// Hide Modal
cancelBtn.addEventListener("click", () => {
    formModal.style.display = "none";
    document.getElementById("uploadDocumentationForm").reset();
    document.getElementById("imagePreview").innerHTML = "";
});

// Save Documentation
saveBtn.addEventListener("click", () => {
    const imageInput = document.getElementById("uploadImage");
    const captionInput = document.getElementById("caption");

    if (!imageInput.files.length || !captionInput.value.trim()) {
        alert("Harap lengkapi semua field!");
        return;
    }

    const file = imageInput.files[0];
    const caption = captionInput.value.trim();
    const reader = new FileReader();

    reader.onload = function (e) {
        const newCard = document.createElement("div");
        newCard.classList.add("documentation-card");
        newCard.innerHTML = `
            <img src="${e.target.result}" alt="Uploaded Image">
            <p>${caption}</p>
        `;
        documentationCards.appendChild(newCard);
        formModal.style.display = "none";
        document.getElementById("uploadDocumentationForm").reset();
        document.getElementById("imagePreview").innerHTML = "";
    };

    reader.readAsDataURL(file);
});



});

//login

// Ambil elemen yang diperlukan
const addArtikelBtn = document.getElementById('addArtikelBtn');
const artikelModal = document.getElementById('artikelModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const artikelForm = document.getElementById('artikelForm');
const artikelList = document.getElementById('artikelList');
const modalTitle = document.getElementById('modalTitle');
const artikelIdInput = document.getElementById('artikelId');

// Buka modal untuk tambah artikel
addArtikelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    artikelForm.reset();
    artikelIdInput.value = '';
    modalTitle.textContent = 'Tambah Artikel Baru';
    artikelModal.style.display = 'flex';
});

// Tutup modal
closeModalBtn.addEventListener('click', () => {
    artikelModal.style.display = 'none';
});

// Tutup modal saat area di luar modal diklik
window.addEventListener('click', (e) => {
    if (e.target === artikelModal) {
        artikelModal.style.display = 'none';
    }
});

// Handle submit form (Create/Update)
artikelForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = artikelIdInput.value;
    const judul = document.getElementById('judulArtikel').value;
    const tanggal = document.getElementById('tanggalArtikel').value;
    const isi = document.getElementById('isiArtikel').value;
    const gambarFile = document.getElementById('gambarArtikel').files[0];

    if (id) {
        // Update artikel
        updateArtikel(id, judul, tanggal, isi, gambarFile);
    } else {
        // Tambah artikel baru
        addArtikel(judul, tanggal, isi, gambarFile);
    }

    artikelModal.style.display = 'none';
    artikelForm.reset();
});

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("addDocumentationModal");
    const addDocumentationBtn = document.getElementById("addDocumentationBtn");
    const closeModalBtn = document.getElementsByClassName("close")[0];
    const documentationForm = document.getElementById("documentationForm");
    const documentationList = document.getElementById("documentationList");

    let documentationData = JSON.parse(localStorage.getItem("documentationData")) || [];

    // Function to render documentation items
    function renderDocumentation() {
        documentationList.innerHTML = "";
        documentationData.forEach((doc, index) => {
            const docItem = document.createElement("div");
            docItem.classList.add("documentation-item");

            docItem.innerHTML = `
                <img src="${doc.image}" alt="${doc.title}">
                <div class="documentation-details">
                    <h3>${doc.title}</h3>
                    <p>${doc.description}</p>
                    <p>${doc.price}</p>
                    <button class="btn-edit" onclick="editDocumentation(${index})">Edit</button>
                    <button class="btn-delete" onclick="deleteDocumentation(${index})">Delete</button>
                </div>
            `;
            documentationList.appendChild(docItem);
        });
    }

    // Function to add new documentation
    documentationForm.onsubmit = function (event) {
        event.preventDefault();

        const docImage = document.getElementById("docImage").files[0];
        const docTitle = document.getElementById("docTitle").value;
        const docDescription = document.getElementById("docDescription").value;
        const docPrice = document.getElementById("docPrice").value;

        if (!docImage || !docTitle || !docDescription || !docPrice) {
            alert("Please fill out all fields.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const newDoc = {
                image: e.target.result,
                title: docTitle,
                description: docDescription,
                price: docPrice,
            };

            documentationData.push(newDoc);
            localStorage.setItem("documentationData", JSON.stringify(documentationData));
            renderDocumentation();
            modal.style.display = "none";
            documentationForm.reset();
        };
        reader.readAsDataURL(docImage);
    };

    // Function to edit documentation
    window.editDocumentation = function (index) {
        const doc = documentationData[index];
        document.getElementById("docTitle").value = doc.title;
        document.getElementById("docDescription").value = doc.description;
        document.getElementById("docPrice").value = doc.price;

        modal.style.display = "block";
        documentationForm.onsubmit = function (event) {
            event.preventDefault();

            doc.title = document.getElementById("docTitle").value;
            doc.description = document.getElementById("docDescription").value;
            doc.price = document.getElementById("docPrice").value;

            localStorage.setItem("documentationData", JSON.stringify(documentationData));
            renderDocumentation();
            modal.style.display = "none";
            documentationForm.reset();
        };
    };

    // Function to delete documentation
    window.deleteDocumentation = function (index) {
        documentationData.splice(index, 1);
        localStorage.setItem("documentationData", JSON.stringify(documentationData));
        renderDocumentation();
    };

    // Open modal when "Add New Documentation" button is clicked
    addDocumentationBtn.onclick = function () {
        modal.style.display = "block";
    };

    // Close modal when the close button (x) is clicked
    closeModalBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Close modal when clicking outside the modal
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Render initial documentation
    renderDocumentation();
});

// Fungsi untuk menambahkan artikel
function addArtikel(judul, tanggal, isi, gambarFile) {
    const artikel = {
        id: Date.now().toString(),
        judul,
        tanggal,
        isi,
        gambarUrl: gambarFile ? URL.createObjectURL(gambarFile) : '',
    };

    let artikelListData = JSON.parse(localStorage.getItem('artikelList')) || [];
    artikelListData.push(artikel);
    localStorage.setItem('artikelList', JSON.stringify(artikelListData));

    renderArtikel();
}

// Fungsi untuk mengupdate artikel
function updateArtikel(id, judul, tanggal, isi, gambarFile) {
    let artikelListData = JSON.parse(localStorage.getItem('artikelList')) || [];
    const artikelIndex = artikelListData.findIndex((artikel) => artikel.id === id);

    if (artikelIndex !== -1) {
        artikelListData[artikelIndex] = {
            ...artikelListData[artikelIndex],
            judul,
            tanggal,
            isi,
            gambarUrl: gambarFile ? URL.createObjectURL(gambarFile) : artikelListData[artikelIndex].gambarUrl,
        };

        localStorage.setItem('artikelList', JSON.stringify(artikelListData));
        renderArtikel();
    }
}

// Fungsi untuk menghapus artikel
function deleteArtikel(id) {
    let artikelListData = JSON.parse(localStorage.getItem('artikelList')) || [];
    artikelListData = artikelListData.filter((artikel) => artikel.id !== id);
    localStorage.setItem('artikelList', JSON.stringify(artikelListData));
    renderArtikel();
}

// Fungsi untuk menampilkan artikel
function renderArtikel() {
    const artikelListData = JSON.parse(localStorage.getItem('artikelList')) || [];
    artikelList.innerHTML = '';

    artikelListData.forEach((artikel) => {
        const artikelItem = document.createElement('div');
        artikelItem.classList.add('artikel-item');
        artikelItem.innerHTML = `
            <div class="artikel-header">
                <h2>${artikel.judul}</h2>
                <span class="artikel-date">${artikel.tanggal}</span>
            </div>
            <div class="artikel-content">
                ${artikel.gambarUrl ? `<img src="${artikel.gambarUrl}" alt="${artikel.judul}">` : ''}
                <p>${artikel.isi}</p>
                <button onclick="editArtikel('${artikel.id}')">Edit</button>
                <button onclick="deleteArtikel('${artikel.id}')">Hapus</button>
            </div>
        `;
        artikelList.appendChild(artikelItem);
    });
}

// Fungsi untuk mengisi form edit
function editArtikel(id) {
    const artikelListData = JSON.parse(localStorage.getItem('artikelList')) || [];
    const artikel = artikelListData.find((artikel) => artikel.id === id);

    if (artikel) {
        document.getElementById('judulArtikel').value = artikel.judul;
        document.getElementById('tanggalArtikel').value = artikel.tanggal;
        document.getElementById('isiArtikel').value = artikel.isi;
        artikelIdInput.value = artikel.id;
        modalTitle.textContent = 'Edit Artikel';
        artikelModal.style.display = 'flex';
    }
}

// Memuat artikel saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderArtikel);

// Dari script1.js
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("addDocumentationModal");
    const addDocumentationBtn = document.getElementById("addDocumentationBtn");
    const closeModalBtn = document.getElementsByClassName("close")[0];
    const documentationForm = document.getElementById("documentationForm");
    const documentationList = document.getElementById("documentationList");

    let documentationData = JSON.parse(localStorage.getItem("documentationData")) || [];

    // Function to render documentation items
    function renderDocumentation() {
        documentationList.innerHTML = "";
        documentationData.forEach((doc, index) => {
            const docItem = document.createElement("div");
            docItem.classList.add("documentation-item");

            docItem.innerHTML = `
                <img src="${doc.image}" alt="${doc.title}">
                <div class="documentation-details">
                    <h3>${doc.title}</h3>
                    <p>${doc.description}</p>
                    <p>${doc.price}</p>
                    <button class="btn-edit" onclick="editDocumentation(${index})">Edit</button>
                    <button class="btn-delete" onclick="deleteDocumentation(${index})">Delete</button>
                </div>
            `;
            documentationList.appendChild(docItem);
        });
    }

    // Function to add new documentation
    documentationForm.onsubmit = function (event) {
        event.preventDefault();

        const docImage = document.getElementById("docImage").files[0];
        const docTitle = document.getElementById("docTitle").value;
        const docDescription = document.getElementById("docDescription").value;
        const docPrice = document.getElementById("docPrice").value;

        if (!docImage || !docTitle || !docDescription || !docPrice) {
            alert("Please fill out all fields.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const newDoc = {
                image: e.target.result,
                title: docTitle,
                description: docDescription,
                price: docPrice,
            };

            documentationData.push(newDoc);
            localStorage.setItem("documentationData", JSON.stringify(documentationData));
            renderDocumentation();
            modal.style.display = "none";
            documentationForm.reset();
        };
        reader.readAsDataURL(docImage);
    };

    // Function to edit documentation
    window.editDocumentation = function (index) {
        const doc = documentationData[index];
        document.getElementById("docTitle").value = doc.title;
        document.getElementById("docDescription").value = doc.description;
        document.getElementById("docPrice").value = doc.price;

        modal.style.display = "block";
        documentationForm.onsubmit = function (event) {
            event.preventDefault();

            doc.title = document.getElementById("docTitle").value;
            doc.description = document.getElementById("docDescription").value;
            doc.price = document.getElementById("docPrice").value;

            localStorage.setItem("documentationData", JSON.stringify(documentationData));
            renderDocumentation();
            modal.style.display = "none";
            documentationForm.reset();
        };
    };

    // Function to delete documentation
    window.deleteDocumentation = function (index) {
        documentationData.splice(index, 1);
        localStorage.setItem("documentationData", JSON.stringify(documentationData));
        renderDocumentation();
    };

    // Open modal when "Add New Documentation" button is clicked
    addDocumentationBtn.onclick = function () {
        modal.style.display = "block";
    };

    // Close modal when the close button (x) is clicked
    closeModalBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Close modal when clicking outside the modal
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Render initial documentation
    renderDocumentation();
});

//Login dan register

function showLogin() {
    document.querySelector('.forms-wrapper').classList.remove('signup-active');
}

function showSignup() {
    document.querySelector('.forms-wrapper').classList.add('signup-active');
}