var p1 = 0, p2 = 0;

$(function () {

    $('#pw').blur(function () {
        var pw = $("#pw").val();
        var regPW = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;
        if ($('#pw').val() != '') {
            if (false === regPW.test(pw)) {
                $("#pw_form_guide").css("display", "").css("color", "red").css('font-size', '8px').text('8~20자 영문대문자, 영문소문자, 숫자, 특수문자를 모두 사용해야합니다.');
                $("#pw_form_check_br").css("display", "none");
                p1 = 0;
            } else {
                $("#pw_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('사용 가능합니다.');
                $("#pw_form_check_br").css("display", "none");
                p1 = 1;
            }
        } else {
            $("#pw_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
            $("#pw_form_check_br").css("display", "none");
            p1 = 0;
        }
    })



    //비밀번호&비밀번호 일치 확인
    $('#pw2').blur(function () {
        if ($('#pw').val() != $('#pw2').val()) {
            if ($('#pw2').val() != '') {
                $("#pw2_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('비밀번호가 일치하지 않습니다.');
                $("#pw2_form_check_br").css("display", "none");
                p2 = 0;
            } else {
                $("#pw2_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수정보 입니다.');
                $("#pw2_form_check_br").css("display", "none");
                p2 = 0;
            }
        } else {
            if ($('#pw2').val() != '') {
                $("#pw2_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text("비밀번호 일치");
                $("#pw2_form_check_br").css("display", "none");
                p2 = 1;
            } else {
                $("#pw2_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수정보 입니다.');
                $("#pw2_form_check_br").css("display", "none");
                p2 = 0;
            }
        }
    })
})

function noSpaceForm(obj) { // 공백사용못하게
    var str_space = /\s/;  // 공백체크
    if (str_space.exec(obj.value)) { //공백 체크
        alert("해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다.");
        obj.focus();
        obj.value = obj.value.replace(' ', ''); // 공백제거
        return false;
    }
    // onkeyup="noSpaceForm(this);" onchange="noSpaceForm(this);"

}

function submitCheck() {
    if (p1 == 0) {
        alert('비밀번호 조건이 맞지 않습니다.');
        return false;
    } else if (p2 == 0) {
        alert('비밀번호 확인이 일치하지 않습니다.');
        return false;
    } else {
        return true;
    }
}