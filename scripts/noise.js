/*
	integer x
	integer y
*/
function Noise(x, y){
    var n = x + y * 57;
    n = (n<<13) ^ n;
    return ( 1.0 - ( (n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);    
}

/*
	float x
	float y
*/
function SmoothNoise(x, y) {
    var corners = ( Noise(x-1, y-1)+Noise(x+1, y-1)+Noise(x-1, y+1)+Noise(x+1, y+1) ) / 16;
    var sides   = ( Noise(x-1, y)  +Noise(x+1, y)  +Noise(x, y-1)  +Noise(x, y+1) ) /  8;
    var center  =  Noise(x, y) / 4;
    return corners + sides + center;
}

/*
	float x
	float y
*/
function InterpolatedNoise(x, y){
    var integer_X    = Math.floor(x);
    var fractional_X = x - integer_X;

    var integer_Y    = Math.floor(y);
    var fractional_Y = y - integer_Y;

    var v1 = SmoothNoise(integer_X,     integer_Y);
    var v2 = SmoothNoise(integer_X + 1, integer_Y);
    var v3 = SmoothNoise(integer_X,     integer_Y + 1);
    var v4 = SmoothNoise(integer_X + 1, integer_Y + 1);

    var i1 = Interpolate(v1 , v2 , fractional_X);
    var i2 = Interpolate(v3 , v4 , fractional_X);

    return Interpolate(i1, i2, fractional_Y);
}

function Interpolate(a, b, x){
	var ft = x * 3.1415927;
	var f = (1 - Math.cos(ft)) * 0.5;

	return  a*(1-f) + b*f;
}

/*
	float x
	float y
*/
function PerlinNoise_2D(x, y) {
    var total = 0;
    var p = 0.5;
    var n = 3 - 1;

    for(var i = 0; i < n; i++){
        var frequency = Math.pow(2,i);
        var amplitude = Math.pow(p,i);

        total = total + InterpolatedNoise(x * frequency, y * frequency) * amplitude;
    }

    return total;
}

function testNoise(){
	var q = [];
	for(var i = 0; i < 100; i++) {
		for(var n = 0; n < 100; n++) {
			q[n] = PerlinNoise_2D(i,n);
		}
		console.log(q);
	}
}