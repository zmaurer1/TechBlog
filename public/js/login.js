async function loginFormHandler (event){
    event.preventDefault()
    const usernameDiv = document.querySelector("#loginUserName").value.trim()
    const passwordDiv = document.querySelector("#loginPassword").value.trim()
    
    const response = await fetch("/api/users/login", {
        method:"post",
        body:JSON.stringify({
           userName: usernameDiv,
            password: passwordDiv
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(response.ok) {
        document.location.replace("/dashboard")
    }
    // .then(function(){
    //     document.location.replace("/dashboard")
    // }).catch(err => console.log(err))
}
document.querySelector("#login-form").addEventListener("submit", loginFormHandler)