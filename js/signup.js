$(document).ready(function() {
    const form = $('form');
    const email = $('#email');
    const password = $('#password');
    const passwordConfirm = $('#password-confirm');
    const name = $('#name');
    const phone = $('#phone');

    // 실시간 유효성 검사
    email.on('input', function() {
        validateEmail($(this));
    });

    password.on('input', function() {
        validatePassword($(this));
    });

    passwordConfirm.on('input', function() {
        validatePasswordMatch($(this));
    });

    phone.on('input', function() {
        $(this).val($(this).val().replace(/[^0-9]/g, '')
            .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3")
            .replace("--", "-"));
    });

    // 폼 제출
    form.on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            $(this).find('.btn-primary').html('<i class="fas fa-spinner fa-spin"></i> 처리중...');
            // 서버 제출 로직
        }
    });

    function validateEmail(field) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.val())) {
            showError(field, '유효한 이메일 주소를 입력해주세요');
            return false;
        }
        showSuccess(field);
        return true;
    }

    function validatePassword(field) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(field.val())) {
            showError(field, '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다');
            return false;
        }
        showSuccess(field);
        return true;
    }

    function validatePasswordMatch(field) {
        if (field.val() !== password.val()) {
            showError(field, '비밀번호가 일치하지 않습니다');
            return false;
        }
        showSuccess(field);
        return true;
    }

    function showError(field, message) {
        field.removeClass('border-success').addClass('border-error');
        field.next('.error-message').remove();
        field.after(`<div class="error-message">${message}</div>`);
    }

    function showSuccess(field) {
        field.removeClass('border-error').addClass('border-success');
        field.next('.error-message').remove();
    }

    function validateForm() {
        let isValid = true;
        
        if (!validateEmail(email)) isValid = false;
        if (!validatePassword(password)) isValid = false;
        if (!validatePasswordMatch(passwordConfirm)) isValid = false;
        if (name.val().trim() === '') {
            showError(name, '이름을 입력해주세요');
            isValid = false;
        }
        if (phone.val().trim() === '') {
            showError(phone, '휴대폰 번호를 입력해주세요');
            isValid = false;
        }
        
        return isValid;
    }
});