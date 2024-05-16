// JavaScript source code

function exitQuiz() {
    check = confirm("\nWARNING!\n\nExiting now will lose all your progress.\n\nExit now?");
    if (check == true) toHome();
}

var idList = ["quiz1", "quiz2", "quiz3", "quiz4", "quiz5"];   //table��id
var ansList = [1, 2, 2, 3, 1];   //���T����
var question = 0;   //�{�b�b�ĴX�D

function showPrevious() {
    document.getElementById(idList[question]).hidden = true;   //���äU�@�D

    question--;
    document.getElementById(idList[question]).hidden = false;   //��ܤW�@�D
    window.location.hash = "#" + idList[question];   //���ʦܤW�@�D����m

    if (question == 0) {   //�^��Ĥ@�D
        document.getElementById("buttonPrevious").hidden = true;
    }

    if (question != idList.length - 1) {   //���b�̫�@�D
        document.getElementById("buttonNext").hidden = false;
        document.getElementById("quizSubmit").hidden = true;
    }
}

function showNext() {   //��ܤU�@�D
    if (!checkAnswered()) {
        alert("Please select an answer.");
        return;
    }

    document.getElementById(idList[question]).hidden = true;   //���äW�@�D

    question++;
    document.getElementById(idList[question]).hidden = false;   //��ܤU�@�D
    window.location.hash = "#" + idList[question];   //���ʦܤU�@�D����m

    if (question > 0) {   //�b�ĤG�D�ΥH�W
        document.getElementById("buttonPrevious").hidden = false;
    }

    if (question == idList.length - 1) {   //�b�̫�@�D
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

function calcScore() {   //�p�⦨�Z
    //var your_ans = [];  //�ϥΪ̪��ﶵ(array)
    var your_ans = "";  //�ϥΪ̪��ﶵ(string)
    var score = 0;

    for (var i = 0; i < ansList.length; i++) {  //��i�D
        var ans = document.forms["quiz"].elements["q" + (i + 1)];
        for (var j = 0; j < ans.length; j++) {   //��j�ӿﶵ
            if (ans[j].checked) {
                //your_ans[i] = j;   //�諸�ﶵ��index
                //your_ans.push(ans[j].nextSibling.nodeValue.trim());   //array��
                your_ans += ans[j].nextSibling.nodeValue.trim() + ",";   //string��
                if (j == ansList[i]) {   //����
                    score++;
                }
            }
        }
    }
    your_ans = your_ans.slice(0, -1); // �����̫�@�ӳr��

    //array��(��alert)
    /*if (your_ans.length > 0) {
        alert("Score: " + score + "/" + ansList.length + "\n\nYour answers:\n" + your_ans.join("\n"));
    } else {
        alert("Congratulations! You got all questions right!");
    }*/

    //string��(�e�즨�Z��ܭ���)
    location.href = "quiz_result.html?score=" + score + "&t_score=" + ansList.length + "&your_ans=" + your_ans;   //���}���Z�����B�ǰe�o���P�`��
}

function showResult() {   //���Z���
    var dataFromCalc = window.location.search.substr(1);   //substr(1): �qlocation���ĤG�Ӥ����}�lŪ��
    var urlParams = new URLSearchParams(dataFromCalc);

    var score = urlParams.get("score");
    var t_score = urlParams.get("t_score");
    var your_ans = urlParams.get("your_ans").split(","); //string��array

    document.getElementById("scr").innerText = score;   //��ܱo��
    document.getElementById("t_scr").innerText = t_score;   //����`��

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
