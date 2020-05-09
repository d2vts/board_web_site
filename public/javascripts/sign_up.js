$(function () {
    //아이디 중복체크
    $('#id').blur(function () {
        $.ajax({
            type: "POST",
            url: "check_email",
            data: {
                "email": $('#email').val()
            },
            success: function (data) {	//data : checkSignup에서 넘겨준 결과값
                if ($.trim(data) == "YES") {
                    if ($('#email').val() != '') {
                        alert("사용가능한 아이디입니다.");
                    }
                } else {
                    if ($('#email').val() != '') {
                        alert("중복된 아이디입니다.");
                        $('#email').focus();
                    }
                }
            }
        })
    })


 //비밀번호 정규표현식 확인
 /*
 $('#pw').blur(function () {
    if ($('#pw').val() != '') {
        if ($('#pw').val() != '/^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]|.*[0-9]).{8,16}$/') {
            $("#pw_form_error").css("display", "");
            $("#pw_form_check_br").css("display", "none");
        }
        else{

        }
    }
})
*/


//비밀번호&비밀번호 일치 확인
 $('#pw2').blur(function () {
    if ($('#pw').val() != $('#pw2').val()) {
        if ($('#pw2').val() != '') {
            $("#pw2_form_error").css("display", "");
            $("#pw2_form_check_br").css("display", "none");
        }
    }
})



});
