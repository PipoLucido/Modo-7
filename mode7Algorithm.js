console.clear();

// CONSTANTES
var ANTIALIAS = false,
    GROUND_SPACING = 35,
    GROUND_LINES = 20;

var entities;

// Canvas init
var c = document.getElementById('output'),
    ctx = c.getContext('2d');

ctx.webkitImageSmoothingEnabled =
    ctx.imageSmoothingEnabled =
    ctx.mozImageSmoothingEnabled =
    ctx.oImageSmoothingEnabled = ANTIALIAS;

// Asset references
var station = document.getElementById('station'),
    shipplayer = document.getElementById('shipplayer'),
    skyDown = document.getElementById('skyDown'),
    shipfire = document.getElementById('shipfire'),
    enemies = document.getElementById('enemies')

// Virtual horizon for perspective calculation
var vanishingPoint = {
    x: c.width * 0.5,
    y: c.height * 0.4
};

var camera = {
    x: 0,
    y: 30,
    z: 170,
    fov: 170,
    dist: 300
};

/**
 * Base entity class, renders a coloured rect by default
 **/
function Entity(x, y, z, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.anchor = { x: 0.5, y: 1 };
    this.scale = 1;
    this.width = 10;
    this.height = 60;
    this.color = color || 'red';

    this._p = {};
}

Entity.prototype._canRender = function() {
    // don't draw if behind camera or beyond draw dist
    if (camera.z - this.z < 0) return false;
    if (camera.z - this.z > camera.dist) return false;
    return true;
};

Entity.prototype.calc = function(attr) {
    // Calculate scaling factor based on camera FOV and position
    this._p.sf = camera.fov / (camera.z - this.z);

    // Calculate position and size on screen
    this._p.dx = (camera.x + this.x) * this._p.sf + vanishingPoint.x;
    this._p.dy = (camera.y - this.y) * this._p.sf + vanishingPoint.y;
    this._p.dw = this.width * this.scale * this._p.sf;
    this._p.dh = this.height * this.scale * this._p.sf;

    // Translate to anchor for rendering purposes
    this._p.dx -= this._p.dw * this.anchor.x;
    this._p.dy -= this._p.dh * this.anchor.y;
}

Entity.prototype.render = function() {

    if (!this._canRender()) return false;

    this.calc();
    this.draw();
};

Entity.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this._p.dx >> 0, this._p.dy >> 0,
        this._p.dw >> 0, this._p.dh >> 0);
};

/**
 * Sprite subclass, renderes a scaled billboarded image
 **/
