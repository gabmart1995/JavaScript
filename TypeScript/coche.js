var Coche = /** @class */ (function () {
    //metodos    
    function Coche(modelo, color) {
        this.velocidad = 0;
        this.modelo = modelo;
        this.color = color;
    }
    Coche.prototype.accelerar = function () {
        this.velocidad++;
    };
    Coche.prototype.frenar = function () {
        this.velocidad--;
    };
    Coche.prototype.setColor = function (color) {
        this.color = color;
    };
    Coche.prototype.setModelo = function (modelo) {
        this.modelo = modelo;
    };
    Coche.prototype.setVelocidad = function (velocidad) {
        this.velocidad = velocidad;
    };
    Coche.prototype.getColor = function () {
        return this.color;
    };
    Coche.prototype.getModelo = function () {
        return this.modelo;
    };
    Coche.prototype.getVelocidad = function () {
        return this.velocidad;
    };
    return Coche;
}());
//se instancia el objeto
var coche = new Coche("ferrari", "rojo");
coche.accelerar();
coche.accelerar();
coche.accelerar();
var coche2 = new Coche("dodge", "verde");
var coche3 = new Coche("Azul", "maserati");
console.log("El color del coche es: " + coche.getColor());
console.log("La velocidad del coche es: " + coche.getVelocidad());
coche.frenar();
console.log("La velocidad del coche es: " + coche.getVelocidad());
console.log("El color del coche 2 es: " + coche2.getColor());
console.log("La marca del coche 3 es: " + coche3.getModelo());
console.log("El color del coche 3 es: " + coche3.getColor());
