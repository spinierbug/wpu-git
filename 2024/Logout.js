const logoutBtn = document.querySelector(".logout-btn")
console.log(localStorage.getItem('username'));
document.getElementById("username").innerHTML = localStorage.getItem('username');

logoutBtn.addEventListener("click",()=>{
    window.location.replace("login.html")

    
})