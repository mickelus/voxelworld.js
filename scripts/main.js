
// remove selection cursor
document.onselectstart = function() {
	return false;
};



var renderer = new GameRenderer();
renderer.beginRendering();

renderer.drawChunk(new Chunk(0,0,0));
renderer.drawChunk(new Chunk(1,0,0));
renderer.drawChunk(new Chunk(0,0,1));


