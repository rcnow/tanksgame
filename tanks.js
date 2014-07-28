window.onload = function () {
    var canvas = document.getElementById("tanks");
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.border = "1px solid black";
    //canvas.style.backgroundColor = 'black';
    var debug = document.getElementById("debug");
    var ctx = canvas.getContext('2d');

    var keysDown = {};
    addEventListener('keydown', function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener('keyup', function (e) {
        delete keysDown[e.keyCode];
    }, false);

//PLAYER
    var PlayerSprite = new Image();
    PlayerSprite.src = "sprite/player1.png";
    var player1 = new Player();

    function Player () {
        this.x = 64;
        this.y = canvas.height / 2;
        this.width = 64;
        this.height = 60;
        this.speed = 2.5;
        this.angle = 0;
        this.shot = false;
    }
    Player.prototype.draw = function () {
        debug.innerHTML = '<p>Tank  position' + ' X - ' + this.x + ' Y - ' + this.y+'</p> <br />';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(this.x+(this.width/2),this.y+(this.height/2));
        ctx.rotate(this.angle*Math.PI/180);
        ctx.drawImage(PlayerSprite, -this.width/2, -this.height/2);
        ctx.restore();
     };
    Player.prototype.move = function() {
        if (38 in keysDown) {
            if (player1.y > 0){
               this.y -= this.speed;
        }
            this.angle = 0;
            //console.log('up');
        }
        if (40 in keysDown) {
            if (player1.y < canvas.height-player1.width) {
                this.y += this.speed;
            }
            this.angle = 180;
           //console.log('down');
        }
        if (37 in keysDown) {
            if (player1.x > 0) {
                this.x -= this.speed;
            }
           this.angle = -90;
            //console.log('left');
        }
        if (39 in keysDown) {
            if (player1.x < canvas.width - player1.height) {
                this.x += this.speed;
            }
            this.angle = 90;
            //console.log('right');
        }
    };
//END PLAYER

//BULETS
    var BulletsSprite = new Image();
    BulletsSprite.src = "sprite/bullets.png";
    var bullet = new Bullets();
    function Bullets () {
        this.width = 10;
        this.height = 10;
        this.x = player1.x+player1.width/2-this.width/2;
        this.y = player1.y-this.height/2;
        this.speed = 10;
    }
    Bullets.prototype.draw = function () {
        if (player1.shot){
            ctx.drawImage(BulletsSprite, this.x, this.y);
        }

    };
    Bullets.prototype.move = function () {
        if (32 in keysDown) {
            if (player1.angle == 0){
                player1.shot = true;
                this.y -= this.speed;
            }
            else if (player1.angle == 180){
                player1.shot = true;
                this.y += this.speed;
            }
            else if (player1.angle == 90){
                player1.shot = true;
                this.x += this.speed;
            }
            else if (player1.angle == -90){
                player1.shot = true;
                this.x -= this.speed;
            }
        }
    };
//END BULETS

//Render
    function Render () {
        player1.move();
        player1.draw();
        bullet.move();
        bullet.draw();

    }
//Update
    function Update () {
        requestAnimFrame( Update );
        Render();
    }
//Main loop
    function StartGame () {
        Update();
        Render();
    }
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    StartGame();
};
