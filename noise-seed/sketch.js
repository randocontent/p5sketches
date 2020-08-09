let xoff = 0;
let zoff = 0;
let step = 20;

function setup() {
	createCanvas(800, 600);
}

function draw() {
	background(51);
	noStroke();
	noiseSeed(1)
	for (let i = 0; i < width; i += step) {
		fill(map(noise(i / step), 0, 1, 0, 255));
		rect(i, 0, step, 200);
	}
	noiseSeed(2)
	for (let i = 0; i < width; i += step) {
		fill(map(noise(i / step), 0, 1, 0, 255));
		rect(i, 200, step, 300);
	}
	noiseSeed(3)
	for (let i = 0; i < width; i += step) {
		fill(map(noise(i / step), 0, 1, 0, 255));
		rect(i, 400, step, 200);
	}
}
