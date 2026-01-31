const qrCode = document.querySelector('sl-qr-code');
const form = document.querySelector('form');
const ssid = document.querySelectorAll('sl-input')[0];
const password = document.querySelectorAll('sl-input')[1];
const rotateButton = document.querySelectorAll('sl-button')[0];
const printButton = document.querySelectorAll('sl-button')[1];

function update() {
  console.log(ssid, password)
  qrCode.value = `WIFI:T:WPA;S:${ssid.value};P:${password.value};;`;
}

ssid.addEventListener('sl-input', update);
password.addEventListener('sl-input', update);

rotateButton.addEventListener('click', () => {
  form.classList.toggle('rotated');
});

printButton.addEventListener('click', () => {
  if (!ssid.value.length) {
    alert('Please specify a WiFi network name.');
    return;
  }
  
  if (password.value.length < 8) {
    alert('Passwords must be at least eight (8) characters long.'); 
    return;
  }
  
  window.print(); 
});