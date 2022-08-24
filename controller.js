class Controller{
constructor(up, right, down, left, btn)
    {
        this.up = up;
        this.right = right;
        this.down = down;
        this.left = left;
        this.btn = btn;

        this.register();
    }

    state = {"Direction": new vector2()};


/**Registers the controller to the event queue */
    register()
    {
        document.addEventListener('keydown', (event) => {
            var code = event.code;
            
            if(event.repeat)
            {
                return;
            }
          
            let oldState = this.state.Direction.clone();

            if(code == this.up)
            {
                this.state.Direction = new vector2(0, -1);
            }
            if(code == this.down)
            {
                this.state.Direction = new vector2(0, 1);
            }
            if(code == this.right)
            {
                this.state.Direction = new vector2(1, 0);
            }
            if(code == this.left)
            {
                this.state.Direction = new vector2(-1, 0);
            }     

            if(this.state.Direction.x + oldState.x == 0 && this.state.Direction.y + oldState.y == 0)
            {
                this.state.Direction = oldState;
            }

          }, false);
    }
  }