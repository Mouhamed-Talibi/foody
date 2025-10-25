document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const speed = 800; // lower = faster

    const startCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || "";
        const increment = target / speed;
        
        // Reset counter to 0 for animation
        counter.innerText = "0";

        const updateCount = () => {
            const current = +counter.innerText.replace(suffix, "");

            if (current < target) {
                const newValue = Math.ceil(current + increment);
                counter.innerText = newValue + suffix;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + suffix;
            }
        };

        updateCount();
    };

    // Use IntersectionObserver to trigger animation on scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target); // run once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});