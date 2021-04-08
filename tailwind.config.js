module.exports = {
    purge: {
      enabled: !process.env.ROLLUP_WATCH,
      mode: 'jit',
      content: ['./public/index.html', './src/**/*.svelte'],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms')
    ],
  };