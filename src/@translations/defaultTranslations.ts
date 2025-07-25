export const defaultTranslations = {
  table: {
    empty: {
      title: 'No Results Found',
      subtitle: 'Try adjusting the filters to see more data',
    },
    cells: {
      city: 'City',
      country: 'Country',
      score: 'Average Score',
      isEu: 'Is EU',
      visa: 'Visa Requirements',
      language: 'Language',
      currency: 'Currency',
      favorites: {
        bookmark: { add: 'Add Bookmark', remove: 'Remove Bookmark' },
        destination: {
          add: 'Add Destination',
          remove: 'Remove Destination',
          replace: 'Replace Destination',
          isDerived: 'Destination Is Derived from City',
        },
      },
    },
    filters: {
      minRating: 'Min Rating',
      region: 'Region',
      visa: 'Visa Requirements',
      minEnglishSpeakers: 'Min English Speakers',
      englishNative: 'Native Language',
      addFilters: 'Add Filters',
      editFilters: 'Edit Filters',
      resetFilters: 'Reset Filters',
    },
  },
  generalSection: {
    population: 'Population',
    populationRelativity: '{{population}} / {{percentage}} of the country',
    density: 'Density',
    perKm: '/ km',
    isCapital: 'Is Capital City',
    elevation: 'Elevation',
    metersAbbrev: 'm',
    satelliteCities: 'Satellite Cities',
    metropolitanCenter: 'Metropolitan Center',
    commuteTime: 'Commute Time',
    region: 'Region',
    capital: 'Capital',
    highestElevation: 'Highest Elevation',
    lowestElevation: 'Lowest Elevation',
  },
  city: {
    flight: {
      airport: 'Airport',
      city: 'City',
      title: '{{airport}}-TLV Flight',
    },
    timeDifference: {
      title: 'Time Difference',
      current: 'Current Time',
    },
    qualityRank: {
      title: 'Quality of Life Rank',
      average: 'Average Rating',
    },
    cost: {
      incomeSlider: {
        title: 'Annual Income',
        subtitle: 'As a {{incomeTitle}}',
        remoteTitle: ', Working remotely in {{cityName}}, {{countryName}}',
        linkDescription: ', based on ',
        low: 'Low',
        median: 'Median',
        high: 'High',
        extreme: 'Extreme',
      },
      rent: {
        title: 'Rent',
        subtitle: 'For a {{size}} apartment, based on ',
        central: 'Central',
        outer: 'Outer',
        bedroomSingle: '1 bedroom',
        bedrooms: '{{bedrooms}} bedrooms',
      },
      simulation: {
        surplus: 'Surplus Rate',
        deficit: 'Deficit Rate',
        savings: 'Yearly Savings',
        rentIncomeRatio: 'Rent / Income Ratio',
        losses: 'Yearly Losses',
        incomes: 'Incomes',
        grossIncome: "{{name}}'s Gross Income",
        netIncomeLabel: "{{name}}'s Net Income",
        tax: 'Tax',
        stipend: "{{name}}'s Stipend / Scholarship",
        rentDescription: 'For a {{bedrooms}} apartment',
        generalCost: 'General Cost',
        familyLabel: 'For a family of {{adults}} and {{children}}',
        singleAdult: 'For a single adult',
        couple: 'For a couple',
        flights: '{{airport}}-TLV Flights / Year',
        preschool: 'Private Preschool ({{names}})',
        school: 'Private School ({{names}})',
        childConnector: ' and ',
        expenses: 'Expenses',
        income: 'Income',
        errorTitle: 'Not Available on Small Screens',
        errorSubtitle:
          'Cost simulation is currently only supported on larger devices. Please use a tablet or desktop for the best experience.',
        savedSimulations: {
          title: 'Saved Simulations',
          reset: 'Reset',
          select: 'Select Simulation',
          update: 'Update',
          save: 'Save',
          saveNew: 'Save New Simulation',
          delete: 'Delete',
          name: 'Simulation Name',
          deleteDialog: 'Are you sure you want to delete this simulation?',
        },
      },
    },
    jobData: {
      title: 'Job Data',
      subtitle: 'As a {{incomeTitle}}',
      expectedSalary: 'Expected Salary',
      localDescription: 'Based on current compensation and industry standards',
      remoteDescription:
        'Based on working remotely from {{cityName}}, {{countryName}}',
      comparedWith: 'Compared with ',
      colAdjusted: 'Cost of Living Adjusted',
      colAdjustedDescription:
        'Adjustment for cost of living differences between {{city}} and {{other}}',
      jobsPosted: '{{jobs}} Jobs Posted',
      gross: 'Gross Annual',
      net: 'Monthly Net',
    },
    links: {
      title: 'External Links',
      costOfLiving: 'Cost of Living Data',
      income: "{{name}}'s Income Data",
      facebook: 'Facebook Community',
      flight: 'Flight Data',
      wikipedia: 'Wikipedia Page',
    },
    plan: {
      title: 'Plan Ahead',
      generalCost: 'General Cost',
      rent: 'Rent',
      flight: 'One-Way Flight',
      per3Months: '× 3 Months',
      perPeople: '× {{people}} People',
    },
    score: {
      title: 'Score',
    },
    weather: {
      title: 'Weather',
      rainTitle: '{{count}} rain days per year',
      rainSubtitle: '{{percent}}% of the year',
      sunlightMax: '{{count}} max sun hours',
      sunlightMin: '{{count}} min sun hours',
      sunlightSubtitle: '{{percent}}% of the day',
    },
    map: {
      city: 'City',
      metropolitan: 'Metropolitan',
      airport: 'Airport',
    },
    wiki: {
      wikipedia: 'Wikipedia',
      notAvailable: 'Not Available',
    },
    landmarks: {
      title: 'Landmarks',
      error: 'Could not fetch data',
    },
    prices: {
      title: 'Prices',
    },
    funFacts: {
      title: 'Fun Facts',
    },
  },
  compare: {
    vs: 'VS.',
    city: 'City',
    selectCity: 'Select City',
    total: 'Total {{score}}/{{total}}',
    breakdown: {
      colIndexSingle: 'Cost of Living Index - Single Provider',
      colIndexCouple: 'Cost of Living Index - Two Providers',
      community: 'Facebook Community',
      electricity: 'Electricity Compatability',
      flightDuration: 'Flight Duration',
      flightPrice: 'Flight Price',
      language: 'Language',
      qolRank: 'Quality of Life Rank',
      rainfall: 'Rainfall Amount',
      sunlight: 'Sunlight Duration',
      visa: 'Visa Requirements',
      weather: 'Weather',
      timezone: 'Timezone Difference',
      commute: 'Commute Time',
    },
  },
  common: {
    cancel: 'Cancel',
    save: 'Save',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
    none: 'None',
    total: 'Total',
    perMonth: '/ M',
    and: 'and',
    notAvailable: 'N/A',
  },
  stepper: {
    optional: 'Optional',
    back: 'Back',
    next: 'Next',
    skip: 'Skip',
    finish: 'Finish',
  },
  group: {
    adultSingle: '1 adult',
    adults: '{{adults}} adults',
    childSingle: '1 child',
    children: '{{children}} children',
    progress: {
      title: 'Progress',
      setupPartner: 'Setup Partner',
      invitePartner: 'Invite Partner',
      partnerSet: 'Partner is set',
      partnerNoNeed: 'No need to set a partner',
      setDepartureDate: 'Set Departure Date',
      setDepartureDateAction: 'Set departure date',
      yearSingle: '1 year',
      years: '{{years}} years',
      monthSingle: '1 month',
      months: '{{months}} months',
      daySingle: '1 day',
      days: '{{days}} days',
      countdownResult: 'only {{countdown}} to go!',
      countdownConnector: ' and ',
      goTime: "it's go time!",
      markPlaces: 'Mark Places of Interest',
      selectedDestination: 'A destination was selected',
      markPlacesAction1: 'Mark ',
      markPlacesAction2: 'countries',
      markPlacesAction3: ' or ',
      markPlacesAction4: 'cities',
      markPlacesAction5: ' of interest.',
      chooseDestination: 'Choose Destination',
      chooseDestinationPartialAction1:
        ' was has been selected as the destination country - please select a city from the ',
      chooseDestinationPartialAction2: 'list',
      chooseDestinationAction: 'Choose destination from ',
      researchDestination: 'Research Destination and Collect Notes',
      addedNotes: 'Added ',
      addMoreNotes: 'add more notes',
      startAddingNotes: 'Start adding notes',
      notes: '{{notes}} notes',
      noDestination: 'No destination selected',
      addedSingleNote: 'Added 1 note - ',
      addedNotesFull: 'Added {{notes}} notes -',
      toYourDestination: ' to your destination',
    },
    placesOfInterest: {
      title: 'Places of Interest',
    },
    details: {
      email: 'Email',
      profession: 'Occupation',
      currentAge: 'Current Age',
      ageAtDeparture: 'Age at Departure',
      citizenship: 'Citizenship',
      userType: 'User Type',
      departureDate: 'Departure Date',
      numberOfChildren: 'Number of Children',
      numberOfIncomes: 'Number of Incomes',
      apartmentSize: 'Apartment Size',
      apartmentBedrooms: '{{bedrooms}} bedrooms',
      apartmentBedroomsSingle: '1 bedroom',
      childrenNameConnector: ' and ',
      exactAge: '{{years}} years',
      exactAgeAndMonths: '{{years}} years and {{months}} months',
      name: 'Name',
      children: 'Children',
    },
  },
  shared: {
    englishSpeakers: '{{speakers}}% English speakers',
  },
  user: {
    login: {
      title: 'Enter your email and password',
      action: 'Login',
      error:
        'Login failed. Please check your email and password and try again.',
    },
    inputs: {
      email: 'Email',
      password: 'Password',
    },
  },
  menu: {
    primary: {
      cities: 'Cities',
      countries: 'Countries',
      compare: 'Compare',
      notes: 'Notes',
      group: 'Group',
      settings: 'Settings',
      checklist: 'Checklist',
    },
    secondary: {
      openSettings: 'Open Settings',
      inviteUser: 'Invite User',
      addUserToGroup: 'Add User to Group',
      addCredentialsToPartner: 'Add Credentials to Partner',
      logout: 'Logout',
      lightTheme: 'Light Theme',
      darkTheme: 'Dark Theme',
    },
    tabs: {
      overview: 'Overview',
      simulation: 'Simulation',
      notes: 'Notes ({{notes}})',
    },
    invite: {
      addToGroup: 'Add User to Group',
      addCredentialsToPartner: 'Add Login Credentials to Partner',
      inviteUser: 'Invite User',
      enterEmail: 'Enter email...',
      send: 'Send',
      statusPending: 'Sending invitation email to {{email}}',
      statusSuccess: 'Successfully sent email to {{email}}',
      statusFailed: "Couldn't send email to {{email}}",
    },
  },
  notes: {
    add: {
      comment: 'Add Comment...',
      note: 'Add a Note...',
      link: 'Add a Link...',
      checklist: 'Add a Checklist...',
      title: 'Add Title...',
      todoItem: 'Add Item...',
    },
    edit: {
      reply: 'Edit Comment',
      note: 'Edit Note',
      checklist: 'Edit Checklist',
      link: 'Edit Link',
      title: 'Edit',
    },
    delete: {
      title: 'Delete',
      dialog: 'Are you sure you want to delete this note?',
    },
    noComments: 'No Comments',
    commentSingle: '1 comment',
    commentsCount: '{{comments}} comments',
    fullPageView: 'Full Page View',
    showMore: 'Show More...',
    generalNote: 'General note for ',
    createdOn: 'Created on {{date}}',
    textNote: 'Text Note',
    link: 'Link',
    checklist: 'Checklist',
    comments: 'Comments',
    pin: 'Pin',
    removePin: 'Remove Pin',
    deleteChecklistChecked: 'Delete Checked Items',
    deleteAllChecklist: 'Delete All Items',
    tabs: {
      notes: 'Notes ({{notes}})',
      checklist: 'Checklist',
    },
  },
  country: {
    religion: {
      title: 'Religion',
      importance:
        '{{percent}}% of the population consider religion important in their daily life. ',
      notReligious: 'Not Religious',
      christians: 'Christians',
      muslims: 'Muslims',
      jews: 'Jews',
      buddhists: 'Buddhists',
      hindus: 'Hindus',
      other: 'Other',
      peopleCount: '{{count}} People',
    },
  },
  settings: {
    title: 'Settings',
    tabs: {
      editUser: 'Edit User',
      editGroup: 'Edit Group',
      dataCenter: 'Data Center',
      users: 'Users',
    },
    form: {
      email: 'Email',
      firstName: 'First Name',
      lastName: 'Last Name',
      citizenship: 'Citizenship',
      dateOfBirth: 'Date of Birth',
      expectedJob: 'Expected Job',
      isRemoteJob: 'Is Remote Job',
      remoteCity: 'Remote City',
      monthlyStipend: 'Monthly Scholarship / Stipend',
      uploadAvatar: 'Upload Avatar',
      children: 'Children',
      name: 'Name',
      removeChild: 'Remove Child',
      addChild: 'Add Child',
      preferences: 'Preferences',
      departureDate: 'Departure Date',
      apartmentSize: 'Apartment Size',
      bedroomSingle: '1 Bedroom',
      bedrooms: '{{bedrooms}} Bedrooms',
      createUserForPartner: 'Add Login Credentials (Optional)',
      removeUserFromPartner: 'Remove Login Credentials',
      destination: 'Destination',
      password: {
        title: 'Password',
        verify: 'Verify Password',
        noMatch: 'Passwords do not match, please try again',
        weakPasswordPrefix: 'Password must contain ',
        weakPasswordChars: 'at least 8 characters',
        weakPasswordUppercase: 'one uppercase letter',
        weakPasswordLowercase: 'one lowercase letter',
        weakPasswordNumber: 'one number',
        weakPasswordSpecial: 'one special character',
        weakPasswordConnector: ' and ',
      },
      helper: {
        citizenship:
          'Helps us check if you or your spouse are exempt from needing a work visa.',
        profession:
          'Helps us check if you or your spouse are exempt from needing a work visa.',
        stipend:
          "Include any steady support (like a scholarship or help from family). We'll convert it and add it to your budget.",
        password:
          'Use a strong password to help protect your account and personal data',
        partnerInfo:
          'Providing partner details helps us deliver more accurate insights about cost of living and relocation options for your household',
        partnerLogin:
          'Adding login credentials allows your partner to access the platform and explore personalized data from their own perspective',
        childrenInfo:
          'Adding information about your children allows us to better estimate cost of living and identify relevant services such as education and childcare',
        preferences:
          'Sharing your preferences helps us tailor recommendations and cost of living estimates to your specific plans and lifestyle',
        destination:
          'Already selected a destination city or just a country? If you choose one, it will appear first in your results — or leave it empty to see general results.',
      },
      sections: {
        personalDetails: 'Personal Details',
        loginCredentials: 'Login Credentials',
        additionalInfo: 'Additional Info',
      },
    },
    editUser: {
      pending: 'Editing user',
      success: 'Successfully edited user',
      error: 'Failed to edit user',
    },
    editGroup: {
      pending: 'Editing group',
      success: 'Successfully edited group',
      error: 'Failed to edit group',
    },
    signUp: {
      signUp: 'Sign Up',
      welcome: 'Welcome Aboard!',
      description: "Enter your user's details",
      addUserDetails: 'Add User Details',
      addPartner: 'Add Partner',
      addGroupDetails: 'Add Group Details',
      status: {
        pending: 'Creating a new user',
        success: 'Successfully created user',
        error: 'Failed to create user',
      },
      stateInvalid: {
        title: 'Your sign-up link is invalid',
        description:
          'If you continue to experience issues, please contact our support team.',
      },
      stateExpired: {
        title: 'Your sign-up link has expired',
        description:
          'The link you used is no longer valid because it expired after 1 hour. Please request a new sign-up link to continue.',
        refresh: 'Refresh token',
        remediation:
          'If you continue to experience issues, please contact our support team.',
        status: {
          successTitle: 'Your sign-up token has been refreshed',
          successDescription:
            'You can now use the same email link to complete your sign-up. It will remain valid for another hour.',
          errorTitle: "We couldn't refresh your sign-up token",
          errorDescription:
            'This may be due to an expired request or a system issue. Please contact support.',
        },
      },
      successDialog: {
        title: 'All Done!',
        description: "We're so glad you're here",
        action: "Let's get started...",
      },
    },
  },
  enum: {
    visa: {
      0: { short: 'Not Required', regular: 'No visa required' },
      1: { short: 'Easy', regular: 'Easy visa requirements' },
      2: { short: 'Medium', regular: 'Medium visa requirements' },
    },
    language: {
      AR: 'Arabic',
      CS: 'Czech',
      DA: 'Danish',
      DE: 'German',
      EL: 'Greek',
      EN: 'English',
      ES: 'Spanish',
      FI: 'Finnish',
      FR: 'French',
      HE: 'Hebrew',
      HI: 'Hindi',
      HU: 'Hungarian',
      NL: 'Dutch',
      NO: 'Norwegian',
      PL: 'Polish',
      PT: 'Portuguese',
      SL: 'Slovak',
      SV: 'Swedish',
      IT: 'Italian',
      ET: 'Estonian',
      LT: 'Lithuanian',
      TR: 'Turkish',
      IS: 'Icelandic',
      LV: 'Latvian',
    },
    currency: {
      AED: 'UAE Dirham',
      AUD: 'Australian Dollar',
      CAD: 'Canadian Dollar',
      CHF: 'Swiss Franc',
      CZK: 'Czech Koruna',
      DKK: 'Danish Krone',
      EUR: 'Euro',
      GBP: 'Pound Sterling',
      HUF: 'Hungarian Forint',
      ILS: 'Israeli Shekel',
      INR: 'Indian Rupee',
      NOK: 'Norwegian Krone',
      NZD: 'NZ Dollar',
      PLN: 'Polish Złoty',
      SEK: 'Swedish Krona',
      USD: 'US Dollar',
    },
    income: {
      None: {
        title: 'None',
      },
      Other: {
        title: 'Other',
        subtitle: "Based on the city's average income",
      },
      SocialWorker: {
        title: 'Social Worker',
      },
      Doctor: {
        title: 'Doctor',
      },
      SoftwareEngineerEntry: {
        title: 'Software Engineer',
        subtitle: 'Junior/Mid-senior',
      },
      SoftwareEngineerSenior: {
        title: 'Software Engineer',
        subtitle: 'Senior/Principal',
      },
      SoftwareEngineerManager: {
        title: 'Software Engineering Manager',
      },
      ProductDesigner: {
        title: 'Product Designer',
        subtitle: 'UI / UX',
      },
      ProductManager: {
        title: 'Product Manager',
      },
    },
    insights: {
      1: 'The Good',
      2: 'The So-So',
      3: 'The Bad',
    },
    score: {
      average: {
        label: 'Average',
        description: '',
      },
      cost: {
        label: 'Cost of Living',
        description:
          'Comparison of income vs. living costs for single and dual-income households',
      },
      distance: {
        label: 'Distance',
        description: 'Comparison of travel time and flight costs to Israel',
      },
      language: {
        label: 'Language',
        description: 'Comparison of English and Hebrew proficiency levels',
      },
      qualityRank: {
        label: 'Quality of Life Rank',
        description:
          'Comparison of overall quality of life, including purchasing power, safety, healthcare, cost of living, property affordability, traffic, and pollution levels',
      },
      timezone: {
        label: 'Time Zone',
        description: 'Comparison of time zone differences with Israel',
      },
      visa: {
        label: 'Visa Requirements',
        description: 'Comparison of work visa eligibility and requirements',
      },
      weather: {
        label: 'Weather',
        description: 'Comparison of climate, rainfall, and sunshine hours',
      },
      urbanism: {
        label: 'Urbanism',
        description: 'Comparison of population, density and stature',
      },
    },
    season: {
      Summer: 'Summer',
      Fall: 'Fall',
      Winter: 'Winter',
      Spring: 'Spring',
    },
    noteScope: {
      Private: 'Private',
      Public: 'Public',
    },
    cost: {
      generalCost: { label: 'General Cost', caption: '/ Month' },
      rentOuter: { label: 'Rent', caption: '/ Month' },
      buyOuter: { label: 'Buy', caption: '/ 120sqm.' },
      beer: { label: 'Draught Beer', caption: '/ 0.5L' },
      mealDate: { label: 'Dinner Out', caption: '/ Couple' },
      mealSingle: { label: 'Lunch Out', caption: '/ Person' },
      mcDonalds: { label: 'McDonalds Combo Meal', caption: '/ Person' },
      coffee: { label: 'Cappuccino', caption: '/ Cup' },
      milk: { label: 'Milk', caption: '/ 1L' },
      bread: { label: 'Bread', caption: '/ Loaf' },
      eggs: { label: 'Eggs', caption: '/ Dozen' },
      cheese: { label: 'Cheese', caption: '/ 1Kg' },
      chicken: { label: 'Chicken Fillets', caption: '/ 1Kg' },
      beef: { label: 'Ground Beef', caption: '/ 1Kg' },
      apples: { label: 'Apples', caption: '/ 1Kg' },
      tomatoes: { label: 'Tomatoes', caption: '/ 1Kg' },
      wine: { label: 'Wine', caption: '/ 0.75L' },
      beerBottle: { label: 'Beer Bottle', caption: '/ 0.5L' },
      ticketSingle: { label: 'Public Transport', caption: '/ Single Ticket' },
      ticketMonth: { label: 'Public Transport', caption: '/ Monthly Pass' },
      germanCar: { label: 'Family Car', rangeKey: 'japanCar' },
      gasoline: { label: 'Gasoline', caption: '/ 1L' },
      stopsFlight: { label: 'Flight to TLV', caption: '/ Person' },
      bills: { label: 'Utility Bills', caption: '/ Month' },
      internet: { label: 'Internet', caption: '/ Month' },
      mobile: { label: 'Cellphone', caption: '/ Month' },
      preSchool: { label: 'Preschool', caption: '/ Month' },
      privateSchool: { label: 'Private School', caption: '/ Month' },
    },
    priceGroup: {
      realEstate: 'Real Estate',
      eatingOut: 'Eating Out',
      groceryShopping: 'Grocery Shopping',
      transportation: 'Transportation',
      bills: 'Bills',
      education: 'Education',
    },
    region: {
      EUROPE: 'Europe',
      NORTH_AMERICA: 'North America',
      ASIA: 'Asia and Middle-East',
      OCEANIA: 'Oceania',
      ALL: 'All',
    },
    userType: {
      Admin: 'Administrator',
      GroupOwner: 'Group Owner',
      Standard: 'Standard User',
      Anonymous: 'Anonymous',
    },
    qualityOfLife: {
      quality: 'Quality of Life',
      crime: 'Crime',
      pollution: 'Pollution',
      traffic: 'Traffic',
      health: 'Health Care',
    },
  },
};
