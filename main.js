song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
   canvas= createCanvas(600,500);
   canvas.position(380,200)
   video= createCapture(VIDEO);
   video.hide();
   poseNet=ml5.poseNet(video, modelLoaded);
   poseNet.on('poses', gotPoses);
}
function draw(){
   image(video, 0,0,600,500);
   fill("#FF0000");
stroke("#FF0000");
if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
leftWristYNo=Number(leftWristY);
removeDecimal=floor(leftWristYNo);
volume=removeDecimal/500;
document.getElementById("volume").innerHTML="Volume-"+volume;
song.setVolume(volume); 
}

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("PoseNet Model Initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("score left wrist"+scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("left wrist x position="+leftWristX+"left wrist y position="+leftWristY);
        console.log("right wrist x position="+rightWristX+"right wrist y position="+rightWristY);
    }
}