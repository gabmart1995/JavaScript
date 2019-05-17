//Implementacion de clases y encapsulación en TypeScript
interface CocheBase
{
    getModelo() : string;
    getVelocidad() : number;
    getColor() : string;
}

class Coche implements CocheBase 
{
    //atributos
    private color : string;
    private modelo : string; 
    private velocidad : number;

    //metodos    
   public constructor(modelo : string, color : string)
   {
        this.velocidad = 0;
        this.modelo = modelo;
        this.color = color;
   }

   public accelerar()
   {
       this.velocidad++;
   }

   public frenar()
   {
       this.velocidad--;
   }

   public setColor(color : string)
   {
       this.color = color;
   }

   public setModelo(modelo : string)
   {
       this.modelo = modelo;
   }

   public setVelocidad(velocidad : number)
   {
        this.velocidad = velocidad;
   }

    public getColor() : string
   {
       return this.color;
   }

   public getModelo() : string
   {
       return this.modelo;
   }

   public getVelocidad() : number
   {
       return this.velocidad;
   }
}

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