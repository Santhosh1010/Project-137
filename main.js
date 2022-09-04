objects = [];
status = "";

function setup()
{
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object = document.getElementById("object_input").value;
    console.log(object);
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectdetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == object)
            {
                video.stop();
                objectdetector.detect(gotResult);
                document.getElementById("status").innerHTML = "Object Mentioned Found";
                synth = window.speechSynthesis; 
                utterThis = new SpeechSynthesisUtterance(object + "Found"); 
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("status").innerHTML = "Object Mentioned Not Found";
            }
        }
    }
}

function gotResult(error, results)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}