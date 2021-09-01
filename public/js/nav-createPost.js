function navCreatePost(event) {
    event.preventDefault();

    document.location.replace('/dashboard/new-post')
}

document.querySelector('.create-post').addEventListener('click', navCreatePost);