// JavaScript source code

function exitQuiz() {
    check = confirm("\nWARNING!\n\nExiting now will lose all your progress.\n\nExit now?");
    if (check == true) toHome();
}

function reopenQuiz() {
    window.open("quiz_play_v3.html", "_self");
}

var question = 0;   //現在在第幾題
var ansList = [   //正確答案
    1, 2, 2, 3, 1,   //~5
    1, 2, 2, 0, 3,   //~10
    3, 1, 1, 2, 3,   //~15
    1, 0];   //~20
       //~25
       //~30
    //0, 2, 3, 2, 3,   //~35
    //1, 1, 0, 2, 0,   //~40
    //3];

var idList = [];   //存table的id
for (var i = 1; i <= ansList.length; i++) {
    idList[i - 1] = "quiz" + i;
}

var chosenNum = 17;   //抽幾題
var chosenList = [];   //存抽出來的題號
for (var i = 0; i < chosenNum; i++) {   //隨機抽題號
    var num;
    do {
        num = Math.ceil(Math.random() * ansList.length) - 1;
    } while (chosenList.includes(num));
    chosenList[i] = num;
}

//document.getElementById(idList[chosenList[0]]).hidden = false;   //顯示抽到的第一題 (已放到body最後)
//document.getElementById("page").innerText = " 1/" + chosenNum + " ";   //顯示第一題頁數 (已放到body最後)

function showPrevious() {
    document.getElementById(idList[chosenList[question]]).hidden = true;   //隱藏下一題

    question--;
    document.getElementById("page").innerText = " " + (question + 1) + "/" + chosenNum + " ";
    document.getElementById(idList[chosenList[question]]).hidden = false;   //顯示上一題
    window.location.hash = "#" + idList[chosenList[question]];   //移動至上一題的位置

    if (question == 0) {   //回到第一題
        document.getElementById("buttonPrevious").hidden = true;
    }

    if (question != chosenNum - 1) {   //不在最後一題
        document.getElementById("buttonNext").hidden = false;
        document.getElementById("quizSubmit").hidden = true;
    }
}

function showNext() {   //顯示下一題
    if (!checkAnswered()) {
        alert("Please select an answer.");
        return;
    }
    
    document.getElementById(idList[chosenList[question]]).hidden = true;   //隱藏上一題

    question++;
    document.getElementById("page").innerText = " " + (question + 1) + "/" + chosenNum + " ";
    document.getElementById(idList[chosenList[question]]).hidden = false;   //顯示下一題
    window.location.hash = "#" + idList[chosenList[question]];   //移動至下一題的位置

    if (question > 0) {   //在第二題或以上
        document.getElementById("buttonPrevious").hidden = false;
    }

    if (question == chosenNum - 1) {   //在最後一題
        document.getElementById("buttonNext").hidden = true;
        document.getElementById("quizSubmit").hidden = false;
    }
}

function checkAnswered() {
    var ans = document.forms["quiz"].elements["q" + (chosenList[question] + 1)];
    for (var i = 0; i < ans.length; i++) {
        if (ans[i].checked) return true;
    }
    return false;
}

function calcScore() {   //計算成績
    if (!checkAnswered()) {   //手動檢查最後一題
        alert("Please select an answer.");
        return;
    }

    //var your_ans = [];   //使用者的選項(array)
    var your_ans = "";   //使用者的選項(string)
    var correct_ans = "";   //正確選項(string)
    var score = 0;

    for (var i = 0; i < chosenNum; i++) {   //第i題
        var ans = document.forms["quiz"].elements["q" + (chosenList[i] + 1)];
        correct_ans += ans[ansList[chosenList[i]]].nextSibling.nodeValue.trim() + "^";   //存正確選項的文字
        for (var j = 0; j < ans.length; j++) {   //第j個選項
            if (ans[j].checked) {
                //your_ans.push(ans[j].nextSibling.nodeValue.trim());   //array版
                your_ans += ans[j].nextSibling.nodeValue.trim() + "^";   //string版
                if (j == ansList[chosenList[i]]) {   //答對
                    score++;
                }
            }
        }
    }
    your_ans = your_ans.slice(0, -1);   // 移除最後一個^
    correct_ans = correct_ans.slice(0, -1);   // 移除最後一個^

    //array版(用alert)
    /*if (your_ans.length > 0) {
        alert("Score: " + score + "/" + chosenList.length + "\n\nYour answers:\n" + your_ans.join("\n"));
    } else {
        alert("Congratulations! You got all questions right!");
    }*/

    //string版(送到成績頁面)
    location.href = "quiz_result_v3.html?score=" + score + "&t_score=" + chosenList.length + "&your_ans=" + your_ans + "&correct_ans=" + correct_ans;   //打開成績頁面、傳送得分與總分
}

function generateTable() {   //根據題數生成相對表格行數
    // 獲取表格元素
    const table = document.getElementById('resultTable');
     
    for (let i = 1; i <= chosenNum; i++) {
        // 創建新的行
        const row = document.createElement('tr');

        // 創建和添加#列
        const numCell = document.createElement('td');
        numCell.id = `num${i}`;
        numCell.textContent = i;
        row.appendChild(numCell);

        // 創建和添加Your Answer列
        const yourAnsCell = document.createElement('td');
        yourAnsCell.className = 'res';
        yourAnsCell.id = `yourAns${i}`;
        row.appendChild(yourAnsCell);

        // 創建和添加Correct Answer列
        const correctAnsCell = document.createElement('td');
        correctAnsCell.className = 'res';
        correctAnsCell.id = `correctAns${i}`;
        row.appendChild(correctAnsCell);

        // 將行添加到表格
        table.appendChild(row);
    }
}

function showResult() {   //成績顯示
    var dataFromCalc = window.location.search.substr(1);   //substr(1): 從location的第二個元素開始讀取
    var urlParams = new URLSearchParams(dataFromCalc);

    var score = urlParams.get("score");
    var t_score = urlParams.get("t_score");
    var your_ans = urlParams.get("your_ans").split("^");   //string轉array
    var correct_ans = urlParams.get("correct_ans").split("^");   //string轉array

    document.getElementById("scr").innerText = score;   //顯示得分
    document.getElementById("t_scr").innerText = t_score;   //顯示總分

    for (var i = 0; i < chosenNum; i++) {
        var numberCell = document.getElementById(`num${i + 1}`);
        var yourAnsCell = document.getElementById(`yourAns${i + 1}`);
        var correctAnsCell = document.getElementById(`correctAns${i + 1}`);

        yourAnsCell.innerText = your_ans[i];
        correctAnsCell.innerText = correct_ans[i];

        if (your_ans[i] != correct_ans[i]) {
            numberCell.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
            yourAnsCell.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
            correctAnsCell.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
        } /*else {
            numberCell.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
            yourAnsCell.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
            correctAnsCell.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
        }*/
    }
}

function showResultTable() {
    var t = document.getElementById("resultTable");
    var b = document.getElementById("showResTableButton");

    if (t.hidden == true) {
        t.hidden = false;
        b.innerHTML = "Hide Answers";
    } else {
        t.hidden = true;
        b.innerHTML = "Show Answers";
    }
}
