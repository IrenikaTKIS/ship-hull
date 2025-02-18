// Some helper methods for the examples

//var scene, camera, renderer;

function threeSetup(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 20;
    camera.up.set( 0, 0, 1 );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var ambientLight = new THREE.AmbientLight( 0xbbbbbb );
    scene.add( ambientLight );

    var lights = [];
    lights[0] = new THREE.PointLight( 0xececec, 0.25, 0 );
    lights[1] = new THREE.PointLight( 0xececec, 0.25, 0 );
    lights[2] = new THREE.PointLight( 0xececec, 0.25, 0 );

    lights[0].position.set( 0, 100, 0 );
    lights[1].position.set( 100, 200, 100 );
    lights[2].position.set( -100, -200, -100 );

    scene.add( lights[0] );
    scene.add( lights[1] );
    scene.add( lights[2] );
}

function threeRender(){
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    function render() {
        requestAnimationFrame( render );
        renderer.render( scene, camera );
    }
    render();
}

function addCurveToScene(geom, material){
    material = material || new THREE.LineBasicMaterial({ linewidth: 2, color: 0x4c4c4c});
    scene.add( new THREE.Line( geom, material ) );
}

function addMeshToScene(mesh, material, wireframe ){
    material = material || 
/*		new THREE.MeshNormalMaterial( { side: THREE.DoubleSide, wireframe: true, shading: THREE.SmoothShading, transparent: true, opacity: 0.2 } )
*/
      new THREE.MeshPhongMaterial({
                               specular: '#555555',
                               color: '#cc3333',
                               side: THREE.DoubleSide,
                               ambient: '#aaaaaa',
                               emissive: '#111111',
                               shininess: 20,
							   transparent: false, opacity: 0.85
                             });

    scene.add( new THREE.Mesh( mesh, material ) );

    if (wireframe){
        var material2 = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide, wireframe: true } );
        var mesh2 = new THREE.Mesh( mesh, material2 );
        scene.add( mesh2 );
    }
}

function asVector3(pts){
    return pts.map(function(x){
        return new THREE.Vector3(x[0],x[1],x[2]);
    });
}

function asGeometry(threePts){
    var geometry = new THREE.Geometry();
    geometry.vertices.push.apply( geometry.vertices, threePts );
    return geometry;
}

function benchmark(func, runs){
	var d1 = Date.now();
	for (var i = 0 ; i < runs; i++)
		res = func();
	var d2 = Date.now();
	return { result : res, elapsed : d2-d1, each : (d2-d1)/runs };
}

function pointsAsGeometry(pts){
    return asGeometry( asVector3(pts) )
}

function addPointsToScene(pts){

    var geom = asGeometry( asVector3( pts ) );
    var cloudMat2 = new THREE.PointCloudMaterial({ size: 20.0, sizeAttenuation: false, color: 0x336611 });
    var cloud2 = new THREE.PointCloud( geom, cloudMat2 );

    scene.add( cloud2 );
}

