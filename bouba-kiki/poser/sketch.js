let videoURL;
let videoField;
let videoButton;
let video;

let poseNet;
let poses = [];
let poseHistory = [];

let status;
let rec = false;
let recordLength = 800;

/**
 * Load a new video, uses findSDVideo() to find the smallest file, and calls videoReady() and calls
 */
function getNewVideo() {

	let newVideo = fetch(videoURL)
		.then(response => {
			if (!response.ok) {
				throw new Error('http error: ' + response.status);
			} else {
				return response.json();
			}
		})
		.then(result => {
			video = createVideo(videoURL, videoReady);
			video.loop();
		})
		.catch(e => {
			console.log('fetch error: ' + e.message);
		});
}

/**
 * Handle the new video
 */
function videoReady() {
	poseNet = ml5.poseNet(video, modelReady);
	poseNet.on('pose', function (results) {
		poses = results;
	});
	rec = true;
}

function modelReady() {
	status.html('Model ready');
}

function setup() {
	var canvas = createCanvas(windowWidth,windowHeight);
	canvas.parent('canvas-placeholder');

	status = select('#status');

}

function draw() {
	background(225);

	if (poses) {
		if (poses[0]) {
			let pose = poses[0];
			if (rec) recordPose(pose);
		}
	}
}

function recordPose(points) {
	poseHistory.push(points);
	if (poseHistory.length === recordLength) finishRecording();
}

function finishRecording() {
	console.log('recording finished')
	rec = false;
}
