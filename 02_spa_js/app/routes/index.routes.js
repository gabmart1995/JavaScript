import { Home, Posts, NotFound, Photos } from '../views/index.js';

const appRoot = document.querySelector('#app');

/**
 * Enrutador SPA
 * @param {string} route hash de la ruta
 */
const router = async (route) => {
    if (!appRoot) return;

    appRoot.innerHTML = '';

    // importaciones dinamicas
    switch (route) {
        case '#/': 
            appRoot.appendChild(Home());
            return;
        
        case '#/posts': 
            appRoot.appendChild(await Posts());
            return;
    
        case '#/photos':
            appRoot.appendChild(await Photos());
            return;
    
        default: 
            appRoot.appendChild(NotFound());
            return;
    }
}

export { router }