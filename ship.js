
var Ship = function(dict){
	this.x = dict.x || Vec2.create(100,100);
	this.v = Vec2.create(0,0);
	this.a = Vec2.create(0,0);
	this.max_v = 2.3;
	this.r = 2;
	this.thrusters = [0,0,0,0];
}
Ship.prototype.apply_forces = function(){
	var ax = this.thrusters[2] - this.thrusters[0];
	var ay = this.thrusters[3] - this.thrusters[1];

	var scale = .5;
	Vec2.set(ax * scale, ay * scale, this.a);
}

Ship.prototype.update = function(){
	Vec2.add(this.v, this.a, this.v);
	var len = Vec2.length(this.v);

	Vec2.scale(this.v, .98, this.v);
	if(Vec2.length(this.v) > this.max_v){
		Vec2.normalize(this.v, this.v);
		Vec2.scale(this.v, this.max_v,  this.v);
	}
	Vec2.add(this.x, this.v, this.x);

	Vec2.mod(sys.dim, this.x);

}

Ship.prototype.draw = function(){
	ctx.fillStyle = "yellow";

	ctx.beginPath();
	ctx.arc(this.x[0], this.x[1], this.r, 2*Math.PI, false);
	ctx.fill();
}

Ship.prototype.control = function(keycode, val){
	if(keycode == 37) this.thrusters[0] = val;
	else if(keycode == 38) this.thrusters[1] = val;
	else if(keycode == 39) this.thrusters[2] = val;
	else if(keycode == 40) this.thrusters[3] = val;
}
