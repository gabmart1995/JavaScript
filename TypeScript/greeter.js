/*
    Tutorial de 5 minutos de typescript

    Este es el tutorial introductorio de TypeScript que incluye el tipado de
    variables hasta la manipulación de clases e interfaces de una forma más
    estricta.

    En typescript puedes utilizar interfaces y clases para el control de implementacion
    de variables y funciones.
*/
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello " + person.firstName + " " + person.lastName;
}
//instancia la clase e imprime las propiedades
var user = new Student("Gabriel", "U", "Martínez");
document.body.innerHTML = greeter(user);
