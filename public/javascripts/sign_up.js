$(function () {

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
                        } else {
                            $("#id_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('사용 가능합니다.');
                        }
                    } else {
                        $("#id_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
                        $("#id_form_check_br").css("display", "none");
                    }
                } else {
                    $("#id_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('이미 사용중인 아이디 입니다.');
                    $("#id_form_check_br").css("display", "none");
                }
            }
        })
    })


    // 시간날때 비밀번호 공백시 alert 울리게 구현 해볼것


    // ID 중복값 체크 & 유효성 검사
    $('#id').blur(function () {

        var id = $("#id").val();
        var regID = /^[a-z0-9]{4,15}$/;

        if ($('#id').val() != '') {
            if (false === regID.test(id)) {
                $("#id_form_guide").css("display", "").css("color", "red").css('font-size', '8px').text('영 소문자, 숫자 4~20자리로 입력해주세요.');
                $("#id_form_check_br").css("display", "none");
            } else {
                $("#id_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('사용 가능합니다.');
                $("#id_form_check_br").css("display", "none");

            }
        } else {
            $("#id_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
            $("#id_form_check_br").css("display", "none");
        }
    })





    $('#pw').blur(function () {

        var pw = $("#pw").val();
        var regPW = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;

        if ($('#pw').val() != '') {
            if (false === regPW.test(pw)) {
                $("#pw_form_guide").css("display", "").css("color", "red").css('font-size', '8px').text('8~20자 영문대문자, 영문소문자, 숫자, 특수문자를 모두 사용해야합니다.');
                $("#pw_form_check_br").css("display", "none");
            } else {
                $("#pw_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('사용 가능합니다.');
                $("#pw_form_check_br").css("display", "none");
            }
        } else {
            $("#pw_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
            $("#pw_form_check_br").css("display", "none");
        }
    })



    //비밀번호&비밀번호 일치 확인
    $('#pw2').blur(function () {
        if ($('#pw').val() != $('#pw2').val()) {
            if ($('#pw2').val() != '') {
                $("#pw2_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('비밀번호가 일치하지 않습니다.');
                $("#pw2_form_check_br").css("display", "none");
            } else {
                $("#pw2_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수정보 입니다.');
                $("#pw2_form_check_br").css("display", "none");
            }
        } else {
            if ($('#pw2').val() != '') {
                $("#pw2_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text("비밀번호 일치");
                $("#pw2_form_check_br").css("display", "none");
            } else {
                $("#pw2_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수정보 입니다.');
                $("#pw2_form_check_br").css("display", "none");
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
                        } else {
                            $("#nickname_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('사용 가능합니다.');
                        }
                    } else {
                        $("#nickname_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
                        $("#nickname_form_check_br").css("display", "none");
                    }
                } else {
                    $("#id_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('이미 사용중인 닉네임 입니다.');
                    $("#id_form_check_br").css("display", "none");
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
            } else {
                $("#phone_form_guide").css("display", "").css("color", "#2DB400").css("font-size", "11px").text('확인');
                $("#phone_form_check_br").css("display", "none");
            }
        } else {
            $("#phone_form_guide").css("display", "").css("color", "red").css("font-size", "11px").text('필수 정보 입니다.');
            $("#phone_form_check_br").css("display", "none");
        }
    })



});

