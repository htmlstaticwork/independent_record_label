document.addEventListener('DOMContentLoaded', () => {
    const rtlToggle = document.getElementById('rtl-toggle');
    const htmlElement = document.documentElement;

    // Check for saved RTL state
    const isRTL = localStorage.getItem('rtl-mode') === 'true';
    if (isRTL) {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.classList.add('rtl-mode');
        if (rtlToggle) rtlToggle.innerHTML = '<i class="ri-translate"></i>';
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentRTL = htmlElement.getAttribute('dir') === 'rtl';
            if (currentRTL) {
                htmlElement.removeAttribute('dir');
                htmlElement.classList.remove('rtl-mode');
                localStorage.setItem('rtl-mode', 'false');
                rtlToggle.innerHTML = '<i class="ri-translate-2"></i>';
            } else {
                htmlElement.setAttribute('dir', 'rtl');
                htmlElement.classList.add('rtl-mode');
                localStorage.setItem('rtl-mode', 'true');
                rtlToggle.innerHTML = '<i class="ri-translate"></i>';
            }
        });
    }
});
