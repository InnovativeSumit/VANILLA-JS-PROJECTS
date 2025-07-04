const display = document.getElementById('display');
        const previousOperation = document.getElementById('previousOperation');
        const themeToggle = document.getElementById('themeToggle');
        
        let currentInput = '';
        let previousInput = '';
        let operation = null;
        let resetScreen = false;

        // Number input
        function appendNumber(number) {
            if (display.value === '0' || resetScreen) {
                display.value = '';
                resetScreen = false;
            }
            
            // Prevent multiple decimal points
            if (number === '.' && display.value.includes('.')) return;
            
            display.value += number;
        }

        // Operator input
        function appendOperator(op) {
            if (display.value === '' && op === '-') {
                display.value = '-';
                return;
            }
            
            if (display.value === '') return;
            
            if (operation !== null) calculate();
            
            previousInput = display.value;
            operation = op;
            previousOperation.textContent = `${previousInput} ${operation}`;
            resetScreen = true;
        }

        // Percentage calculation
        function percentage() {
            if (display.value === '') return;
            
            const value = parseFloat(display.value);
            display.value = (value / 100).toString();
            previousOperation.textContent = `${value}% = ${display.value}`;
        }

        // Calculate result
        function calculate() {
            if (operation === null || resetScreen) return;
            
            const currentValue = parseFloat(display.value);
            const previousValue = parseFloat(previousInput);
            let result;
            
            switch (operation) {
                case '+':
                    result = previousValue + currentValue;
                    break;
                case '-':
                    result = previousValue - currentValue;
                    break;
                case '*':
                    result = previousValue * currentValue;
                    break;
                case '/':
                    result = previousValue / currentValue;
                    break;
                default:
                    return;
            }
            
            display.value = result.toString();
            previousOperation.textContent = `${previousInput} ${operation} ${currentValue} =`;
            operation = null;
        }

        // Clear display
        function clearDisplay() {
            display.value = '0';
            previousOperation.textContent = '';
            currentInput = '';
            previousInput = '';
            operation = null;
        }

        // Delete last character
        function deleteLastChar() {
            display.value = display.value.toString().slice(0, -1);
            if (display.value === '') display.value = '0';
        }

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
            else if (e.key === '.') appendNumber('.');
            else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                appendOperator(e.key);
            }
            else if (e.key === '%') {
                percentage();
            }
            else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                calculate();
            }
            else if (e.key === 'Escape') clearDisplay();
            else if (e.key === 'Backspace') deleteLastChar();
        });

        // Theme toggle
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeToggle.textContent = 'Dark Mode';
                document.documentElement.style.setProperty('--primary-bg', '#f8fafc');
                document.documentElement.style.setProperty('--secondary-bg', '#e2e8f0');
                document.documentElement.style.setProperty('--text-primary', '#1e293b');
                document.documentElement.style.setProperty('--text-secondary', '#64748b');
            } else {
                themeToggle.textContent = 'Light Mode';
                document.documentElement.style.setProperty('--primary-bg', '#1e293b');
                document.documentElement.style.setProperty('--secondary-bg', '#334155');
                document.documentElement.style.setProperty('--text-primary', '#f8fafc');
                document.documentElement.style.setProperty('--text-secondary', '#94a3b8');
            }
        });