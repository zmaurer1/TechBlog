const newCommentHandler = async function(event){
    event.preventDefault()
    const postId = document.querySelector("input[name='post-id']").value
    const postBody = document.querySelector("textarea[name='comment-body']").value
    if(body){
        await fetch("/api/comment", {
            method:"post",
            body:JSON.stringify({
                postId, postBody
            }),
            headers:{"content-type":"application/json"}
        })
        document.location.reload()
    }
    
}
document.querySelector("#new-comment-form").addEventListener("submit", newCommentHandler)