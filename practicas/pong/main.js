/*
    Gabriel Martínez

    Juego de Pong | JavaScript

    Practica n° 2: ralizar una animación 
    con JavaScript con el objeto canvas

    clases: Board
            BoardView
            Bar
            Ball

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
        this.playing = false;
    }

    /*
        Añade una funcion en una varible JSON para ser incluida 
        dentro de la clase
    */
    
    self.Board.prototype = 
    {
       get elements()
       {
           var elements = this.bars.map(function(bar) 
           {
                //crea un nuevo arreglo con los elementos del arreglo
                return bar;
           });

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
        },

        clean: function()
        {
            //limpia la forma del rectangulo
            this.ctx.clearRect(0, 0, this.board.width, this.board.height); 
        },

        play: function()
        {
            if (this.board.playing)
            {
                 //limpia la pantalla, luego dibuja las barras
                this.clean();
                this.draw();
                this.checkCollisions();

                //mueve la pelota
                this.board.ball.move();
            }
        },

        checkCollisions: function()
        {
            for (var i = this.board.bars.length -1; i >= 0; i--)
            {
                var bar = this.board.bars[i];

                if (hit(bar, this.board.ball))
                {
                    //ejecuta este metodo
                    this.board.ball.collision(bar);
                }
            }
        }
    }

    function hit(a, b)
    {
        //revisa si a colisiona con b
        var hit = false;

        //colisiones horinzontales
        if (((b.x + b.width) >= a.x) && (b.x < (a.x + a.width)))
        {
            //colisiones verticales
            if (((b.y + b.height) >= a.y) && (b.y < (a.y + a.height)))
            {
                hit = true;
            }
        }

        //collision de a con b
        if ((b.x <= a.x) && ((b.x + b.width) >= (a.x + a.width)))
        {
            if ((b.y <= a.y) && ((b.y + b.height) >= (a.y + a.height)))
            {
                hit = true;
            }
        }

        //colision de b con a
        if ((a.x <= b.x) && ((a.x + a.width) >= (b.x + b.width)))
        {
            if ((a.y <= b.y) && ((a.y + a.height) >= (b.y + b.height)))
            {
                hit = true;
            }
        }

        return hit;
    }

    //funcion que permite dibujar los elmentos
    function draw(ctx, element)
    {
        switch (element.kind)
        {
            case "rectangle":
                //dibuja el rectangulo
                ctx.fillRect(
                    element.x, 
                    element.y, 
                    element.width, 
                    element.height);
            break;

            case "circle":
                //dibuja el circulo
                ctx.beginPath();
                ctx.arc(
                    element.x,
                    element.y,
                    element.radius,
                    0,
                    7
                );
                ctx.fill();
                ctx.closePath();
            break;
        } 
    }
})();

(function()
{
    //Clase que construye las barras de juego
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

        toString: function()
        {
            return "x: " + this.x + " y: " + this.y;
        }

        /*
            La funcion toString anterior permite retornar en que coordenadas estan x & y.
            
            Si intentamos acceder a la clase desde un string se ejecutara
            la funcion toString de forma automatica.
        */
    }
})();

//Clase Ball
(function()
{
    self.Ball = function(x, y, radius, board)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.kind = "circle";
        this.direction = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI / 12;
        this.speed = 3;

        //añade los atributos a la pelota
        board.ball = this; 
    }

    self.Ball.prototype = 
    {
        move: function()
        {
            //mueve la pelota hacia la derecha
            this.x += (this.speed_x * this.direction);

            //mueve hacia
            this.y += this.speed_y;
        },

        collision: function(bar)
        {
            /*
                Reacciona a la colision con una barra que recibe como 
                parámetro 
            */

            var relative_intersect_y = (bar.y + (bar.height / 2)) - this.y;
            var normalized_intersect_y = relative_intersect_y / (bar.height / 2);
            
            //Calcula el angulo de rebote
            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;
            this.speed_y = this.speed * Math.sin(this.bounce_angle);
            this.speed_x = this.speed * Math.cos(this.bounce_angle);

            if (this.x > (this.board.width / 2))
            {
                this.direction = -1;
            }

            else
            {   
                this.direction = 1;
            }   
        },

        get width()
        {
            return this.radius * 2;
        },

        get height()
        {
            return this.radius * 2;
        }
    }
})();

//variables de clase
var canvas = document.getElementById("canvas");
var board = new Board(800, 400);
var board_view = new BoardView(canvas, board);
var bar = new Bar(20, 100, 40, 100, board);
var bar_2 = new Bar(735, 100, 40, 100, board);
var ball = new Ball(350, 100, 10, board);

/*
    El atributo "keydown" permite obtener el número del caracter ASCII que se 
    presiona en el teclado. En este caso es la tecla up and down, la tecla 
    w y s
*/

document.addEventListener("keydown", function(event)
{
    //UP
    if (event.keyCode === 38)
    {
        bar.up();
    }

    //DOWN
    else if (event.keyCode === 40)
    {
        bar.down();
    }

    //W
    else if (event.keyCode === 87)
    {
        bar_2.up();
    }

    //S
    else if (event.keyCode === 83)
    {
        bar_2.down();
    }

    //barra espaciadora: pausa el juego
    else if (event.keyCode === 32)
    {
        event.preventDefault();

        //invierte la variable
        board.playing = !board.playing;
    }
});

/*
    requestAnimateFrame() informa al navegador que vas a realizar una animacion. 
    El metodo acepta como como argumento la función que se va ejecutar. 
    Se ejecuta en cada una de los frames dentro de la página
*/

//dibuja primera vez los componentes
board_view.draw();
window.requestAnimationFrame(controller);

//controlador principal
function controller()
{
    //inicia el juego
    board_view.play();
    window.requestAnimationFrame(controller);
}