/*
    Primeros pasos con el transpilador de TypeScript 

    comandos basicos del transpilador

    tsc nombre.ts (compila el archivo typescript)
    tsc -w *.ts  (vigila los cambios modificados en los archivos TypeScript para 
        luego compilarlos)
    tsc --init (crea el archivo de configuracion del transpiladorpermite configurar 
        los parametros de compilacion de typescript)

    El tipado es mucho más fuerte que JavaScript ya que hay que indicar que tipo
    de datos se va a almacenar. string, number, boolean, array o any.
    
    Se declaran las variables usando var o let y sabemos que let
    es más limtada que la otra
    var = variable global
    let = variable local
*/

//Variables y sus tipos
var nombre : string = "Gabriel Martínez";
var edad : number = 24;
var programador : boolean = true;
var langs : Array<string> = ["C++", "PHP", "JavaScript", "CSS"];
var a : number = 7;
var b : number = 12;

function holaMundo(message : string)
{
    return "Hola mundo!! soy " + message;
}

function $(selector : any) 
{
    return document.querySelector(selector);
}

//contenido
$("#container").innerHTML = holaMundo(nombre);
$("#saludo").innerHTML = "  y tengo " + edad
+ " años";

//var y let
if (a === 7)
{
    let a = 4;
    var b = 1;

    //imprime en consola
    console.log("Dentro del if " + a + " - " + b);
}

console.log("Fuera del if " + a + " - " + b);

/*  Funciones y tipado

    En TypeScript se pueden retornar otro tipo de datos dentro de la
    funcion solo asegurate que se devuelva los valores correctos
*/

function obtenerNumero(num : number) : string
{
    return "Numero devuelto: " + num;
}

function obtenerString(text : string) : number
{
    var num;

    if (text == "hola")
    {
        num = 66;
    }

    else 
    {
        num = 90;
    }

    return num;
}

function obtenerBooleano(text : string) : boolean
{
    var bool;

    if (text == "hola")
    {
        bool = true;
    }

    else 
    {
        bool = false;
    }

    return bool;
}

//llama a las funciones
alert(obtenerNumero(34));
alert(obtenerString("hola"));
alert(obtenerBooleano("hola"));