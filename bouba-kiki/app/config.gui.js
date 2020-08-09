class Paramaterize {
	constructor() {
		this.showAnchors = true;
		this.topSpeed = 10;
		this.maxAcc = 5;
	}
}

par = new Paramaterize();
let gui = new dat.GUI({ autoPlace: true });

gui.add(par, 'showAnchors');
gui.add(par, 'topSpeed');
gui.add(par, 'maxAcc');
gui.open()