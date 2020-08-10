let internal = 100;
let external = 400;
let up = false;
let xoff = 0.0;
let yoff = 0.0;
let zoff = 0.0;
let phase = 0.1;

let k0;
let kMax;
let step;
let n = 26; // number of blobs
let radius = 20; // diameter of the circle
let inter = 8; // difference between the sizes of two blobs
let maxNoise = 500;

let noiseProg = (x) => (x*x);

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1);
	angleMode(DEGREES);
  noFill();
	noLoop();
	step = 0.01;
	kMax = random(3, 4);
}

function draw() {
	background('black');
	stroke(0)
	strokeWeight(1);
	for (let i = 0; i < n; i++) {
		let alpha = 1 - noiseProg(i / n);
		stroke(0.9, alpha);
		let size = radius + i * inter;
		let k = kMax * sqrt(i/n);
		let k0 = noise(xoff,zoff)
		let k1 = map(k0,0,1,2,kMax)
		console.log(k1)
		let noisiness = maxNoise * noiseProg(i / n);
    blob(size, width/2, height/2, k1, i * step, noisiness);
	}
	xoff+=0.1
	yoff+=.1
	// noLoop()
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
	let angleStep = 360 / 500;
  for (let theta = 0; theta < 360; theta += angleStep) {
    let r1, r2;
		/*
    if (theta < PI / 2) {
      r1 = cos(theta);
      r2 = 1;
    } else if (theta < PI) {
      r1 = 0;
      r2 = sin(theta);
    } else if (theta < 3 * PI / 2) {
      r1 = sin(theta);
      r2 = 0;
    } else {
      r1 = 1;
      r2 = cos(theta);
    }
		*/
		r1 = cos(theta)+1
		r2 = sin(theta)+1;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
	endShape(CLOSE);
}