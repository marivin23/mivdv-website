module.exports = {
    purge: [],
    // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'background-color': {
                    regular: '#141226'
                }
            },
            backgroundImage: {
                'background-shadow': "radial-gradient(79.3% 140.97% at 20.7% 22.53%, rgba(0, 209, 255, 0.1) 0%, rgba(0, 209, 255, 0) 100%)",
                'mivdv-logo': "url('../assets/Asset_1.svg')",
                'background-header': "linear-gradient(180deg, rgba(255, 255, 255, .1) 0%, rgba(231, 231, 231, .3) 22.39%, rgba(209, 209, 209,  .1) 42.6%, rgba(182, 182, 182, .1) 79.19%, rgba(156, 156, 156, .1) 104.86%)"
            },
            height: {
                'header-height': '100px',
                'logo-height': '50px'
            },
            width: {
                'logo-width': '140px'
            },
            fontFamily: {
                'header-links': 'Courier Prime'
            },
            textColor: {
                white: "#FFF",
                black: "#000",
            },
            textSize: {
                regular: '20px'
            },
            fontWeight: {
                bold: '700'
            },
            zIndex: {
                '1': '1'
            },
            transformOrigin: {
                half: '50%'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