function Sprite(x, y, z, img) {
    Entity.call(this, x, y, z);
    this.img = img;
    this.width = img.width;
    this.height = img.height;
}
Sprite.prototype = Object.create(Entity.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.draw = function() {
    if (this.clipRect) {
        ctx.drawImage(this.img,
            this.clipRect.x >> 0, this.clipRect.y >> 0,
            this.clipRect.width >> 0, this.clipRect.height >> 0,
            this._p.dx >> 0, this._p.dy >> 0, this._p.dw >> 0, this._p.dh >> 0);
    } else {
        ctx.drawImage(this.img, this._p.dx >> 0,
            this._p.dy >> 0, this._p.dw >> 0, this._p.dh >> 0);
    }
};

/**
 * Flat subclass, renders an image as a plane, SNES Mode7-style
 **/
function Flat(x, y, z, img) {
    Sprite.call(this, x, y, z, img);

    this.lines = [];

    for (var i = 0; i < img.height; i++) {
        // TODO: sort out magic numbers here
        var line = new Sprite(x, y, z + (i * 0.7), img);
        line.height = 2;
        line.clipRect = {
            x: 0,
            y: i,
            width: this.width,
            height: 1
        };
        this.lines.push(line);
    }
}
Flat.prototype = Object.create(Sprite.prototype);
Flat.prototype.constructor = Flat;

Flat.prototype.render = function() {
    this.lines.forEach(function(line) {
        line.render();
    });
};


// Simple z-ordering for entities, to be passet to array.sort()
function _zSort(a, b) {
    return a.z - b.z;
}

// Init the entities in the scene
function _createEntities() {
    entities = [];

    //ENTITY
    //entities.push(new Entity(90, 0, -220, 'yellow'));

    //PLANOS



    entities.push(new Flat(0, 0, -190, skyDown));
    entities.push(new Flat(0, 0, -363, skyDown));
    //entities.push(new Flat(0, 0, -545, skyDown));
    //entities.push(new Flat(0, 0, -636, skyDown));




    //SPRITES

    //enemies

    entities.push(new Sprite(-6, 0, -299, enemies));

    entities.push(new Sprite(-5, 0, -279, enemies));

    entities.push(new Sprite(5, 0, -269, enemies));

    entities.push(new Sprite(5, 0, -289, enemies));

    //**fila 2 */

    /* entities.push(new Sprite(0, 0, -289, enemies));

     entities.push(new Sprite(0, 0, -289, enemies));

     entities.push(new Sprite(0, 0, -289, enemies));*/

    //enemies


    entities.push(new Sprite(-150, 0, -220, station));

    entities.push(new Sprite(80, 0, -120, station));


    entities.push(new Sprite(0, 0, -180, shipplayer));

    entities.push(new Sprite(0, 0, -189, shipfire));


    entities.sort(_zSort);
    console.log(entities)


    //size of Sprites

    //enemies

    entities[1].width = 13;
    entities[1].height = 10;

    entities[2].width = 13;
    entities[2].height = 10;

    entities[3].width = 13;
    entities[3].height = 10;

    entities[4].width = 13;
    entities[4].height = 10;

    //enemies


    //station
    entities[5].width = 56;
    entities[5].height = 80;


    //gunfire
    entities[7].width = 5;
    entities[7].height = 5;


    //ship
    entities[8].width = 13;
    entities[8].height = 8;


    console.log("enemie 2 z :" +
        entities[2].z)

    console.log("enemie 2 y :" +
        entities[2].y)

    console.log("enemie 2 x :" +
        entities[2].x)

}

// Render the ground
function _drawHorizon() {

    //GUIA PLANO 

    ctx.fillStyle = '#364';
    //ctx.fillRect(0, vanishingPoint.y, c.width, c.height - vanishingPoint.y);
}

// Render perspective-corrected lines on the ground to give a sense of depth.
// Always spwan relative to the camera.
function _drawGroundLines() {
    ctx.fillStyle = '#253';

    var iz = Math.floor(camera.z / GROUND_SPACING);

    for (var i = 0; i < GROUND_LINES; i++) {

        var z = (iz * GROUND_SPACING) - (GROUND_SPACING * i);

        // Don't draw if behind camera or beyond draw dist
        if (camera.z - z < 0) continue;
        if (camera.z - z > camera.dist) return;

        var scalingFactor = camera.fov / (camera.z - z);
        var y = camera.y * scalingFactor + vanishingPoint.y;

        // ctx.fillRect(0, y, c.width, 1);
    }
}

//enemiesLives
let enemieOneNotDead = true;
let enemieTwoNotDead = true;
let enemieThreNotDead = true;
let enemieFourNotDead = true;
let enemieFiveNotDead = true;

//gunshipFIRE
let fFrame = true;


const log = document.getElementById('body');

document.addEventListener('keypress', logKey);

function logKey(e) {

    if (e.key == 'z') {





        fFrame = false;
        console.log(e.key);
        var gunshot = new Audio('gunshot.wav');


        gunshot.play();

    }
}

var el = document.getElementById('body');

el.onclick = function() {

    var gunshot = new Audio('gunshot.wav');

    if (fFrame == true) { gunshot.play(); }


    fFrame = false;
    //console.log(e.key);

};

//gunshipFIRE


function update() {
    // Move the camera in a sinus patten, yay magic numbersz
    var t = Date.now() * 0.001;

    //MOVE ON THE MAP
    camera.x = Math.sin(t * 0.6) * 30 * 0.7;
    //camera.y = (Math.sin(t * 0.6) * 100 * 0.2) + 28;
    camera.z = (Math.sin(t * 0.4) * 180 * 0.3) - 85;
    //camera.z = -85;


    //ROTATE CAMERA
    //vanishingPoint.x = (Math.sin(t * 0.6) * (c.width * 0.2)) + (c.width * 0.5);
    //vanishingPoint.y = (Math.sin(t * 0.5) * (c.height * 0.2)) + (c.height * 0.5) - 50;

    //vanishingPoint.x = vanishingPoint.x + 1;

    //console.log("camera Z:" + camera.z)



    //SPRITES UPDATE

    //ENEMIES ///





    //enemies


    //PLAYER SHIP//////////////////////////////////////

    //player
    entities[8].z = camera.z - 60;
    entities[8].y = camera.y - 45;
    entities[8].x = camera.x;



    if (fFrame == true) {
        entities[7].z = camera.z - 60
        entities[7].y = camera.y - 44;
        entities[7].x = camera.x;
        //fFrame = false;
    }
    if (fFrame == false) {
        entities[7].z = entities[7].z - 18;
        //console.log("gunship z" + entities[7].z)
        //console.log("gunship y" + entities[7].y)
        //console.log("gunship x" + entities[7].x)

        if (entities[7].z < -400) {
            //console.log("desaparece tiro ")
            fFrame = true;
        }

    }

    if (enemieOneNotDead == true && (entities[7].z <= entities[1].z) && (entities[7].y < 0 && entities[7].y > -20) && (entities[7].x < -15 && entities[7].x > -35)) {
        console.log("colicion con enemie1")
        var gunshotExplosion = new Audio('explotion.wav');
        gunshotExplosion.play()
        entities[1].height = 0
        entities[1].width = 0 //destroy enemie
        fFrame = true;
        enemieOneNotDead = false
    }


    if (enemieTwoNotDead == true && (entities[7].z <= entities[2].z) && (entities[7].y < 0 && entities[7].y > -20) && (entities[7].x < 10 && entities[7].x > 0)) {
        console.log("colicion con enemie2")
        var gunshotExplosion = new Audio('explotion.wav');
        gunshotExplosion.play()
        entities[2].height = 0
        entities[2].width = 0 //destroy enemie
        fFrame = true;
        enemieTwoNotDead = false
    }

    if (enemieThreNotDead == true && (entities[7].z <= entities[3].z) && (entities[7].y < 0 && entities[7].y > -20) && (entities[7].x < 0 && entities[7].x > -10)) {
        console.log("colicion con enemie2")
        var gunshotExplosion = new Audio('explotion.wav');
        gunshotExplosion.play()
        entities[3].height = 0
        entities[3].width = 0 //destroy enemie
        fFrame = true;
        enemieThreNotDead = false
    }

    if (enemieFourNotDead == true && (entities[7].z <= entities[4].z) && (entities[7].y < 0 && entities[7].y > -20) && (entities[7].x < 15 && entities[7].x > 5)) {
        console.log("colicion con enemie2")
        var gunshotExplosion = new Audio('explotion.wav');
        gunshotExplosion.play()
        entities[4].height = 0
        entities[4].width = 0 //destroy enemie
        fFrame = true;
        enemieFourNotDead = false
    }



    //RANGOS EN LOS QUE SE PUEDE MOVER EL PLAYER EN X
    //entities[3].x = (Math.sin(t * 0.6) * 100 * 0.3) + 30;
    //entities[3].x = (Math.sin(t * 0.6) * 100 * 0.3) - 30;
    //PLAYER SHIP//////////////////////////////////

    //PLANO REPETIR//////////////



    // console.log("camera" + camera.z)
    //console.log("nave" + entities[5].z)


    //PLANO REPETIR////////////////




}

function render() {
    ctx.clearRect(0, 0, c.width, c.height);

    _drawHorizon();
    _drawGroundLines();

    var l = entities.length;
    for (var i = 0; i < l; i++) {
        entities[i].render();
    }

}

var lt = Date.now()
FRAME_TIME = 1000 / 70

function frame() {
    requestAnimationFrame(frame);
    var ct = Date.now()
    if (ct - lt > FRAME_TIME) {
        lt = ct;


        update();


        render();


    }
}

function _sizeCanvas() {
    var ww = window.innerWidth,
        wh = window.innerHeight;

    if (ww > wh) {
        c.style.height = window.innerHeight * 0.95 + 'px';
        c.style.width = 'auto';
    } else {
        c.style.width = window.innerWidth * 0.95 + 'px';
        c.style.height = 'auto';
    }
}

function init() {
    _createEntities();
    _sizeCanvas();

    window.addEventListener('resize', _sizeCanvas, false);

    frame();
}


window.onload = function() {
    console.log("cargo todo")
    init();
}



//PIPO_LUCIDOz