class Hero extends HTMLElement {
    constructor() {
        super();

        const color = this.getAttribute('color') || 'white';
        const title = this.getAttribute('title') || '';
        const subtitle = this.getAttribute('subtitle') || '';

        const textColor = `text-${color}`;

        this.innerHTML = (`
            <section 
                data-header-color="${color}" 
                class="landing-sections bg-black h-screen w-screen text-center relative overflow-hidden"
            >
                <div class="z-30 relative h-full flex flex-col">
                    <header>
                        <h2 class="${textColor} pt-40 text-[40px] font-medium">${title}</h2>
                        <p class="${textColor} text-base text-sm">${subtitle}</p>
                    </header>
                    <footer class="flex flex-grow flex-nowrap justify-center items-end pb-20">
                        <a href="#" class="hover:bg-white hover:text-black transition-colors backdrop-blur-sm text-white border-[3px] rounded font-medium px-12 py-2 inline-block">
                            Prueba de conducción
                        </a>
                    </footer>
                </div>
                <div class="absolute top-0 bottom-0 z-10 h-full w-full">
                    <video class="object-center object-cover w-full h-full" src="assets/video/video.webm" loop autoplay muted />
                </div>
            </section>    
        `)
    }
}

window.customElements.define('tesla-hero', Hero);