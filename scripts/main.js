
// remove selection cursor
document.onselectstart = function() {
	return false;
};



var renderer = new GameRenderer();
renderer.beginRendering();
var testChunk = new Chunk(0,0,0);
renderer.drawChunk(testChunk);
testChunk = new Chunk(16,0,0);
renderer.drawChunk(testChunk);
testChunk = new Chunk(16,0,-16);
renderer.drawChunk(testChunk);
testChunk = new Chunk(0,0,-16);
renderer.drawChunk(testChunk);