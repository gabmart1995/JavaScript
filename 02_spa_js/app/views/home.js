const Home = () => {
    const view = (`
        <h1 class="mb-3">Hello world</h1>
        <button id="btnClick" class="btn btn-primary">Click me</button>
    `);
    
    const divElement = document.createElement('div');
    divElement.classList.add(...['text-white']);
    divElement.innerHTML = view;

    /**@type {HTMLButtonElement} */
    const button = divElement.querySelector('#btnClick');
    if (button) {
        button.addEventListener('click', () => alert('my alert'));
    }

    return divElement;
}

export default Home;