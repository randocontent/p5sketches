class Blob {
	constructor(x, y, part) {
		this.position = createVector(x, y);
		this.target = createVector(x, y);
		this.vel = p5.Vector.random2D();
		this.acc = createVector();
		this.referenceShapeRadius = 10;
		this.part = part;
		this.zoff = 0.0;
		this.phase = 0.0;
		this.seed = random(1000);
		this.topSpeed = par.topSpeed;
		this.maxAcc = par.maxAcc;
	}

	update() {
		this.position.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
	}

	show() {
		push();
		noStroke();
		fill('red');
		ellipse(this.position.x, this.position.y, this.referenceShapeRadius);
		// text(this.part,this.position.x,this.position.y)
		pop();
	}

	addVertex() {
		curveVertex(this.position.x, this.position.y);
	}

	setTarget(v) {
		this.target = v;
	}

	// Runs behaviors
	behaviors() {
		let goto = this.arrive(this.target);
		this.applyForce(goto);
	}

	// Applies forces returned by the bejavior functions
	applyForce(f) {
		this.acc.add(f);
	}

	seek(target) {
		let desired = p5.Vector.sub(target, this.position);
		desired.setMag(par.topSpeed);
		let steer = p5.Vector.sub(desired, this.vel);
		return steer.limit(par.maxAcc);
	}

	flee(target) {
		let desired = p5.Vector.sub(target, this.position);
		if (desired.mag() < 90) {
			desired.setMag(par.topSpeed);
			// Reverse direction
			desired.mult(-1);
			let steer = p5.Vector.sub(desired, this.vel);
			steer.limit(par.maxAcc);
			return steer;
		} else {
			return createVector(0, 0);
		}
	}

	arrive(target) {
		let desired = p5.Vector.sub(target, this.position);
		let distance = desired.mag();
		let speed = par.topSpeed;
		if (distance < 100) {
			speed = map(distance, 0, 100, 0, par.topSpeed);
		}
		desired.setMag(speed);
		let steer = p5.Vector.sub(desired, this.vel);
		return steer.limit(par.maxAcc);
	}

	expandBlob() {
		let px = this.position.x;
		let py = this.position.y;
		let x, y;
		let newArr = [];

		for (let a = 0; a < 360; a += par.angles) {
			let xoff = map(cos(a + this.phase), -1, 1, 0, par.maxY);
			let yoff = map(sin(a + this.phase), -1, 1, 0, par.maxX);

			noiseSeed(this.seed);
			let n = noise(xoff, yoff, this.zoff);

			let r = map(n, 0, 1, par.minRadius, par.maxRadius);

			x = px + r * cos(a);
			y = py + r * sin(a);

			newArr.push([x, y]);

		}
		this.phase += par.maxPhaseShift;
		this.zoff = par.maxZOff;
		return newArr;
	}
}
