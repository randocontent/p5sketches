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
		this.angles = 18;
		this.minRadius = 1;
		this.maxRadius = 100;
		this.maxX = 8;
		this.maxY = 8;
		this.effect = 1
		this.radius = 500;
		this.maxZOff = 0.005
		this.maxPhaseShift = 0.008
		this.softConcavity = 100
		this.sharpConcavity = 42
		this.noiseOctaves = 8
		this.noiseFalloff = .65	
		this.starPoints = 8	
		this.internalRadius = 25	
		this.externalRadius = 55
		this.padding = 50
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
gui.add(par, 'softConcavity');
gui.add(par, 'sharpConcavity');
gui.add(par, 'noiseOctaves');
gui.add(par, 'noiseFalloff');
gui.add(par, 'starPoints');
gui.add(par, 'internalRadius');
gui.add(par, 'externalRadius');
gui.add(par, 'padding');
gui.add(par, 'drawAnchors');
gui.add(par, 'drawExpandedBodyPoints');
gui.add(par, 'drawSkeleton');
gui.add(par, 'drawCurves');

gui.hide()