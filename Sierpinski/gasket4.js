"use strict";
var canvas;
var gl;
var points = [];
var NumTimesToSubdivide;
var NumPoints = 1000;
function init1(){
	
	var num;
	var slider = document.getElementById("slider");
	
	 num = parseInt(slider.value)+1;
	console.log(num);
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); 
}


    var vertices = [
        vec2( -1, -1 ),
        vec2(  0,  1 ),
        vec2(  1, -1 )
    ];

    var u = add( vertices[0], vertices[1] );
    var v = add( vertices[0], vertices[2] );
    var p = scale( 0.25, add( u, v ) );

    points = [ p ];

    for ( var i = 0; points.length < NumPoints*num; ++i ) {
        var j = Math.floor(Math.random() * 3);
        p = add( points[i], vertices[j] );
        p = scale( 0.5, p );
        points.push( p );
    }

  
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );


    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    render();
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.POINTS, 0, points.length);
}

function init2() {
	points = [];
	var num;
	var slider = document.getElementById("slider");
	num = parseInt(slider.value);
	console.log(num);
	NumTimesToSubdivide = num;
	canvas = document.getElementById("gl-canvas");

	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
		alert("WebGL isn't available");
	}

	var vertices = [ vec2(-1, -1), vec2(0, 1), vec2(1, -1) ];

	divideTriangle(vertices[0], vertices[1], vertices[2], num);

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);

	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	var bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	render2();
}

function triangle(a, b, c) {
	points.push(a, b, c);
}

function divideTriangle(a, b, c, count) {

	if (count === 0) {
		triangle(a, b, c);
	} else {

		var ab = mix(a, b, 0.5);
		var ac = mix(a, c, 0.5);
		var bc = mix(b, c, 0.5);

		--count;

		divideTriangle(a, ab, ac, count);
		divideTriangle(c, ac, bc, count);
		divideTriangle(b, bc, ab, count);
	}
}

function render2() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, points.length);
}

function init3() {
	points = [];
	var num;
	var slider = document.getElementById("slider");
	num = parseInt(slider.value) + 1;
	console.log(num);
	canvas = document.getElementById("gl-canvas");

	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
		alert("WebGL isn't available");
	}

	var vertices = [ vec3(-0.5, -0.5, -0.5), vec3(0.5, -0.5, -0.5),
			vec3(0.0, 0.5, 0.0), vec3(0.0, -0.5, 0.5), ];

	points = [ vec3(0.0, 0.0, 0.0) ];

	for (var i = 0; points.length < NumPoints * num; ++i) {
		var j = Math.floor(Math.random() * 4);

		points.push(mix(points[i], vertices[j], 0.5));
	}

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

	var program = initShaders(gl, "vertex-shader3", "fragment-shader3");
	gl.useProgram(program);

	var bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	render3();
};

function render3() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.drawArrays(gl.POINTS, 0, points.length);
}
var colors = [];
function init4() {
	points = [];
	colors = [];
	var num;
	var slider = document.getElementById("slider");
	num = NumTimesToSubdivide = parseInt(slider.value);
	console.log(num);
	canvas = document.getElementById("gl-canvas");

	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
		alert("WebGL isn't available");
	}

	var vertices = [ vec3(0.0000, 0.0000, -1.0000),
			vec3(0.0000, 0.9428, 0.3333), vec3(-0.8165, -0.4714, 0.3333),
			vec3(0.8165, -0.4714, 0.3333) ];

	divideTetra(vertices[0], vertices[1], vertices[2], vertices[3],
			NumTimesToSubdivide);

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);

	gl.enable(gl.DEPTH_TEST);

	var program = initShaders(gl, "vertex-shader4", "fragment-shader4");
	gl.useProgram(program);

	var cBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);

	var vBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	render4();
};
function triangle(a, b, c, color) {

	var baseColors = [ vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0),
			vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 0.0) ];

	colors.push(baseColors[color]);
	points.push(a);
	colors.push(baseColors[color]);
	points.push(b);
	colors.push(baseColors[color]);
	points.push(c);
}

function tetra(a, b, c, d) {
	triangle(a, c, b, 0);
	triangle(a, c, d, 1);
	triangle(a, b, d, 2);
	triangle(b, c, d, 3);
}

function divideTetra(a, b, c, d, count) {
	if (count === 0) {
		tetra(a, b, c, d);
	}

	else {
		var ab = mix(a, b, 0.5);
		var ac = mix(a, c, 0.5);
		var ad = mix(a, d, 0.5);
		var bc = mix(b, c, 0.5);
		var bd = mix(b, d, 0.5);
		var cd = mix(c, d, 0.5);

		--count;

		divideTetra(a, ab, ac, ad, count);
		divideTetra(ab, b, bc, bd, count);
		divideTetra(ac, bc, c, cd, count);
		divideTetra(ad, bd, cd, d, count);
	}
}

function render4() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, points.length);
}
function initradio(rName, rValue) {
	
	var num = document.getElementsByName(rName);
	for (var i = 0; i < num.length; i++) {
		if (num[i].value == rValue) {
			num[i].checked = 'checked';
		}
	}
}
function to_change(rName) {
	var num = document.getElementsByName(rName);
	for (var i = 0; i < num.length; i++) {
		if (num[i].checked == true) {
			if (num[i].value == 1) {
				init1();
			} else if (num[i].value == 2) {
				init2();
			} else if (num[i].value == 3) {
				init3();
			} else if (num[i].value == 4) {
				init4();
			}
		}
	}
}
//Thanks for 201512203501016haotongxue's help
window.onload = init1;
