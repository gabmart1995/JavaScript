class LandingHeader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = (`
            <header id="landing-header" class="py-5 px-10 flex items-center fixed top-0 w-full justify-between z-40 text-white">
                <!-- Tesla logo -->
                <div class="flex flex-grow basis-0">
                    <tesla-page-logo></tesla-page-logo>
                </div>
                <nav>
                    <ul class="flex text-sm [&>li>a]:text-current [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
                        <li><a href="#">Model S</a></li>
                        <li><a href="#">Model 3</a></li>
                        <li><a href="#">Model X</a></li>
                        <li><a href="#">Model Y</a></li>
                        <li><a href="#">Powerwall</a></li>
                        <li><a href="#">Carga</a></li>
                    </ul>
                </nav>
                <nav class="flex flex-grow justify-end basis-0">
                    <ul class="flex text-sm [&>li>a]:text-current [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
                        <li><a href="#">Soporte</a></li>
                        <li><a href="#">Tienda</a></li>
                        <li><a href="#">Cuenta</a></li>
                        <li><a href="#">Menú</a></li>
                    </ul>
                </nav>
                <div 
                    id="menu-backdrop" 
                    class="absolute bg-black/5 backdrop-blur-lg rounded left-[var(--left)] top-[var(--top)] w-[var(--width)] h-[var(--height)] transition-all duration-300 ease-in-out opacity-0 -z-10">
                </div>
            </header>    
        `);
    }

    connectedCallback() {
        /** @type {NodeListOf<HTMLLIElement>} */
        const listItems = this.querySelectorAll('#landing-header li');

        /** @type {HTMLDivElement} */
        const menuBackdrop = this.querySelector('#menu-backdrop'); 

        // colocamos un evento en cada li para obtener las medidas exactas para la sombra
        listItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const {left, top, width, height} = item.getBoundingClientRect();
                
                menuBackdrop.style.setProperty('--left', `${left}px`);
                menuBackdrop.style.setProperty('--top', `${top}px`);
                menuBackdrop.style.setProperty('--width', `${width}px`);
                menuBackdrop.style.setProperty('--height', `${height}px`);

                menuBackdrop.style.opacity = '1';
                menuBackdrop.style.visibility = 'visible';
            });

            item.addEventListener('mouseleave', () => {
                menuBackdrop.style.opacity = '0';
                menuBackdrop.style.visibility = 'hidden';
            });
        });
    }
}

window.customElements.define('tesla-landing-header', LandingHeader);