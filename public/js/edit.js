const postId = document.querySelector("input[name='post-id']").value
const editPostHandler = async function(event){
    event.preventDefault()
    const postTitle = document.querySelector("input[name='post-title']").value
    const postBody = document.querySelector("textarea[name='post-body']").value
    await fetch(`/api/post/${postId}`, {
        method:"put",
        body:JSON.stringify({
            postTitle, postBody
        }),
        headers:{"content-type":"application/json"}
    })
    document.location.replace("/dashboard")
}
const deletePostHandler = async function(){
    await fetch(`/api/post/${postId}`, {
        method:"delete"
    })
    document.location.replace("/dashboard")
}
document.querySelector("#edit-post-form").addEventListener("submit", editPostHandler)
document.querySelector("#delete-btn").addEventListener("click", deletePostHandler)