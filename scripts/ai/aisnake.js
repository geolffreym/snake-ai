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

    if (!this.memory.middleScreen) {
        this.memory.middleScreen = {
            x: Math.floor(game.width / 2),
            y: Math.floor(game.height / 2)
        }
    }


    function uniqueArray(value, index, obj) { 
        return obj.indexOf(value) === index;
    }

    function sortByX(a, b) {
        return a.x - b.x;
    }

    function sortByY(a, b) {
        return a.y - b.y;
    }

    function getDistanceOf2Points (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    this.getAllFoods = function () {
        let foodsX = game.food.map(function(food){ return food.x; });
        let foodsY = game.food.map(function(food){ return food.y; });

        self.allFoods.x = foodsX;
        self.allFoods.y = foodsY;
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

    this.getFoodsInTheWay = function (x, y) {
        let foods = {
            axiX: game.food.filter(function(food){ return food.y == y; }),
            axiY: game.food.filter(function(food){ return food.x == x; })
        };

        return foods;
    };

    this.getObstaclesInTheWay = function (x, y) {
        //TODO: improve to get others snakes positions
        let obstacles = {
            axiX: game.obstacles.filter(function(obstacle){ return obstacle.y == y; }).sort(sortByY),
            axiY: game.obstacles.filter(function(obstacle){ return obstacle.x == x; }).sort(sortByX)
            
        };

        if (x == 0)  {
            obstacles.axiX.push({x: -1, y: y});
        }
            
        if (x == game.width - 1)  {
            obstacles.axiX.push({x: game.width, y: y});
        }

        if (y == 0) {
            //debugger;
            obstacles.axiY.push({x: x, y: -1});
        }

        if (y == game.height - 1)  {
            obstacles.axiY.push({x: x, y: game.height});
        }

        return obstacles;
    };

    this.getNextObstaclePositionByDir = function (direction, myX, objects) {
        let nextObstacle;
        switch (direction) {
            case 'N':
                
                break;

            case 'E':
                nextOb
                break;

            case 'S':
        
                break;

            case 'W':
                break;
        }

        return nextObject;
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

    this.getNewDirection = function() {
        
        var foods = self.getFoodsInTheWay(myHead.x, myHead.y);
        var obstacles = self.getObstaclesInTheWay(myHead.x, myHead.y);

        var foodFlag = foods.axiX.length > 0  ||  foods.axiY.length > 0;
        var obstacleFlag = obstacles.axiX.length > 0  ||  obstacles.axiY.length > 0;

        var nextObstacle , nextFood, nextFoodX , nextFoodY;

        /*let foodX = this.allFoods.x.indexOf(myHead.x);
        let foodY = this.allFoods.y.indexOf(myHead.y);

        let obstacleX = this.allObstacles.x.indexOf(myHead.x);
        let obstacleY = this.allObstacles.y.indexOf(myHead.y);*/

        switch(self.direction){
            case 'N':
                
                // Have I obstacles front of me?
                if (obstacleFlag) {
                    if(obstacles.axiY.length > 0) {
                        nextObstacle = obstacles.axiY.find(function (obstacle) { return obstacle.y <= myHead.y; });
                        // I will hint
                        if (nextObstacle && nextObstacle.y == myHead.y - 1) {
                            if (myHead.x >= self.memory.middleScreen.x ) {
                                this.direction = "W";
                            } else {
                                this.direction = "E";
                            }
                        }
                    }
                }

                // I have foods in my way
                if ( foodFlag ) {
                    //debugger;
                    if (foods.axiX.length > 0) {
                        nextFoodX = foods.axiX.find(function (food) { return food.y == myHead.y; });
                    }

                    if (foods.axiY.length > 0) {
                        nextFoodY = foods.axiY.find(function (food) { return food.x == myHead.x; });
                    }

                    if (nextFoodX && nextFoodY) {
                        var d1 = getDistanceOf2Points(myHead.x, myHead.y, nextFoodX.x, nextFoodX.y);
                        var d2 = getDistanceOf2Points(myHead.x, myHead.y, nextFoodY.x, nextFoodY.y);

                        if (d1 < d2) {
                            nextFood = nextFoodX;
                        } else {
                            nextFood = nextFoodY;
                        }
                    } else if (nextFoodY) {
                        nextFood = nextFoodY;

                    } else if(nextFoodX) {
                        nextFood = nextFoodX;
                    }

                    if (nextFood) {
                        if (nextFood.x > myHead.x) {
                            this.direction = "E";
                        } else if (nextFood.x < myHead.x) {
                            this.direction = "W";
                        }

                        if (nextObstacle) {
                            var d1 = getDistanceOf2Points(myHead.x, myHead.y, nextFood.x, nextFood.y);
                            var d2 = getDistanceOf2Points(myHead.x, myHead.y, nextObstacle.x, nextObstacle.y);

                            if (d2 < d1) {
                                if (myHead.x >= self.memory.middleScreen.x ) {
                                    this.direction = "W";
                                } else {
                                    this.direction = "E";
                                }
                            }
                        }
                    }
                }

                break;

            case 'E':
                
                // Have I obstacles front of me?
                if (obstacleFlag) {
                    //debugger;
                    if(obstacles.axiX.length > 0) {
                        nextObstacle = obstacles.axiX.find(function (obstacle) { return obstacle.x >= myHead.x ;});
                        // I will hint
                        if (nextObstacle && nextObstacle.x == myHead.x + 1) {
                            if (myHead.y >= self.memory.middleScreen.y ) {
                                this.direction = "S";
                            } else {
                                this.direction = "N";
                            }
                        }
                    }
                    
                }

                // I have foods in my way
                if ( foodFlag ) {
                    //debugger;
                    if (foods.axiX.length > 0) {
                        nextFoodX = foods.axiX.find(function (food) { return food.y == myHead.y; });
                    }

                    if (foods.axiY.length > 0) {
                        nextFoodY = foods.axiY.find(function (food) { return food.x == myHead.x; });
                    }

                    if (nextFoodX && nextFoodY) {
                        var d1 = getDistanceOf2Points(myHead.x, myHead.y, nextFoodX.x, nextFoodX.y);
                        var d2 = getDistanceOf2Points(myHead.x, myHead.y, nextFoodY.x, nextFoodY.y);

                        if (d1 < d2) {
                            nextFood = nextFoodX;
                        } else {
                            nextFood = nextFoodY;
                        }
                    } else if (nextFoodY) {
                        nextFood = nextFoodY;

                    } else if(nextFoodX) {
                        nextFood = nextFoodX;
                    }

                    if (nextFood) {
                        if (nextFood.y > myHead.y) {
                            this.direction = "S";
                        } else if (nextFood.y < myHead.y) {
                            this.direction = "N";
                        }

                        if (nextObstacle) {
                            var d1 = getDistanceOf2Points(myHead.x, myHead.y, nextFood.x, nextFood.y);
                            var d2 = getDistanceOf2Points(myHead.x, myHead.y, nextObstacle.x, nextObstacle.y);

                            if (d2 < d1) {
                                if (myHead.y >= self.memory.middleScreen.y ) {
                                    this.direction = "N";
                                } else {
                                    this.direction = "S";
                                }
                            }
                        }
                    }
                    
                }
                break;

            case 'S':

                // Have I obstacles front of me?
                if (obstacleFlag) {
                    if(obstacles.axiY.length > 0) {
                        nextObstacle = obstacles.axiY.find(function (obstacle) { return obstacle.y >= myHead.y; });
                        // I will hint
                        if (nextObstacle && nextObstacle.y == myHead.y + 1) {
                            if (myHead.x >= self.memory.middleScreen.x ) {
                                this.direction = "W";
                            } else {
                                this.direction = "E";
                            }
                        }
                    }
                }

                // I have foods in my way
                if ( foodFlag ) {
                    //debugger;
                    if (foods.axiX.length > 0) {
                        nextFoodX = foods.axiX.find(function (food) { return food.y == myHead.y; });
                    }

                    if (foods.axiY.length > 0) {
                        nextFoodY = foods.axiY.find(function (food) { return food.x == myHead.x; });
                    }

                    if (nextFoodX && nextFoodY) {
                        var d1 = getDistanceOf2Points(myHead.x, myHead.y, nextFoodX.x, nextFoodX.y);
                        var d2 = getDistanceOf2Points(myHead.x, myHead.y, nextFoodY.x, nextFoodY.y);

                        if (d1 < d2) {
                            nextFood = nextFoodX;
                        } else {
                            nextFood = nextFoodY;
                        }
                    } else if (nextFoodY) {
                        nextFood = nextFoodY;

                    } else if(nextFoodX) {
                        nextFood = nextFoodX;
                    }

                    if (nextFood) {
                        if (nextFood.x > myHead.x) {
                            this.direction = "E";
                        } else if (nextFood.x < myHead.x) {
                            this.direction = "W";
                        }

                        if (nextObstacle) {
                            var d1 = getDistanceOf2Points(myHead.x, myHead.y, nextFood.x, nextFood.y);
                            var d2 = getDistanceOf2Points(myHead.x, myHead.y, nextObstacle.x, nextObstacle.y);

                            if (d2 < d1) {
                                if (myHead.x >= self.memory.middleScreen.x ) {
                                    this.direction = "W";
                                } else {
                                    this.direction = "E";
                                }
                            }
                        }
                    }
                }
        
                break;

            case 'W':
                // Have I obstacles front of me?
                if (obstacleFlag) {
                    //debugger;
                    if(obstacles.axiX.length > 0) {
                        nextObstacle = obstacles.axiX.find(function (obstacle) { return obstacle.x <= myHead.x ;});
                        // I will hint
                        if (nextObstacle && nextObstacle.x == myHead.x - 1) {
                            if (myHead.y >= self.memory.middleScreen.y ) {
                                this.direction = "N";
                            } else {
                                this.direction = "S";
                            }
                        }
                    }
                    
                }

                // I have foods in my way
                if ( foodFlag ) {
                    //debugger;
                    if (foods.axiX.length > 0) {
                        nextFoodX = foods.axiX.find(function (food) { return food.y == myHead.y ;});
                    }

                    if (foods.axiY.length > 0) {
                        nextFoodY = foods.axiY.find(function (food) { return food.x == myHead.x ;});
                    }

                    if (nextFoodX && nextFoodY) {
                        var d1 = getDistanceOf2Points(myHead.x, myHead.y, nextFoodX.x, nextFoodX.y);
                        var d2 = getDistanceOf2Points(myHead.x, myHead.y, nextFoodY.x, nextFoodY.y);

                        if (d1 < d2) {
                            nextFood = nextFoodX;
                        } else {
                            nextFood = nextFoodY;
                        }
                    } else if (nextFoodY) {
                        nextFood = nextFoodY;

                    } else if(nextFoodX) {
                        nextFood = nextFoodX;
                    }

                    if (nextFood) {
                        if (nextFood.y > myHead.y) {
                            this.direction = "S";
                        } else if (nextFood.y < myHead.y) {
                            this.direction = "N";
                        }

                        if (nextObstacle) {
                            var d1 = getDistanceOf2Points(myHead.x, myHead.y, nextFood.x, nextFood.y);
                            var d2 = getDistanceOf2Points(myHead.x, myHead.y, nextObstacle.x, nextObstacle.y);

                            if (d2 < d1) {
                                if (myHead.y >= self.memory.middleScreen.y ) {
                                    this.direction = "N";
                                } else {
                                    this.direction = "S";
                                }
                            }
                        }
                    }
                    
                }
                break;
        }

        
        return this.direction;
    };
    

    return this.getNewDirection();
}