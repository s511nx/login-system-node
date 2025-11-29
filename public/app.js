console.log("app.js is working");
const  messageElement = document.getElementById("message");
const registerForm = document.getElementById("registerForm");
console.log("registerForm is:", registerForm);



registerForm.addEventListener("submit" , function(event){
    event.preventDefault();
    console.log("form submitted");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const data = {
        email:email,
        password:password
    };
    fetch("/register", {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        messageElement.textContent = result.message;
        if (result.message.toLowerCase().includes("exists")){
            messageElement.style.color= "red";
        } else {
            messageElement.style.color= "green";
        }
       // console.log("Server replied:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    });

});
