// actual  conversion code starts here


export const validateUsername = (username, country) => {
  switch (country) {
    case 'UAE':
      return /^[a-zA-Z0-9]{5,}$/.test(username); // Alphanumeric and at least 5 characters long
    case 'India':
      return /^[a-zA-Z][a-zA-Z0-9]{5,}$/.test(username); // Starts with a letter and at least 6 characters long
    case 'USA':
      return /^[a-zA-Z0-9_]{5,15}$/.test(username); // Alphanumeric with underscores, 5-15 characters long
    case 'UK':
      return /^[a-zA-Z0-9]{6,}$/.test(username) && !/\d{3}/.test(username); // Alphanumeric, at least 6 characters, no 3 consecutive digits
    default:
      return false;
  }
}


// actual  conversion code starts here

var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

function convert_millions(num: any): any {
  if (num >= 1000000) {
    return convert_millions(Math.floor(num / 1000000)) + " million " + convert_thousands(num % 1000000);
  } else {
    return convert_thousands(num);
  }
}

function convert_thousands(num: any) {
  if (num >= 1000) {
    return convert_hundreds(Math.floor(num / 1000)) + " thousand " + convert_hundreds(num % 1000);
  } else {
    return convert_hundreds(num);
  }
}

function convert_hundreds(num: any) {
  if (num > 99) {
    return ones[Math.floor(num / 100)] + " hundred " + convert_tens(num % 100);
  } else {
    return convert_tens(num);
  }
}

function convert_tens(num: any) {
  if (num < 10) return ones[num];
  else if (num >= 10 && num < 20) return teens[num - 10];
  else {
    return tens[Math.floor(num / 10)] + " " + ones[num % 10];
  }
}

export const convertIntoWords = (num: any) => {
  if (num === 0 || !num) return "zero";
  else return convert_millions(num);
}


export const numberWithCommas = (x: any, is_round = 0) => {
  if (x == undefined) {
    return '-'
  }
  if (is_round == 0) {
    x = Math.round(x)
  }

  let num = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (x < 0) {
    num = `(${num.replace('-', '')})`
  }
  if (num == 0) {
    num = '-'
  }
  return num
}


export const getTotal = (data: any, key: any) => {
  if (data.length == 0) {
    return 0
  }
  return Math.round(data.map((item: { [x: string]: any; }) => item[key]).reduce((total: any, number: any) => total + number))
}


export const convertToInternationalCurrencySystem = (labelValue: any) => {
  // let symbol= null

  // let value = ''
  // // Nine Zeroes for Billions

  // if( Math.abs(Number(labelValue)) >= 1.0e+9) {
  //   value = ((Number(labelValue)) / 1.0e+9).toFixed(1)
  //   symbol = 'B'
  // }

  // else if( Math.abs(Number(labelValue)) >= 1.0e+6) {
  //   value = ((Number(labelValue)) /  1.0e+6).toFixed(1)
  //   symbol = 'M'
  // }
  // else if( Math.abs(Number(labelValue)) >= 1.0e+3) {
  //   value = ((Number(labelValue)) /  1.0e+3).toFixed(1)
  //   symbol = 'M'
  // } else {
  //   value = (Number(labelValue)).toFixed(0);
  // }
  // let value = Math.abs(Number(labelValue)) >= 1.0e+9

  // ? ((Number(labelValue)) / 1.0e+9).toLocaleString('en-US', {maximumFractionDigits: 1}) + "B"
  // // Six Zeroes for Millions
  // : Math.abs(Number(labelValue)) >= 1.0e+6

  // ? ((Number(labelValue)) / 1.0e+6).toLocaleString('en-US', {maximumFractionDigits: 1}) + "M"
  // // Three Zeroes for Thousands
  // : Math.abs(Number(labelValue)) >= 1.0e+3

  // ? ((Number(labelValue)) / 1.0e+3).toLocaleString('en-US', {maximumFractionDigits: 1}) + "K"

  // : (Number(labelValue)).toLocaleString('en-US', {maximumFractionDigits: 1});

  let value: any = 0;
  if (Math.abs(Number(labelValue)) >= 1000.0e3) {
    value =
      (Number(labelValue) / 1.0e6).toLocaleString("en-US", {
        maximumFractionDigits: 0,
      }) + "M";
  } else {
    value = Number(labelValue).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });
  }

  value = value.toString();
  if (value.includes("-")) {
    value = value.replace("-", "(");

    value = value + ")";
  }

  return value;
};

export const convertToDecimalPoint = (
  labelValue: any,
  maximumFractionDigits: any
) => {
  let value: any = 0;
  if (Math.abs(Number(labelValue)) >= 1000.0e3) {
    value =
      (Number(labelValue) / 1.0e6).toLocaleString("en-US", {
        maximumFractionDigits: maximumFractionDigits
          ? maximumFractionDigits
          : 0,
      }) + "M";
  } else {
    value = Number(labelValue).toLocaleString("en-US", {
      maximumFractionDigits: maximumFractionDigits ? maximumFractionDigits : 0,
    });
  }

  value = value.toString();
  if (value.includes("-")) {
    value = value.replace("-", "(");

    value = value + ")";
  }

  return value;
};

