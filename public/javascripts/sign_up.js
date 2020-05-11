var i = 0, p1 = 0, p2 = 0, n = 0, ph = 0, a = 0;

$(function () {

    

    




// ID 중복값 체크 & 유효성 검사
    $('#id').blur(function () {
        $.ajax({
            type: "POST",
            url: "/user2/check_id",
            dataType: 'json',
            data: {
                "id": $('#id').val()
            },
            success: function (data) {	//data : check_id에서 넘겨준 결과값
                console.log("ajax에서 받은 값은 : " + data);
                if ($.trim(data) == '1') {
                    if ($('#id').val() != '') {

                        var id = $("#id").val();
                        var regID = /^[a-z0-9]{4,15}$/;

                        if (false === regID.test(id)) {
                            $("#id_form_guide").css("display", "").css("color", "red").css('font-size', '8px').text('영 소문자, 숫자 4~20자리로 입력해주세요.');
                            $("#id_form_check_br").css("display", "none");
                            i = 0
                        } else {
                            $("#id_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('사용 가능합니다.');
                            i = 1
                        }
                    } else {
                        $("#id_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
                        $("#id_form_check_br").css("display", "none");
                        i = 0
                    }
                } else {
                    $("#id_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('이미 사용중인 아이디 입니다.');
                    $("#id_form_check_br").css("display", "none");
                    i = 0
                }
            }
        })
    })



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
                p2 =0;
            } else {
                $("#pw2_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수정보 입니다.');
                $("#pw2_form_check_br").css("display", "none");
                p2 =0;
            }
        } else {
            if ($('#pw2').val() != '') {
                $("#pw2_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text("비밀번호 일치");
                $("#pw2_form_check_br").css("display", "none");
                p2 =1;
            } else {
                $("#pw2_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수정보 입니다.');
                $("#pw2_form_check_br").css("display", "none");
                p2 =0;
            }
        }
    })

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
                            n=0;
                        } else {
                            $("#nickname_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('사용 가능합니다.');
                            n=1;
                        }
                    } else {
                        $("#nickname_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
                        $("#nickname_form_check_br").css("display", "none");
                        n=0;
                    }
                } else {
                    $("#nickname_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('이미 사용중인 닉네임 입니다.');
                    $("#nickname_form_check_br").css("display", "none");
                    n=0;
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
                ph=0;
            } else {
                $("#phone_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('확인');
                $("#phone_form_check_br").css("display", "none");
                ph=1;
            }
        } else {
            $("#phone_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
            $("#phone_form_check_br").css("display", "none");
            ph=0;
        }
    })

    

        
    

    $('#area').blur(function () {

        var area = $("#area").val();
        var regAREA = /^[a-zA-Z0-9가-힣 ]{2,40}$/;

        if ($('#area').val() != '') {
            if (false === regAREA.test(area)) {
                $("#area_form_guide").css("display", "").css("color", "red").css('font-size', '8px').text('2 - 40 글자 사이로 작성해주세요');
                $("#area_form_check_br").css("display", "none");
                a=0;
            } else {
                $("#area_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('확인');
                $("#area_form_check_br").css("display", "none");
                a=1;
            }
        } else {
            $("#area_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
            $("#area_form_check_br").css("display", "none");
            a=0;
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



function submitCheck() {

    console.log("i | p1 | p2 | n | ph | a", a, p1, p2, n, ph, a);

    if (i == 0) {
        alert('아이디 조건이 맞지 않습니다.');
        return false;
    }
    else if (p1 == 0) {
        alert('비밀번호 조건이 맞지 않습니다.');
        return false;
    } else if (p2 == 0) {
        alert('비밀번호 확인이 일치하지 않습니다.');
        return false;
    } else if (n == 0) {
        alert('닉네임 조건이 맞지 않습니다.');
        return false;
    } else if (ph == 0) {
        alert('전화번호 조건이 맞지 않습니다.');
        return false;
    } else if (a == 0) {
        alert('지역 조건이 맞지 않습니다.');
        return false;
    }
    else{
        return true;
    }
}

