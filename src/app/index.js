import "./index.css";
var entities = require('./loadEntities')
var modo7 = require('seven-mode')
var propiedad = new modo7.Propiedades();
console.clear();



// Carga las entidades (Sprites) que apareceran en el nivel
function _createEntities() {

  
    //FLAT 
    propiedad.entidades.push(new modo7.Flat(0, 0, -163, entities.entities.skyDown, propiedad));
    //los planos seran renderizado segun su valor original en pixeles

    //SPRITES
    propiedad.entidades.push(new modo7.Sprite(-6, 0, -299, entities.entities.enemies, propiedad,15,15));
    //los sprites seran renderizado segun su valor original en pixeles


    //ENTITY
    propiedad.entidades.push(new modo7.Entity(90, 0, -220, 'yellow', propiedad,5,5));

    //propiedad.entidades.sort(EntiteFunction._zSort);   <------ ESTO
    //ORDENA EL RENDERIZADO DE LAS ENTIDADES
    //SEGUN EL ORDEN EN QUE VENGAN DESDE -Z A +Z , (cumple su proposito
    //pero hace que se superpongan cosas por ejemplo con el piso y algun sprite).
    //Al desactivar renderisa segun el orden en el que se halla hecho push en array
    //Recomiendo tener en cuenta el orden de renderizado en el que se desea hacer la escena.


    console.log(propiedad.entidades)


}






//UPDATE FUNCTION
//Proceso de animacion y transcurso de niveles
function update() {
    // Move the camera in a sinus patten, yay magic numbersz
    var t = Date.now() * 0.001;
    console.log("time: "+t)

    //MOVE ON THE MAP
    propiedad.camera.x = Math.sin(t * 0.6) * 30 * 0.7;
    //camera.y = (Math.sin(t * 0.6) * 100 * 0.2) + 28;
    propiedad.camera.z = (Math.sin(t * 0.4) * 180 * 0.3) - 85;
    //camera.z = -85;


    //ROTATE CAMERA
    //vanishingPoint.x = (Math.sin(t * 0.6) * (c.width * 0.2)) + (c.width * 0.5);
    //vanishingPoint.y = (Math.sin(t * 0.5) * (c.height * 0.2)) + (c.height * 0.5) - 50;

    //vanishingPoint.x = vanishingPoint.x + 1;

    //console.log("camera Z:" + camera.z)


    //RANGOS EN LOS QUE SE PUEDE MOVER EL PLAYER EN X
    //entities[3].x = (Math.sin(t * 0.6) * 100 * 0.3) + 30;
    //entities[3].x = (Math.sin(t * 0.6) * 100 * 0.3) - 30;
    //PLAYER SHIP//////////////////////////////////


}



/////////////////////////////////////////

function render() {
    propiedad.ctx.clearRect(0, 0, propiedad.c.width, propiedad.c.height);

    //modo7._drawHorizon(propiedad);
    modo7._drawGroundLines(propiedad);

    var l = propiedad.entidades.length;
    for (var i = 0; i < l; i++) {
        propiedad.entidades[i].render();
    }

}

var lt = Date.now()
var FRAME_TIME = 1000 / 70

function frame() {
    requestAnimationFrame(frame);
    var ct = Date.now()
    if (ct - lt > FRAME_TIME) {
        lt = ct;


        update();


        render();


    }
}


function init() {
   
    _createEntities();
    modo7._sizeCanvas(propiedad);

    window.addEventListener('resize', modo7._sizeCanvas, false);

    frame();
}


window.onload = function() {
    //funcion se inicia cuando cargo todo correctamente 
    //console.log("cargo todo")
    init();
}



//PIPO_LUCIDOz