async function logout (){
    const response = await fetch("/api/users/logout", {
        method:"post",
        headers:{
            "content-type":"application/json"
        }
    });
    if(response.ok) {
        document.location.replace('/');
    } else {
        console.log(response.statusText);
    }
}
document.querySelector("#logout-link").addEventListener("click", logout)