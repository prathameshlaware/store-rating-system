// Store Rating Platform Application

class StoreRatingApp {
    constructor() {
        this.currentUser = null;
        this.currentStoreId = null;
        this.currentRating = 0;
        this.sortOrder = {};
        
        // Sample data initialization
        this.users = [
            {
                id: 1,
                name: "Administrator Account Manager",
                email: "admin@test.com",
                password: "Admin123!",
                address: "123 Admin Street, Management City, MC 12345",
                role: "ADMIN",
                created_at: new Date('2025-01-10')
            },
            {
                id: 2,
                name: "John Michael Store Owner",
                email: "john@electronics.com",
                password: "Store123!",
                address: "456 Store Avenue, Commerce City, CC 67890",
                role: "STORE_OWNER",
                created_at: new Date('2025-01-11')
            },
            {
                id: 3,
                name: "Sarah Jennifer Customer",
                email: "sarah@customer.com",
                password: "User123!",
                address: "789 Customer Lane, User City, UC 11111",
                role: "USER",
                created_at: new Date('2025-01-12')
            },
            {
                id: 4,
                name: "Fashion Store Owner Manager",
                email: "fashion@boutique.com",
                password: "Fashion123!",
                address: "123 Fashion Street, Style City, SC 22222",
                role: "STORE_OWNER",
                created_at: new Date('2025-01-13')
            },
            {
                id: 5,
                name: "Regular Customer User Account",
                email: "customer@user.com",
                password: "Customer123!",
                address: "456 User Street, Customer City, CC 33333",
                role: "USER",
                created_at: new Date('2025-01-14')
            }
        ];

        this.stores = [
            {
                id: 1,
                name: "Tech Electronics Store",
                email: "john@electronics.com",
                address: "456 Store Avenue, Commerce City, CC 67890",
                owner_id: 2,
                average_rating: 4.2,
                ratings_count: 15,
                created_at: new Date('2025-01-11')
            },
            {
                id: 2,
                name: "Fashion Boutique Central",
                email: "fashion@boutique.com",
                address: "123 Fashion Street, Style City, SC 22222",
                owner_id: 4,
                average_rating: 3.8,
                ratings_count: 12,
                created_at: new Date('2025-01-13')
            },
            {
                id: 3,
                name: "Home & Garden Marketplace",
                email: "home@garden.com",
                address: "789 Garden Lane, Home City, HC 44444",
                owner_id: 2,
                average_rating: 4.5,
                ratings_count: 8,
                created_at: new Date('2025-01-14')
            },
            {
                id: 4,
                name: "Sports Equipment Central",
                email: "sports@equipment.com",
                address: "321 Sports Avenue, Fitness City, FC 55555",
                owner_id: 4,
                average_rating: 3.9,
                ratings_count: 18,
                created_at: new Date('2025-01-15')
            }
        ];

        this.ratings = [
            {
                id: 1,
                user_id: 3,
                store_id: 1,
                rating: 5,
                created_at: new Date('2025-01-15T10:30:00Z')
            },
            {
                id: 2,
                user_id: 3,
                store_id: 2,
                rating: 4,
                created_at: new Date('2025-01-14T15:45:00Z')
            },
            {
                id: 3,
                user_id: 5,
                store_id: 1,
                rating: 3,
                created_at: new Date('2025-01-16T09:15:00Z')
            },
            {
                id: 4,
                user_id: 5,
                store_id: 3,
                rating: 5,
                created_at: new Date('2025-01-17T14:20:00Z')
            },
            {
                id: 5,
                user_id: 3,
                store_id: 4,
                rating: 4,
                created_at: new Date('2025-01-18T11:30:00Z')
            }
        ];

        this.validationRules = {
            name: {
                min: 20,
                max: 60,
                message: "Name must be between 20-60 characters"
            },
            address: {
                max: 400,
                message: "Address must not exceed 400 characters"
            },
            password: {
                min: 8,
                max: 16,
                pattern: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9])[A-Za-z0-9\S]{8,16}$/,
                message: "Password must be 8-16 characters with at least one uppercase letter and one special character"
            },
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
            }
        };

        this.init();
    }

    init() {
        // Ensure all pages are hidden initially except login
        this.hideAllPages();
        this.hideAllModals();
        this.setupEventListeners();
        this.showLoginPage();
    }

    setupEventListeners() {
        // Authentication
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signupForm').addEventListener('submit', (e) => this.handleSignup(e));
        document.getElementById('showSignup').addEventListener('click', (e) => {
            e.preventDefault();
            this.showSignupPage();
        });
        document.getElementById('showLogin').addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginPage();
        });

        // Navigation
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());

        // Admin functions - setup after DOM elements exist
        setTimeout(() => {
            const addUserBtn = document.getElementById('addUserBtn');
            const addStoreBtn = document.getElementById('addStoreBtn');
            if (addUserBtn) addUserBtn.addEventListener('click', () => this.showAddUserModal());
            if (addStoreBtn) addStoreBtn.addEventListener('click', () => this.showAddStoreModal());
        }, 100);
        
        // Modal handlers
        this.setupModalHandlers();
        
        // Search and filter handlers
        this.setupSearchHandlers();
        
        // Table sorting
        this.setupTableSorting();

        // Rating system
        this.setupRatingSystem();

        // Modal backdrop clicks
        this.setupModalBackdropClicks();
    }

    setupModalHandlers() {
        // Add User Modal
        const closeAddUserModal = document.getElementById('closeAddUserModal');
        const cancelAddUser = document.getElementById('cancelAddUser');
        const addUserForm = document.getElementById('addUserForm');
        
        if (closeAddUserModal) closeAddUserModal.addEventListener('click', () => this.hideModal('addUserModal'));
        if (cancelAddUser) cancelAddUser.addEventListener('click', () => this.hideModal('addUserModal'));
        if (addUserForm) addUserForm.addEventListener('submit', (e) => this.handleAddUser(e));

        // Add Store Modal
        const closeAddStoreModal = document.getElementById('closeAddStoreModal');
        const cancelAddStore = document.getElementById('cancelAddStore');
        const addStoreForm = document.getElementById('addStoreForm');
        
        if (closeAddStoreModal) closeAddStoreModal.addEventListener('click', () => this.hideModal('addStoreModal'));
        if (cancelAddStore) cancelAddStore.addEventListener('click', () => this.hideModal('addStoreModal'));
        if (addStoreForm) addStoreForm.addEventListener('submit', (e) => this.handleAddStore(e));

        // Rating Modal
        const closeRatingModal = document.getElementById('closeRatingModal');
        const cancelRating = document.getElementById('cancelRating');
        const submitRating = document.getElementById('submitRating');
        
        if (closeRatingModal) closeRatingModal.addEventListener('click', () => this.hideModal('ratingModal'));
        if (cancelRating) cancelRating.addEventListener('click', () => this.hideModal('ratingModal'));
        if (submitRating) submitRating.addEventListener('click', () => this.submitRating());

        // Change Password Modal
        const closeChangePasswordModal = document.getElementById('closeChangePasswordModal');
        const cancelChangePassword = document.getElementById('cancelChangePassword');
        const changePasswordForm = document.getElementById('changePasswordForm');
        
        if (closeChangePasswordModal) closeChangePasswordModal.addEventListener('click', () => this.hideModal('changePasswordModal'));
        if (cancelChangePassword) cancelChangePassword.addEventListener('click', () => this.hideModal('changePasswordModal'));
        if (changePasswordForm) changePasswordForm.addEventListener('submit', (e) => this.handleChangePassword(e));
    }

    setupModalBackdropClicks() {
        // Close modals when clicking backdrop
        ['addUserModal', 'addStoreModal', 'ratingModal', 'changePasswordModal'].forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === e.currentTarget) {
                        this.hideModal(modalId);
                    }
                });
            }
        });
    }

    setupSearchHandlers() {
        // User filter
        const userFilter = document.getElementById('userFilter');
        const roleFilter = document.getElementById('roleFilter');
        if (userFilter) userFilter.addEventListener('input', () => this.filterUsers());
        if (roleFilter) roleFilter.addEventListener('change', () => this.filterUsers());
        
        // Store filter
        const storeFilter = document.getElementById('storeFilter');
        const storeSearch = document.getElementById('storeSearch');
        if (storeFilter) storeFilter.addEventListener('input', () => this.filterStores());
        if (storeSearch) storeSearch.addEventListener('input', () => this.searchStores());
    }

    setupTableSorting() {
        document.querySelectorAll('[data-sort]').forEach(header => {
            header.addEventListener('click', (e) => {
                const field = e.target.dataset.sort;
                const table = e.target.closest('table').id;
                this.sortTable(table, field);
            });
        });
    }

    setupRatingSystem() {
        document.querySelectorAll('#starsRating span').forEach(star => {
            star.addEventListener('click', (e) => {
                this.currentRating = parseInt(e.target.dataset.rating);
                this.updateStarDisplay();
            });
        });
    }

    // Authentication Methods
    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        this.clearErrors(['loginEmailError', 'loginPasswordError']);

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            this.showError('loginPasswordError', 'Invalid email or password');
            return;
        }

        this.currentUser = user;
        // Clear form
        document.getElementById('loginForm').reset();
        this.showDashboardForRole(user.role);
    }

    handleSignup(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('signupName').value,
            email: document.getElementById('signupEmail').value,
            address: document.getElementById('signupAddress').value,
            password: document.getElementById('signupPassword').value
        };

        if (!this.validateForm('signup', formData)) return;

        // Check if email already exists
        if (this.users.find(u => u.email === formData.email)) {
            this.showError('signupEmailError', 'Email already exists');
            return;
        }

        const newUser = {
            id: Math.max(...this.users.map(u => u.id)) + 1,
            ...formData,
            role: 'USER',
            created_at: new Date()
        };

        this.users.push(newUser);
        this.currentUser = newUser;
        // Clear form
        document.getElementById('signupForm').reset();
        this.showDashboardForRole('USER');
    }

    handleLogout() {
        this.currentUser = null;
        this.hideAllModals();
        // Clear all forms
        document.querySelectorAll('form').forEach(form => form.reset());
        this.showLoginPage();
    }

    // Navigation Methods
    showLoginPage() {
        this.hideAllPages();
        this.hideAllModals();
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('navbar').classList.add('hidden');
        this.clearAllFormErrors();
    }

    showSignupPage() {
        this.hideAllPages();
        this.hideAllModals();
        document.getElementById('signupPage').classList.remove('hidden');
        document.getElementById('navbar').classList.add('hidden');
        this.clearAllFormErrors();
    }

    showDashboardForRole(role) {
        this.hideAllPages();
        this.hideAllModals();
        document.getElementById('navbar').classList.remove('hidden');
        
        // Update user info
        document.getElementById('userInfo').textContent = `${this.currentUser.name} (${this.currentUser.role})`;
        
        // Setup navigation menu
        this.setupNavigation(role);

        // Add small delay to ensure DOM is ready
        setTimeout(() => {
            switch (role) {
                case 'ADMIN':
                    this.showAdminDashboard();
                    break;
                case 'USER':
                    this.showUserDashboard();
                    break;
                case 'STORE_OWNER':
                    this.showStoreOwnerDashboard();
                    break;
            }
        }, 50);
    }

    setupNavigation(role) {
        const navMenu = document.getElementById('navMenu');
        let navItems = [];

        switch (role) {
            case 'ADMIN':
                navItems = [
                    { text: 'Dashboard', href: '#', active: true },
                    { text: 'Change Password', href: '#', click: 'showChangePasswordModal' }
                ];
                break;
            case 'USER':
                navItems = [
                    { text: 'Stores', href: '#', active: true },
                    { text: 'Change Password', href: '#', click: 'showChangePasswordModal' }
                ];
                break;
            case 'STORE_OWNER':
                navItems = [
                    { text: 'Dashboard', href: '#', active: true },
                    { text: 'Change Password', href: '#', click: 'showChangePasswordModal' }
                ];
                break;
        }

        navMenu.innerHTML = navItems.map(item => {
            if (item.click) {
                return `<a href="${item.href}" ${item.active ? 'class="active"' : ''} data-action="${item.click}">${item.text}</a>`;
            }
            return `<a href="${item.href}" ${item.active ? 'class="active"' : ''}>${item.text}</a>`;
        }).join('');

        // Add click handlers for navigation items with data-action
        navMenu.querySelectorAll('a[data-action]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const action = e.target.dataset.action;
                if (this[action]) {
                    this[action]();
                }
            });
        });
    }

    hideAllPages() {
        const pageIds = ['loginPage', 'signupPage', 'adminDashboard', 'userDashboard', 'storeOwnerDashboard'];
        pageIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('hidden');
            }
        });
    }

    hideAllModals() {
        const modalIds = ['addUserModal', 'addStoreModal', 'ratingModal', 'changePasswordModal'];
        modalIds.forEach(modalId => {
            const element = document.getElementById(modalId);
            if (element) {
                element.classList.add('hidden');
            }
        });
    }

    clearAllFormErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }

    // Admin Dashboard Methods
    showAdminDashboard() {
        document.getElementById('adminDashboard').classList.remove('hidden');
        this.updateMetrics();
        this.populateUsersTable();
        this.populateStoresTable();
        
        // Re-setup admin event listeners
        setTimeout(() => {
            const addUserBtn = document.getElementById('addUserBtn');
            const addStoreBtn = document.getElementById('addStoreBtn');
            if (addUserBtn && !addUserBtn.hasAttribute('data-listener')) {
                addUserBtn.addEventListener('click', () => this.showAddUserModal());
                addUserBtn.setAttribute('data-listener', 'true');
            }
            if (addStoreBtn && !addStoreBtn.hasAttribute('data-listener')) {
                addStoreBtn.addEventListener('click', () => this.showAddStoreModal());
                addStoreBtn.setAttribute('data-listener', 'true');
            }
        }, 100);
    }

    updateMetrics() {
        const totalUsersEl = document.getElementById('totalUsers');
        const totalStoresEl = document.getElementById('totalStores');
        const totalRatingsEl = document.getElementById('totalRatings');
        
        if (totalUsersEl) totalUsersEl.textContent = this.users.length;
        if (totalStoresEl) totalStoresEl.textContent = this.stores.length;
        if (totalRatingsEl) totalRatingsEl.textContent = this.ratings.length;
    }

    populateUsersTable() {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = this.users.map(user => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address}</td>
                <td><span class="role-badge role-badge--${user.role.toLowerCase().replace('_', '-')}">${user.role}</span></td>
                <td>
                    <button class="btn btn--outline btn--sm" onclick="app.viewUserDetails(${user.id})">View</button>
                </td>
            </tr>
        `).join('');
    }

    populateStoresTable() {
        const tbody = document.getElementById('storesTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = this.stores.map(store => {
            const owner = this.users.find(u => u.id === store.owner_id);
            return `
                <tr>
                    <td>${store.name}</td>
                    <td>${store.email}</td>
                    <td>${store.address}</td>
                    <td>${store.average_rating.toFixed(1)} ★ (${store.ratings_count})</td>
                    <td>
                        <button class="btn btn--outline btn--sm" onclick="app.viewStoreDetails(${store.id})">View</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // User Dashboard Methods
    showUserDashboard() {
        document.getElementById('userDashboard').classList.remove('hidden');
        this.populateStoresGrid();
    }

    populateStoresGrid() {
        const grid = document.getElementById('storesGrid');
        if (!grid) return;
        
        const stores = this.getFilteredStores();
        
        if (stores.length === 0) {
            grid.innerHTML = '<div class="empty-state"><h3>No stores found</h3><p>Try adjusting your search criteria</p></div>';
            return;
        }

        grid.innerHTML = stores.map(store => {
            const userRating = this.ratings.find(r => r.store_id === store.id && r.user_id === this.currentUser.id);
            return `
                <div class="store-card">
                    <h3>${store.name}</h3>
                    <p class="store-address">${store.address}</p>
                    <div class="store-rating">
                        <div class="rating-stars">
                            <span class="rating-value">${store.average_rating.toFixed(1)} ★</span>
                            <span>(${store.ratings_count} reviews)</span>
                        </div>
                    </div>
                    ${userRating ? 
                        `<p>Your rating: ${'★'.repeat(userRating.rating)}</p>` : 
                        '<p>Not rated by you</p>'
                    }
                    <div class="store-actions">
                        <button class="btn btn--primary btn--sm" onclick="app.showRatingModal(${store.id})">
                            ${userRating ? 'Update Rating' : 'Rate Store'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Store Owner Dashboard Methods
    showStoreOwnerDashboard() {
        document.getElementById('storeOwnerDashboard').classList.remove('hidden');
        this.updateStoreMetrics();
        this.populateCustomerRatings();
    }

    updateStoreMetrics() {
        const ownerStores = this.stores.filter(s => s.owner_id === this.currentUser.id);
        const averageRating = ownerStores.reduce((acc, store) => acc + store.average_rating, 0) / ownerStores.length || 0;
        const totalRatings = ownerStores.reduce((acc, store) => acc + store.ratings_count, 0);

        const avgEl = document.getElementById('storeAverageRating');
        const countEl = document.getElementById('storeRatingsCount');
        
        if (avgEl) avgEl.textContent = averageRating.toFixed(1);
        if (countEl) countEl.textContent = totalRatings;
    }

    populateCustomerRatings() {
        const ownerStores = this.stores.filter(s => s.owner_id === this.currentUser.id);
        const storeIds = ownerStores.map(s => s.id);
        const customerRatings = this.ratings.filter(r => storeIds.includes(r.store_id));

        const ratingsContainer = document.getElementById('customerRatings');
        if (!ratingsContainer) return;
        
        if (customerRatings.length === 0) {
            ratingsContainer.innerHTML = '<div class="empty-state"><h3>No ratings yet</h3><p>Customers haven\'t rated your stores yet</p></div>';
            return;
        }

        ratingsContainer.innerHTML = customerRatings.map(rating => {
            const user = this.users.find(u => u.id === rating.user_id);
            const store = this.stores.find(s => s.id === rating.store_id);
            return `
                <div class="rating-item">
                    <div class="rating-user">
                        <div class="rating-user-name">${user.name}</div>
                        <div class="rating-date">Rated ${store.name} on ${rating.created_at.toLocaleDateString()}</div>
                    </div>
                    <div class="rating-score">
                        <span class="stars">${'★'.repeat(rating.rating)}</span>
                        <span>${rating.rating}/5</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Modal Methods
    showAddUserModal() {
        this.hideAllModals();
        this.showModal('addUserModal');
    }

    showAddStoreModal() {
        this.hideAllModals();
        this.populateStoreOwners();
        this.showModal('addStoreModal');
    }

    showRatingModal(storeId) {
        this.hideAllModals();
        this.currentStoreId = storeId;
        const store = this.stores.find(s => s.id === storeId);
        const existingRating = this.ratings.find(r => r.store_id === storeId && r.user_id === this.currentUser.id);
        
        const storeNameEl = document.getElementById('ratingStoreName');
        if (storeNameEl) storeNameEl.textContent = store.name;
        
        this.currentRating = existingRating ? existingRating.rating : 0;
        this.updateStarDisplay();
        this.showModal('ratingModal');
    }

    showChangePasswordModal() {
        this.hideAllModals();
        this.showModal('changePasswordModal');
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            this.clearModalErrors(modalId);
        }
    }

    // Continue with rest of methods...
    // Form Handling Methods
    handleAddUser(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('newUserName').value,
            email: document.getElementById('newUserEmail').value,
            address: document.getElementById('newUserAddress').value,
            password: document.getElementById('newUserPassword').value,
            role: document.getElementById('newUserRole').value
        };

        if (!this.validateForm('addUser', formData)) return;

        // Check if email already exists
        if (this.users.find(u => u.email === formData.email)) {
            this.showError('newUserEmailError', 'Email already exists');
            return;
        }

        const newUser = {
            id: Math.max(...this.users.map(u => u.id)) + 1,
            ...formData,
            created_at: new Date()
        };

        this.users.push(newUser);
        this.populateUsersTable();
        this.updateMetrics();
        this.hideModal('addUserModal');
        document.getElementById('addUserForm').reset();
    }

    handleAddStore(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('newStoreName').value,
            email: document.getElementById('newStoreEmail').value,
            address: document.getElementById('newStoreAddress').value,
            owner_id: parseInt(document.getElementById('newStoreOwner').value)
        };

        if (!this.validateStoreForm(formData)) return;

        // Check if email already exists
        if (this.stores.find(s => s.email === formData.email)) {
            this.showError('newStoreEmailError', 'Email already exists');
            return;
        }

        const newStore = {
            id: Math.max(...this.stores.map(s => s.id)) + 1,
            ...formData,
            average_rating: 0,
            ratings_count: 0,
            created_at: new Date()
        };

        this.stores.push(newStore);
        this.populateStoresTable();
        this.updateMetrics();
        this.hideModal('addStoreModal');
        document.getElementById('addStoreForm').reset();
    }

    handleChangePassword(e) {
        e.preventDefault();
        const current = document.getElementById('currentPassword').value;
        const newPass = document.getElementById('newPassword').value;
        const confirm = document.getElementById('confirmPassword').value;

        this.clearErrors(['currentPasswordError', 'newPasswordError', 'confirmPasswordError']);

        if (this.currentUser.password !== current) {
            this.showError('currentPasswordError', 'Current password is incorrect');
            return;
        }

        if (!this.validationRules.password.pattern.test(newPass)) {
            this.showError('newPasswordError', this.validationRules.password.message);
            return;
        }

        if (newPass !== confirm) {
            this.showError('confirmPasswordError', 'Passwords do not match');
            return;
        }

        this.currentUser.password = newPass;
        // Update in users array
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        this.users[userIndex].password = newPass;

        this.hideModal('changePasswordModal');
        document.getElementById('changePasswordForm').reset();
        alert('Password changed successfully!');
    }

    submitRating() {
        if (this.currentRating === 0) {
            alert('Please select a rating');
            return;
        }

        const existingRatingIndex = this.ratings.findIndex(r => 
            r.store_id === this.currentStoreId && r.user_id === this.currentUser.id
        );

        if (existingRatingIndex >= 0) {
            // Update existing rating
            this.ratings[existingRatingIndex].rating = this.currentRating;
        } else {
            // Add new rating
            const newRating = {
                id: Math.max(...this.ratings.map(r => r.id)) + 1,
                user_id: this.currentUser.id,
                store_id: this.currentStoreId,
                rating: this.currentRating,
                created_at: new Date()
            };
            this.ratings.push(newRating);
        }

        this.updateStoreRating(this.currentStoreId);
        this.populateStoresGrid();
        this.hideModal('ratingModal');
    }

    updateStoreRating(storeId) {
        const storeRatings = this.ratings.filter(r => r.store_id === storeId);
        const avgRating = storeRatings.reduce((acc, r) => acc + r.rating, 0) / storeRatings.length;
        
        const storeIndex = this.stores.findIndex(s => s.id === storeId);
        this.stores[storeIndex].average_rating = avgRating;
        this.stores[storeIndex].ratings_count = storeRatings.length;
    }

    // Utility Methods
    populateStoreOwners() {
        const select = document.getElementById('newStoreOwner');
        if (!select) return;
        
        const storeOwners = this.users.filter(u => u.role === 'STORE_OWNER');
        
        select.innerHTML = '<option value="">Select Owner</option>' + 
            storeOwners.map(owner => 
                `<option value="${owner.id}">${owner.name}</option>`
            ).join('');
    }

    updateStarDisplay() {
        document.querySelectorAll('#starsRating span').forEach((star, index) => {
            star.classList.toggle('active', index < this.currentRating);
        });
    }

    // Filtering and Searching Methods
    filterUsers() {
        const nameFilter = document.getElementById('userFilter')?.value.toLowerCase() || '';
        const roleFilter = document.getElementById('roleFilter')?.value || '';
        
        const filteredUsers = this.users.filter(user => {
            const matchesName = user.name.toLowerCase().includes(nameFilter) ||
                               user.email.toLowerCase().includes(nameFilter) ||
                               user.address.toLowerCase().includes(nameFilter);
            const matchesRole = !roleFilter || user.role === roleFilter;
            return matchesName && matchesRole;
        });

        this.displayFilteredUsers(filteredUsers);
    }

    displayFilteredUsers(users) {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = users.map(user => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address}</td>
                <td><span class="role-badge role-badge--${user.role.toLowerCase().replace('_', '-')}">${user.role}</span></td>
                <td>
                    <button class="btn btn--outline btn--sm" onclick="app.viewUserDetails(${user.id})">View</button>
                </td>
            </tr>
        `).join('');
    }

    filterStores() {
        const filter = document.getElementById('storeFilter')?.value.toLowerCase() || '';
        
        const filteredStores = this.stores.filter(store => {
            return store.name.toLowerCase().includes(filter) ||
                   store.email.toLowerCase().includes(filter) ||
                   store.address.toLowerCase().includes(filter);
        });

        this.displayFilteredStores(filteredStores);
    }

    displayFilteredStores(stores) {
        const tbody = document.getElementById('storesTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = stores.map(store => `
            <tr>
                <td>${store.name}</td>
                <td>${store.email}</td>
                <td>${store.address}</td>
                <td>${store.average_rating.toFixed(1)} ★ (${store.ratings_count})</td>
                <td>
                    <button class="btn btn--outline btn--sm" onclick="app.viewStoreDetails(${store.id})">View</button>
                </td>
            </tr>
        `).join('');
    }

    searchStores() {
        this.populateStoresGrid();
    }

    getFilteredStores() {
        const searchInput = document.getElementById('storeSearch');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        return this.stores.filter(store => {
            return store.name.toLowerCase().includes(searchTerm) ||
                   store.address.toLowerCase().includes(searchTerm);
        });
    }

    // Table Sorting
    sortTable(tableId, field) {
        const currentOrder = this.sortOrder[tableId + field] || 'asc';
        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
        this.sortOrder[tableId + field] = newOrder;

        // Update header classes
        document.querySelectorAll(`#${tableId} th`).forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
        });
        
        const header = document.querySelector(`#${tableId} th[data-sort="${field}"]`);
        if (header) {
            header.classList.add(`sort-${newOrder}`);
        }

        // Sort and display data
        if (tableId === 'usersTable') {
            const sortedUsers = [...this.users].sort((a, b) => {
                const aVal = a[field];
                const bVal = b[field];
                return newOrder === 'asc' ? 
                    (aVal > bVal ? 1 : -1) : 
                    (aVal < bVal ? 1 : -1);
            });
            this.displayFilteredUsers(sortedUsers);
        } else if (tableId === 'storesTable') {
            const sortedStores = [...this.stores].sort((a, b) => {
                const aVal = a[field];
                const bVal = b[field];
                return newOrder === 'asc' ? 
                    (aVal > bVal ? 1 : -1) : 
                    (aVal < bVal ? 1 : -1);
            });
            this.displayFilteredStores(sortedStores);
        }
    }

    // Validation Methods
    validateForm(formType, data) {
        const errors = {};
        let isValid = true;

        // Name validation
        if (!data.name || data.name.length < this.validationRules.name.min || 
            data.name.length > this.validationRules.name.max) {
            errors.name = this.validationRules.name.message;
            isValid = false;
        }

        // Email validation
        if (!data.email || !this.validationRules.email.pattern.test(data.email)) {
            errors.email = this.validationRules.email.message;
            isValid = false;
        }

        // Address validation
        if (!data.address || data.address.length > this.validationRules.address.max) {
            errors.address = this.validationRules.address.message;
            isValid = false;
        }

        // Password validation
        if (!data.password || !this.validationRules.password.pattern.test(data.password)) {
            errors.password = this.validationRules.password.message;
            isValid = false;
        }

        // Role validation for add user
        if (formType === 'addUser' && !data.role) {
            errors.role = 'Please select a role';
            isValid = false;
        }

        this.displayFormErrors(formType, errors);
        return isValid;
    }

    validateStoreForm(data) {
        const errors = {};
        let isValid = true;

        // Name validation
        if (!data.name || data.name.length < this.validationRules.name.min || 
            data.name.length > this.validationRules.name.max) {
            errors.name = this.validationRules.name.message;
            isValid = false;
        }

        // Email validation
        if (!data.email || !this.validationRules.email.pattern.test(data.email)) {
            errors.email = this.validationRules.email.message;
            isValid = false;
        }

        // Address validation
        if (!data.address || data.address.length > this.validationRules.address.max) {
            errors.address = this.validationRules.address.message;
            isValid = false;
        }

        // Owner validation
        if (!data.owner_id) {
            errors.owner = 'Please select a store owner';
            isValid = false;
        }

        this.displayStoreFormErrors(errors);
        return isValid;
    }

    displayFormErrors(formType, errors) {
        const prefixes = {
            signup: 'signup',
            addUser: 'newUser'
        };
        const prefix = prefixes[formType];

        this.clearErrors([
            `${prefix}NameError`,
            `${prefix}EmailError`, 
            `${prefix}AddressError`,
            `${prefix}PasswordError`,
            `${prefix}RoleError`
        ]);

        Object.keys(errors).forEach(field => {
            const errorId = field === 'role' ? `${prefix}RoleError` : `${prefix}${field.charAt(0).toUpperCase() + field.slice(1)}Error`;
            this.showError(errorId, errors[field]);
        });
    }

    displayStoreFormErrors(errors) {
        this.clearErrors([
            'newStoreNameError',
            'newStoreEmailError',
            'newStoreAddressError'
        ]);

        Object.keys(errors).forEach(field => {
            const errorId = `newStore${field.charAt(0).toUpperCase() + field.slice(1)}Error`;
            this.showError(errorId, errors[field]);
        });
    }

    showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
        }
    }

    clearErrors(elementIds) {
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = '';
                element.style.display = 'none';
            }
        });
    }

    clearModalErrors(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
                error.style.display = 'none';
            });
        }
    }

    // View Details Methods
    viewUserDetails(userId) {
        const user = this.users.find(u => u.id === userId);
        let details = `Name: ${user.name}\nEmail: ${user.email}\nAddress: ${user.address}\nRole: ${user.role}`;
        
        if (user.role === 'STORE_OWNER') {
            const userStores = this.stores.filter(s => s.owner_id === userId);
            const avgRating = userStores.reduce((acc, store) => acc + store.average_rating, 0) / userStores.length || 0;
            details += `\nAverage Store Rating: ${avgRating.toFixed(1)}`;
        }
        
        alert(details);
    }

    viewStoreDetails(storeId) {
        const store = this.stores.find(s => s.id === storeId);
        const owner = this.users.find(u => u.id === store.owner_id);
        const details = `Store: ${store.name}\nOwner: ${owner.name}\nEmail: ${store.email}\nAddress: ${store.address}\nRating: ${store.average_rating.toFixed(1)} ★ (${store.ratings_count} reviews)`;
        alert(details);
    }
}

// Initialize the application
window.app = new StoreRatingApp();