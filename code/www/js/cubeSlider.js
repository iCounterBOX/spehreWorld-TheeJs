/*
    Slider CLASS
    by KINA
*/

function cubeSlider(renderer, scene) {

    this.renderer = renderer; // give the renderer for Anistrophy
    this.scene = scene; // give the scene for some texture issue on CHROME!?  NOT jet fixed
    this.slObj = null; // cube etc as an Object for the scene
    this.textObj = null;

    this.iMax = 0;
    this.jMax = 0;
    this.slObjectM = new Array();

}

cubeSlider.constructor = cubeSlider;



cubeSlider.prototype.build2dArray = function (iMax, jMax) {

    for (i = 0; i < iMax; i++) {
        this.slObjectM[i] = new Array();
        for (j = 0; j < jMax; j++) {
            this.slObjectM[i][j] = 0;
        }
    }
};

cubeSlider.prototype.objectCount = function () {

    for (var l = 0; l < this.slObjectM.length; l++) {
        var oid = this.slObjectM[l][0].id;
        if (oid == 0 || oid == undefined) {
            return l;
        }
    }
};

// get the cube oject from the arry
cubeSlider.prototype.getSlObjectArray = function (slID, scene) {

    var id = this.slObjectM[slID][0].id;
    return scene.getObjectById(id, true);

};
// get the cube oject from the arry
cubeSlider.prototype.getSlTextArray = function (slID, scene) {

    var id = this.slObjectM[slID][1].id;
    return scene.getObjectById(id, true);

};




cubeSlider.prototype.getSliderCube = function (slID, slCubePicPath) {

    var maxAnisotropy = this.renderer.getMaxAnisotropy();
    var p = 0;
    var materials = [];
    for (var i = 0; i < 6; i++) {
        p = slCubePicPath + "pic" + i + ".jpg";

        materials.push(new THREE.MeshBasicMaterial({
            map: loadImage(p)       // This effort was for CHROME!! see my doc!!  - How2_HTML5_CSS3_JqueryMobileMin_V01
        }));

    }
    this.slObj = new THREE.Mesh(new THREE.BoxGeometry(80, 80, 80), new THREE.MeshFaceMaterial(materials));
    this.slObj.name = slCubePicPath;
    this.slObjectM[slID][0] = this.slObj;
    return this.slObj; // give this cube back for the scene
};

// https://github.com/mrdoob/three.js/issues/687
// basically for the chrome issue - BUT also good for some further LAB on Picture 2D Canvas ETC
function loadImage(path) {
    var canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    //document.body.appendChild(canvas);

    var texture = new THREE.Texture(canvas);

    var img = new Image();
    img.crossOrigin = ''
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        texture.needsUpdate = true;
    };
    img.src = path;
    return texture;
};

cubeSlider.prototype.getSliderText = function (slID, textLabel) {

    var maxAnisotropy = this.renderer.getMaxAnisotropy();
    var text3d = new THREE.TextGeometry(textLabel, {
        size: 10,
        height: 2,
        curveSegments: 20,
        font: "droid sans"
    });

    text3d.anisotropy = maxAnisotropy;
    text3d.computeBoundingBox();
    var centerOffset = -0.5 * (text3d.boundingBox.max.x - text3d.boundingBox.min.x);

    var textMaterial = new THREE.MeshBasicMaterial({
        //color: 0x000000,    // black
        color: 0xFFFFFF,
        overdraw: 0.5
    });
    this.textObj = new THREE.Mesh(text3d, textMaterial);
    this.textObj.name = textLabel;
    this.slObjectM[slID][1] = this.textObj;
    return this.textObj; // give textObject back for the scene

};
