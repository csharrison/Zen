function mod(x,y){
    return ((x%y) + y)%y;
}
function normal_random(m, v) {
    mean = m || 0.0;
    variance = v || 1.0;

    var V1, V2, S;
    do {
        var U1 = Math.random();
        var U2 = Math.random();
        V1 = 2 * U1 - 1;
        V2 = 2 * U2 - 1;
        S = V1 * V1 + V2 * V2;
    } while (S > 1);

    X = Math.sqrt(-2 * Math.log(S) / S) * V1;
    //  Y = Math.sqrt(-2 * Math.log(S) / S) * V2;
    X = mean + Math.sqrt(variance) * X;
    //  Y = mean + Math.sqrt(variance) * Y ;
    return X;
}

/* stolen and modified from http://media.tojicode.com/sfjs-vectors/*/
var Vec2;
Vec2 = {
    create: function(a, b) {
        return {x: a, y:b};
    },

    add: function(a, b, out) {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
    },

    subtract: function(a, b, out) {
        out.x = a.x - b.x;
        out.y = a.y - b.y;
    },

    scale: function(a, v, out) {
        out.x = a.x * v;
        out.y = a.y * v;
    },

    length: function(a){
        return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
    },
    normalize: function(a, out) {
        var iLen = 1 / Vec2.length(a);
        out.x = a.x * iLen;
        out.y = a.y * iLen;
    },

    copy: function(a, out){
        out.x = a.x;
        out.y = a.y;
    },

    set: function(a, b, out){
        out.x = a;
        out.y = b;
    },

    mod: function(m, out){
        out.x = mod(out.x, m.x);
        out.y = mod(out.y, m.y);
    },

    randomize_gauss: function(mean, std, out){
        out.x = normal_random(mean, std);
        out.y = normal_random(mean, std);
    },
    randomize: function(min, max, out){
        out.x = (max - min)*Math.random() + min;
        out.y = (max - min)*Math.random() + min;
    },

    distance: function(x, y){
        return Math.sqrt(Math.pow(x.x-y.x,2) + Math.pow(x.y - y.y, 2));
    },
    distance_sqr: function(x, y, mod){
        xx = x.x;
        xy = x.y;
        yx = y.x;
        yy = y.y;
        var xdist = Math.min(xx - yx);//, xx - (yx + mod), (xx + mod) - yx);
        var ydist = Math.min(xy - yy);//, xy - (yy + mod), (xy + mod) - yy);

        return Math.pow(xdist,2) + Math.pow(ydist, 2);
    }
};