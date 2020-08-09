// --

let canvas;
let mgr;
let button;
let previousX,
	previousY = 0;

const PARTS = [
	'nose',
	'leftEye',
	'rightEye',
	'leftEar',
	'rightEar',
	'leftShoulder',
	'rightShoulder',
	'leftElbow',
	'rightElbow',
	'leftWrist',
	'rightWrist',
	'leftHip',
	'rightHip',
	'leftKnee',
	'rightKnee',
	'leftAnkle',
	'rightAnkle',
];

const SKELETON = [
	['leftHip', 'leftShoulder'],
	['leftElbow', 'leftShoulder'],
	['leftElbow', 'leftWrist'],
	['leftHip', 'leftKnee'],
	['leftKnee', 'leftAnkle'],
	['rightHip', 'rightShoulder'],
	['rightElbow', 'rightShoulder'],
	['rightElbow', 'rightWrist'],
	['rightHip', 'rightKnee'],
	['rightKnee', 'rightAnkle'],
	['leftShoulder', 'rightShoulder'],
	['leftHip', 'rightHip'],
];

const anchors = [];

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < 17; i++) {
		anchors.push(new Anchor(width / 2, height / 2));
	}
	button = createButton();
	button.size(300);
	button.position(width / 2 - 150, 30);
	button.mousePressed = function () {
		this.sceneManager.showNextScene();
	};
	mgr = new SceneManager();
	mgr.addScene(PosenetWithAnchors);
	mgr.addScene(PosenetBasic);
	mgr.addScene(CircleGraph);
	mgr.addScene(LineGraph);
	mgr.showNextScene();
}

function draw() {
	mgr.draw();
}

function mousePressed() {
	console.log('mousePressed');
	mgr.handleEvent('mousePressed');
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function PosenetWithAnchors() {
	this.enter = function () {
		console.log("Scene 'PosenetWithAnchors'");
		background(255);
	};
	this.draw = function () {
		background('white');
		button.html('Posenet With Physics');
		let i = frameCount % recordedPose.length;
		let pose = recordedPose[i].pose.keypoints;
		let skeleton = recordedPose[i].skeleton;
		stroke('mistyrose');
		remapHead(pose);
		stroke('lightblue')
		remapSkeleton(skeleton);
		remapAnchorsFromPose(pose);
		// refreshAnchors();
	};
}

function PosenetBasic() {
	this.enter = function () {
		console.log("Scene 'PosenetBasic'");
		background(255);
	};
	this.draw = function () {
		background('white');
		button.html('Posenet Recording');
		let i = frameCount % recordedPose.length;
		let pose = recordedPose[i].pose.keypoints;
		let skeleton = recordedPose[i].skeleton;
		remapHead(pose);
		remapSkeleton(skeleton);
	};
	this.mousePressed = function () {
		this.sceneManager.showNextScene();
	};
}

function CircleGraph() {
	this.enter = function () {
		console.log("Scene 'Graph01'");
		background(255);
		button.html('Circle Graph');
	};
	this.draw = function () {
		push();
		translate(width / 2, height / 2);
		let poseIndex = frameCount % recordedPose.length;
		let pose = recordedPose[poseIndex].pose.keypoints;
		let skeleton = recordedPose[poseIndex].skeleton;

		pose.forEach((p, i) => {
			let newX = p.position.x;
			let newY = p.position.y;
			// 1280 + 720 = 2000 (why is this hard-coded?)
			let a = map(poseIndex, 0, recordedPose.length, 0, width);
			let r = map(newY, 0, 720, 0, height / 1.5);
			let x = r * sin(a);
			let y = r * cos(a);
			colorMode(HSB, pose.length);
			strokeWeight(2);
			stroke(i, i, i);
			point(x, y);
		});
		pop();
	};
	this.mousePressed = function () {
		this.sceneManager.showNextScene();
	};
}

function LineGraph() {
	this.enter = function () {
		console.log("Scene 'Graph01'");
		background(255);
		button.html('Line Graph');
	};
	this.draw = function () {
		// background('white');
		noStroke();
		let poseIndex = frameCount % recordedPose.length;
		let pose = recordedPose[poseIndex].pose.keypoints;
		let skeleton = recordedPose[poseIndex].skeleton;

		strokeWeight(1.5);
		pose.forEach((p, i) => {
			let newX = p.position.x;
			let newY = p.position.y;
			// 1280 + 720 = 2000 (why is this hard-coded?)
			let x = map(poseIndex, 0, recordedPose.length, 0, width);
			let y = map(newY, 0, 720, 0, height);
			stroke(COLORS[i]);
			point(x, y);
		});
	};
	this.mousePressed = function () {
		this.sceneManager.showNextScene();
	};
}

function graphNose() {
	beginShape();
	recordedPose.forEach((p, i) => {
		let px = p.pose.leftWrist.x;
		let py = p.pose.leftWrist.y;
		// 1280 + 720 = 2000 (why is this hard-coded?)
		let x = map(i, 0, recordedPose.length, 0, width);
		let y = map(py, 0, 720, 0, height);
		vertex(x, y);
	});
	endShape();
}

function remapHead(pose) {
	noStroke();
	pose.forEach(p => {
		if (p.part === 'nose' || p.part === 'leftEye' || p.part === 'rightEye') {
			let nX, nY;
			[nX, nY] = remapPosenetPoint(p);
			ellipse(nX, nY, 5);
		}
	});
}

function remapSkeleton(skeleton) {
	skeleton.forEach(bone => {
		let aX, aY, bX, bY;
		[aX, aY] = remapPosenetPoint(bone[0]);
		[bX, bY] = remapPosenetPoint(bone[1]);
		line(aX, aY, bX, bY);
	});
}

function remapPosenetPoint(p) {
	let x = p.position.x;
	let y = p.position.y;
	// The recording was done on a 1280 video,
	// but the pose is centered when mapping to 1000
	let nX = map(x, 0, 1000, 0, canvas.width);
	let nY = map(y, 0, 720, 0, canvas.height);
	return [nX, nY];
}

function refreshAnchors() {
	anchors.forEach(a => {
		a.behaviors();
		a.update();
		if (par.showAnchors) a.show();
	});
}

function remapAnchorsFromPose(pose) {
	anchors.forEach((a, i) => {
		if (pose[i]) {
			let [x, y] = remapPosenetPoint(pose[i]);
			let v = createVector(x, y);
			a.setTarget(v);
		} else {
			let [x, y] = remapPosenetPoint(pose[0]);
			let v = createVector(x, y);
			a.setTarget(v);
		}
		a.behaviors();
		a.update();
		if (par.showAnchors) a.show();
	});
}

function retargetAnchorsFromPose(pose) {
	anchors.forEach((a, i) => {
		if (pose[i]) {
			let v = createVector(pose[i].position.x, pose[i].position.y);
			a.setTarget(v);
		} else {
			let v = createVector(pose[0].position.x, pose[0].position.y);
			a.setTarget(v);
		}
		a.behaviors();
		a.update();
		if (par.showAnchors) a.show();
	});
}
