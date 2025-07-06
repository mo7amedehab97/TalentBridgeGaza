/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        lexend: ['"Lexend Giga"', 'sans-serif'],
        robotoCondensed: ['"Roboto Condensed"', 'sans-serif'],
        lato: ['"Lato"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Design System Colors
        'primary-blue': '#4A90E2',
        'accent-green': '#A7D129',
        'dark-gray': '#333333',
        'light-gray': '#F7F9FB',
        'white': '#FFFFFF',
        'alert-red': '#D63C3C',
        
        // Hover states
        'primary-blue-hover': '#397EBB',
        'accent-green-hover': '#8FB81F',
        'dark-gray-hover': '#2A2A2A',
        
        // Text Colors
        'text-primary': '#333333',
        'text-secondary': '#666666',
        'text-muted': '#999999',
        'text-light': '#FFFFFF',
        
        // Background Colors
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F7F9FB',
        'bg-highlight': '#A7D129',
        'bg-dark': '#333333',
        
        // Border Colors
        'border-light': '#EAEAEA',
        'border-medium': '#CCCCCC',
        'border-focus': '#4A90E2',
        
        // State Colors
        'hover-blue': '#397EBB',
        'hover-green': '#8FB81F',
        'hover-red': '#B92C2C',
        'disabled': '#CCCCCC',
        'disabled-text': '#666666',
        
        // Alert Colors
        'success-bg': '#E8F5E8',
        'success-text': '#A7D129',
        'error-bg': '#FFE5E5',
        'error-text': '#D63C3C',
        'warning-bg': '#FFF4D1',
        'warning-text': '#B67E00',
        
        // Status Colors
        'status-applied': '#A7D129',
        'status-pending': '#F7F9FB',
        'status-rejected': '#D63C3C',
        'status-remote': '#4A90E2',
        
        // Table Colors
        'table-header': '#4A90E2',
        'table-even': '#F9F9F9',
        'table-odd': '#FFFFFF',
        'table-hover': '#F7F9FB',
        
        // Legacy colors for backward compatibility
        'primary-green': '#4A90E2',
        'warm-sand': '#A7D129',
        'crimson-red': '#D63C3C',
        'sky-blue': '#4A90E2',
        'charcoal': '#333333',
        'light-gray-old': '#F2F2F2',
        'bannerBg': '#F7F9FB',
        'primary': '#4A90E2',
        'secondary': '#A7D129',
        'primary-hover': '#397EBB',
        'secondary-hover': '#8FB81F',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}

