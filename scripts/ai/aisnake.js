function snakeAILoop(game){
    'use strict';
    //Your snake code goes here, you need to return the next snake direction in this function 
    //You can use {this.memory} to persist data regarding your snake and use it in the next iteration
    const myHead = this.getHead(); 
    let self = this;
    let directions = ['N', 'E', 'S', 'W'];
    self.willHit = false;
    this.allObstacles = {};
    this.allFoods = {};


    function uniqueArray(value, index, obj) { 
        return obj.indexOf(value) === index;
    }

    this.getNewDirection = function() {
        console.log(game);
        console.log(myHead);
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
        let obstaclesX = game.obstacles.map(function(item){ return item.x; });
        let obstaclesY = game.obstacles.map(function(item){ return item.y; });

        obstaclesX.push(0);
        obstaclesX.push(game.width);

        obstaclesY.push(0);
        obstaclesY.push(game.height);

        let snakesEnemy = game.snakes.filter(function(snake){ return snake.name !== self.name; });

        if (snakesEnemy.length > 0) {
            obstaclesX.concat(snakesEnemy.map(function(snake){ return snake.body.map(function(body){ return body.x;}) }));
        }
        
        self.allObstacles.x = obstaclesX.filter(uniqueArray);
        self.allObstacles.y = obstaclesY.filter(uniqueArray);
        
    };

    this.getAllFoods = function () {
        let foodsX = game.food.map(function(food){ return food.x; });
        let foodsY = game.food.map(function(food){ return food.y; });

        self.allFoods.x = foodsX;
        self.allFoods.y = foodsY;
    };

    this.getNearliestFood = function() {

    };

    this.getRandomDirection = function() {
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

    this.getAllFoods();
    this.getAllObstacles();

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

    if (this.allFoods.x.indexOf(myHead.x) !== -1) {
        return this.getNewDirection();
    }

    if (this.allFoods.y.indexOf(myHead.y) !== -1) {
        return this.getNewDirection();
    }

    if (this.allObstacles.x.indexOf(myHead.x) !== -1) {
        return this.getNewDirection();
    }

    if (this.allObstacles.y.indexOf(myHead.y) !== -1) {
        return this.getNewDirection();
    }

    if(++this.memory.counter % 4 == 0){
        return this.getNewDirection();
    }
}