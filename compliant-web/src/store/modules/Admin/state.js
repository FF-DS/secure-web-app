exports.state = {
    accountsData:[],
    accountCountryCount: [],
    accountError: {},
    searchParams:  {
        query : true,
        queries: {
            size : 12,
        }
    },
    accountPageInfo : {
        currentPage : 1,
        pageSize : 1,
        totalCount : 1,
        numberOfPages: 1,
    },
    accountTableHeader: [
          {
            text: 'First name',
            align: 'start',
            sortable: false,
            value: 'first_name',
          },
          {
            text: 'Last name',
            align: 'start',
            sortable: false,
            value: 'last_name',
          },
          { text: 'Email address', value: 'email' },
          { text: 'Account Type', value: 'role' },
          { text: 'Account state', value: 'account_state' },
          { text: 'Country', value: 'country', sortable: false},
    ],
    accountCountryCenter: [32, 49],
    countriesList: ["Aruba", "Afghanistan", "Angola", "Anguilla", "\u00c5land Islands", "Albania", "Andorra", "United Arab Emirates", "Argentina", "Armenia", "American Samoa", "Antarctica", "French Southern and Antarctic Lands", "Antigua and Barbuda", "Australia", "Austria", "Azerbaijan", "Burundi", "Belgium", "Benin", "Burkina Faso", "Bangladesh", "Bulgaria", "Bahrain", "Bahamas", "Bosnia and Herzegovina", "Saint Barth\u00e9lemy", "Belarus", "Belize", "Bermuda", "Bolivia", "Brazil", "Barbados", "Brunei", "Bhutan", "Bouvet Island", "Botswana", "Central African Republic", "Canada", "Cocos (Keeling) Islands", "Switzerland", "Chile", "China", "Ivory Coast", "Cameroon", "DR Congo", "Republic of the Congo", "Cook Islands", "Colombia", "Comoros", "Cape Verde", "Costa Rica", "Cuba", "Cura\u00e7ao", "Christmas Island", "Cayman Islands", "Cyprus", "Czech Republic", "Germany", "Djibouti", "Dominica", "Denmark", "Dominican Republic", "Algeria", "Ecuador", "Egypt", "Eritrea", "Western Sahara", "Spain", "Estonia", "Ethiopia", "Finland", "Fiji", "Falkland Islands", "France", "Faroe Islands", "Micronesia", "Gabon", "United Kingdom", "Georgia", "Guernsey", "Ghana", "Gibraltar", "Guinea", "Guadeloupe", "Gambia", "Guinea-Bissau", "Equatorial Guinea", "Greece", "Grenada", "Greenland", "Guatemala", "French Guiana", "Guam", "Guyana", "Hong Kong", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "Isle of Man", "India", "British Indian Ocean Territory", "Ireland", "Iran", "Iraq", "Iceland", "Israel", "Italy", "Jamaica", "Jersey", "Jordan", "Japan", "Kazakhstan", "Kenya", "Kyrgyzstan", "Cambodia", "Kiribati", "Saint Kitts and Nevis", "South Korea", "Kosovo", "Kuwait", "Laos", "Lebanon", "Liberia", "Libya", "Saint Lucia", "Liechtenstein", "Sri Lanka", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Macau", "Saint Martin", "Morocco", "Monaco", "Moldova", "Madagascar", "Maldives", "Mexico", "Marshall Islands", "Macedonia", "Mali", "Malta", "Myanmar", "Montenegro", "Mongolia", "Northern Mariana Islands", "Mozambique", "Mauritania", "Montserrat", "Martinique", "Mauritius", "Malawi", "Malaysia", "Mayotte", "Namibia", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "Nicaragua", "Niue", "Netherlands", "Norway", "Nepal", "Nauru", "New Zealand", "Oman", "Pakistan", "Panama", "Pitcairn Islands", "Peru", "Philippines", "Palau", "Papua New Guinea", "Poland", "Puerto Rico", "North Korea", "Portugal", "Paraguay", "Palestine", "French Polynesia", "Qatar", "R\u00e9union", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Sudan", "Senegal", "Singapore", "South Georgia", "Svalbard and Jan Mayen", "Solomon Islands", "Sierra Leone", "El Salvador", "San Marino", "Somalia", "Saint Pierre and Miquelon", "Serbia", "South Sudan", "S\u00e3o Tom\u00e9 and Pr\u00edncipe", "Suriname", "Slovakia", "Slovenia", "Sweden", "Swaziland", "Sint Maarten", "Seychelles", "Syria", "Turks and Caicos Islands", "Chad", "Togo", "Thailand", "Tajikistan", "Tokelau", "Turkmenistan", "Timor-Leste", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Tuvalu", "Taiwan", "Tanzania", "Uganda", "Ukraine", "United States Minor Outlying Islands", "Uruguay", "United States", "Uzbekistan", "Vatican City", "Saint Vincent and the Grenadines", "Venezuela", "British Virgin Islands", "United States Virgin Islands", "Vietnam", "Vanuatu", "Wallis and Futuna", "Samoa", "Yemen", "South Africa", "Zambia", "Zimbabwe"]
};
