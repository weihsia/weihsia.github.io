// JavaScript source code

var question = 1;   //�{�b�b�ĴX�D

function showNext() {   //��ܤU�@�D
    var idList = ["quiz1", "quiz2", "quiz3", "quiz4", "quiz5"];

    document.getElementById(idList[question]).hidden = false;   //��ܤU�@�D
    window.location.hash = "#" + idList[question];   //���ʦܤU�@�D����m
    question++;

    if (question > idList.length - 1) {   //�b�̫�@�D
        document.getElementById("buttonNext").hidden = true;
        document.getElementById("quizSubmit").hidden = false;
    }
}

function calcScore() {   //�p�⦨�Z
    var ansList = [1, 2, 2, 3, 1];   //���T����
    var score = 0;

    var ans1 = document.forms["quiz"].elements["q1"];
    var ans2 = document.forms["quiz"].elements["q2"];
    var ans3 = document.forms["quiz"].elements["q3"];
    var ans4 = document.forms["quiz"].elements["q4"];
    var ans5 = document.forms["quiz"].elements["q5"];
    var ans = [ans1, ans2, ans3, ans4, ans5];   //��ܪ�����

    for (var i = 0; i < ansList.length; i++) {
        if (ans[i][ansList[i]].checked) score++;
    }

    //alert("Score: " + score + "/" + ansList.length);

    location.href = "quiz_result.html?" + score + ansList.length;   //���}���Z�����B�ǰe�o���P�`��
}

function showResult() {   //���Z���
    var dataFromCalc = window.location.search.substr(1);   //substr(1): �qlocation���ĤG�Ӥ����}�lŪ��

    var score = dataFromCalc[0];
    var t_score = dataFromCalc[1];

    document.getElementById("scr").innerText = score;   //��ܱo��
    document.getElementById("t_scr").innerText = t_score;   //����`��
}
