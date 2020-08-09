let internal = 100;
let external = 400
let up = false;
let xoff = 0.0;
let yoff = 0.0;
let zoff = 0.0;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(255);
	strokeWeight(0.5);
	translate(width / 2, height / 2);
	for (let angle = 0; angle < 360; angle += 1) {
		let n = map(noise(xoff, yoff, zoff), 0, 1, 10, 50);
		let ax = external * sin(angle);
		let ay = external * cos(angle);
		let bx = n+internal * sin(angle);
		let by = n+internal * cos(angle);
		line(ax, ay, bx, by);
		xoff += 0.1;
		yoff += 0.1;
	}
	if (up) {
		// r++;
	} else {
		// r--;
	}
	zoff += .1;
	// if (r === 100) up = true;
	// if (r === 1000) up = false;
	noLoop();
}
