let video;
let faceMesh;

let pul,pul2;
let show = 1;

let faces = [];

function preload() {
  faceMesh = ml5.faceMesh();
}

function gotFaces(results) {
  //console.log(results);
  faces = results;
}

function setup() {
  createCanvas(600, 480);
  video = createCapture(VIDEO, { flipped: false });
  video.hide();

  rectMode(CENTER);
  faceMesh.detectStart(video, gotFaces);
  pul = createButton("Hide");
  pul.position(width / 2, 50);
  pul.mousePressed(setshow);
   pul2 = createButton("Show");
  pul2.position(width / 2, 50);
  pul2.hide();
  pul2.mousePressed(setshow);
}

function setshow() {
  if (show == 1) {
    pul.hide();
    pul2.show();
    show = 0;
  } else {
    pul2.hide();
    pul.show();
    show = 1;
  }
}

function draw() {
  background(220);
  image(video,0,0);
   if (show == 1) {
    tint(255,255)

  } else {
    tint(255,0)
    
  }

  if (faces.length > 0) {
    //lips
    let lip = faces[0].lips;
    fill(255, 0, 0);
    strokeWeight(7);
    ellipse(lip.centerX, lip.centerY, lip.width * 1.3, lip.height * 1.1);

    //eye

    strokeWeight(1);
    let eyeL = faces[0].leftEye;
    fill(255);
    ellipse(eyeL.centerX, eyeL.centerY, eyeL.width, eyeL.height * 2);
    fill(0);
    circle(eyeL.centerX, eyeL.centerY, 10);

    let eyeR = faces[0].rightEye;
    fill(255);
    ellipse(eyeR.centerX, eyeR.centerY, eyeR.width, eyeR.height * 2);
    fill(0);
    circle(eyeR.centerX, eyeR.centerY, 10);

    //leftEyebrow
    let eBl = faces[0].leftEyebrow;

    fill(0);
    rect(eBl.centerX, eBl.centerY, eBl.width, eBl.height / 2);

    //rightEyebrow
    let eBr = faces[0].rightEyebrow;

    rect(eBr.centerX, eBl.centerY, eBr.width, eBr.height / 2);
  }

  console.log(show);
}
