
recordedPose is an array of objects that look like this:

```json
{
pose: {
	score: 0.9586075719665078,
	keypoints: [
		{
			score: 0.998362123966217,
			part: 'nose',
			position: { x: 493.81129545321943, y: 133.16891641970034 },
		},
		...
		{
			score: 0.9181159734725952,
			part: 'rightAnkle',
			position: { x: 472.1799622836866, y: 620.1490248220938 },
		},
	],
	nose: {
		x: 493.81129545321943,
		y: 133.16891641970034,
		confidence: 0.998362123966217,
	},
	...
	rightAnkle: {
		x: 472.1799622836866,
		y: 620.1490248220938,
		confidence: 0.9181159734725952,
	},
},
skeleton: [
	[
		{
			score: 0.9932039976119995,
			part: 'leftHip',
			position: { x: 511.24090244058976, y: 340.6441648977774 },
		},
		{
			score: 0.9982144832611084,
			part: 'leftShoulder',
			position: { x: 522.9740294039424, y: 209.32938639322913 },
		},
	],
	...
	[
		{
			score: 0.9932039976119995,
			part: 'leftHip',
			position: { x: 511.24090244058976, y: 340.6441648977774 },
		},
		{
			score: 0.9963521957397461,
			part: 'rightHip',
			position: { x: 459.25485521380665, y: 337.96546681722003 },
		},
	],
],
},	
pose = [
	{ position: { x, y}, part, score }
	...
]
```