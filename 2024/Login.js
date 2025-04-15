const form = document.querySelector("form")

form.addEventListener("submit", (e)=>{
    const username = form.username.value

    const authenticated = authentication(username)
        window.location.href = "Game.html"
})

function authentication(username){
    localStorage.setItem('username', username)
}
function myFunction() {
    var y = document.getElementById("container");
    
  var x = document.getElementById("instruction");
  if (x.style.display === "none") {
    y.style.width = "300px";
    y.style.left = "0px";
    x.style.display = "block";
  } else {
    x.style.display = "none";
    y.style.left = "140px";
  }
}