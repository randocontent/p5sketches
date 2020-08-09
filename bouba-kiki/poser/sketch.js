let videoField;
let videoButton;
let video;

let poseNet;
let poses = [];
let poseHistory = [];

let status;
let rec = false;
let recordLength = 1000;
let videoLocatorField;
let videoSubmitButton;

function setup() {
	createCanvas(800,600);
	status = select('#status');
	videoLocatorField=createInput('') 
	videoSubmitButton=createButton('Submit')
	videoSubmitButton.mousePressed(getNewVideo)
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

/**
 * Load a new video, uses findSDVideo() to find the smallest file, and calls videoReady() and calls
 */
function getNewVideo() {
	let videoURL = videoLocatorField.value()
	console.log(videoURL)

	video = createVideo(videoURL, videoReady);
	video.loop();

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
	rec = true;
}

function modelReady() {
	status.html('Model ready');
}


function recordPose(points) {
	poseHistory.push(points);
	if (poseHistory.length === recordLength) finishRecording();
}

function finishRecording() {
	console.log('recording finished')
	rec = false;
	outputField = document.createElement('textarea')
	document.getElementById('main').appendChild(outputField)
outputField.value=JSON.stringify(poseHistory)
}

