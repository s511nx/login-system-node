
console.log("profile is working");
const profileInfo = document.getElementById("profileInfo")

const token = localStorage.getItem("token");
console.log("token form localStorage", token);
if (!token) {
    profileInfo.textContent = "You are not logged in.";
    profileInfo.style.color = "red";
   
}else {

fetch("http://localhost:3000/profile", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    },
})

.then(response => response.json())
.then(result => {
    console.log("profile data",result);

    if (result.message){
        profileInfo.textContent = result.message;
        profileInfo.style.color = "red";

    } else {
        profileInfo.textContent = `Welcome, ${result.email}`;
        profileInfo.style.color = "green";
    }
    
})

.catch(error => {
    console.log("Error", error);
    profileInfo.textContent = "Connection error";

});
}
logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});