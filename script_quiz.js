// JavaScript source code

var question = 1;   //現在在第幾題

function showNext() {   //顯示下一題
    var idList = ["quiz1", "quiz2", "quiz3", "quiz4", "quiz5"];

    document.getElementById(idList[question]).hidden = false;   //顯示下一題
    window.location.hash = "#" + idList[question];   //移動至下一題的位置
    question++;

    if (question > idList.length - 1) {   //在最後一題
        document.getElementById("buttonNext").hidden = true;
        document.getElementById("quizSubmit").hidden = false;
    }
}

function calcScore() {   //計算成績
    var ansList = [1, 2, 2, 3, 1];   //正確答案
    var score = 0;

    var ans1 = document.forms["quiz"].elements["q1"];
    var ans2 = document.forms["quiz"].elements["q2"];
    var ans3 = document.forms["quiz"].elements["q3"];
    var ans4 = document.forms["quiz"].elements["q4"];
    var ans5 = document.forms["quiz"].elements["q5"];
    var ans = [ans1, ans2, ans3, ans4, ans5];   //選擇的答案

    for (var i = 0; i < ansList.length; i++) {
        if (ans[i][ansList[i]].checked) score++;
    }

    //alert("Score: " + score + "/" + ansList.length);

    location.href = "quiz_result.html?" + score + ansList.length;   //打開成績頁面、傳送得分與總分
}

function showResult() {   //成績顯示
    var dataFromCalc = window.location.search.substr(1);   //substr(1): 從location的第二個元素開始讀取

    var score = dataFromCalc[0];
    var t_score = dataFromCalc[1];

    document.getElementById("scr").innerText = score;   //顯示得分
    document.getElementById("t_scr").innerText = t_score;   //顯示總分
}
