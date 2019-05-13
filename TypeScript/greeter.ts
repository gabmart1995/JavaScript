/*
    Tutorial de 5 minutos de typescript

    Este es el tutorial introductorio de TypeScript que incluye el tipado de 
    variables hasta la manipulación de clases e interfaces de una forma más
    estricta.

    En typescript puedes utilizar interfaces y clases para el control de implementacion 
    de variables y funciones.
*/

interface Person 
{
    firstName : string;
    lastName : string;
}

class Student 
{
    fullName : string;
    
    constructor(public firstName : string, public middleInitial : string, 
        public lastName : string)
    {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

function greeter(person : Person)
{
    return "Hello " + person.firstName + " " + person.lastName; 
}

//instancia la clase e imprime las propiedades
let user = new Student("Gabriel", "U", "Martínez");
document.body.innerHTML = greeter(user);
