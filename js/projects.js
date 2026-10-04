
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll(
        '.project-filter-btn'
    );

    const projectCards = document.querySelectorAll(
        '.project-card'
    );

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const filter = this.dataset.filter;

            filterButtons.forEach(function (btn) {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });

            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            projectCards.forEach(function (card) {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.hidden = false;
                } else {
                    card.hidden = true;
                }
            });
        });
    });

    filterButtons.forEach(function (button) {
        button.setAttribute(
            'aria-pressed',
            button.classList.contains('active') ? 'true' : 'false'
        );
    });
});