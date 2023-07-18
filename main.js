predicao1 = "";
predicao2 = "";

Webcam.set({
    width: 350,
    height: 300,
    imageFormat: "png",
    pngQuality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");
function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="imagemcapturada" src="' + data_uri + '"/>';

    });

}

console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/FRgsoSmGZ/model.json", modelLoaded);
function modelLoaded() {
    console.log("modelLoaded");
}

function habla() {
    var synth = window.speechSynthesis;
    speakdata1 = "Significa " + predicao1;
    speakdata2 = "que você está " + predicao2;
    var utterThis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utterThis);

}
function check() {
    img = document.getElementById(imagemcapturada);
    classifier.classify(img, gotResult);
    habla();
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById(resultEmotionName).innerHTML = results[0].label;
        document.getElementById(resultEmotionName2).innerHTML = results[1].label;
        predicao1 = results[0].label;
        predicao2 = results[1].label;
        habla();
    }

}