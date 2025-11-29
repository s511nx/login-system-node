
console.log("login is working");
const loginForm = document.getElementById("loginForm");
const messageElement = document.getElementById("message");
console.log("loginForm is ",loginForm);

loginForm.addEventListener("submit",function (event){
    event.preventDefault();
    console.log("login from submitted");
    const email = document.getElementById("email").value;
    const password  = document.getElementById("password").value;
   const data = {
    email: email,
    password :password
   };
   fetch("/login",{
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
   })
   .then(async (response) => {
    const result= await response.json();
    console.log("Server replied:",result);

    const msg = result.message || "No message from server";
    messageElement.textContent = msg;

    if (response.ok) {
        messageElement.style.color = "green";
        if (result.token) {
            localStorage.setItem("token", result.token);
           
        }
        window.location.href = "profile.html";

    } else {
        messageElement.style.color = "red";

    }

   })
.catch((error) => {
    console.log("Error",error);
    messageElement.textContent = "Connection error";
    messageElement.style.color = "red";

});
});