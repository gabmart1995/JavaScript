import { router } from './routes/index.routes.js';

window.addEventListener('hashchange', () => {
   router(window.location.hash);
});

router(window.location.hash);