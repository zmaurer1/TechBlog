const signupFormHandler = async function(event){
    event.preventDefault()
    const usernameDiv = document.querySelector("#username-input-signup").value.trim()
    const passwordDiv = document.querySelector("#password-input-signup").value.trim()
    
    const response =  await fetch("/api/users", {
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
            document.location.replace('/dashboard')
        }
    // }).then(function(){
    //     document.location.replace("/dashboard")
    // }).catch(err => console.log(err))
}
document.querySelector("#signup-form").addEventListener("submit", signupFormHandler)