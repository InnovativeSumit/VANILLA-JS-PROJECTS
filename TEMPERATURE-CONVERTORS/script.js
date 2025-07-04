document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convert');
    const temperatureInput = document.getElementById('temperature');
    const resultDiv = document.getElementById('result');
    const resultCard = document.getElementById('result-card');
    const resultValues = document.querySelector('.result-values');
    const errorDiv = document.getElementById('error');
    
    convertBtn.addEventListener('click', function() {
        // Validate input
        if (temperatureInput.value === '' || isNaN(temperatureInput.value)) {
            errorDiv.classList.add('show');
            resultDiv.classList.remove('show');
            return;
        }
        
        errorDiv.classList.remove('show');
        
        // Get input values
        const temperature = parseFloat(temperatureInput.value);
        const unit = document.querySelector('input[name="unit"]:checked').value;
        
        // Convert temperature
        let converted = {};
        let originalSymbol = '';
        
        if (unit === 'celsius') {
            originalSymbol = '°C';
            converted.fahrenheit = (temperature * 9/5) + 32;
            converted.kelvin = temperature + 273.15;
        } else if (unit === 'fahrenheit') {
            originalSymbol = '°F';
            converted.celsius = (temperature - 32) * 5/9;
            converted.kelvin = (temperature - 32) * 5/9 + 273.15;
        } else if (unit === 'kelvin') {
            originalSymbol = 'K';
            converted.celsius = temperature - 273.15;
            converted.fahrenheit = (temperature - 273.15) * 9/5 + 32;
        }
        
        // Create result HTML
        resultValues.innerHTML = `
            <div class="original">
                <strong>Original:</strong> ${temperature.toFixed(2)}${originalSymbol}
            </div>
            <div class="converted celsius">
                <strong>Celsius:</strong> ${unit === 'celsius' ? temperature.toFixed(2) : converted.celsius.toFixed(2)}°C
            </div>
            <div class="converted fahrenheit">
                <strong>Fahrenheit:</strong> ${unit === 'fahrenheit' ? temperature.toFixed(2) : converted.fahrenheit.toFixed(2)}°F
            </div>
            <div class="converted kelvin">
                <strong>Kelvin:</strong> ${unit === 'kelvin' ? temperature.toFixed(2) : converted.kelvin.toFixed(2)}K
            </div>
        `;
        
        // Add color coding based on temperature
        colorCodeTemperatures();
        
        // Show result with animation
        resultDiv.classList.add('show');
    });
    
    function colorCodeTemperatures() {
        const temps = document.querySelectorAll('.converted');
        temps.forEach(temp => {
            const value = parseFloat(temp.textContent.split(':')[1]);
            if (temp.classList.contains('celsius') || temp.classList.contains('fahrenheit')) {
                if (value > 30) {
                    temp.style.color = '#ff6b6b'; // Hot
                } else if (value < 10) {
                    temp.style.color = '#74b9ff'; // Cold
                } else {
                    temp.style.color = '#55efc4'; // Moderate
                }
            } else if (temp.classList.contains('kelvin')) {
                if (value > 303.15) {
                    temp.style.color = '#ff6b6b'; // Hot
                } else if (value < 283.15) {
                    temp.style.color = '#74b9ff'; // Cold
                } else {
                    temp.style.color = '#55efc4'; // Moderate
                }
            }
        });
    }
    
    // Add animation on input focus
    temperatureInput.addEventListener('focus', function() {
        this.parentNode.style.transform = 'scale(1.02)';
    });
    
    temperatureInput.addEventListener('blur', function() {
        this.parentNode.style.transform = 'scale(1)';
    });
    
    // Add pulse animation to convert button
    setInterval(() => {
        convertBtn.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.6)';
        setTimeout(() => {
            convertBtn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }, 1000);
    }, 3000);
});