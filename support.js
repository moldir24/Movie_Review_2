document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        $(document).ready(function () {
            $(".faq-question").on("click", function () {
              const $answer = $(this).next(".faq-answer");
          
              $(".faq-answer").not($answer).slideUp();
          
              $answer.stop(true, true).slideToggle();
            });
          });
          
    });

    // Изменяем текст заголовка h1
const heroHeading = document.querySelector('.hero-banner h1');
heroHeading.textContent = 'Need Help? You’re in the Right Place!';

// Изменяем текст абзаца с помощью innerHTML
const heroParagraph = document.querySelector('.hero-banner p');
heroParagraph.innerHTML = 'Let us <strong>guide</strong> you through any issues or questions you have.';
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        });
    }
});
