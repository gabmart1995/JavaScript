class ChargeSection extends HTMLElement {
    constructor() {
        super();

        const color = this.getAttribute('color') || 'white';
        const title = this.getAttribute('title') || '';
        const subtitle = this.getAttribute('subtitle') || '';
        const src = this.getAttribute('image-src') || ''; 

        const textColor = `text-${color}`;

        this.innerHTML = (`
            <section data-header-color="${color}" class="landing-sections bg-black h-screen w-screen text-center relative overflow-hidden">
                <div class="z-30 relative h-full flex flex-col">
                    <header>
                        <h2 class="${textColor} pt-40 text-[40px] font-medium">${title}</h2>
                        <p class="${textColor} text-base text-sm underline">${subtitle}</p>
                    </header>
                    <footer class="flex flex-grow flex-nowrap justify-center items-end pb-20">
                        <div class="flex gap-x-4">
                            <a href="#" class="bg-gray-600 text-white border-[3px] rounded font-medium px-12 py-2 inline-block">
                                Explorar inventario
                            </a>
                            <a href="#" class="bg-white text-black border-[3px] rounded font-medium px-12 py-2 inline-block">
                                Pedido Personalizado
                            </a>
                        </div>
                    </footer>
                </div>
                <div class="absolute top-0 bottom-0 z-10 h-full w-full">
                    <img 
                        src="${src}" 
                        alt="model-y" 
                        class="h-full w-full object-cover object-center" 
                    />  
                </div>
            </section> 
        `);


        const template = this.querySelector('template').content;
        console.log(template);

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.appendChild(template.cloneNode(true));
    }
}

window.customElements.define('tesla-charge-section', ChargeSection)