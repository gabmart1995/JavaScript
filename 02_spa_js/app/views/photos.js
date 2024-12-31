import { usePhotos } from '../hooks/usePhotos.js';

const Photos = async () => {
    const { getPhotos } = usePhotos();
    const photos = await getPhotos();
    const view = (`
        <h2 class="text-center mb-3">Photos</h2>
        <div class="row" id="content"></div>
    `)

    const divElement = document.createElement('div');
    divElement.classList.add(...['text-white']);
    divElement.innerHTML = view;
    
    if (photos.length > 0) {
        
        const rowElement = divElement.querySelector('#content');
        if (!rowElement) return;
        
        photos.forEach(photo => rowElement.innerHTML += (`
            <div class="col-4 mb-4">
                <div class="card bg-dark">
                    <img src="${photo.url}" class="card-img-top" alt="${photo.title}">
                    <div class="card-body">
                        <h5 class="card-title text-white">Card title</h5>
                        <p class="card-text text-white">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        `));
    }

    return divElement;
}   

export default Photos;