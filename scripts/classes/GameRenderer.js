GameRenderer.BlockColors = {}
GameRenderer.BlockColors[BlockTypes.GRASS] = 0x00ff00;
GameRenderer.BlockColors[BlockTypes.STONE] = 0x999999;
GameRenderer.BlockColors[BlockTypes.DIRT] = 0xccaa99;


function GameRenderer() {
	console.log("NEW RENDERER")
	// basic setup
	var scene = new THREE.Scene();
	//var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
	
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	
	// noodly appendage
	document.body.appendChild( renderer.domElement );
	
	// default camera position
	/*camera.position.z = 10;
	camera.position.x = 10;
	camera.position.y = 10;
	camera.lookAt(new THREE.Vector3(0,0,0));*/
	
	var aspectRatio = window.innerWidth/innerHeight;
	
	var camera = new THREE.OrthographicCamera(
		-32*aspectRatio,
		32*aspectRatio,
		32,
		-32,
		0, 50 );
	camera.position.x = 20;
	camera.position.y = 25;
	camera.position.z = 20;
	camera.lookAt(new THREE.Vector3(0,0,0));
	this.camera = camera;
	
	// let there be light!
	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.x = 60;
	pointLight.position.y = 80;
	pointLight.position.z = 70;
	scene.add(pointLight);
	
	
	
	// render loop
	var render = function() {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	
	this.beginRendering = function() {
		render();
	}
	
	/**
	 * CreateVoxel
	 * Creates a voxel, using a Vec3 or 3 coordinates aswell as a color.
	 * var1 : A THREE.Vector3 representing a position in the world or an integer
	 * 	representing the x coordinate
	 * var2 : An integer representing the y coordinate or the color of the block
	 * var3 : An integer representing the z coordinate or undefined if var1 is a
	 * 	vector
	 * var4 : A color if var1 is not a vector
	 */
	this.createVoxel = function(var1, var2, var3, var4) {
		var geometry = new THREE.CubeGeometry(1,1,1);
		var material;
		var voxel;
		if(var3 == undefined) {
			material = new THREE.MeshLambertMaterial( { color: var2 } );
			voxel = new THREE.Mesh( geometry, material );
			voxel.position = var1;
		} else {
			material = new THREE.MeshLambertMaterial( { color: var4 } );
			voxel = new THREE.Mesh( geometry, material );
			voxel.position.x = var1;
			voxel.position.y = var2;
			voxel.position.z = var3;
		}

		return voxel;
	}
	
	/**
	 * drawChunk
	 * Draws a chunk in the world
	 */
	this.drawChunk = function(chunk) {
		console.log("test")
		var mergedGeometry;
		for(var x = 0; x < Chunk.CHUNKSIZE; x++) {
			for(var y = 0; y < Chunk.CHUNKSIZE; y++) {
				for(var z = 0; z < Chunk.CHUNKSIZE; z++) {
					if(chunk.getBlock(x,y,z) != undefined) {
						scene.add(this.createVoxel(
							x+chunk.x*Chunk.CHUNKSIZE,
							y+chunk.y*Chunk.CHUNKSIZE,
							z+chunk.z*Chunk.CHUNKSIZE,
							GameRenderer.BlockColors[
								chunk.getBlock(x,y,z).getType()
							]
						));
						/*if(mergedGeometry == undefined) {
							mergedGeometry = block;
						} else {
							console.log("PRE")
							console.log(mergedGeometry);
							mergedGeometry = THREE.GeometryUtils.merge(mergedGeometry, block);
							console.log("POST")
							console.log(mergedGeometry);
						}*/
						
					}
					
				}
			}
		}
		//chunkGeometry.position = new THREE.Vector3(0,0,0);
		//scene.add(mergedGeometry);
	}
	
	return this;
}
