const usePhotos = () => {
    return {
        /**
         * obtiene el listado de fotos
         * @returns {Promise<Array<{ albumId: number, id: number, title: string, url: string, thumbnailUrl: string }>>}
         */
        getPhotos: async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/photos');
                const data = await response.json();

                return data.slice(0, 6);

            } catch (error) {
                console.log(error)

                return [];
            }
        }
    };
};

export { usePhotos };

