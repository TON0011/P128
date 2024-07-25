let song1, song2;
let video;
let canvas;
let posenet;
let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0;
let rightWristY = 0;

function preload() {
    song1 = loadSound('song1.mp3');
    song2 = loadSound('song2.mp3');
}

function setup() {
    canvas = createCanvas(640, 480);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, width, height);
    
    
    fill(255, 0, 0);
    ellipse(leftWristX, leftWristY, 20, 20);
    
    fill(0, 0, 255);
    ellipse(rightWristX, rightWristY, 20, 20);
}


function modelLoaded() {
    console.log('PoseNet Model Loaded!');
}

function gotPoses(results) {
    if (results.length > 0) {
        let leftWrist = results[0].pose.leftWrist;
        let rightWrist = results[0].pose.rightWrist;
        leftWristX = leftWrist.x;
        leftWristY = leftWrist.y;
        rightWristX = rightWrist.x;
        rightWristY = rightWrist.y;
    }
}