class XYPlotter {
    constructor(id) {
        /** @type {HTMLCanvasElement} */
        this.canvas = document.querySelector(id);
        
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.xMin = 0;
            this.yMin = 0;
            this.xMax = this.canvas.width;
            this.yMax = this.canvas.height;
            this.xF = 1;
            this.yF = 1;
        
        } else {
            console.error('elemento canvas no hallado');
        }
    }
    
    /** invierte las coordenadas iniciales */
    transformXY() {
        this.ctx.transform(1, 0, 0, -1, 0, this.canvas.height);
    }

    /**
        crea los puntos aleatorios en el canvas
        @param {number} x0  coordenada inicial de x
        @param {number} y0  coordenada inicial de y
        @param {number} x  coordenada final de x
        @param {number} y coordenada final de y
        @param {string} [color] color de la linea
    */
    plotLine(x0, y0, x, y, color = 'red') {
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x, y); 
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    /**
     * dibuja puntos aleatorios en el mapa
     * @param {number} numberPoints 
     * @param {number[]} xArray 
     * @param {number[]} yArray 
     * @param {string} color 
     * @param {number} radius 
     */
    plotPoints(numberPoints, xArray, yArray, color = 'red', radius = 3) {
        for (let i = 0; i < numberPoints; i++) {
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.ellipse((xArray[i] * this.xF), (yArray[i] * this.yF), radius, radius, 0, 0, (Math.PI * 2));
            this.ctx.fill();
        }
    }

    /**
     * Dibuja un punto especifico en el mapa
     * @param {number} x 
     * @param {number} y 
     * @param {string} color 
     * @param {number} radius 
     */
    plotPoint(x, y, color = 'red', radius = 3) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.ellipse((x * this.xF), (y * this.yF), radius, radius, 0, 0, (Math.PI * 2));
        this.ctx.fill();
    }
}