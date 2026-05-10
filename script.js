document.addEventListener('DOMContentLoaded', () => {
    // 1. Cinematic Text Reveal Animation
    setTimeout(() => {
        const revealElements = document.querySelectorAll('.reveal-text, .fade-up');
        revealElements.forEach(el => {
            el.classList.add('active');
        });
    }, 200); // Faster initial paint

    // 2. Form Submission Handling
    const form = document.getElementById('notify-form');
    const formMessage = document.getElementById('form-message');
    const emailInput = document.getElementById('email');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            if (email) {
                const btn = form.querySelector('.notify-btn');
                const originalText = btn.textContent;

                btn.textContent = 'Wait...';
                btn.disabled = true;
                btn.style.opacity = '0.5';

                setTimeout(() => {
                    formMessage.textContent = 'Added to the priority list.';
                    formMessage.classList.add('success');
                    emailInput.value = '';
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.opacity = '1';

                    setTimeout(() => {
                        formMessage.classList.remove('success');
                        setTimeout(() => formMessage.textContent = '', 300);
                    }, 4000);
                }, 1200);
            }
        });
    }

    // 3. Ultra-Subtle Floating Motion (Mouse Parallax)
    const content = document.querySelector('.content-wrapper');
    let isEntranceComplete = false;

    // Wait for entrance animations to finish before allowing parallax
    setTimeout(() => {
        isEntranceComplete = true;
    }, 2500); // Faster entrance threshold

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768 || !isEntranceComplete) return;

        // Calculate mouse position relative to center (-0.5 to 0.5)
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;

        if (content) {
            content.style.transform = `translate(${x}px, ${y}px)`;
            // Keep transition short during tracking for responsive feel
            content.style.transition = 'transform 0.4s ease-out';
        }
    });

    // Reset smoothly on mouse leave
    document.addEventListener('mouseleave', () => {
        if (content) {
            content.style.transform = `translate(0px, 0px)`;
            // Slower, cinematic transition back to center
            content.style.transition = 'transform 2.5s cubic-bezier(0.19, 1, 0.22, 1)';
        }
    });
});
