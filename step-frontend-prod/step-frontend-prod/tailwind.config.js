/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'm-xl': '74rem',
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      colors: {
        "extra-light-gray": "#89919D",
        "primary-blue": "#2E90FA",
        "light-gray": "#D0D5DD",
        "light-dark-gray":"#5F6368",
        "medium-dark-gray":"#595959",
        "sand-gray": "#C6C6C8",
        "extra-light-dark": "#344054",
        "extra-light-pink":"#F4EBFF",
        "extra-light-dark-gray":"#E6E6E6",
        "dark-blue":"#24306E",
        "primary-dark-blue":"#313C74",
        "secondary-gray":"#EAECF0",
        "light-blue-gray":"#667085",
        "ash-gray":"#DDDFE3",
        "light-ash-gray":"#EDEDEE",
        "medium-ash-gray":"#E2E2E2",
        "light-pink":"#DFD5F5",
        "medium-pink":"#6941C6",
        "lightish-gray":"#EEEEEE",
        "primary-black":"#101828",
        "light-gray-sky":"#F9FAFB",
        "darker-white":"#F5F5F5",
        "border-light-gray":"#DEDEDE",
        "light-dark":"#1A1A1A",
        "dark-gray":"#2A2A2A",
        "orange-dull":"#FF7A00",
        "primary-violet" : "#E8DEFB",
        "secondary-violet" : "#6941C6",
        "secondary-dark-violet" : "#6941C6",
        "secondary-dark-gray" : "#98A2B3",
        "tertiary-gray":"#475467"

      },
      fontSize: {
        "40px": ['40px', '44px'],
       
      },
      borderWidth:{
        "0.7px":"0.7px",
        "1":"1px",
        "1.5":"1.5px"
      },
      lineHeight: {
        "7.5": "1.875rem",
      },
      spacing: {
        "8xl":"112.5rem",
        "350px":"21.875rem",
        "550px":"34.375rem",
        "60vh": "60vh",
        "2px":'2px',
        "1px":"1px",
         "76px":"76px",
         "85px":"85px",
         "115px":"115px",
         "635px":"39.688rem",
         "600px":"37.5rem",
         "605px":"37.813rem"
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
