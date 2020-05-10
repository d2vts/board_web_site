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
                        
                    }
                } 
                else if($.trim(data) == '0'){
                }
                
                else {
                    if ($('#id').val() != '') {
                        alert(data);
                    }
                }
            }
        })
    })



    $('#pw').blur(function () {

        var pw = $("#pw").val();
            
        var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;
         
        if ($('#pw').val() != ''){
        if(false === reg.test(pw)) {
        $("#pw_form_error").css("display", "");
                $("#pw_form_ok").css("display", "none");
                $("#pw_form_check_br").css("display", "none");
                $("#pw_form_none").css("display", "none")
        }else if(/(\w)\1\1\1/.test(pw)){
         alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
         return false;
         }else if(pw.search(/\s/) != -1){
         alert("비밀번호는 공백 없이 입력해주세요.");
         return false;
         }else {
            $("#pw_form_error").css("display", "none");
            $("#pw_form_check_br").css("display", "none");
            $("#pw_form_ok").css("display", "");
            $("#pw_form_none").css("display", "none")
         }
        }
        else{
            $("#pw_form_error").css("display", "none");
            $("#pw_form_check_br").css("display", "none");
            $("#pw_form_ok").css("display", "none");
            $("#pw_form_none").css("display", "");
        }
    
    })



    //비밀번호&비밀번호 일치 확인
    $('#pw2').blur(function () {
        if ($('#pw').val() != $('#pw2').val()) {
            if ($('#pw2').val() != '') {
                $("#pw2_form_error").css("display", "");
                $("#pw2_form_ok").css("display", "none");
                $("#pw2_form_check_br").css("display", "none");
                $("#pw2_form_none").css("display", "none");
            }
            else{
            $("#pw2_form_error").css("display", "none");
            $("#pw2_form_check_br").css("display", "none");
            $("#pw2_form_ok").css("display", "none");
            $("#pw2_form_none").css("display", "");
            }
        }
        else {
            if ($('#pw2').val() != '') {
                $("#pw2_form_error").css("display", "none");
                $("#pw2_form_check_br").css("display", "none");
                $("#pw2_form_ok").css("display", "");
                $("#pw2_form_none").css("display", "none");
            }
            else{
            $("#pw2_form_error").css("display", "none");
            $("#pw2_form_check_br").css("display", "none");
            $("#pw2_form_ok").css("display", "none");
            $("#pw2_form_none").css("display", "");
            }
        }
    })


});
