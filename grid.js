var Grid = function(){
	this.list = [];
	this.size = 0;
	this.dimx = 0;
	this.dimy = 0;

	this.xl = 0;
	this.yl = 0;
	return this;
}

Grid.prototype.bind = function(element){
	var block = this.get(element.x[0], element.x[1]);
	element.block = block;
	block.add(element);
	return this;
}

Grid.prototype.resize = function(block_size, dimx, dimy){
	this.size = block_size;
	this.dimx = dimx;
	this.dimy = dimy;

	this.list = [];
	for(var i = 0; i < dimy/block_size ; i++){
		var row = [];
		for(var j = 0; j < dimx/block_size ; j++){
			var s = new Set();
			row.push(s);
		}
		this.list[i] = row;
	}
	this.xl = this.list[0].length;
	this.yl = this.list.length;
}

Grid.prototype.get = function(screenx, screeny){
	block_x = Math.floor(screenx/this.size);
	block_y = Math.floor(screeny/this.size);
	return this.list[block_y][block_x];
}

Grid.prototype.remove = function(elt){
	elt.block.remove(elt);
}

Grid.prototype.set = function(elt, old_set, new_set){
	old_set.remove(elt);
	new_set.add(elt);
	elt.block = new_set;
}

Grid.prototype.update = function(elt){
	var block = this.get(elt.x[0], elt.x[1]);
	if(block != elt.block){
		this.set(elt, elt.block, block);
	}
}

Grid.prototype.get_neighbors = function(sx,sy, size){
	size = size || this.size;
	var stride = Math.max(Math.ceil(size/this.size),1);
	var s,x,y;

	sx = mod(sx, this.dimx * this.size);
	sy = mod(sy, this.dimy * this.size);

	x = Math.floor(sx/this.size);
	y = Math.floor(sy/this.size);
	s = this.list[y][x];
	for(var xx = x-stride; xx <= x+stride; xx++){
		for(var yy = y - stride; yy <= y + stride; yy++){
			s = s.union(this.list[mod(yy, this.yl)][mod(xx, this.xl)]);
		}
	}

	return s;
}

Grid.prototype.draw = function(){
	ctx.strokeStyle = "white";
	var i;
	for(i = 0; i < this.xl ; i++){
		ctx.beginPath();
		ctx.moveTo(i*this.size, 0);
		ctx.lineTo(i*this.size, 1000);
		ctx.stroke();
	}
	for(i = 0; i < this.yl ; i++){
		ctx.beginPath();
		ctx.moveTo(0, i*this.size);
		ctx.lineTo(2000, i*this.size);
		ctx.stroke();
	}
}