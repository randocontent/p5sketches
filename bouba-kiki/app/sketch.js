// ;;scenes
let sceneIndex = 0;
let sceneCount = 2;

let canvas;
let mgr;
let previousX,
	previousY = 0;

let phase = 0;
let xoff = 1;
let yoff = 1;
let zoff = 1;

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
	canvas = createCanvas(windowWidth, windowHeight);
	PARTS.forEach(p => {
		anchors.push(new Anchor(width / 2, height / 2, p));
	});
}

// ;;scenes
function draw() {
	switch (sceneIndex % sceneCount) {
		case 0:
			softShape();
			break;
		case 1:
			sharpShape();
		default:
			break;
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
	strokeWeight(4);
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
	anchors.forEach(a => {
		expanded = expanded.concat(a.blobify());
	});

	let hullSet = hull(expanded, par.softConcavity);

	// Looks better than endShape(CLOSE)
	hullSet.push(hullSet[1]);
	hullSet.push(hullSet[0]);

	// Draw hull outline
	stroke(0);
	strokeWeight(4);
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

function noiseLoops() {
	background('white');
	let i = frameCount % recordedPose.length;
	let pose = recordedPose[i].pose.keypoints;

	let po = {
		position: {
			x: width / 2,
			y: height / 2,
		},
	};

	let expanded = expandBlob(po);
	sorted = [...expanded];
	sorted.sort();
	let hullSet = hull(expanded, par.softConcavity);

	// Looks better than endShape(CLOSE)
	hullSet.push(hullSet[1]);
	hullSet.push(hullSet[0]);

	// Draw lattice
	// stroke(100);
	// strokeWeight(0.3);
	// beginShape();
	// expanded.forEach((p, i) => {
	// 	vertex(p[0], p[1]);
	// });
	// endShape();

	// // Draw outline
	// stroke('lightsalmon');
	// strokeWeight(.4);
	// noFill();
	// beginShape();
	// sorted.forEach((p, i) => {
	// 	vertex(p[0], p[1]);
	// });
	// endShape();

	// Draw hull outline
	stroke('indigo');
	strokeWeight(4);
	noFill();
	beginShape();
	hullSet.forEach((p, i) => {
		// text(i,p[0],p[1])
		curveVertex(p[0], p[1]);
	});
	endShape();

	// Draw lattice points
	stroke('magenta');
	expanded.forEach(p => {
		point(p[0], p[1]);
	});
}

function posenetWithAnchors() {
	background('white');
	let i = frameCount % recordedPose.length;
	let pose = recordedPose[i].pose.keypoints;

	remapAnchorsFromPose(pose);

	noStroke();
	fill('red');
	// drawHeadFromAnchors(anchors, 6);

	stroke('blue');
	// drawSkeletonFromAnchors(anchors);
}

function posenetBasic() {
	background('white');
	let i = frameCount % recordedPose.length;
	let pose = recordedPose[i].pose.keypoints;
	let skeleton = recordedPose[i].skeleton;
	remapHead(pose);
	remapSkeleton(skeleton);
}

function pointCloud() {
	push();
	// translate(width / 2, height / 2);

	let poseIndex = frameCount % recordedPose.length;
	let skeleton = recordedPose[poseIndex].skeleton;

	recordedPose.forEach(rp => {
		let pose = rp.pose.keypoints;
		pose.forEach(p => {
			let [x, y] = remapPosenetPoint(p);
			point(x, y);
		});
	});

	// pose.forEach((p, i) => {
	// 	let newX = p.position.x;
	// 	let newY = p.position.y;
	// 	// 1280 + 720 = 2000 (why is this hard-coded?)
	// 	let a = map(poseIndex, 0, recordedPose.length, 0, width);
	// 	let r = map(newY, 0, 720, 0, height / 1.5);
	// 	let x = r * sin(a);
	// 	let y = r * cos(a);
	// 	colorMode(HSB, pose.length);
	// 	strokeWeight(2);
	// 	stroke(i, i, i);
	// 	point(x, y);
	// });

	pop();
}

function circleGraph() {
	push();
	translate(width / 2, height / 2);

	let poseIndex = frameCount % recordedPose.length;
	let skeleton = recordedPose[poseIndex].skeleton;

	recordedPose.forEach(rp => {
		let pose = rp.pose.keypoints;
		pose.forEach(p => {
			let [x, y] = remapPosenetPoint(p);
			point(x, y);
			// let newX = p.position.x;
			// let newY = p.position.y;
			// 1280 + 720 = 2000 (why is this hard-coded?)
			// let a = map(poseIndex, 0, recordedPose.length, 0, width);
			// let r = map(newY, 0, 720, 0, height / 1.5);
			// let x = r * sin(a);
			// let y = r * cos(a);
			// colorMode(HSB, pose.length);
			// strokeWeight(2);
			// stroke(i, i, i);
			// point(x, y);
		});
	});

	pop();
	// frameRate(1)
}

function lineGraph() {
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
		stroke(i * 10);
		point(x, y);
	});
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
		if (par.drawAnchors) a.show();
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
		if (par.drawAnchors) a.show();
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
		if (par.drawAnchors) a.show();
	});
}

function expandBlob(point, modifier = 1) {
	let px = point.position.x;
	let py = point.position.y;
	let x, y;
	let newArr = [];

	for (let a = 0; a < 360; a += par.angles) {
		let xoff = map(cos(a + phase / modifier), -1, 1, 0, par.maxY / modifier);
		let yoff = map(sin(a + phase / modifier), -1, 1, 0, par.maxX / modifier);
		noiseDetail(par.noiseOctaves, par.noiseFalloff);
		let n = noise(xoff, yoff, zoff);

		let r = map(n, 0, 1, par.minRadius / modifier, par.maxRadius / modifier);

		x = px + r * cos(a);
		y = py + r * sin(a);

		newArr.push([x, y]);
	}
	return newArr;
}

function topExpression(unsorted) {
	let sorted = [];
	sorted = Object.entries(unsorted);
	sorted.sort((a, b) => b[1] - a[1]);
	return sorted[0][0];
}
