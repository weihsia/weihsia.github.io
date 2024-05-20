// JavaScript source code

function exitQuiz() {
    check = confirm("\nWARNING!\n\nExiting now will lose all your progress.\n\nExit now?");
    if (check == true) toHome();
}

function reopenQuiz() {
    window.open("quiz_play_v3.html", "_self");
}

var ansList = [1, 2, 2, 3, 1];   //���T����
var question = 0;   //�{�b�b�ĴX�D

var idList = [];   //�stable��id
for (var i = 1; i <= ansList.length; i++) {
    idList[i - 1] = "quiz" + i;
}

var chosenNum = 5;   //��X�D
var chosenList = [];   //�s��X�Ӫ��D��
for (var i = 0; i < chosenNum; i++) {   //�H�����D��
    var num;
    do {
        num = Math.ceil(Math.random() * ansList.length) - 1;
    } while (chosenList.includes(num));
    chosenList[i] = num;
}

//document.getElementById(idList[chosenList[0]]).hidden = false;   //��ܩ�쪺�Ĥ@�D (�w���body�̫�)

function showPrevious() {
    document.getElementById(idList[chosenList[question]]).hidden = true;   //���äU�@�D

    question--;
    document.getElementById(idList[chosenList[question]]).hidden = false;   //��ܤW�@�D
    window.location.hash = "#" + idList[chosenList[question]];   //���ʦܤW�@�D����m

    if (question == 0) {   //�^��Ĥ@�D
        document.getElementById("buttonPrevious").hidden = true;
    }

    if (question != chosenNum - 1) {   //���b�̫�@�D
        document.getElementById("buttonNext").hidden = false;
        document.getElementById("quizSubmit").hidden = true;
    }
}

function showNext() {   //��ܤU�@�D
    if (!checkAnswered()) {
        alert("Please select an answer.");
        return;
    }

    document.getElementById(idList[chosenList[question]]).hidden = true;   //���äW�@�D

    question++;
    document.getElementById(idList[chosenList[question]]).hidden = false;   //��ܤU�@�D
    window.location.hash = "#" + idList[chosenList[question]];   //���ʦܤU�@�D����m

    if (question > 0) {   //�b�ĤG�D�ΥH�W
        document.getElementById("buttonPrevious").hidden = false;
    }

    if (question == chosenNum - 1) {   //�b�̫�@�D
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

function calcScore() {   //�p�⦨�Z
    if (!checkAnswered()) {   //����ˬd�̫�@�D
        alert("Please select an answer.");
        return;
    }

    //var your_ans = [];  //�ϥΪ̪��ﶵ(array)
    var your_ans = "";  //�ϥΪ̪��ﶵ(string)
    var correct_ans = "";   //���T�ﶵ(string)
    var score = 0;

    for (var i = 0; i < chosenNum; i++) {  //��i�D
        var ans = document.forms["quiz"].elements["q" + (chosenList[i] + 1)];
        correct_ans += ans[ansList[chosenList[i]]].nextSibling.nodeValue.trim() + "^";   //�s���T�ﶵ����r
        for (var j = 0; j < ans.length; j++) {   //��j�ӿﶵ
            if (ans[j].checked) {
                //your_ans.push(ans[j].nextSibling.nodeValue.trim());   //array��
                your_ans += ans[j].nextSibling.nodeValue.trim() + "^";   //string��
                if (j == ansList[chosenList[i]]) {   //����
                    score++;
                }
            }
        }
    }
    your_ans = your_ans.slice(0, -1); // �����̫�@��^
    correct_ans = correct_ans.slice(0, -1); // �����̫�@��^

    //array��(��alert)
    /*if (your_ans.length > 0) {
        alert("Score: " + score + "/" + chosenList.length + "\n\nYour answers:\n" + your_ans.join("\n"));
    } else {
        alert("Congratulations! You got all questions right!");
    }*/

    //string��(�e�즨�Z����)
    location.href = "quiz_result_v3.html?score=" + score + "&t_score=" + chosenList.length + "&your_ans=" + your_ans + "&correct_ans=" + correct_ans;   //���}���Z�����B�ǰe�o���P�`��
}

function generateTable() {   //�ھ��D�ƥͦ��۹�����
    // �����椸��
    const table = document.getElementById('resultTable');
     
    for (let i = 1; i <= chosenNum; i++) {
        // �Ыطs����
        const row = document.createElement('tr');

        // �ЫةM�K�[#�C
        const numCell = document.createElement('td');
        numCell.id = `num${i}`;
        numCell.textContent = i;
        row.appendChild(numCell);

        // �ЫةM�K�[Your Answer�C
        const yourAnsCell = document.createElement('td');
        yourAnsCell.className = 'res';
        yourAnsCell.id = `yourAns${i}`;
        row.appendChild(yourAnsCell);

        // �ЫةM�K�[Correct Answer�C
        const correctAnsCell = document.createElement('td');
        correctAnsCell.className = 'res';
        correctAnsCell.id = `correctAns${i}`;
        row.appendChild(correctAnsCell);

        // �N��K�[����
        table.appendChild(row);
    }
}

function showResult() {   //���Z���
    var dataFromCalc = window.location.search.substr(1);   //substr(1): �qlocation���ĤG�Ӥ����}�lŪ��
    var urlParams = new URLSearchParams(dataFromCalc);

    var score = urlParams.get("score");
    var t_score = urlParams.get("t_score");
    var your_ans = urlParams.get("your_ans").split("^");   //string��array
    var correct_ans = urlParams.get("correct_ans").split("^");   //string��array

    document.getElementById("scr").innerText = score;   //��ܱo��
    document.getElementById("t_scr").innerText = t_score;   //����`��

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
        } else {
            //numberCell.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
            //yourAnsCell.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
            //correctAnsCell.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
        }
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