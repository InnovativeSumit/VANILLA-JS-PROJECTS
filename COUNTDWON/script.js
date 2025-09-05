


const  startBtn= document.getElementById("startBtn");
const countNum= document.getElementById("showCountDown");
 
let num=10;
const colors = ["red", "blue", "green", "yellow", "purple", "orange" , "pink", "cyan", "lime", "teal"];


startBtn.addEventListener("click", function() {
    this.style.display = "none";
    countNum.style.display = "block";
    
    let interval = setInterval(displayCounter,1000);
    function displayCounter() {
        num--;

        if(num===0){
            countNum.innerHTML = "Go!";
            clearInterval(interval);
        }

        else{
            countNum.innerHTML = num;
        }
    }
})