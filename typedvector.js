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
        return new Float32Array([a, b]);
    },

    add: function(a, b, out) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
    },

    subtract: function(a, b, out) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
    },

    scale: function(a, v, out) {
        out[0] = a[0] * v;
        out[1] = a[1] * v;
    },

    length: function(a){
        return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2));
    },
    normal: function(x, out){
        out[0] = -x[1];
        out[1] = x[0];
    },

    normalize: function(a, out) {
        var iLen = 1 / Vec2.length(a);
        out[0] = a[0] * iLen;
        out[1] = a[1] * iLen;
    },

    copy: function(a, out){
        out[0] = a[0];
        out[1] = a[1];
    },

    set: function(a, b, out){
        out[0] = a;
        out[1] = b;
    },

    mod: function(m, out){
        out[0] = mod(out[0], m[0]);
        out[1] = mod(out[1], m[1]);
    },

    randomize_gauss: function(mean, std, out){
        out[0] = normal_random(mean, std);
        out[1] = normal_random(mean, std);
    },
    randomize: function(min, max, out){
        out[0] = (max - min)*Math.random() + min;
        out[1] = (max - min)*Math.random() + min;
    },

    distance: function(x, y){
        return Math.sqrt(Math.pow(x[0]-y[0],2) + Math.pow(x[1] - y[1], 2));
    },
    distance_sqr: function(x, y, mod){
        xx = x[0];
        xy = x[1];
        yx = y[0];
        yy = y[1];
        var xdist = Math.min(xx - yx);//, xx - (yx + mod), (xx + mod) - yx);
        var ydist = Math.min(xy - yy);//, xy - (yy + mod), (xy + mod) - yy);

        return Math.pow(xdist,2) + Math.pow(ydist, 2);
    }
};