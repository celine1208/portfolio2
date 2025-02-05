// FAQ Toggle
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        answer.classList.toggle('active');
        icon.classList.toggle('fa-chevron-up');
        icon.classList.toggle('fa-chevron-down');
    });
});

// 이메일 문의하기
(function() {
    emailjs.init({
        publicKey: "a4-S7nzRQ8lKdd1Vf",
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            // Get the submit button and disable it while sending
            const submitButton = document.querySelector('.submit-btn');
            submitButton.disabled = true;
            submitButton.textContent = '전송중...';

            // Retrieve form data
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            // Ensure formData isn't empty
            if (!name || !phone || !email || !message) {
                alert("모든 필수 항목을 입력해주세요!");
                submitButton.disabled = false;
                submitButton.textContent = '문의하기';
                return;
            }

            const formData = {
                name: name,
                phone: phone,
                email: email,
                message: message,
            };

            console.log("Sending form data:", formData); // Debugging

            try {
                // Wait for email to be sent
                const result = await emailjs.send(
                    "service_x1wpjr7",
                    "template_w17c31n",
                    formData
                );

                console.log("Email sent successfully:", result);
                document.getElementById("successMessage").style.display = "block";
                contactForm.reset();
            } catch (error) {
                console.error("Email send error:", error);
                alert("이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = '문의하기';
            }
        });
    }
});