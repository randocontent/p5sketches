let lines;
let r;
let t;

function setup() {
	createCanvas(windowWidth, windowHeight);
	lines = 30
	r = 300
	t = 0;
}

function draw() {
	background(255);
	stroke(0);
	translate(width / 2, height / 2);
	for (let i = 0; i < lines/10; i+=.1) {
		strokeWeight(4);
		// stroke('blue');
		point(blueX(t + i), blueY(t + i));
		// stroke('red');
		point(redX(t + i), redY(t + i));
		stroke(0);
		strokeWeight(0.5);
		line(blueX(t + i), blueY(t + i), redX(t + i), redY(t + i));
	}
	t += .01;

	// Print t
	noStroke();
	fill(255);
	rect(-width / 2, -height / 2, 90, 24);
	fill(0);
	textSize(24);
	text(round(t,3), -width / 2 + 2, -height / 2 + 20);
	stroke(200);
	noFill();

	// reference
	stroke('pink')
	ellipse(0, 0, r * 2);
}

function blueX(t) {
	// return r * sin(t / 100);
	return r * sin(t)*cos(t/4)

}

function blueY(t) {
	// return r * cos(t / 100)*cos(t/50)*cos(t/25);
	return r * cos(t)*sin(t/4)
}

function redX(t) {
	// return r * sin(t / 50);
	return r * cos(t/4)
}

function redY(t) {
	// return r * cos(t / 50)*cos(t/25)*cos(t/12);
	return r*sin(t)
}
