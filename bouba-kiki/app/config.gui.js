class Paramaterize {
	constructor() {
		// this.drawAnchors = true;
		// this.topSpeed = 4;
		// this.maxAcc = 5;
		// this.angles = 10;
		// this.minRadius = 1;
		// this.maxRadius = 600;
		// this.maxX = 5;
		// this.maxY = 5;
		// this.phase = 0.1;
		// this.effect = 1
		// this.radius = 500;
		// this.maxZOff = 0.01
		// this.maxPhaseShift = 0.002
		// this.concavity = 600
		this.topSpeed = 20;
		this.maxAcc = 10;
		this.angles = 36;
		this.minRadius = 50;
		this.maxRadius = 100;
		this.maxX = 5;
		this.maxY = 5;
		this.phase = 0.1;
		this.effect = 1
		this.radius = 500;
		this.maxZOff = 0.001
		this.maxPhaseShift = 0.001
		this.concavity = 120
		this.drawAnchors = false;
		this.drawExpandedBodyPoints = false
		this.drawSkeleton = true
		this.drawCurves = true
	}
}

par = new Paramaterize();
let gui = new dat.GUI({ autoPlace: true });

gui.add(par, 'topSpeed');
gui.add(par, 'maxAcc');
gui.add(par, 'angles');
gui.add(par, 'minRadius');
gui.add(par, 'maxRadius');
gui.add(par, 'maxX');
gui.add(par, 'maxY');
gui.add(par, 'maxZOff');
gui.add(par, 'maxPhaseShift');
gui.add(par, 'concavity');
gui.add(par, 'drawAnchors');
gui.add(par, 'drawExpandedBodyPoints');
gui.add(par, 'drawSkeleton');
gui.add(par, 'drawCurves');

gui.open()