var Detector = function () {
        var g = !!window.CanvasRenderingContext2D,
            a;
        try {
            a = !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl")
        } catch (i) {
            a = !1
        }
        return {
            canvas: g,
            webgl: a,
            workers: !!window.Worker,
            fileapi: window.File && window.FileReader && window.FileList && window.Blob,
            getWebGLErrorMessage: function () {
                var a = document.createElement("div");
                a.id = "webgl-error-message";
                a.style.fontFamily = "monospace";
                a.style.fontSize = "13px";
                a.style.fontWeight = "normal";
                a.style.textAlign = "center";
                a.style.background = "#fff";
                a.style.color = "#000";
                a.style.padding = "1.5em";
                a.style.width = "400px";
                a.style.margin = "5em auto 0";
                this.webgl || (a.innerHTML = window.WebGLRenderingContext ? 'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.' : 'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.');
                return a
            },
            addGetWebGLMessage: function (a) {
                var g, c, a = a || {};
                g = void 0 !== a.parent ? a.parent : document.body;
                a = void 0 !== a.id ? a.id : "oldie";
                c = Detector.getWebGLErrorMessage();
                c.id = a;
                g.appendChild(c)
            }
        }
    }(),
    Threesy = function () {
        function g() {
            for (var b in e) a.removeFromScene(e[b]), delete e[b], b = null;
            e = []
        }
        var a = {},
            i = window.innerWidth ? window.innerWidth : 550,
            l = window.innerHeight ? window.innerHeight : 400,
            q = i / l,
            c = [],
            e = [],
            r = new THREE.Projector,
            j, m, k, f = 0,
            n = 4,
            p, h = null;
        a.camera = null;
        a.scene = null;
        a.renderer = null;
        a.defaultLightRef =
            "defaultLight";
        a.viewWidth = null;
        a.viewHeight = null;
        a.webgl = Detector.webgl;
        a.init = function (b, d, e) {
            void 0 === b ? console.log("**** [ ERROR : Init Properties Undefined ] ****") : (p = b, a.viewWidth = d, a.viewHeight = e, null === a.scene && (a.scene = new THREE.Scene), null === a.renderer && (a.renderer = a.webgl ? new THREE.WebGLRenderer({
                    antialias: !1,
                    precision: "mediump",
                    maxLights: n
                }) : new THREE.CanvasRenderer), 1 > f && a.addLight(new THREE.AmbientLight(16777215), !1, a.defaultLightRef), null != h && (a.renderer._microCache = h, h = null), null ===
                a.camera && (a.addCamera(new THREE.PerspectiveCamera(45, q, 1, 1E4)), a.camera.position.z = 1E3), a.viewWidth = null === a.viewWidth ? i : a.viewWidth, a.viewHeight = null === a.viewHeight ? l : a.viewHeight, a.renderer.setSize(a.viewWidth, a.viewHeight), p.appendChild(a.renderer.domElement), console.log("***** [ Threasy.js Initiated ] *****"))
        };
        a.setSceneProperties = function (b, d) {
            a.renderer || (void 0 !== b && (a.renderer = b), void 0 !== d && (a.camera = d))
        };
        a.addCamera = function (b) {
            null !== a.camera && (a.removeFromScene(a.camera), a.camera = null);
            a.camera = b;
            a.addToScene(a.camera, void 0)
        };
        a.addLight = function (b, d, c) {
            void 0 === c && (c = "light" + f++);
            d && (g(), f = 0);
            void 0 !== e[c] && (a.removeFromScene(e[c]), e[c] = null, f--);
            b.ref = c;
            e[c] = b;
            a.addToScene(b, void 0);
            f++
        };
        a.lights = function () {
            var a = [],
                d;
            for (d in e) a.push(e[d]);
            return a
        };
        a.removeLight = function (b, d, c) {
            if (c) g();
            else {
                var b = void 0 === d && b.ref ? b.ref : d,
                    f;
                for (f in e) f === b && (a.removeFromScene(e[f]), delete e[f], f = null)
            }
        };
        a.totalLights = function () {
            return f
        };
        a.getLight = function (a) {
            if (e[a]) return e[a]
        };
        a.logLights =
            function () {
                for (var a in e) console.log("*** [ Light ID ::  " + a + " ] ***")
        };
        a.maxLights = function (a) {
            n = a
        };
        a.addToScene = function (b, d) {
            a.scene && a.scene.add(b);
            void 0 !== d && (c[d] = b)
        };
        a.removeFromScene = function (b) {
            a.scene && a.scene.remove(b)
        };
        a.removeFromSceneByID = function (b) {
            for (var d in c) d === b && (a.removeFromScene(c[d]), delete c[d], d = null)
        };
        a.logScene = function () {
            for (var a in c) console.log("*** [ Object ID ::  " + a + " ] ***")
        };
        a.getObjectInBounds = function (b, d) {
            a.camera.updateMatrixWorld();
            j = new THREE.Vector3(2 *
                (b / window.innerWidth) - 1, 2 * -(d / window.innerHeight) + 1, 0.5);
            r.unprojectVector(j, a.camera);
            m = new THREE.Ray(a.camera.position, j.subSelf(a.camera.position).normalize());
            k = m.intersectObjects(a.scene.children);
            if (0 < k.length) return k[0]
        };
        a.sliceTexture = function (b, d, c, e, f, g, h) {
            var i = b.image.width,
                j = b.image.height;
            g && (b = b.clone());
            a.renderer._microCache && h && (b = a.renderer._microCache.set(h, b));
            b.repeat.x = e / i;
            b.repeat.y = f / j;
            b.offset.x = Math.abs(d) / i;
            b.offset.y = Math.abs(c) / j;
            b.needsUpdate = !0;
            return b
        };
        a.clearRenderer =
            function () {
                a.renderer.clear()
        };
        a.addMicroCache = function (b) {
            a.renderer ? a.renderer._microCache = b : h = b
        };
        a.render = function () {
            a.renderer && a.renderer.render(a.scene, a.camera)
        };
        a.dispose = function () {
            g();
            a.removeFromScene(a.camera);
            for (var b in c) removeFromScene(c[b]);
            a.clearRenderer();
            a.camera = null;
            a.scene = null;
            a.renderer = null;
            a.viewWidth = null;
            a.viewHeight = null;
            c = [];
            e = [];
            f = 0
        };
        return a
    }();
