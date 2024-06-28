function splineCK(skySphereDimension) {


    this.skySphereDimension = skySphereDimension;
    this.spline_c = null;
    this.themeSpline = null;
    this.astraSpline = null;
    this.points = [];
    this.themeSpherePoints = []; // asphere within the sphere
    this.astraPoints = [];
    this.sphere = []; // hold the sphere
    this.nrSplineMainPoints=null;

    // we rasterize the sphere   4000 e.g. is the dimension of one single shpere


}

splineCK.constructor = splineCK;
//splineCK.prototype = Object.create(THREE.Object3D.prototype);

splineCK.prototype.getSpline = function () {
    return this.spline_c;
};

splineCK.prototype.getAstraSpline = function () {
    return this.astraSpline;
};

splineCK.prototype.getSplineVector3Points = function () {
    return this.points;
};

splineCK.prototype.getnrSplineMainPoints = function () {
    return this.nrSplineMainPoints;
};

//  with this methods i get some extreme points from the spline  BIGGEST and smalest in EACH direction
// file:///D:/ALL_DEVEL/Examples_THREEjs/three.js-master/examples/index.html#webgl_geometry_extrude_splines



splineCK.prototype.getBiggestInXdirection = function () {
    var indx_c = 0;
    var prev = new THREE.Vector3(0, 0, 0);

    for (var ii = 0; ii != this.nrSplineMainPoints; ++ii) {
        if (this.points[ii].x > prev.x) {
            indx_c = ii;
            prev.x = this.points[ii].x;
        }
    }
    return indx_c;
};

splineCK.prototype.getBiggestInYdirection = function () {
    var indx_c;
    indx_c = 0;
    var prev = new THREE.Vector3(0, 0, 0);

    for (var ii = 0; ii != this.nrSplineMainPoints; ++ii) {
        if (this.points[ii].y > prev.y) {
            indx_c = ii;
            prev.y = this.points[ii].y;
        }
    }
    return indx_c;
};

splineCK.prototype.getBiggestInZdirection = function () {
    var indx_c = 0;
    var prev = new THREE.Vector3(0, 0, 0);

    for (var ii = 0; ii != this.nrSplineMainPoints; ++ii) {
        if (this.points[ii].z > prev.z) {
            indx_c = ii;
            prev.z = this.points[ii].z;
        }
    }
    return indx_c;
};
// get the smalest

splineCK.prototype.getSmallestInXdirection = function () {
    var indx_c = this.getBiggestInXdirection(); //gets the Index of the Biggest X
    var prev = new THREE.Vector3(0, 0, 0);
    prev.x = this.points[indx_c].x;

    for (var ii = 0; ii != this.nrSplineMainPoints; ++ii) {
        if (this.points[ii].x < prev.x) {
            indx_c = ii;
            prev.x = this.points[ii].x;
        }
    }
    return indx_c;
};

splineCK.prototype.getSmallestInYdirection = function () {
    var indx_c = this.getBiggestInYdirection(); //gets the Index of the Biggest X
    var prev = new THREE.Vector3(0, 0, 0);
    prev.y = this.points[indx_c].y;

    for (var ii = 0; ii != this.nrSplineMainPoints; ++ii) {
        if (this.points[ii].y < prev.y) {
            indx_c = ii;
            prev.y = this.points[ii].y;
        }
    }
    return indx_c;
};

splineCK.prototype.getSmallestInZdirection = function () {
    var indx_c = this.getBiggestInZdirection(); //gets the Index of the Biggest X
    var prev = new THREE.Vector3(0, 0, 0);
    prev.z = this.points[indx_c].z;

    for (var ii = 0; ii != this.nrSplineMainPoints; ++ii) {
        if (this.points[ii].z < prev.z) {
            indx_c = ii;
            prev.z = this.points[ii].z;
        }
    }
    return indx_c;
};

//  spline Generation stuff

splineCK.prototype.CreateRandomSplinePointWithoutSphere = function () {
    var xp = new THREE.Vector3(0, 0, 0);
    max = this.skySphereDimension / 2 - 50000;
    min = 50000;

    xp.x = Math.floor(Math.random() * ((max - min) + 1) + min);
    xp.y = Math.floor(Math.random() * ((max - min) + 1) + min);
    xp.z = Math.floor(Math.random() * ((max - min) + 1) + min);
    console.log("CreateRandomSplinePointWithoutSphere(XYZ): " + xp.x + " " + xp.y + " " + xp.z);

    this.points.push(xp);

}

// Sphere in form of a circle

splineCK.prototype.addSphere2Array = function (sp) {

    this.sphere.push(sp);

}

// objekte auf einer kreisbahn positionieren AND make spline within the theme

splineCK.prototype.setSpherePositionOnSplineCircle = function (themeSegm, themeSphereDimension, scene) {


    //step += 0.001; // we let the objects rotate !!
    step = 0; // NO rotation here

    var xr = 300000; // radius of the sphere circle
    var yr = 0; // relative height of the sliderSystem
    var zr = 300000; // slider depth  e.g. circle or elyptic  -- equals xr if a circle
    var rota = 0.006; // const


    var len = this.sphere.length; // gives the nr of spheres
    var alpha = (Math.PI * 2 / len);

    for (var i = 0; i < len; i++) {
        var xp = new THREE.Vector3(0, 0, 0);

        var obj = this.sphere[i];

        obj.position.x = Math.floor(Math.cos(step + (alpha * i)) * xr);
        xp.x = obj.position.x;
        obj.position.z = Math.floor(Math.sin(step + (alpha * i)) * zr);
        xp.z = obj.position.z;
        obj.position.y = yr;
        xp.y = yr;

        // place the grid sphere

        try {
            var gridSphere = scene.getObjectByName("hull" + i);
            gridSphere.position.x = obj.position.x;
            gridSphere.position.y = obj.position.y;
            gridSphere.position.z = obj.position.z;
        } catch (err) {
            console.log(err.message);
        }

        //obj.rotation.x += rota; // eigenrotation
        //obj.rotation.y += rota;

        this.points.push(xp);

        /* spline in sphere  for later use
        var spl = this.createThemeSphereSpline(obj.position.x, obj.position.y, obj.position.z, 5, themeSphereDimension);
        spl.name = "spline" + i; // this way sphere0 should be spline0
        scene.add(spl);
        */

        console.log("setSpherePositionOnSplineCircle(XYZ): " + xp.x + " " + xp.y + " " + xp.z);
    }



}


