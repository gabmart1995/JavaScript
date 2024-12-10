class Perceptron {
    /**
     * 
     * @param {number} numberOutputs numero de salidas
     * @param {number} learningRate tasa de aprendizaje
     */
    constructor(numberOutputs, learningRate = 0.00001) {
        this.learnc = learningRate;
        this.bias = 1; // sesgo de aprendizaje
        this.weights = [];

        for (let i = 0; i <= numberOutputs; i++) this.weights[i] = Math.random() * 2 - 1
    }

    /**
     * activa el perceptron
     * @param {number[]} inputs entradas
     */
    activate(inputs) {
        let sum = 0;
        for (let i = 0; i < inputs.length; i++) sum += inputs[i] * this.weights[i];

        return ((sum > 0) ? 1 : 0); 
    }

    /**
     * entrena el perceptron con el modelo en modo de propagacion)
     * @param {number[]} inputs entradas del modelo
     * @param {1 | 0} desired valor deseado
     */
    train(inputs, desired) {
        inputs.push(this.bias);

        let guess = this.activate(inputs);
        let error = desired - guess;

        if (error !== 0) {
            for (let i = 0; i < inputs.length; i++) {
                this.weights[i] += this.learnc * error * inputs[i];
            }
        }
    }
}