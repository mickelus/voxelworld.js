
// remove selection cursor
document.onselectstart = function() {
	return false;
};



var renderer = new GameRenderer();
renderer.beginRendering();
var testChunk = new Chunk(0,0,0);
renderer.drawChunk(testChunk);

