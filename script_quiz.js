// JavaScript source code

function exitQuiz() {
    check = confirm("\nWARNING!\n\nExiting now will lose all your progress.\n\nExit now?");
    if (check == true) toHome();
}

var idList = ["quiz1", "quiz2", "quiz3", "quiz4", "quiz5"];   //table的id
var ansList = [1, 2, 2, 3, 1];   //正確答案
var question = 0;   //現在在第幾題

function showPrevious() {
    document.getElementById(idList[question]).hidden = true;   //隱藏下一題

    question--;
    document.getElementById(idList[question]).hidden = false;   //顯示上一題
    window.location.hash = "#" + idList[question];   //移動至上一題的位置

    if (question == 0) {   //回到第一題
        document.getElementById("buttonPrevious").hidden = true;
    }

    if (question != idList.length - 1) {   //不在最後一題
        document.getElementById("buttonNext").hidden = false;
        document.getElementById("quizSubmit").hidden = true;
    }
}

function showNext() {   //顯示下一題
    if (!checkAnswered()) {
        alert("Please select an answer.");
        return;
    }

    document.getElementById(idList[question]).hidden = true;   //隱藏上一題

    question++;
    document.getElementById(idList[question]).hidden = false;   //顯示下一題
    window.location.hash = "#" + idList[question];   //移動至下一題的位置

    if (question > 0) {   //在第二題或以上
        document.getElementById("buttonPrevious").hidden = false;
    }

    if (question == idList.length - 1) {   //在最後一題
        document.getElementById("buttonNext").hidden = true;
        document.getElementById("quizSubmit").hidden = false;
    }
}

function checkAnswered() {
    var ans = document.forms["quiz"].elements["q" + (question + 1)];
    for (var i = 0; i < ans.length; i++) {
        if (ans[i].checked) return true;
    }
    return false;
}

function calcScore() {   //計算成績
    //var your_ans = [];  //使用者的選項(array)
    var your_ans = "";  //使用者的選項(string)
    var score = 0;

    for (var i = 0; i < ansList.length; i++) {  //第i題
        var ans = document.forms["quiz"].elements["q" + (i + 1)];
        for (var j = 0; j < ans.length; j++) {   //第j個選項
            if (ans[j].checked) {
                //your_ans[i] = j;   //選的選項的index
                //your_ans.push(ans[j].nextSibling.nodeValue.trim());   //array版
                your_ans += ans[j].nextSibling.nodeValue.trim() + ",";   //string版
                if (j == ansList[i]) {   //答對
                    score++;
                }
            }
        }
    }
    your_ans = your_ans.slice(0, -1); // 移除最後一個逗號

    //array版(用alert)
    /*if (your_ans.length > 0) {
        alert("Score: " + score + "/" + ansList.length + "\n\nYour answers:\n" + your_ans.join("\n"));
    } else {
        alert("Congratulations! You got all questions right!");
    }*/

    //string版(送到成績顯示頁面)
    location.href = "quiz_result.html?score=" + score + "&t_score=" + ansList.length + "&your_ans=" + your_ans;   //打開成績頁面、傳送得分與總分
}

function showResult() {   //成績顯示
    var dataFromCalc = window.location.search.substr(1);   //substr(1): 從location的第二個元素開始讀取
    var urlParams = new URLSearchParams(dataFromCalc);

    var score = urlParams.get("score");
    var t_score = urlParams.get("t_score");
    var your_ans = urlParams.get("your_ans").split(","); //string轉array

    document.getElementById("scr").innerText = score;   //顯示得分
    document.getElementById("t_scr").innerText = t_score;   //顯示總分

    for (var i = 0; i < idList.length; i++) {
        var numberCell = document.getElementById(`num${i + 1}`);
        var yourAnsCell = document.getElementById(`yourAns${i + 1}`);
        var correctAnsCell = document.getElementById(`correctAns${i + 1}`);

        yourAnsCell.innerText = your_ans[i];

        if (your_ans[i] != correctAnsCell.innerText) {
            numberCell.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
            yourAnsCell.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
            correctAnsCell.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
        } else {
            //numberCell.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
            //yourAnsCell.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
            //correctAnsCell.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
        }
    }
}
