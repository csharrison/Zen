/*
	dx/dt = v
	dv/dt = a
	da/dt = 1
*/
var color = "rgb(200,0,0)";
var length = 5;
var width = 5;
var _h = Vec2.create(0,0);
var _j = Vec2.create(0,0);
var _acc = Vec2.create(0,0);
var _xacc = Vec2.create(0,0);
var _racc = Vec2.create(0,0);


var Entity = function(dict){
	this.r = dict.r || 3;
	this.x = dict.x || Vec2.create(100,100);
	this.v = dict.v || Vec2.create(1,.5);
	this.a = dict.a || Vec2.create(0, 0);
	this.col= dict.col ||  "rgb(200,0,0)";;

	Vec2.randomize(0,3000, this.x);
	Vec2.randomize(-1,1, this.v);
	Vec2.mod(sys.dim, this.x);

	if(! dict.grid) throw "Entity needs a grid";
	this.grid = dict.grid.bind(this);

	this.neighbors = [];
	this.mtype = 1;

	this.max_v = 1.5;

};

Entity.prototype.apply_forces = function(){
		var me = this;
		var neighbors = this.grid.get_neighbors(this.x[0], this.x[1], 30).to_list();
		var i;
		Vec2.set(0,0,me.a);
		Vec2.set(0,0,_acc);
		Vec2.set(0,0, _xacc);
		Vec2.set(0,0, _racc);
		Vec2.set(0,0, _h);
		neighs = 0;
		xneighs = 0;
		rneighs = 0;
		for(i = 0; i < neighbors.length; i++){
			var e = neighbors[i];
			if (me === e) continue;
			var d = Vec2.distance(me.x, e.x);
			/* flocking force */
			if(d < 10 ){//* (me.r + e.r)){
				Vec2.add(_acc, e.v, _acc);
				neighs++;
			}


			if(d < me.r + e.r + 2){
				rneighs++;
				/*repulsion force*/
				//me.color = "rgb(0,200,0)";
				//e.color = "rgb(0,200,0)";
				Vec2.add(_racc, e.x, _racc);

				/*Vec2.subtract(me.x, e.x, _h);

				ep = 10;
				Vec2.scale(_h, ep * Math.pow((1 - d/(me.r + e.r)), 3/2), _h)

				Vec2.add(me.a, _h, me.a);
				*/
			}
			else if(d < 30){//* (me.r + e.r)){
				Vec2.add(_xacc, e.x, _xacc);
				xneighs++;
			}
		}
		/* apply the flocking force (10,-10,30) gives good cycles */
		alpha = 10;
		beta = -10;
		gamma = 30;

		len = Vec2.length(_acc);
		if(neighs !== 0){
			Vec2.add(me.v, _acc, _acc);
			Vec2.scale(_acc, alpha/neighs, _acc);
			Vec2.add(me.a, _acc, me.a);
		}

		if(xneighs !== 0){
			// Vec2.add(_xacc, me.x, _xacc);
			Vec2.scale(_xacc, 1/(xneighs ), _xacc);
			Vec2.subtract(me.x, _xacc, _xacc);

			Vec2.normalize(_xacc, _xacc);
			Vec2.scale(_xacc, beta, _xacc);
			Vec2.add(me.a, _xacc, me.a);
		}
		if(rneighs !== 0){
			Vec2.scale(_racc, 1/(rneighs ), _racc);
			Vec2.subtract(me.x, _racc, _racc);

			Vec2.normalize(_racc, _racc);
			Vec2.scale(_racc, gamma, _racc);
			Vec2.add(me.a, _racc, me.a);
		}

		var pred = sys.predator;
		var preddist = Vec2.distance(me.x, pred.x);
		if(preddist < 100){
			me.col = "blue";
			Vec2.normal(pred.v, _h);
			Vec2.add(me.x, _h, _j);
			var d1 = Vec2.distance(_j, pred.x);
			Vec2.scale(_h, -1, _h);
			Vec2.add(me.x, _h, _j);
			var d2 = Vec2.distance(_j, pred.x);


			Vec2.normal(pred.v, _h);

			if(d1 < d2){
				Vec2.scale(_h, -1, _h);
			}

			if(d > 0) Vec2.scale(_h, 200/d, _h);

			Vec2.add(me.a, _h, me.a);

			if(1 || Vec2.length(pred.v) < pred.max_v / 2){
				Vec2.subtract(me.x, pred.x, _racc);
				Vec2.scale(_racc, .1, _racc);
				Vec2.add(me.a, _racc, me.a);
			}
		}else{
			me.col = "red";
		}
		/* noise force */
		//Vec2.randomize_gauss(0,.0001, _h);
		//Vec2.add(me.a, _h, me.a);

		if(Vec2.length(me.a) > .5){
			Vec2.normalize(me.a, me.a);
			Vec2.scale(me.a, .5, me.a);
		}


		if(isNaN(me.a[0])) debugger;
};

Entity.prototype.update = function(){
	Vec2.add(this.v, this.a, this.v);
	if(Vec2.length(this.v) > this.max_v){
		Vec2.normalize(this.v, this.v);
		Vec2.scale(this.v, this.max_v,  this.v);
	}
	Vec2.add(this.x, this.v, this.x);

	Vec2.mod(sys.dim, this.x);


	this.grid.update(this);
};

Entity.prototype.draw = function(){
	ctx.fillStyle = this.col;

	ctx.beginPath();
	ctx.arc(this.x[0], this.x[1], this.r, 2*Math.PI, false);
	ctx.fill();
};