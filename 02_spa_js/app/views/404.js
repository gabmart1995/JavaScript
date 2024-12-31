const NotFound = () => {
    const view = (`
        <h2>Content not found</h2>
    `);

    const divElement = document.createElement('div');
    divElement.classList.add(...['text-white']);
    divElement.innerHTML = view;

    return divElement;
};

export default NotFound;

