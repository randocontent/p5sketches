function setup() {
	createCanvas(windowWidth, windowHeight);
	red = createInput(random(255));
	red.size(30);
	red.position(100, 100);
	blue = createInput(random(255));
	blue.size(30);
	blue.position(100, 130);
	green = createInput(random(255));
	green.size(30);
	green.position(100, 160);
}

function draw() {
	let redv = red.value();
	let bluev = blue.value();
	let greenv = green.value();

	fill(redv, 0, 0);
	rect(150, 100, 200, 21);
	fill(0, bluev, 0);
	rect(150, 130, 200, 21);
	fill(0, 0, greenv);
	rect(150, 160, 200, 21);

	fill(redv, bluev, greenv);
	rect(360, 100, 200, 81);
}
