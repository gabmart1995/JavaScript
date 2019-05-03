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
       },

       down: function()
       {

       },

       up: function()
       {

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

        //esta propiedad nos permite dibujar en JavaScript
        this.ctx = canvas.getContext("2d");
    }

    //funcion que permite dibujar los elmentos
    function draw(ctx, element)
    {
        if ((element !== null) && (element.hasOwnProperty("kind")))
        {
            switch (element.kind)
            {
                case "rectangle":
                    //dibuja el elemento
                    ctx.fillRect(
                        element.x, 
                        element.y, 
                        element.width, 
                        element.height);
                break;
    
                case "square":
                    //dibuja el elemento
                    ctx.fillRect(
                        element.x, 
                        element.y, 
                        element.width, 
                        element.height);
                break;
            }
        }

        /*
            hasOwnProperty: permite identificar si el elemento posee 
            un atributo llamado kind
        */
    }
})();

(function()
{
    //clase que construye las barras de juego
    self.Bar = function(x, y, width, height, board)
    {
        //x, y corresponden las cordenadas de la pantalla
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;

        //ingresa los elementos dentro del arreglo 
        this.board.bars.push(this);

        //añade la propiedad dentro de la varible
        this.kind = "rectangle";
    }

    self.Bar.prototype =
    {
        draw: function()
        {
            for (var i = this.board.elements.length - 1; i >= 0; i--)
            {
                var el = this.board.elements[i];
                draw(ctx, el);
            }
        }
    }
})();

//ejecuta la funcion cuando se ejecuta la ventana
window.addEventListener("load", main);

//controlador
function main()
{
    var canvas = document.getElementById("canvas");
    var board = new Board(800, 400);
    var board_view = new BoardView(canvas, board);
    var bar = new Bar(20, 100, 40, 100, board);

    //dibuja las barras
    board_view.draw();
}