
var block_size = 30;
var player;
var sys;

function resize(){
	var entities = sys.ents;
	Vec2.set(window.innerWidth, window.innerHeight, sys.dim);

	var bs = block_size;
	Vec2.set(Math.floor(sys.dim[0]/bs)*bs, Math.floor(sys.dim[1]/bs)*bs, sys.dim);

	c.width = sys.dim[0];
	c.height = sys.dim[1];

	for(i = 0; i < entities.length; i++){
		Vec2.mod(sys.dim, entities[i].x);
	}
	sys.grid.resize(bs, sys.dim[0], sys.dim[1]);
}

function main(){
	update();
	draw();
}

function update(){
	var i;

	var entities = sys.ents;
	player.apply_forces(sys);
	for(i = 0; i < entities.length; i++){
		entities[i].apply_forces(sys);
	}
	player.update(sys);
	for(i = 0; i < entities.length; i++){
		entities[i].update(sys);
	}

	var dead = [];
	for(i = 0; i < entities.length; i++){
		if(entities[i].dead) dead.push(entities[i]);
	}

	for(i = 0; i < dead.length; i++){
		entities.splice(entities.indexOf(dead[i]),1);
	}
}

function draw(){
	var entities = sys.ents;
	ctx.fillStyle = "rgba(0,0,0, 0.2)";
	ctx.fillRect(0,0, sys.dim[0], sys.dim[1]);

	for(var i = 0; i< entities.length; i++){
		entities[i].draw();
	}
	player.draw();
}

function setup(){
	player = new Ship({});
	sys = {
		ents: [],
		dim: Vec2.create(300,300),
		vdim: Vec2.create(4, 4),
		grid: new Grid(),
		predator: player,
	};

	var interval_length = (1/40)*1000 ;
	window.onresize = resize;
	resize();
	for(var i = 0; i < 500; i++){
		var e = new Entity({
			grid: sys.grid,
			mtype: Math.random() > .2 ? 0 : 1
		});
		sys.ents.push(e);
	}

	$(document)
		.on("keydown", function (e) {
	    	player.control(e.which, 1);
		})
		.on("keyup", function (e) {
	    	player.control(e.which, 0);
		});

	var interval = setInterval(main, interval_length);
}
