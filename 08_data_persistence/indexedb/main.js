(function () {
    // cache UI
    const UI = {
        searchForm: document.querySelector('#search-form'),
        registerForm: document.querySelector('#register-form'),
        deleteForm: document.querySelector('#delete-form'),
        compatElement: document.querySelector('#compat'),
        msgElement: document.querySelector('#msg'),
        pubMsgElement: document.querySelector('#pub-msg'),
        pubViewerElement: document.querySelector('#pub-viewer'),
        pubListElement: document.querySelector('#pub-list'),
    };

    const COMPAT_ENVS = [
        ['Firefox', '>= 16.0'],
        ['Google Chrome', '>= 24.0 (you may need to get Google Chrome Canary), NO Blob storage support']
    ];
    
    // establece el listado de compac
    UI.compatElement.innerHTML = (`
        <ul id="compat-list">
            ${COMPAT_ENVS.map((value) => (`
                <li>${value[0]} : ${value[1]}</li>    
            `)).join('')}
        </ul>  
    `);
    
    // metadata DB
    const DB_INFO = Object.freeze({
        DB_NAME: 'mdn-demo-indexeddb-epublications',
        DB_VERSION: 1,
        DB_STORE_NAME: 'publications'
    });

    // punteros de control de indexedb
    /** @type {IDBDatabase} */
    let db; 

    let currentViewPubKey;

    function openDB() {
        console.log('LOG: oppening DB');

        const request = indexedDB.open(DB_INFO.DB_NAME, DB_INFO.DB_VERSION);

        // establecemos las funciones de los eventos
        request.onsuccess = function (_) {
            db = request.result;

            console.log('LOG: openDB Done');
        };

        request.onerror = function (event) {
            console.error('ERROR: openDB', event.target.errorCode);
        };

        request.onupgradeneeded = function (event) {
            console.log('LOG: openDB upgrade');

            const store = event.currentTarget.result.createObjectStore(
                DB_INFO.DB_STORE_NAME,
                {
                    keyPath: 'id',
                    autoIncrement: true, 
                }
            );

            store.createIndex('biblioid', 'biblioid', { unique: true });
            store.createIndex('title', 'title', { unique: false });
            store.createIndex('year', 'year', { unique: false });
        }
    };
    
    /**
     * permite obtener una copia del store
     * @param {string} storeName nombre del store
     * @param {'readonly' | 'readwrite'} mode modo de lectura o escritura
     */
    function getObjectStore(storeName, mode) {
        const tx = db.transaction(storeName, mode);
        return tx.objectStore(storeName);
    };

    function clearObjectStore() {
        const store = getObjectStore(DB_INFO.DB_STORE_NAME, 'readwrite');
        const request = store.clear();

        request.onsuccess = function (event) {
            displayActionSuccess('Store cleared');
            displayPubList(store);
        };

        // manejamos en caso de falla
        request.onerror = function (event) {
            console.error('ERROR: clearObjectStore', event.target.errorCode);
            displayActionFailure(request.error);
        };
    }

    function newViewerFrame() {
        UI.pubViewerElement.innerHTML = '';

        const iframe = document.createElement('iframe')

        UI.pubViewerElement.appendChild(iframe);

        return iframe;
    }

    /**
     * Muestra el listado en la interfaz
     * @param {IDBObjectStore} [store] 
     */
    function displayPubList(store) {
        // carga el store sino esta en memoria
        if (!store) store = getObjectStore(DB_INFO.DB_STORE_NAME, 'readonly');

        // limpia el contenido
        UI.pubMsgElement.innerHTML = '';
        UI.pubListElement.innerHTML = '';

        newViewerFrame();

        // puntero de la BD
        let request;

        request = store.count();

        request.onsuccess = function (event) {
            UI.pubMsgElement.innerHTML = (`
                <p>
                    There are <strong>${event.target.result}</strong>
                    record(s) in the object store.
                </p> 
            `);
        };

        request.onerror = function (event) {
            console.error('ERROR: add error', request.error);
            displayActionFailure(request.error);
        }

        // contador del cursor
        let i = 0;

        request = store.openCursor();

        request.onsuccess = function (event) {
            const cursor = event.target.result;

            // si existe un cursor existen registros
            if (cursor) {
                console.log('LOG: displayPublist cursor', cursor);

                request = store.get(cursor.key);

                // extraemos los datos
                request.onsuccess = function (event) {
                    const value = event.target.result;

                    // construimos la interfaz manualmente ya que se
                    // controlan event listeners dentro de cada elemento
                    // de la lista
                    const listItem = document.createElement('li');
                    listItem.innerText = (`[${cursor.key}] (biblioid: ${value.biblioid}) ${value.title} ${value.year !== null ? (`- ${value.year}`) : ''} `);

                    if (Object.hasOwn(value, 'blob')) {
                        listItem.innerText += ' / ';

                        const link = document.createElement('a');
                        link.href = cursor.key;
                        link.innerText = 'File';
    
                        // desactivamos la opcion click
                        link.addEventListener('click', function (event) {
                            event.preventDefault();
                            event.stopPropagation();
                        });
    
                        link.addEventListener('mouseenter', function (event) {
                             setInViewer(event.target.getAttribute('href'));
                        });
                        
                        listItem.appendChild(link);
                    
                    } else {
                        listItem.innerText += ' / No attached file';
                    
                    }

                    // cargamos la data
                    UI.pubListElement.appendChild(listItem); 

                    // mueve al siguiente elemento del cursor
                    cursor.continue();

                    i++;
                };

            } else {
                console.log('LOG: no more entries');
            
            }
        };
    };

    function setInViewer(key) {
        console.log('LOG: setInViewer', key);

        key = Number(key);

        // evitamos volver a cargar la imagen
        if (key === currentViewPubKey) return;

        currentViewPubKey = key;

        const store = getObjectStore(DB_INFO.DB_STORE_NAME, 'readonly');

        getBlob(key, store, function (blob) {
            console.log('LOG: setInViewer blob', blob);

            // creamos un nuevo iframe
            const iframe = newViewerFrame();

            if (blob.type === 'text/html') {
                // si el contenido es un texto html
                const reader = new FileReader();

                reader.onload = function (e) {
                    let html = e.target.result;

                    // escribe directamente sobre el iframe
                    iframe.srcdoc = html;
                }

                reader.readAsText(blob);
            
            } else if (blob.type.indexOf('image/') === 0) {
                let link = URL.createObjectURL(blob);
                
                let html = (`<img id="$image-${key}" src="${link}" />`);

                iframe.srcdoc = html;
                
                // cuando se cargue el iframe 
                iframe.onload = function () {
                    URL.revokeObjectURL(link);
                }

                iframe.setAttribute('src', 'about:blank')


            } else if (blob.type === 'application/pdf')  {
                let link = URL.createObjectURL(blob);

                iframe.setAttribute('src', link);

                URL.revokeObjectURL(link);

            } else {
                iframe.srcdoc = 'No view avalaible';
            }
        });
    }

    /**
     * 
     * @param {number | string} key 
     * @param {IDBObjectStore} store 
     * @param {() => void} successCallback 
     */
    function getBlob(key, store, successCallback) {
        let request = store.get(key);

        request.onsuccess = function (event) {
            const value = event.target.result;

            if (value) successCallback(value.blob);
        }
    }

    /**
     * 
     * @param {string} biblioid 
     * @param {string} title 
     * @param {number} year 
     * @param {Blob} blob 
     */
    function addPublication(biblioid, title, year, blob) {
        console.log('LOG: add publication');

        const data = {biblioid, title, year};

        if (typeof blob !== 'undefined') data.blob = blob;

        const store = getObjectStore(DB_INFO.DB_STORE_NAME, 'readwrite');

        let request;

        try {
            request = store.add(data)

        } catch (error) {
            console.error(error);
        
        }
        
        request.onsuccess = function (event) {
            console.log('LOG: Insertion in DB succesful');
            displayActionSuccess();
            displayPubList(store);
        };


        request.onerror = function (event) {
            console.error('ERROR: add publication', request.error);
            displayActionFailure(request.error);
        };
    }

    /**
     * anade un url a la publicacion
     * @param {string} biblioid 
     * @param {string} title 
     * @param {number} year 
     * @param {string} url 
     */
    async function addPublicationFromURL(biblioid, title, year, url) {
        console.log('LOG: add link publication', url);

        // usamos fetch una alternativa mas moderna que XHR blob
        try {
            const response = await fetch(url);

            if (!response.ok) throw new Error('ERROR: al cargar la URL del recurso');

            const blob = await response.blob();
            
            addPublication(biblioid, title, year, blob);

        } catch (error) {
            console.error('ERROR: add publication from url', error);

        }
    }

    /**
     * borra una publicacion usando el biblioid
     * @param {string} biblioid 
     */
    function deletePublicationFromBib(biblioid) {
        console.log('LOG: delete biblio');

        // consultamos el store para buscar el id
        const store = getObjectStore(DB_INFO.DB_STORE_NAME, 'readwrite');
        const pointer = store.index('biblioid'); // creamos un puntero hacia biblioid
        const request = pointer.get(biblioid);

        request.onsuccess = function (event) {
            // en caso de no tener resultados
            if (!event.target.result) {
                displayActionFailure('No matching record found');
                return
            }

            deletePublication(event.target.result.id, store);
        }

        request.onerror = function (event) {
            console.error("deletePublicationFromBib:", event.target.errorCode);
        } 
    };

    /**
     * borra la publicacion de la base de datos
     * @param {number} key 
     * @param {IDBObjectStore} store 
     */
    function deletePublication(key, store) {
        console.log('LOG: delete');

        if (!store) store = getObjectStore(DB_INFO.DB_STORE_NAME, 'readwrite');

        // buscamos primero si elemento existe
        let request = store.get(key);

        request.onsuccess = function (event) {
            const record = event.target.result;

            console.log('LOG: RECORD', record);

            if (!record) {
                displayActionFailure('No matching record found');
                return;
            }

            request = store.delete(key);

            request.onsuccess = function (e) {
                displayActionSuccess('Deletion successful');
                displayPubList();
            };

            request.onerror = function (e) {
                console.error('ERROR: delete publication', e.target.errorCode);      
            };
        };

        request.onerror = function (event) {
            console.error('ERROR: delete publication', event.target.errorCode);
        };
    }

    /**
     * muestra el mensaje de error al UI
     * @param {string} [msg] 
     */
    function displayActionFailure(msg) {
        msg = typeof msg !== 'undefined' ? 'Failure: ' + msg : 'Failure';
        UI.msgElement.innerHTML = (`<span class="action-failure">${msg}</span>`);
    }

    /**
     * muestra el mensaje de error al UI
     * @param {string} [msg] 
     */
    function displayActionSuccess(msg) {
        msg = typeof msg !== 'undefined' ? 'Success: ' + msg : 'Success';
        UI.msgElement.innerHTML = (`<span class="action-success">${msg}</span>`);
    }

    function resetActionStatus() {
        console.log('LOG: reset action status');
        
        UI.msgElement.innerHTML = '';

        console.log('LOG: reset action status DONE');
    }

    /** inicia los eventos de la aplicacion  */
    function addEventListeners() {
        console.log('LOG: add event listeners');

        // reset form register
        UI.registerForm.querySelector('#register-form-reset').addEventListener('click', resetActionStatus);
        
        // add button
        UI.registerForm.querySelector('#add-button').addEventListener('click', function () {
            console.log('LOG: add');

            const data = {
                title: UI.registerForm.querySelector('#pub-title').value.trim(),
                biblioid: UI.registerForm.querySelector('#pub-biblioid').value.trim(),
                year: UI.registerForm.querySelector('#pub-year').value.trim(),
                file: UI.registerForm.querySelector('#pub-file').files[0],
                fileUrl: UI.registerForm.querySelector('#pub-file-url').value.trim()
            };

            if (!data.title || !data.biblioid) {
                displayActionFailure("Required field(s) missing");
                return;
            }

            if (data.year.length > 0) {
                if (Number.isNaN(data.year)) {
                    displayActionFailure('Invalid year');
                    return
                }

                data.year = Number(data.year);

            } else {
                data.year = null;
            
            }

            // cargamos la publicacion a la base de datos
            if (data.file) {
                addPublication(data.biblioid, data.title, data.year, data.file);

            } else if (data.fileUrl) {
                addPublicationFromURL(data.biblioid, data.title, data.year, data.fileUrl);
            
            } else {
                addPublication(data.biblioid, data.title, data.year);
            
            }
        });

        // clear store button
        UI.deleteForm.querySelector('#clear-store-button').addEventListener('click', function () {
            clearObjectStore();
        });

        // delete button
        UI.deleteForm.querySelector('#delete-button').addEventListener('click', function() {
            console.log('LOG: delete');

            const data = {
                biblioid: UI.deleteForm.querySelector('#pub-biblioid-to-delete').value.trim(),
                key: UI.deleteForm.querySelector('#key-to-delete').value.trim(),
            };

            // dependiendo de la entrada retiramos la data
            if (data.biblioid.length > 0) {
                deletePublicationFromBib(data.biblioid);

            } else if (data.key.length > 0) {
                if (Number.isNaN(data.key)) {
                    displayActionFailure('Invalid Key');
                    return;
                }

                data.key = Number(data.key);

                // borramos la publicacion
                deletePublication(data.key);
            }
        });

        // list button
        UI.searchForm.querySelector('#search-list-button').addEventListener('click', function () {
            displayPubList();
        });
    }

    // ejecutamos la base de datos
    openDB();
    addEventListeners();
})();