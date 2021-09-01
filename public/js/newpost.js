const newPostHandler = async function(event){
    event.preventDefault()
    const title = document.querySelector("input[name='post-title']").value
    const post_body = document.querySelector("textarea[name='post-body']").value

    console.log(title, post_body)
    await fetch("/api/posts", {
        method:"post",
        body:JSON.stringify({
            title, post_body
        }),
        headers:{"content-type":"application/json"}
    })
    document.location.replace("/dashboard")
}
document.querySelector("#new-post-form").addEventListener("submit", newPostHandler)