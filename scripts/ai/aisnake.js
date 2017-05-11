//"use strict";

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

function getDirectionAvoidingObstacle (direction, obstacles, myHead, nextFood, borders) {
    var nextObstacleX, nextObstacleY;
    var newDirection = direction;

    switch (direction) {
        case 'N':
            nextObstacleY = obstacles.axiY.find(function (obstacle) { return obstacle.y <= myHead.y; });
            if (nextObstacleY) {
                if (myHead.y != borders.y.min && myHead.y != borders.y.max) {
                    if (nextFood) {
                        if (nextFood.y <= nextObstacleY.y) {
                            newDirection = "S";
                        }
                    } else {
                        newDirection = "S";
                    }
                }

            }
        break;
        case 'S':
            nextObstacleY = obstacles.axiY.find(function (obstacle) { return obstacle.y >= myHead.y; });
            if (nextObstacleY) {
                if (myHead.y != borders.y.min && myHead.y != borders.y.max) {
                    if (nextFood) {
                        if (nextFood.y >= nextObstacleY.y) {
                            newDirection = "N"
                        }
                    } else {
                        newDirection = "N";
                    }
                }
                
            }
        break;

        case 'W':
            nextObstacleX = obstacles.axiX.find(function (obstacle) { return obstacle.x <= myHead.x; });
            if (nextObstacleX) {
                if (myHead.x != borders.x.min && myHead.x != borders.x.max) {
                    if (nextFood) {
                        if (nextFood.x <= nextObstacleX.x) {
                            newDirection = "E";
                        }
                    } else {
                        newDirection = "E";
                    }
                }
                
            }
        break;
        case 'E':
            nextObstacleX = obstacles.axiX.find(function (obstacle) { return obstacle.x >= myHead.x; });
            if (nextObstacleX) {
                if (myHead.x != borders.x.min && myHead.x != borders.x.max) {
                    if (nextFood) {
                        if (nextFood.x >= nextObstacleX.x) {
                            newDirection = "W";
                        }
                    } else {
                        newDirection = "W";
                    }
                }
            }
        break;
    }

    return newDirection;

}

function snakeAILoop(game) {
    //Your snake code goes here, you need to return the next snake direction in this function 
    //You can use {this.memory} to persist data regarding your snake and use it in the next iteration
    const myHead = this.getHead(); 
    let self = this;

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

    
    if (!this.memory.borders) {
        this.memory.borders = {
            x: {min: 0, max: game.width - 1},
            y: {min: 0, max: game.height - 1}
        }
    }

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
            axiX: game.obstacles.filter(function(obstacle){ return obstacle.y == y; }).sort(sortByX),
            axiY: game.obstacles.filter(function(obstacle){ return obstacle.x == x; }).sort(sortByY)
            
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

    this.getNewDirection = function() {
        
        var foods = self.getFoodsInTheWay(myHead.x, myHead.y);
        var obstacles = self.getObstaclesInTheWay(myHead.x, myHead.y);

        var foodFlag = foods.axiX.length > 0  ||  foods.axiY.length > 0;
        var obstacleFlag = obstacles.axiX.length > 0  ||  obstacles.axiY.length > 0;
        var nextObstacleY, nextObstacleX, nextFood, nextFoodX , nextFoodY;

        switch(self.direction){
            case 'N':
                
                // Have I obstacles front of me?
                if (obstacleFlag) {
                    if(obstacles.axiY.length > 0) {
                        nextObstacleY = obstacles.axiY.find(function (obstacle) { return obstacle.y <= myHead.y; });
                        
                        // I will hint
                        if (nextObstacleY && myHead.y - 1 == nextObstacleY.y) {
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
                    if (foods.axiX.length > 0) {
                        nextFoodX = foods.axiX.find(function (food) { return myHead.y == food.y; });
                    }

                    if (foods.axiY.length > 0) {
                        nextFoodY = foods.axiY.find(function (food) { return myHead.y >= food.y; });
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

                        if (nextObstacleY) {
                            var d1 = getDistanceOf2Points(myHead.x, myHead.y, nextFood.x, nextFood.y);
                            var d2 = getDistanceOf2Points(myHead.x, myHead.y, nextObstacleY.x, nextObstacleY.y);

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

                if(this.direction != "N" && obstacles.axiX.length > 0) {
                    this.direction = getDirectionAvoidingObstacle(this.direction, obstacles, myHead, nextFood, this.memory.borders);
                }

                break;

            case 'E':
                
                // Have I obstacles front of me?
                if (obstacleFlag) {
                    if(obstacles.axiX.length > 0) {
                        nextObstacleX = obstacles.axiX.find(function (obstacle) { return obstacle.x >= myHead.x ;});
                        // I will hint
                        if (nextObstacleX && myHead.x + 1 == nextObstacleX.x ) {
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
                    if (foods.axiX.length > 0) {
                        nextFoodX = foods.axiX.find(function (food) { return myHead.x <= food.x; });
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

                        if (nextObstacleX) {
                            var d1 = getDistanceOf2Points(myHead.x, myHead.y, nextFood.x, nextFood.y);
                            var d2 = getDistanceOf2Points(myHead.x, myHead.y, nextObstacleX.x, nextObstacleX.y);

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

                if(this.direction != "E" && obstacles.axiY.length > 0) {
                    this.direction = getDirectionAvoidingObstacle(this.direction, obstacles, myHead, nextFood, this.memory.borders);
                }
            break;

            case 'S':

                // Have I obstacles front of me?
                if (obstacleFlag) {
                    if(obstacles.axiY.length > 0) {
                        nextObstacleY = obstacles.axiY.find(function (obstacle) { return obstacle.y >= myHead.y; });
                        // I will hint
                        if (nextObstacleY && myHead.y + 1 == nextObstacleY.y ) {
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
                    if (foods.axiX.length > 0) {
                        nextFoodX = foods.axiX.find(function (food) { return food.y == myHead.y; });
                    }

                    if (foods.axiY.length > 0) {
                        nextFoodY = foods.axiY.find(function (food) { return myHead.y <= food.y; });
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

                        if (nextObstacleY) {
                            var d1 = getDistanceOf2Points(myHead.x, myHead.y, nextFood.x, nextFood.y);
                            var d2 = getDistanceOf2Points(myHead.x, myHead.y, nextObstacleY.x, nextObstacleY.y);

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

                if(this.direction != "S" && obstacles.axiX.length > 0) {
                    this.direction = getDirectionAvoidingObstacle(this.direction, obstacles, myHead, nextFood, this.memory.borders);
                }
        
                break;

            case 'W':
                // Have I obstacles front of me?
                if (obstacleFlag) {
                    if(obstacles.axiX.length > 0) {
                        nextObstacleX = obstacles.axiX.find(function (obstacle) { return obstacle.x <= myHead.x ;});
                        // I will hint
                        if (nextObstacleX && myHead.x - 1 == nextObstacleX.x ) {
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
                    if (foods.axiX.length > 0) {
                        nextFoodX = foods.axiX.find(function (food) { return myHead.x >= food.x;});
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

                        if (nextObstacleX) {
                            var d1 = getDistanceOf2Points(myHead.x, myHead.y, nextFood.x, nextFood.y);
                            var d2 = getDistanceOf2Points(myHead.x, myHead.y, nextObstacleX.x, nextObstacleX.y);

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

                if(this.direction != "W" && obstacles.axiY.length > 0) {
                    this.direction = getDirectionAvoidingObstacle(this.direction, obstacles, myHead, nextFood, this.memory.borders);
                }
                break;
        }
        return this.direction;
    };
    

    return this.getNewDirection();
}