/*
    Gabriel Martínez

    Juego de Pong | JavaScript

    Practica n° 2: ralizar una animación 
    con JavaScript con el objeto canvas

    clases: Board
            BoardView
            Bar

    La propiedad self permite crear atributos y metodos al objeto 
    window de JavaScript para ser utilizadas en cualquier
    momento. Que corresponde a una variable global
*/

(function()
{
    //objeto pizarron
    self.Board = function(width, height)
    {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    /*
        Añade una funcion en una varible JSON para ser incluida 
        dentro de la clase
    */
    
    self.Board.prototype = 
    {
       get elements()
       {
           var elements = this.bars;
           elements.push(this.ball);

           //retorna los componentes
           return  elements;
       }
    }
})();

(function()
{
    //clase que construye la vista
    self.BoardView = function(canvas, board)
    {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");

         // ctx: nos permite dibujar en JavaScript
    }

    self.BoardView.prototype =
    {
        draw: function()
        {
            for (var i = this.board.elements.length - 1; i >= 0; i--)
            {
                var el = this.board.elements[i];
                draw(this.ctx, el);
            }
        }
    }

    //funcion que permite dibujar los elmentos
    function draw(ctx, element)
    {
        /*
            hasOwnProperty: permite identificar si el elemento posee 
            un atributo llamado kind
        */

        if ((element !== null) && (element.hasOwnProperty("kind")))
        {
            switch (element.kind)
            {
                case "rectangle":
                    //dibuja el elemento rectangulo
                    ctx.fillRect(
                        element.x, 
                        element.y, 
                        element.width, 
                        element.height);
                break;
            }
        }
    }
})();

(function()
{
    //clase que construye las barras de juego
    self.Bar = function(x, y, width, height, board)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.kind = "rectangle";
        this.board.bars.push(this);
        this.speed = 10;
        
        // x, y corresponden las cordenadas de la pantalla
        // kind: añade la propiedad dentro de una variable
        // push: ingresa todos los elementos anteriores dentro del arreglo 
    }

    self.Bar.prototype = 
    {
        down: function()
        {
            this.y += this.speed;
        },
 
        up: function()
        {
            this.y -= this.speed;
        },

        /*
            Esta funcion permite retornar en que coordenadas estan x & y.
            
            Si intentamos acceder a la clase desde un string se ejecutara
            la funcion toString de forma automatica.
        
        */
        toString: function()
        {
            return "x: " + this.x + " y: " + this.y;
        }
    }
})();

var canvas = document.getElementById("canvas");
var board = new Board(800, 400);
var board_view = new BoardView(canvas, board);
var bar = new Bar(20, 100, 40, 100, board);
var bar = new Bar(735, 100, 40, 100, board);

/*
    El atributo "keydown" permite obtener el numero del caracter ASCII que se 
    presiona en el teclado. En este caso es la tecla up and down
*/

document.addEventListener("keydown", function(event)
{
    if (event.keyCode == 38)
    {
        bar.up();
    }

    else if (event.keyCode == 40)
    {
        bar.down();
    }

    //imprime las nuevas coordenadas por la consola
    console.log(bar.toString());
});

//ejecuta la funcion cuando se ejecuta la ventana
window.addEventListener("load", main);

function main()
{
    //dibuja las barras
    board_view.draw();
}