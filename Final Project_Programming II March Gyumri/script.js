//*Final Project*//

var matrix = [];
var n = 50;    ///Մատրիքսի ամենահարմար կորդինատները, որի ժամանակ չի "կախում" կամ "կտրտում" դա 50x50 է:
var m = 50;
var side = 10;
var grassArr = [];
var grasseaterArr = [];
var predatorArr = [];
var menArr = [];
var bombArr = [];

function setup() {
    for (var y = 0; y < n; y++) {
        matrix[y] = [];
        for (var x = 0; x < m; x++) {
            var rand = Math.floor(random(0, 2));
            matrix[y][x] = rand;
        }
    }
    //first men Cordinate
    matrix[n - 1][m - 1] = 4;
    matrix[n - 1][1] = 4;
    //first grasseaters Coordinates
    matrix[2][2] = 2;
    matrix[n - 2][m - 2] = 2;
    //first predators Coordinates
    matrix[n / 2][m / 2] = 3;
    matrix[n / 2][m / 2 + 2] = 3;
    matrix[n / 2][m / 2 - 2] = 3;
    //first bombs Cordinates
    matrix[3][m / 2] = 5;
    matrix[n - 3][m / 2] = 5;
    matrix[n / 2][3] = 5;
    matrix[n / 2][m - 3] = 5;

    console.log(matrix);
    console.log(menArr);

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                grasseaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                predatorArr.push(pr);
            }
            else if (matrix[y][x] == 4) {
                var me = new Men(x, y, 4);
                menArr.push(me);
            }
            else if (matrix[y][x] == 5) {
                var bo = new Bomb(x, y, 5);
                bombArr.push(bo);
            }
        }
    }
}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill('#acacac');
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                if (grassArr.length <= 0) {
                    fill("red");
                }
            }
            else if (matrix[y][x] == 4) {
                if (grasseaterArr.length <= 0) {
                    fill("#515A5A");
                }
            }
            else if (matrix[y][x] == 5) {
                if (predatorArr.length <= 0) {
                    fill("black");
                }
            }
            rect(x * side, y * side, side, side);
            //Rect Cordinates
            // fill(89, 114, 255);
            // text(x + " " + y, x * side + side / 2, y * side + side / 2)

        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].move();
        grasseaterArr[i].eat();
        grasseaterArr[i].mul();
        grasseaterArr[i].die();
    }
    if (grassArr.length <= 0) {
        for (var i in predatorArr) {
            predatorArr[i].move();
            predatorArr[i].eat();
            predatorArr[i].mul();
            predatorArr[i].die();
        }
    }
    if (grasseaterArr.length <= 0) {
        for (var i in menArr) {
            menArr[i].move();
            menArr[i].eat();
            menArr[i].mul();
            menArr[i].die();
        }
    }
    if (predatorArr.length <= 0) {

        for (var i in bombArr) {
            bombArr[i].move();
            bombArr[i].die();
        }
    }
}
































