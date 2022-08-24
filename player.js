class Player {
    constructor(position = new vector2(0, 0), size = 10, speed = 1, color = "black", controller) {
        this.position = position;
        this.size = size;
        this.speed = speed;
        this.color = color;
        this.controller = controller;

        this.originalSize = size;
        this.originalSpeed = speed;
        this.col = new collider(new vector2(), 0);
        this.counter = 0;
        this.collided;
    }

    setCollider(col = new collider(new vector2(this.position.x, this.position.y), this.size)){
        this.col = col;
    }

    /**Runs rendering logic */
    render() {
        ctx.fillStyle = this.color;
        this.drawSquare(this.position, this.size);
    }

    /**Draws a square on the specified coordinates of the canvas */
    drawSquare(pos, size)
    {
        ctx.fillRect(pos.x, pos.y, size, size);
    }

    /**Runs game logic */
    tick() {
        var move = new vector2(this.controller.state.Direction.x * this.speed, this.controller.state.Direction.y * this.speed);
        this.position = this.position.add(move);
        this.col.position = this.position;

        positions.push(this.position);

        if(hitWall(this.position, this.size, WIDTH, HEIGHT))
        {
            window.location = 'index.html';
        }
        
        
        
        for (let i = 0; i < entities.length; i++) {
            if(entities[i] == this)
            {
                continue;
            }
            if(entities[i] == apple)
            {
                continue;
            }
            
            entities[i].position = positions[positions.length - (i + 1)];
        }


        for (let i = 0; i < entities.length; i++) {
            if(entities[i] == this)
            {
                continue;
            }
            else if(this.col.checkCollision(entities[i].col))
            {
                if(entities[i] == apple)
                {
                    let node = new Segment(positions[positions.length - 1], this.size, this.size, "black", controller, entities.length - 1);
                    entities.push(node);

                    apple.position = apple.getNewPosition();
                    apple.col.position = apple.position;
                }
                else
                {
                    window.location = 'index.html';
                }

            }
        }
    }
}

class collider
{
    constructor(position = new vector2(), size = new vector2())
    {
        this.position = position;

        if(typeof(size) == vector2)
        {
            this.size = size;
        }
        else
        {
            this.size = new vector2(size, size);
        }

        collider.prototype.toString = function() {
            return "(" + this.position.x + "," + this.position.y + ")";
        }
    }

    /**Returns wheter this object's shape overlaps with another shape */
    checkCollision(col)
    {
        return col.position.equals(this.position) && col.size.x > 0;
    }
}



class Segment {
    constructor(position = new vector2(0, 0), size = 10, speed = 1, color = "black", controller, id) {
        this.position = position;
        this.size = size;
        this.speed = speed;
        this.color = color;
        this.controller = controller;

        this.originalSize = size;
        this.originalSpeed = speed;
        this.col = new collider(new vector2(), 0);
        this.counter = id;
    }

    setCollider(col = new collider(new vector2(this.position.x, this.position.y), this.size)){
        this.col = col;
    }

    /**Runs rendering logic */
    render() {
        ctx.fillStyle = this.color;
        this.drawSquare(this.position, this.size);
    }

    /**Draws a square on the specified coordinates of the canvas */
    drawSquare(pos, size)
    {
        ctx.fillRect(pos.x, pos.y, size, size);
    }

    /**Runs game logic */
    tick() {
        this.col.position = this.position;
        if(this.counter > 0)
        {
            this.setCollider();
        }
        else
        {
            this.counter--;
        }
    }
}

class Apple {
    constructor(position = new vector2(0, 0), size = 10, speed = 1, color = "black") {
        this.position = position;
        this.size = size;
        this.color = color;
        this.col = new collider(new vector2(), 0);
    }

    setCollider(col = new collider(new vector2(this.position.x, this.position.y), this.size)){
        this.col = col;
    }

    /**Runs rendering logic */
    render() {
        ctx.fillStyle = this.color;
        this.drawSquare(this.position, this.size);
    }

    /**Draws a square on the specified coordinates of the canvas */
    drawSquare(pos, size)
    {
        ctx.fillRect(pos.x, pos.y, size, size);
    }

    /**Runs game logic */
    tick() {

    }

    getNewPosition()
    {
        let x = Math.random() * WIDTH - 1;
        let y = Math.random() * HEIGHT - 1;

        let pos = new vector2(x - (x % 30), y - (y % 30));

        for (let i = 0; i < entities.length; i++) {
            if(entities[i] == this)
            {
                continue;
            }
            if(pos.equals(entities[i].position))
            {
                return this.getNewPosition();
            }
        }

        return pos;
    }
}


