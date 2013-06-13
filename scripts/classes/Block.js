BlockTypes = {
	GRASS : 1,
	STONE : 2,
	DIRT : 3
};


function Block(type) {
	this.type = type;
	this.data = {};
	
	this.getType = function() {
		return type;
	}
	
	this.setData = function(key, value) {
		this.data[key] = value;
	}
	
	this.getData = function(key) {
		return this.data[key];
	}
	
	return this;
}
