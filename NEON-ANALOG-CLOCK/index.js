const body = document.body;
    const clock = document.getElementById('clock');
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    const toggleBtn = document.getElementById('toggle-theme');

    const themes = ['', 'cyberpunk', 'dark']; // default, cyberpunk, dark
    let currentTheme = 0;

    toggleBtn.onclick = () => {
      currentTheme = (currentTheme + 1) % themes.length;
      body.className = themes[currentTheme];
    };

    // Add numbers
    for (let i = 1; i <= 12; i++) {
      const num = document.createElement('div');
      num.className = 'number';
      num.textContent = i;

      const angle = (i - 3) * 30 * (Math.PI / 180);
      const radius = 120;
      const x = 150 + radius * Math.cos(angle);
      const y = 150 + radius * Math.sin(angle);

      num.style.left = `${x}px`;
      num.style.top = `${y}px`;
      clock.appendChild(num);
    }

    // Add ticks
    for (let i = 0; i < 60; i++) {
      const tick = document.createElement('div');
      tick.className = 'tick';
      tick.style.transform = `rotate(${i * 6}deg) translate(-80%, -140px)`;

      

      clock.appendChild(tick);
    }

    function updateClock() {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secondDeg = seconds * 6;
      const minuteDeg = minutes * 6 + seconds * 0.1;
      const hourDeg = ((hours % 12) / 12) * 360 + minutes * 0.5;

      secondHand.style.transform = `rotate(${secondDeg}deg)`;
      minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
      hourHand.style.transform = `rotate(${hourDeg}deg)`;
    }

    setInterval(updateClock, 1000);
    updateClock();