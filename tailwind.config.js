/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        bp360: '360px',
        bp620: '620px',
        bp1194: '1194px',
      },
      maxWidth: {
        phone: '620px',
      },
    },
    colors: {
      bg: {
        DEFAULT: 'var(--bg-frame-default)',
        subtle: 'var(--bg-frame-subtle)',
        overlay: 'var(--bg-frame-overlay)',
      },
      text: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        disabled: 'var(--text-disabled)',
        inverse: 'var(--text-inverse)',
      },
      primary: {
        DEFAULT: 'var(--action-primary)',
        hover: 'var(--action-primary-hover)',
        pressed: 'var(--action-primary-pressed)',
        foreground: 'var(--action-primary-text)',
      },
      success: 'var(--status-success)',
      error: 'var(--status-error)',
      warning: 'var(--status-warning)',
      info: 'var(--status-info)',
    },
  },
  plugins: [],
};
