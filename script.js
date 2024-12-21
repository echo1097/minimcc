let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('hidden');
    }
    
    if (currentScroll > lastScroll) {
        header.classList.add('hidden');
    }
    
    lastScroll = currentScroll;
});