// create the Point for  the spline within the SPACE  THIS point is also used by the sphere
// just create a bit chaos

splineCK.prototype.CreateRandomSplinePoint = function () {

    var min, max;
    var xp = new THREE.Vector3(0, 0, 0);



    max = this.skySphereDimension / 2 - 10000;
    min = 10000;

    xp.x = Math.floor(Math.random() * ((max - min) + 1) + min);
    xp.y = Math.floor(Math.random() * ((max - min) + 1) + min);
    xp.z = Math.floor(Math.random() * ((max - min) + 1) + min);

    console.log("RandomSplineCoordinate(XYZ): " + xp.x + " " + xp.y + " " + xp.z);

    this.points.push(xp);
    return xp;
}

// this random point should be in the themesphere

splineCK.prototype.createThemeSphereSpline = function (x, y, z, anzPoints, sphereRadius) {

    var scale = sphereRadius / 3;
    var xp;
    var t = 400;

    for (var ii = 0; ii != anzPoints; ++ii) {
        t *= Math.PI * 2;
        var tx = (2 + Math.cos(3 * t)) * Math.cos(2 * t);
        var ty = (2 + Math.cos(3 * t)) * Math.sin(2 * t);
        var tz = 2 * Math.sin(3 * t); // to avoid overlap

        xp = new THREE.Vector3(tx, ty, tz).multiplyScalar(scale);


        this.themeSpherePoints.push(xp);
        console.log("createThemeSphereSpline(XYZ): " + xp.x + " " + xp.y + " " + xp.z);
    }

    this.themeSpline = new THREE.SplineCurve3(this.themeSpherePoints);

    // Generate geometry for a tube using our spline.
    var segments = 200;
    var radius = 10;
    var radiusSegments = 100;

    var geometry = new THREE.TubeGeometry(this.themeSpline, segments, radius, radiusSegments, false);
    var particileSystem = this.createParticleSystem(pic,geometry);
    particileSystem.position.set(x, y, z);
    return particileSystem; // this spline we add to the scene!

}

// this spline is crossing the complete space

splineCK.prototype.createAstraSpline = function (x, y, z, anzPoints, sphereRadius,pic) {

    var min, max;

    for (var ii = 0; ii != anzPoints; ++ii) {

        var xp = new THREE.Vector3(0, 0, 0);

        max = sphereRadius / 3 ;
        min = 10000;

        xp.x = Math.floor(Math.random() * ((max - min) + 1) + min);
        xp.y = Math.floor(Math.random() * ((max - min) + 1) + min);
        xp.z = Math.floor(Math.random() * ((max - min) + 1) + min);

        console.log("RandomSplineCoordinate(XYZ): " + xp.x + " " + xp.y + " " + xp.z);

        this.astraPoints.push(xp);
    }

    this.astraSpline = new THREE.SplineCurve3(this.astraPoints);

    // Generate geometry for a tube using our spline.
    var segments = 800;
    var radius = 200;
    var radiusSegments = 100;

    var geometry = new THREE.TubeGeometry(this.astraSpline, segments, radius, radiusSegments, false);
    var particileSystem = this.createParticleSystem(pic,geometry);
    particileSystem.position.set(x, y, z);
    return particileSystem; // this spline we add to the scene!

}




splineCK.prototype.makeTrefoilKnot = function () {
    var scale = 100;
    var xp;
    var t = 40;


    for (var ii = 0; ii != 10; ++ii) {
        t *= Math.PI * 2;
        var tx = (2 + Math.cos(3 * t)) * Math.cos(2 * t),
            ty = (2 + Math.cos(3 * t)) * Math.sin(2 * t),
            tz = 4 * Math.sin(3 * t); // to avoid overlap

        xp = new THREE.Vector3(tx, ty, tz).multiplyScalar(scale);
        console.log("makeTrefoilKnot(XYZ): " + xp.x + " " + xp.y + " " + xp.z);
        this.points.push(xp);
    }

};



splineCK.prototype.generateTHEspline = function (pic) {

    // numPoints, segments, radius, radiusSegments
    // Generate a spline from our points.
    this.spline_c = new THREE.SplineCurve3(this.points);

    // Generate geometry for a tube using our spline.
    var segments = 700;
    var radius = 100;
    var radiusSegments = 100;

    var geometry = new THREE.TubeGeometry(this.spline_c, segments, radius, radiusSegments, false);
    var particileSystem = this.createParticleSystem(pic,geometry);

    return particileSystem; // this spline we add to the scene!

};

// ParticleBasicMaterial  renamed to three.PointCloudMaterial
splineCK.prototype.createParticleSystem = function (pic,geometry) {
    var material = new THREE.PointCloudMaterial({
        color: 0xffffff,
        size: 4,
        transparent: true,
        blending: THREE.AdditiveBlending,
        map: new THREE.ImageUtils.loadTexture(pic)
    });


    // ParticleSystem  to PointCloud(
    var system = new THREE.PointCloud(geometry, material);
    system.sortParticles = true;

    return system;
};
