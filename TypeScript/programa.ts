class Programa 
{
    public nombre : string;
    public version : number;

    public setNombre(nombre : string)
    {
       this.nombre = nombre;
    }

    public setVersion(version : number)
    {
        this.version = version;
    }

    public getNombre()
    {
        return this.nombre;
    }

    public getVersion()
    {
        return this.version;
    }
}

class EditorVideo extends Programa
{
    private timeLine : number;

    public setTimeLine(timeLine : number)
    {
        this.timeLine = timeLine;
    }

    public getTimeLine()
    {
        return this.timeLine;
    }

    public getAllData() : string
    {
        return this.getNombre() + " - " + this.getVersion()
        + " - " + this.getTimeLine(); 
    }
}

//lógica del formario
var programas : Array <any> = [];

function guardar()
{
    let nombre : any = (<HTMLInputElement> document.getElementById("nombre")).value.toString();
    let list : string = "";

    let programa = new Programa();
    programa.setNombre(nombre);

    programas.push(programa);

    for (let i = 0; i < programas.length; i++)
    {
        //suma la etiqueta
        list += "<li>" + programas[i].getNombre() + "</li>";
    }

    let listado : any = <HTMLElement> document.getElementById("listado");
    listado.innerHTML = list;
} 

/*
    El compilador de TypeScript es más riguroso en la manipulacion
    de variables del DOM. Necesita que incluyas la interface especifica a traves
    del <HTML> para el control total de la variable. 
    
    Finalizacion del curso de typescript de victor robles 19-05-18 recuerda estudiar
    la documentación.
*/