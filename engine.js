const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const frameRate = 1000 / 60;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const controller = new Controller("KeyW", "KeyD", "KeyS", "KeyA", "Space");

ctx.fillStyle = "black";


entities = [];


player1 = new Player(new vector2(), 30, 30, "black", controller);
player1.setCollider();
entities.push(player1);

apple = new Apple(new vector2(150, 150), 30, 0, "red");
apple.setCollider();
entities.push(apple);

positions = [];


function renderLoop()
{
    let length = entities.length; 

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.font = "75px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(entities.length - 2, 185, 80); 

    for (let i = 0; i < length; i++) {
        entities[i].render();      
    }
}


function tickLoop()
{
    let length = entities.length; 

    for (let i = 0; i < length; i++) {
        entities[i].tick();   
    }
}




setInterval(renderLoop, frameRate);
setInterval(tickLoop, frameRate * 6);


  