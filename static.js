const favicon = document.getElementById('favicon');
const overlay = document.getElementById('overlay');

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// Favicon theme
const handleThemeChange = (event) => {
  favicon.href = event.matches ? '/favicon-dark.svg' : '/favicon-light.svg';
};

handleThemeChange(mediaQuery);

mediaQuery.addEventListener('change', handleThemeChange);

// Splash screen theme
const appTheme = JSON.parse(localStorage.getItem('theme'));
const theme = appTheme
  ? appTheme === 'Dark'
    ? 'dark'
    : 'light'
  : mediaQuery.matches
    ? 'dark'
    : 'light';
overlay.classList.add(theme);
