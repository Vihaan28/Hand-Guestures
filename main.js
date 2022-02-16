
Webcam.set({
    width: 350 , 
    height: 300 , 
    img_format : 'png',
    png_quality : 99
 });

 var camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){

    Webcam.snap ( function(data_uri){
        document.getElementById("result").innerHTML = " <img id='captured_image' src='" + data_uri + "'>"
    });
}

console.log('ml5 version:' , ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/HGlPvhD5W/model.json" , modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!!');
}

function speak(){
var synth = window.speechSynthesis;

var speak_1 = "The First Prediction is" + Prediction1;
var speak_2 = "And the second Prediction is" + Prediction2;

var utter_this = new SpeechSynthesisUtterance( speak_1 + speak_2);
synth.speak(utter_this);
}

function check(){

    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}

function gotResult(error, results)
{

if (error){
    console.error(error);
}else{

    console.log(results);
    document.getElementById("emotion_result_1").innerHTML = results[0].label;
    document.getElementById("emotion_result_2").innerHTML = results[1].label;
    Prediction1 = results[0].label;
    Prediction2 = results[1].label;
    speak();
    if(results[0].label == "Best")
    {
        document.getElementById("update_emoji_1").innerHTML = "&#128077;";
    }
    if(results[0].label == "Amazing")
    {
        document.getElementById("update_emoji_1").innerHTML = "&#128076;";
    }
    if(results[0].label == "Victory")
    {
        document.getElementById("update_emoji_1").innerHTML = "&#9996;";
    }

    if(results[1].label == "Best")
    {
        document.getElementById("update_emoji_2").innerHTML = "&#128077;";
    }
    if(results[1].label == "Amazing")
    {
        document.getElementById("update_emoji_2").innerHTML = "&#128076;";
    }
    if(results[1].label == "Victory")
    {
        document.getElementById("update_emoji_2").innerHTML = "&#9996;";
    }
}



}