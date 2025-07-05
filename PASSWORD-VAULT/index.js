        //MAKE BY SUMIT 
        // DOM Elements
        const addBtn = document.getElementById('addBtn');
        const addModal = document.getElementById('addModal');
        const viewModal = document.getElementById('viewModal');
        const cancelBtn = document.getElementById('cancelBtn');
        const closeViewBtn = document.getElementById('closeViewBtn');
        const entryForm = document.getElementById('entryForm');
        const entriesList = document.getElementById('entriesList');
        const noEntries = document.getElementById('noEntries');
        const searchBar = document.getElementById('searchBar');
        const togglePassword = document.getElementById('togglePassword');
        const toggleViewPassword = document.getElementById('toggleViewPassword');
        const copyPasswordBtn = document.getElementById('copyPasswordBtn');
        const themeToggle = document.getElementById('themeToggle');
        const viewAfterSave = document.getElementById('viewAfterSave');

        // Data storage
        let entries = JSON.parse(localStorage.getItem('passwordEntries')) || [];
        let currentViewId = null;

        // Initialize the app
        function init() {
            // Check for saved theme preference
            if (localStorage.getItem('darkMode') === 'enabled') {
                document.body.classList.add('dark-mode');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
            
            renderEntries();
            
            // Event listeners
            addBtn.addEventListener('click', () => {
                addModal.style.display = 'flex';
                setTimeout(() => {
                    addModal.classList.add('show');
                }, 10);
            });
            
            cancelBtn.addEventListener('click', closeAddModal);
            closeViewBtn.addEventListener('click', closeViewModal);
            entryForm.addEventListener('submit', handleFormSubmit);
            searchBar.addEventListener('input', handleSearch);
            togglePassword.addEventListener('click', togglePasswordVisibility);
            toggleViewPassword.addEventListener('click', toggleViewPasswordVisibility);
            copyPasswordBtn.addEventListener('click', copyPassword);
            themeToggle.addEventListener('click', toggleTheme);
            
            // Close modals when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === addModal) closeAddModal();
                if (e.target === viewModal) closeViewModal();
            });
        }

        // Toggle dark/light theme
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            if (isDarkMode) {
                localStorage.setItem('darkMode', 'enabled');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }

        // Render all entries
        function renderEntries(filteredEntries = null) {
            const entriesToRender = filteredEntries || entries;
            
            if (entriesToRender.length === 0) {
                noEntries.style.display = 'block';
                entriesList.innerHTML = '';
                return;
            }
            
            noEntries.style.display = 'none';
            entriesList.innerHTML = '';
            
            entriesToRender.forEach((entry, index) => {
                const entryElement = document.createElement('div');
                entryElement.className = 'entry-card';
                entryElement.innerHTML = `
                    <div class="entry-title">
                        <span class="entry-icon"><i class="fas ${getIconForApp(entry.appName)}"></i></span>
                        ${escapeHtml(entry.appName)}
                    </div>
                    <div class="entry-email">${escapeHtml(entry.email)}</div>
                    <div class="entry-actions">
                        <button class="action-btn view-btn" data-id="${index}" data-tooltip="VIEW DETAILS">
                            <i class="fas fa-eye"></i> VIEW
                        </button>
                        <button class="action-btn delete-btn" data-id="${index}" data-tooltip="DELETE ENTRY">
                            <i class="fas fa-trash"></i> DELETE
                        </button>
                    </div>
                `;
                entriesList.appendChild(entryElement);
            });
            
            // Add event listeners to the new buttons
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.currentTarget.getAttribute('data-id'));
                    viewEntry(id);
                });
            });
            
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.currentTarget.getAttribute('data-id'));
                    deleteEntry(id);
                });
            });
        }

        // Escape HTML special characters to prevent XSS
        function escapeHtml(text) {
            return text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        // Get appropriate icon for app/website
        function getIconForApp(appName) {
            const lowerName = appName.toLowerCase();
            
            if (lowerName.includes('google')) return 'fa-google';
            if (lowerName.includes('facebook')) return 'fa-facebook';
            if (lowerName.includes('twitter')) return 'fa-twitter';
            if (lowerName.includes('instagram')) return 'fa-instagram';
            if (lowerName.includes('linkedin')) return 'fa-linkedin';
            if (lowerName.includes('github')) return 'fa-github';
            if (lowerName.includes('amazon')) return 'fa-amazon';
            if (lowerName.includes('apple')) return 'fa-apple';
            if (lowerName.includes('microsoft')) return 'fa-microsoft';
            if (lowerName.includes('netflix')) return 'fa-film';
            if (lowerName.includes('spotify')) return 'fa-music';
            if (lowerName.includes('bank') || lowerName.includes('chase') || lowerName.includes('capital one')) return 'fa-university';
            if (lowerName.includes('mail') || lowerName.includes('gmail') || lowerName.includes('email') || lowerName.includes('yahoo') || lowerName.includes('outlook')) return 'fa-envelope';
            if (lowerName.includes('game') || lowerName.includes('steam') || lowerName.includes('epic') || lowerName.includes('playstation') || lowerName.includes('xbox')) return 'fa-gamepad';
            
            return 'fa-globe';
        }

        // Handle form submission
        function handleFormSubmit(e) {
            e.preventDefault();
            
            const appName = document.getElementById('appName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const viewAfterSave = document.getElementById('viewAfterSave').checked;
            
            // Simple encryption (in a real app, use more secure methods)
            const encryptedPassword = btoa(password);
            
            const newEntry = {
                appName,
                email,
                password: encryptedPassword,
                createdAt: new Date().toISOString()
            };
            
            entries.push(newEntry);
            saveEntries();
            renderEntries();
            closeAddModal();
            entryForm.reset();
            
            // Show notification
            showNotification('ENTRY SAVED SUCCESSFULLY!');
            
            // If "view after save" is checked, view the newly created entry
            if (viewAfterSave) {
                setTimeout(() => {
                    viewEntry(entries.length - 1);
                }, 300);
            }
        }

        // Show notification
        function showNotification(message, isError = false) {
            // Remove any existing notification
            const existingNotification = document.querySelector('.notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            if (isError) {
                notification.style.backgroundColor = 'var(--danger)';
            }
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => notification.remove(), 500);
            }, 2000);
        }

        // View an entry
        function viewEntry(id) {
            const entry = entries[id];
            currentViewId = id;
            
            document.getElementById('viewTitle').innerHTML = `<i class="fas ${getIconForApp(entry.appName)}"></i> ${escapeHtml(entry.appName)}`;
            document.getElementById('viewAppName').textContent = entry.appName;
            document.getElementById('viewEmail').textContent = entry.email;
            document.getElementById('viewPassword').value = atob(entry.password);
            
            viewModal.style.display = 'flex';
            setTimeout(() => {
                viewModal.classList.add('show');
            }, 10);
        }

        // Delete an entry
        function deleteEntry(id) {
            if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS ENTRY?')) {
                entries.splice(id, 1);
                saveEntries();
                renderEntries();
                showNotification('ENTRY DELETED SUCCESSFULLY');
            }
        }

        // Save entries to localStorage
        function saveEntries() {
            localStorage.setItem('passwordEntries', JSON.stringify(entries));
        }

        // Close the add modal
        function closeAddModal() {
            addModal.classList.remove('show');
            setTimeout(() => {
                addModal.style.display = 'none';
            }, 300);
            entryForm.reset();
        }

        // Close the view modal
        function closeViewModal() {
            viewModal.classList.remove('show');
            setTimeout(() => {
                viewModal.style.display = 'none';
            }, 300);
            currentViewId = null;
        }

        // Toggle password visibility in add form
        function togglePasswordVisibility() {
            const passwordInput = document.getElementById('password');
            const icon = togglePassword.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        }

        // Toggle password visibility in view modal
        function toggleViewPasswordVisibility() {
            const passwordInput = document.getElementById('viewPassword');
            const icon = toggleViewPassword.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        }

        // Copy password to clipboard
        function copyPassword() {
            const passwordInput = document.getElementById('viewPassword');
            passwordInput.select();
            document.execCommand('copy');
            
            showNotification('PASSWORD COPIED TO CLIPBOARD!');
        }

        // Handle search
        function handleSearch() {
            const searchTerm = searchBar.value.toLowerCase();
            if (!searchTerm) {
                renderEntries();
                return;
            }
            
            const filteredEntries = entries.filter(entry => 
                entry.appName.toLowerCase().includes(searchTerm) || 
                entry.email.toLowerCase().includes(searchTerm)
            );
            
            renderEntries(filteredEntries);
        }

        // Initialize the app
        init();