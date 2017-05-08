function snakeAILoop(game){
    'use strict';
    //Your snake code goes here, you need to return the next snake direction in this function 
    //You can use {this.memory} to persist data regarding your snake and use it in the next iteration
    const head = this.getHead(); 
    let self = this;
    let directions = ['N', 'E', 'S', 'W'];
    
    if(!this.memory.counter){
        this.memory.counter = 0;
    }

    if (!this.memory.name) {
        this.name = 'EA';
        this.memory.name = 'EA';
    }

    if (!this.memory.color) {
        this.color = '#e2f442';
        this.memory.color = '#e2f442';
    }

    if(++this.memory.counter % 4 == 0){
        return self.getNewDirection();
    }

    this.getNewDirection = function() {
        console.log(game);
        var index = Math.floor(Math.random() * directions.length);
        var newDirection = directions[index];
        var isBackwards = false;

        switch(newDirection){
            case 'N':
                isBackwards = this.direction == 'S';
                break;

            case 'E':
                isBackwards = this.direction == 'W';
                break;

            case 'S':
                isBackwards = this.direction == 'N';
                break;

            case 'W':
                isBackwards = this.direction == 'E';
                break;
        }

        if (!isBackwards) {
            return newDirection;
        }
        return false;
    };

    this.getAllObstacles = function(){
        let obstacle = game.obstacle;
        let snakes = game.snake;
    }

    this.getNearliestFood = function() {

    }
};