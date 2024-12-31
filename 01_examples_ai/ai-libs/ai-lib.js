class Trainer {
    /**
     * @param {number[]} xArray coordenadas en X 
     * @param {number[]} yArray coordenadas en Y
     */
    constructor(xArray, yArray) {
        this.xArray = xArray;
        this.yArray = yArray;
        this.points = this.xArray.length;
        this.learnc = 0.00001;
        this.weight = 0;
        this.bias = 1;
        this.cost = 0;
    }

    /**
     * Calcula el costo del error
     */
    costError() {
        let total = 0;

        for (let i = 0; i < this.points; i++) {
            total += (this.yArray[i] - (this.weight * this.xArray[i] + this.bias)) ** 2;
        }

        return total / this.points;
    }

    /**
     * entrena el modelo
     * @param {number} iter numero de iteraciones
     */
    train(iter) {
        for (let i = 0; i < iter; i++) this.updateWeights();

        this.cost = this.costError();
    }

    /**
     * Ajusta el peso utilizando derivadas
     */
    updateWeights() {
        let wx = 0;
        let wDeriv = 0;
        let bDeriv = 0;

        for (let i = 0; i < this.points; i++) {
            wx = this.yArray[i] - (this.weight * this.xArray[i] + this.bias);
            wDeriv += -2 * wx * this.xArray[i];
            bDeriv += -2 * wx;
        }

        this.weight -= (wDeriv / this.points) * this.learnc;
        this.bias -= (bDeriv / this.points) * this.learnc;
    }
}