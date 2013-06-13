Chunk.CHUNKSIZE = 16;


function Chunk(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.blocks = new Array();
	for(var x = 0; x < Chunk.CHUNKSIZE; x++) {
		this.blocks[x] = new Array();
		for(var y = 0; y < Chunk.CHUNKSIZE; y++) {
			this.blocks[x][y] = new Array();
			
		}
	}
	
	/*
	for(var x = 0; x < Chunk.CHUNKSIZE; x++) {
		for(var z = 0; z < Chunk.CHUNKSIZE; z++) {
			for(var y = 0; y < Chunk.CHUNKSIZE - Math.floor((x+z)/6); y++) {
				if(y == Chunk.CHUNKSIZE - Math.floor((x+z)/6) -1) {
					this.blocks[x][y][z] = new Block(BlockTypes.GRASS);
				} else {
					this.blocks[x][y][z] = new Block(BlockTypes.DIRT);
				}
				
			}
		}
	}*/
	/*for(var i = 0; i < Chunk.CHUNKSIZE; i++) {
		this.blocks[i] = new Array();
		for(var j = 0; j < Chunk.CHUNKSIZE; j++) {
			this.blocks[i][j] = new Array();
			
			for(var k = 0; k < Chunk.CHUNKSIZE; k++) {
				if(j==Chunk.CHUNKSIZE-1) {
					this.blocks[i][j][k] = new Block(BlockTypes.GRASS);
				} else {
					this.blocks[i][j][k] = new Block(BlockTypes.DIRT);
				}
				
			}
		}
	}*/

	for(var i = 0; i < Chunk.CHUNKSIZE; i++) {
		for(var j = 0; j < Chunk.CHUNKSIZE; j++) {
			var p = Math.round((PerlinNoise_2D(this.x + i,this.z + j) + 1) * 2) + 8;
			this.blocks[i][p][j] = new Block(BlockTypes.GRASS);
			for(var h = 0; h < p; h++) {
				this.blocks[i][h][j] = new Block(BlockTypes.DIRT);
			}
		}
	}
	
	this.getBlock = function(x, y, z) {
		return this.blocks[x][y][z];
	}
}
