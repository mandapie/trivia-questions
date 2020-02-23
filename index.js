// variables
var questions, inputs;
var q = document.getElementsByClassName("question");
var backs = document.getElementsByClassName("back");
var redo = document.getElementById("redo");

// get 5 random trivia questions from API
var XHR = new XMLHttpRequest();
XHR.onreadystatechange = function () {
    if (XHR.readyState == 4 && XHR.status == 200) {
        questions = JSON.parse(XHR.responseText);

        // load questions
        for (var i = 0; i < 5; i++) {
            q[i].innerHTML = "<p><strong>Question " + (i + 1) + "</strong></p>" +
                "<p>Category: " + questions[i].category + "</p>" +
                "<div>" + questions[i].question + "</div>" +
                "<input id='input" + (i + 1) + "' type='text'>" +
                "<p id='answer" + (i + 1) + "' style='display:none'>Answer: " + questions[i].answer + "</p>";
        }

        // after loading questions, focus on first input
        document.getElementById("input1").focus();

        // go to next div when user hits "enter" in input element
        inputs = document.getElementsByTagName("INPUT");
        for (var i = 0; i < 5; i++) {
            // if this is last question, show everything
            if (i == 4) {
                inputs[i].addEventListener("keyup", function (e) {
                    if (e.keyCode == 13) {
                        var end = document.getElementById("end");
                        var start = document.getElementById("start");
                        end.style.display = "block";
                        start.style.display = "none";

                        // show all questions and answers
                        for (var j = 1; j < 6; j++) {
                            var question = document.getElementById("question" + j);
                            var answer = document.getElementById("answer" + j);

                            question.style.display = "block";
                            answer.style.display = "block";
                        }

                        // hide all back buttons
                        for (element in backs) {
                            if (backs[element].type == "submit") {
                                backs[element].style.display = "none";
                            }
                        }
                    }
                });
            }
            // go to next question
            else {
                inputs[i].addEventListener("keyup", function (e) {
                    if (e.keyCode == 13) {
                        var input = this.id;
                        var curr = document.getElementById("question" + input.split("input")[1]);
                        var next = document.getElementById("question" + (parseInt(input.split("input")[1]) + 1));
                        var nextInput = document.getElementById("input" + (parseInt(input.split("input")[1]) + 1));

                        curr.style.display = "none";
                        next.style.display = "block";
                        nextInput.focus();
                    }
                });
            }
        };
    }
}
XHR.open("GET", "https://trivia.propernerd.com/api/questions?limit=5&random=true");
XHR.send();


// refresh page when redo button is clicked
redo.addEventListener("click", function () {
    window.location.href = window.location.href;
});


// back button function
for (element in backs) {
    if (backs[element].type == "submit") {
        backs[element].addEventListener("click", function () {
            var button = this.id;
            var curr = document.getElementById("question" + (parseInt(button.split("back")[1]) + 1));
            var prev = document.getElementById("question" + button.split("back")[1]);
            var prevInput = document.getElementById("input" + button.split("back")[1]);

            curr.style.display = "none";
            prev.style.display = "block";
            prevInput.focus();
        });
    }
}