let video; // Holds the p5 media element
let videoLoc; // Holds a filename

let padding = 50; // Padding added when remapping
let recLength = 1200; // Recording length in frames

let status;
let videoField;
let framesField;
let videoButton;
let recordButton;

let poseNet;
let poses = [];
let poseHistory = [];
let pose;

let playing = false;
let rec = false;

const videos = [
	'video00005.mp4', // Landscape
	'video00008.mkv', // Landscape, Professional fashion model posing and looking into camera. Woman show poses and emotions-v8EefXQ2zjE 3840x2160.mkv
	'video00009.mkv', // 	Landscape, Professional fashion model posing and smile into camera. Woman show poses and emotions-iZS4jOzTuzo 3840x2160.mkv
	'video00011.mp4', // Landscape
	'video00012.mp4', // Landscape
	'video00013.mp4', // Landscape
];

function setup() {
	createCanvas(1280, 720);
	status = createDiv(
		'Posenet Recorder. Enter a filename in the local directory (local to the script) and number of frames to record.'
	);

	videoField = createInput('video.mp4');
	videoField.size(150);
	framesField = createInput(recLength);
	framesField.size(60);
	videoButton = createButton('Preview');
	videoButton.mousePressed(loadVideoFromInput);
	recordButton = createButton('Record');
	recordButton.mousePressed(startRecording);
}

function draw() {
	background(225);
	stroke('red');

	if (poses[0]) {
		pose = poses[0].pose.keypoints;
		skeleton = poses[0].skeleton;
		image(video, 0, 0, width, height);
		stroke('red');
		fill('red');
		pose.forEach(p => {
			let [x, y] = remapPoint(p);
			ellipse(x, y, 5);
		});
		stroke('blue');
		skeleton.forEach(bone => {
			let aX, aY, bX, bY;
			[aX, aY] = remapPoint(bone[0]);
			[bX, bY] = remapPoint(bone[1]);
			line(aX, aY, bX, bY);
		});
	}
	if (rec) {
		recordPose(poses[0]);
	}
}

// Basically, remaps the video to the canvas. 
// Does nothing to maintain aspect ratio.
// Returns an array.
function remapPoint(p) {
	let x = p.position.x;
	let y = p.position.y;
	let nX = map(x, 0, video.elt.width, padding, width - padding);
	let nY = map(y, 0, video.elt.height, padding, height - padding);
	return [nX, nY];
}

function loadVideoFromInput() {
	videoLoc = videoField.value();
	getNewVideo();
}

/**
 * Load a new video, uses findSDVideo() to find the smallest file, and calls videoReady() and calls
 */
function getNewVideo() {
	video = createVideo(videoLoc, videoReady);
	// video.size(1280, 720);
	video.loop();
	video.hide();

	// let newVideo = fetch('videoURL')
	// 	.then(response => {
	// 		if (!response.ok) {
	// 			throw new Error('http error: ' + response.status);
	// 		} else {
	// 			return response.json();
	// 		}
	// 	})
	// 	.then(result => {
	// 	})
	// 	.catch(e => {
	// 		console.log('fetch error: ' + e.message);
	// 	});
}

/**
 * Handle the new video
 */
function videoReady() {
	poseNet = ml5.poseNet(video, modelReady);
	poseNet.on('pose', function (results) {
		poses = results;
	});
}

function modelReady() {
	status.html('Model ready');
}

function startRecording() {
	rec = true;
	videoLoc = videoField.value();
	recLength = framesField.value();
	getNewVideo();
}

function recordPose(points) {
	status.html('recording ' + frameCount);
	poseHistory.push(points);
	if (poseHistory.length === recLength) finishRecording();
	if (poseHistory.length > recLength) finishRecording();
}

function finishRecording() {
	console.log('recording finished');
	rec = false;
	outputField = document.createElement('textarea');
	document.getElementById('main').appendChild(outputField);
	outputField.value = JSON.stringify(poseHistory);
}
