document.addEventListener("DOMContentLoaded", function () {
        const aboutSections = document.querySelectorAll('.achievements-description');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });

        aboutSections.forEach(section => {
            observer.observe(section);
        });
    });
