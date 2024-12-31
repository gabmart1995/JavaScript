const usePosts = () => {
    return {
        /**
         * Obtiene los posts del sitio web
         * @returns {Promise<Array<{ userId: number, id: number, title: string, body: string }>>}
         */
        getPosts: async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
        
                return data;
        
            } catch (error) {
                console.error(error);        
                
                return [];
            }
        },
    }
};

export { usePosts }