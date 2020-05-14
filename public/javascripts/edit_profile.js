var n = 0, ph = 0, a = 0;



$(function () {



    //닉네임 중복체크 와 유효성 검사
    $('#nickname').blur(function () {
        $.ajax({
            type: "POST",
            url: "/user2/check_nickname",
            dataType: 'json',
            data: {
                "nickname": $('#nickname').val()
            },
            success: function (data) {	//data : check_nickname에서 넘겨준 결과값
                console.log("ajax에서 받은 값은 : " + data);
                if ($.trim(data) == '1') {
                    if ($('#nickname').val() != '') {

                        var nickname = $("#nickname").val();
                        var regNICKNAME = /^[a-zA-Z0-9가-힣]{2,8}$/;

                        if (false === regNICKNAME.test(nickname)) {
                            $("#nickname_form_guide").css("display", "").css("color", "red").css('font-size', '8px').text('영문,한글,숫자사용가능 2~8단어');
                            $("#nickname_form_check_br").css("display", "none");
                            n = 0;
                        } else {
                            $("#nickname_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('사용 가능합니다.');
                            n = 1;
                        }
                    } else {
                        $("#nickname_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
                        $("#nickname_form_check_br").css("display", "none");
                        n = 0;
                    }
                } else if ($.trim(data) == '2') {
                    $("#nickname_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('사용 가능합니다.');
                    n = 1;
                }
                else {
                    $("#nickname_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('이미 사용중인 닉네임 입니다.');
                    $("#nickname_form_check_br").css("display", "none");
                    n = 0;
                }
            }
        })
    })



    $('#phone').blur(function () {

        var phone = $("#phone").val();
        var regPHONE = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

        if ($('#phone').val() != '') {
            if (false === regPHONE.test(phone)) {
                $("#phone_form_guide").css("display", "").css("color", "red").css('font-size', '8px').text('전화번호 양식을 벗어납니다.');
                $("#phone_form_check_br").css("display", "none");
                ph = 0;
            } else {
                $("#phone_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('확인');
                $("#phone_form_check_br").css("display", "none");
                ph = 1;
            }
        } else {
            $("#phone_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
            $("#phone_form_check_br").css("display", "none");
            ph = 0;
        }
    })



    $('#area').blur(function () {

        var area = $("#area").val();
        var regAREA = /^[a-zA-Z0-9가-힣 ]{2,40}$/;

        if ($('#area').val() != '') {
            if (false === regAREA.test(area)) {
                $("#area_form_guide").css("display", "").css("color", "red").css('font-size', '8px').text('2 - 40 글자 사이로 작성해주세요');
                $("#area_form_check_br").css("display", "none");
                a = 0;
            } else {
                $("#area_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('확인');
                $("#area_form_check_br").css("display", "none");
                a = 1;
            }
        } else {
            $("#area_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
            $("#area_form_check_br").css("display", "none");
            a = 0;
        }
    })


});



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

function checkall(obj){
    $('#nickname').focus();
    $('#nickname').blur();
    $('#phone').focus();
    $('#phone').blur();
    $('#area').focus();
    $('#area').blur();
}

function submitCheck() {

   

    if (n == 0) {
        alert('닉네임 조건이 맞지 않습니다.');
        return false;
    } else if (ph == 0) {
        alert('전화번호 조건이 맞지 않습니다.');
        return false;
    } else if (a == 0) {
        alert('지역 조건이 맞지 않습니다.');
        return false;
    }
    else {
        return true;
    }
}

