import { usePosts } from '../hooks/usePosts.js';

const Posts = async () => {
    const { getPosts } = usePosts();
    
    const view = (`
        <h2 class="text-center mb-3">Total posts <span id="posts-number">0</span></h2>
        <ul class="list-group style-posts" id="posts"></ul>
    `);

    const divElement = document.createElement('div');
    divElement.classList.add(...['text-white']);
    divElement.innerHTML = view;
    
    const listPostElement = divElement.querySelector('#posts');
    if (!listPostElement) return;
    
    // obtenemos los posts
    const posts = await getPosts();

    if (posts.length > 0) {    
        posts.forEach(post => listPostElement.innerHTML += (`
            <li class="list-group-item border-primary bg-dark text-white">
                <h5>${post.title}</h5>
                <p>${post.body}</p>
            </li>
        `));

        // asignamos la cantidad de los elementos
        const spanNumberPosts = divElement.querySelector('#posts-number');       
        if (!spanNumberPosts) return;

        spanNumberPosts.innerHTML = posts.length.toString();
    
    } else {
        listPostElement.innerHTML += (`
            <li class="list-group-item border-primary bg-dark text-white">
                <h5>No se encontraron posts</h5>
            </li>
        `);
    }

    return divElement;
};

export default Posts;