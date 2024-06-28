/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 ** modified: // CK in case of select and move we disable the controls!!
    controls = new THREE.FirstPersonControls(camera_c, renderer.domElement,container_c);
 */

THREE.FirstPersonControls = function ( object, domElement,container, camera ) {

    this.object = object;
    this.container = container;
    this.camera = camera;
    this.target = new THREE.Vector3( 0, 0, 0 );

    this.domElement = ( domElement !== undefined ) ? domElement : document;

    this.enabled = true;

    this.movementSpeed = 1.0;
    this.lookSpeed = 0.005;

    this.lookVertical = true;
    this.autoForward = false;

    this.activeLook = true;

    this.heightSpeed = false;
    this.heightCoef = 1.0;
    this.heightMin = 0.0;
    this.heightMax = 1.0;

    this.constrainVertical = false;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;

    this.autoSpeedFactor = 0.0;

    this.mouseX = 0;
    this.mouseY = 0;

    this.lat = 0;
    this.lon = 0;
    this.phi = 0;
    this.theta = 0;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    this.mouseDragOn = false;

    this.viewHalfX = 0;
    this.viewHalfY = 0;

    if ( this.domElement !== document ) {

        this.domElement.setAttribute( 'tabindex', -1 );

    }

    //

    this.handleResize = function () {

        if ( this.domElement === document ) {

            this.viewHalfX = window.innerWidth / 2;
            this.viewHalfY = window.innerHeight / 2;

        } else {

            this.viewHalfX = this.domElement.offsetWidth / 2;
            this.viewHalfY = this.domElement.offsetHeight / 2;

        }

    };

    this.onMouseDown = function ( event ) {

        // CK
        //var objects = [];    // store the objects which will be selectable! is used in FirstPersonControl
        //var plane;            // see FirstPersonControl ( we click and move the object to the NEW position )
        var vector = new THREE.Vector3( mouseR.x, mouseR.y, 0.5 ).unproject( this.camera );
        var raycaster = new THREE.Raycaster( this.camera.position, vector.sub( this.camera.position ).normalize() );
        var intersects = raycaster.intersectObjects( objects );

        try{
            if ( intersects.length > 0 ) {

                        controls.enabled = false;            // CK in case of select and move we disable the controls!!
                        SELECTED = intersects[ 0 ].object;

                        var intersects = raycaster.intersectObject( plane );
                        offsetR.copy( intersects[ 0 ].point ).sub( plane.position );
                        this.container.style.cursor = 'move';

            } else
            {
                if ( this.domElement !== document ) {
                    this.domElement.focus();
                }

                event.preventDefault();
                event.stopPropagation();

                if ( this.activeLook ) {
                    switch ( event.button ) {
                        case 0: this.moveForward = true; break;
                        case 2: this.moveBackward = true; break;
                    }
                }
                this.mouseDragOn = true;
            }
        } catch (e) {
                controls.enabled = true;
                console.log("this.onMouseDown: " +  e.message);
        }
    };

    this.onMouseUp = function ( event ) {

        event.preventDefault();

        controls.enabled = true;        // CK: Now the controls can get enabled again!!

        this.container.style.cursor = 'auto';

        // CK THIS is the Raycaster

        try{
            if ( INTERSECTED ) {
                    plane.position.copy( INTERSECTED.position );
                    // CK:: we click and move the object to the NEW position
                    //setTheVideoCubeParameters( CamCube.scale.x,CamCube.scale.y,CamCube.scale.z,  Math.floor(CamCube.position.x), Math.floor(CamCube.position.y), Math.floor(CamCube.position.z));
                    SELECTED = null;

            } else
            {
                event.stopPropagation();
                if ( this.activeLook ) {
                    switch ( event.button ) {
                        case 0: this.moveForward = false; break;
                        case 2: this.moveBackward = false; break;
                    }
                }
                this.mouseDragOn = false;
            }
        } catch (e) {
                console.log("this.onMouseUp: " +  e.message);
        }

    };

    this.onMouseMove = function ( event ) {

        mouseR.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseR.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouseR, this.camera);

        try{
            if (SELECTED) {
                    var intersects = raycaster.intersectObject(plane);
                    SELECTED.position.copy(intersects[0].point.sub(offsetR));
                    return;
            } else
            {
                if ( this.domElement === document ) {
                    this.mouseX = event.pageX - this.viewHalfX;
                    this.mouseY = event.pageY - this.viewHalfY;
                } else {
                    this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
                    this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
                }
            }

            var intersects = raycaster.intersectObjects(objects);

            if (intersects.length > 0) {
                    if (INTERSECTED != intersects[0].object) {
                        INTERSECTED = intersects[0].object;
                        plane.position.copy(INTERSECTED.position);
                        plane.lookAt(this.camera.position);
                    }
                    this.container.style.cursor = 'pointer';
            } else {
                    INTERSECTED = null;
                    this.container.style.cursor = 'auto';
            }

         } catch (e) {
                console.log("this.onMouseMove: " +  e.message);

         }
    };

    this.onKeyDown = function ( event ) {

        //event.preventDefault();

        switch ( event.keyCode ) {

            case 38: /*up*/
            case 87: /*W*/ this.moveForward = true; break;

            case 37: /*left*/
            case 65: /*A*/ this.moveLeft = true; break;

            case 40: /*down*/
            case 83: /*S*/ this.moveBackward = true; break;

            case 39: /*right*/
            case 68: /*D*/ this.moveRight = true; break;

            case 82: /*R*/ this.moveUp = true; break;
            case 70: /*F*/ this.moveDown = true; break;

        }

    };

    this.onKeyUp = function ( event ) {

        switch ( event.keyCode ) {

            case 38: /*up*/
            case 87: /*W*/ this.moveForward = false; break;

            case 37: /*left*/
            case 65: /*A*/ this.moveLeft = false; break;

            case 40: /*down*/
            case 83: /*S*/ this.moveBackward = false; break;

            case 39: /*right*/
            case 68: /*D*/ this.moveRight = false; break;

            case 82: /*R*/ this.moveUp = false; break;
            case 70: /*F*/ this.moveDown = false; break;

        }

    };

    this.update = function( delta ) {

        if ( this.enabled === false ) return;

        if ( this.heightSpeed ) {

            var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
            var heightDelta = y - this.heightMin;

            this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

        } else {

            this.autoSpeedFactor = 0.0;

        }

        var actualMoveSpeed = delta * this.movementSpeed;

        if ( this.moveForward || ( this.autoForward && !this.moveBackward ) ) this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
        if ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );

        if ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );
        if ( this.moveRight ) this.object.translateX( actualMoveSpeed );

        if ( this.moveUp ) this.object.translateY( actualMoveSpeed );
        if ( this.moveDown ) this.object.translateY( - actualMoveSpeed );

        var actualLookSpeed = delta * this.lookSpeed;

        if ( !this.activeLook ) {

            actualLookSpeed = 0;

        }

        var verticalLookRatio = 1;

        if ( this.constrainVertical ) {

            verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

        }

        this.lon += this.mouseX * actualLookSpeed;
        if ( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

        this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
        this.phi = THREE.Math.degToRad( 90 - this.lat );

        this.theta = THREE.Math.degToRad( this.lon );

        if ( this.constrainVertical ) {

            this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );

        }

        var targetPosition = this.target,
            position = this.object.position;

        targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
        targetPosition.y = position.y + 100 * Math.cos( this.phi );
        targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

        this.object.lookAt( targetPosition );


    };


    this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

    this.domElement.addEventListener( 'mousemove', bind( this, this.onMouseMove ), false );
    this.domElement.addEventListener( 'mousedown', bind( this, this.onMouseDown ), false );
    this.domElement.addEventListener( 'mouseup', bind( this, this.onMouseUp ), false );

    window.addEventListener( 'keydown', bind( this, this.onKeyDown ), false );
    window.addEventListener( 'keyup', bind( this, this.onKeyUp ), false );

    function bind( scope, fn ) {

        return function () {

            fn.apply( scope, arguments );

        };

    };

    this.handleResize();

};
