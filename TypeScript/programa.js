var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Programa = /** @class */ (function () {
    function Programa() {
    }
    Programa.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Programa.prototype.setVersion = function (version) {
        this.version = version;
    };
    Programa.prototype.getNombre = function () {
        return this.nombre;
    };
    Programa.prototype.getVersion = function () {
        return this.version;
    };
    return Programa;
}());
var EditorVideo = /** @class */ (function (_super) {
    __extends(EditorVideo, _super);
    function EditorVideo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorVideo.prototype.setTimeLine = function (timeLine) {
        this.timeLine = timeLine;
    };
    EditorVideo.prototype.getTimeLine = function () {
        return this.timeLine;
    };
    EditorVideo.prototype.getAllData = function () {
        return this.getNombre() + " - " + this.getVersion()
            + " - " + this.getTimeLine();
    };
    return EditorVideo;
}(Programa));
//lógica del formario
var programas = [];
function guardar() {
    var nombre = document.getElementById("nombre").value.toString();
    var list = "";
    var programa = new Programa();
    programa.setNombre(nombre);
    programas.push(programa);
    for (var i = 0; i < programas.length; i++) {
        //suma la etiqueta
        list += "<li>" + programas[i].getNombre() + "</li>";
    }
    var listado = document.getElementById("listado");
    listado.innerHTML = list;
}
/*
    El compilador de TypeScript es más riguroso en la manipulacion
    de variables del DOM. Necesita que incluyas la interface especifica a traves
    del <HTML> para el control total de la variable.
    
    Finalizacion del curso de typescript de victor robles 19-05-18 recuerda estudiar
    la documentación.
*/ 