export const educationList = [
  "Select Education",
  "Matriculate",
  "Primary",
  "Secondary",
  "Undergraduate-Associates- 2 Year",
  "Undergraduate-Bachelors-4 years",
  "Graduate-Masters 1-2 years",
  "Graduate-Doctoral degree 5-7 years",
  "UnEducated",
];

export const activitiesList = [
  "Hiking and camping",
  "Hunting and fishing",
  "Canoeing, kayaking and rafting",
  "Sailing and motorboating",
  "Biking",
  "Rock Climbing",
  "Horseback riding",
  "Skiing",
  "Restoration and conservation volunteering",
];

export const MartialList = ["Married", "Widowed", "Divorced", "Single"];

export const childList = [0, 1, 2, 3, 4, 5, 6];

export const houseList = ["Owned", "Rented"];

export const vechicleList = [
  "800cc",
  "1000cc",
  "1300cc",
  "1500cc",
  "1800cc",
  "2200cc",
  "2500cc",
  "3000cc",
  "3500cc",
  "4000cc",
  "4500cc",
];

export const professionList = [
  "House Wife",
  "Salaried Employee",
  "Self-Employed Business",
  "Student",
  "Zamindar",
];

export const industryList = [
  "Business services",
  "Information technology",
  "Manufacturing",
  "Health care",
  "Finance",
];

export const employeeList = [
  "Upto 10",
  "10-50",
  "50-100",
  "100-500",
  "500-1000",
  "1000-5000",
  "5000-10000",
  "10000 +",
];

export const contactModeList = [
  "Visit",
  "Phone Call",
  "SMS",
  "Email",
  "WhatsApp",
];

export const channelList = [
  "Branch Counter",
  "ATM",
  "Internet Banking",
  "Mobile Application",
];

export const crossSellList = [
  "Deposit",
  "CC",
  "DC",
  "Auto",
  "PIL",
  "ReadyCash",
  "RDA",
  "ML",
  "Banca",
  "Invest",
  "MobApp",
  "Locker",
];
export const crossSellType: any = {
  Deposit: "Amount",
  CC: "Card",
  DC: "Card",
  Auto: "Amount",
  LCH: "Amount",
  PIL: "Amount",
  ReadyCash: "",
  RDA: "RDA",
  ML: "Amount",
  Banca: "Amount",
  Invest: "Amount",
  MobApp: "",
  Locker: "",
};
export const crossSellCategory: any = {
  Deposit: "Deposit",
  CC: "CrossSell",
  DC: "CrossSell",
  LCH: "CrossSell",
  Auto: "CrossSell",
  PIL: "CrossSell",
  ReadyCash: "CrossSell",
  RDA: "CrossSell",
  ML: "CrossSell",
  Banca: "CrossSell",
  Invest: "CrossSell",
  MobApp: "CrossSell",
  Locker: "CrossSell",
};

export const socialMediaList = [
  "Facebook",
  "WhatsApp",
  "Instagram",
  "Snapchat",
  "Twitter",
];

export const isTellerRefferedList = ["Teller", "BOM", "CSO", "MTs"];

export const Cards: any = {
  CC: [
    "Platinum CreditCard",
    "Gold CreditCard",
    "Green CreditCard",
    "FuelSaver CreditCard",
  ],
  DC: [
    "World DebitCard",
    "Gold DebitCard",
    "Classic DebitCard",
    "PayPak DebitCard",
    "Hbl Islamic World DebitCard",
    "Hbl Islamic Gold DebitCard",
    "Hbl Islamic Visa DebitCard",
    "Hbl Islamic MasterCard DebitCard",
    "Hbl Islamic UnionPay DebitCard",
    "Hbl Islamic PayPak DebitCard",
  ],
};

export const regionList = [
  "ISLAMABAD_ISLAMIC",
  "FAISALABAD_ISLAMIC",
  "KARACHI_ISLAMIC",
  "KPK_ISLAMIC",
  "LAHOREEAST_ISLAMIC",
  "LAHOREWEST_ISLAMIC",
  "MULTAN_ISLAMIC",
  "SOUTH_ISLAMIC",
  "ISLAMABAD",
  "KARACHI",
  "HYDERABAD",
  "SUKKUR",
  "MULTAN",
  "BAHAWALPUR",
  "SAHIWAL",
  "QUETTA",
  "ISLAMABAD",
  "PESHAWAR",
  "MIRPUR",
  "MARDAN",
  "MUZAFFARABAD",
  "JHELUM",
  "LAHORE",
  "FAISALABAD",
  "SARGODHA",
  "GUJRANWALA",
  "SIALKOT",
  "GUJRAT",
];

export const ageBracket = [
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
];


