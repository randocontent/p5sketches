// ;;scenes
let sceneIndex = 0;
let sceneCount = 2;
let recLength = 149;

let canvas;

var gifMaker = new CCapture({
	framerate: 24, // 60 fps makes the gif move too fast
	verbose: true,
	format: 'gif',
	workersPath: './lib/',
});

const PARTS = [
	['nose', 0],
	['leftEye', 1],
	['rightEye', 2],
	['leftEar', 3],
	['rightEar', 4],
	['leftShoulder', 5],
	['rightShoulder', 6],
	['leftElbow', 7],
	['rightElbow', 8],
	['leftWrist', 9],
	['rightWrist', 10],
	['leftHip', 11],
	['rightHip', 12],
	['leftKnee', 13],
	['rightKnee', 14],
	['leftAnkle', 15],
	['rightAnkle', 16],
];

const SKELETON = [
	[11, 5],
	[7, 5],
	[7, 9],
	[11, 13],
	[13, 15],
	[12, 6],
	[8, 6],
	[8, 10],
	[12, 14],
	[14, 16],
	[5, 6],
	[11, 12],
];

const anchors = [];

function setup() {
	// recorder = new P5Recorder({gifLength: 100});

	createCanvas(800, 600);
	background('white');
	PARTS.forEach(p => {
		anchors.push(new Anchor(width / 2, height / 2, p));
	});
	gifMaker.start();
	gifMaker.capture(document.getElementById('defaultCanvas0'));
}

// ;;scenes
function draw() {
	switch (sceneIndex % sceneCount) {
		case 0:
			sharpShape();
			break;
			case 1:
				softShape();
		default:
			break;
	}
	gifMaker.capture(document.getElementById('defaultCanvas0'));
	if (frameCount === recLength) {
		gifMaker.stop();
		gifMaker.save();
	}
}
function mousePressed() {
	sceneIndex++;
}

function sharpShape() {
	background('white');
	let i = frameCount % recordedPose.length;
	let pose = recordedPose[i].pose.keypoints;
	let skeleton = recordedPose[i].skeleton;
	remapAnchorsFromPose(pose);

	expanded = [];
	expanded = expanded.concat(anchors[0].starify());
	expanded = expanded.concat(anchors[5].starify());
	expanded = expanded.concat(anchors[6].starify());
	expanded = expanded.concat(anchors[7].starify());
	expanded = expanded.concat(anchors[8].starify());
	expanded = expanded.concat(anchors[9].starify());
	expanded = expanded.concat(anchors[10].starify());
	expanded = expanded.concat(anchors[11].starify());
	expanded = expanded.concat(anchors[12].starify());
	expanded = expanded.concat(anchors[13].starify());
	expanded = expanded.concat(anchors[14].starify());
	expanded = expanded.concat(anchors[15].starify());
	expanded = expanded.concat(anchors[16].starify());

	let hullSet = hull(expanded, par.sharpConcavity);

	// Looks better than endShape(CLOSE)
	hullSet.push(hullSet[1]);
	hullSet.push(hullSet[0]);

	// Draw hull outline
	stroke(0);
	strokeWeight(3);
	noFill();
	beginShape();
	hullSet.forEach((p, i) => {
		vertex(p[0], p[1]);
	});
	endShape();

	if (par.drawSkeleton) {
		stroke('blue');
		strokeWeight(1);
		remapSkeleton(skeleton);
		noStroke();
		fill('red');
		remapHead(pose);
	}

	if (par.drawExpandedBodyPoints) {
		stroke('cyan');
		strokeWeight(3);
		expanded.forEach(p => {
			point(p[0], p[1]);
		});
	}
}

function softShape() {
	background('white');
	let i = frameCount % recordedPose.length;
	let pose = recordedPose[i].pose.keypoints;
	let skeleton = recordedPose[i].skeleton;
	remapAnchorsFromPose(pose);

	expanded = [];
	// anchors.forEach(a => {
	// 	expanded = expanded.concat(a.blobify());
	// });
	expanded = expanded.concat(anchors[0].blobify());
	expanded = expanded.concat(anchors[5].blobify());
	expanded = expanded.concat(anchors[6].blobify());
	expanded = expanded.concat(anchors[7].blobify());
	expanded = expanded.concat(anchors[8].blobify());
	expanded = expanded.concat(anchors[9].blobify());
	expanded = expanded.concat(anchors[10].blobify());
	expanded = expanded.concat(anchors[11].blobify());
	expanded = expanded.concat(anchors[12].blobify());
	expanded = expanded.concat(anchors[13].blobify());
	expanded = expanded.concat(anchors[14].blobify());
	expanded = expanded.concat(anchors[15].blobify());
	expanded = expanded.concat(anchors[16].blobify());

	let hullSet = hull(expanded, par.softConcavity);

	// Looks better than endShape(CLOSE)
	hullSet.push(hullSet[1]);
	hullSet.push(hullSet[0]);

	// Draw hull outline
	stroke(0);
	strokeWeight(3);
	noFill();
	beginShape();
	hullSet.forEach((p, i) => {
		if (par.drawCurves) {
			curveVertex(p[0], p[1]);
		} else {
			vertex(p[0], p[1]);
		}
	});
	endShape();

	if (par.drawSkeleton) {
		stroke('blue');
		strokeWeight(1);
		remapSkeleton(skeleton);
		noStroke();
		fill('red');
		remapHead(pose);
	}

	if (par.drawExpandedBodyPoints) {
		stroke('cyan');
		strokeWeight(3);
		expanded.forEach(p => {
			point(p[0], p[1]);
		});
	}
}

function remapHead(pose) {
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
	let nX = map(x, 0, 1000, par.padding, width - par.padding);
	let nY = map(y, 0, 720, par.padding, height - par.padding);
	return [nX, nY];
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
		if (par.drawAnchors) a.show();
	});
}
