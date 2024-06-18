
const countryList = {  // List of countries with country currency code and country code 
    AED: "AE",          // country code is needed for extracting corresponding flag of currency code
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };

const url = "https://v6.exchangerate-api.com/v6/3d70cc5fee6be20978a7256e/latest";
const dropdowns = document.querySelectorAll(".dropdown select"); //2 dropdown are available , one for input and other for output
let btn = document.querySelector(".btn");
let exchange_display = document.querySelector(".dis p");
let amount = document.querySelector(".box #inpt");
let amount_dis = document.querySelector(".box #otpt");
amount_dis.disabled = true;         //to restrict the access of amount display input


for(let dropdown of dropdowns)
    {
        for(country in countryList)      // populating the select elements
            {
                let new_el = document.createElement("option");
                new_el.innerText=country;
                new_el.value=country;
                if(dropdown.name ==="from" && country=== "USD")
                    {
                        new_el.selected ="selected";          // to keep USD and INR as default values
                    }
                else if(dropdown.name ==="to" && country=== "INR")
                    {
                        new_el.selected ="selected";
                    }    
                dropdown.append(new_el);
            }

            dropdown.addEventListener("click",(evt)=>{   //changing the default flag on clicking
                changeflag(evt.target);
            })
    }

    function changeflag(element){
        let currcode = element.value;
        let countryval = countryList[currcode];
        let new_link=`https://flagsapi.com/${countryval}/flat/64.png`;
        let img = element.parentElement.parentElement.querySelector("img");
        img.src=new_link;
    }

    async function final_exchange(){
        let amtval=amount.value;
        if(amtval<0 || amtval=="")
            {
                amtval=1;
                amount.value="1";
            }
       const fromcurr = document.querySelector(".from select");
       const tocurr = document.querySelector(".to select");
       let fromcountry = countryList[fromcurr.value];
       let tocountry = countryList[tocurr.value];
       const new_url = `https://v6.exchangerate-api.com/v6/3d70cc5fee6be20978a7256e/latest/${fromcurr.value}`;
       let response = await fetch(new_url);
       let data = await response.json();
       let exchangeval = data.conversion_rates[tocurr.value];
       amtval*=exchangeval;
       amount_dis.value = amtval;
       let new_Str = `1 ${fromcurr.value} = ${exchangeval} ${tocurr.value}`;
       exchange_display.innerText = new_Str;
    }

    btn.addEventListener("click",(evt)=>{
        evt.preventDefault();
        final_exchange();
        
    })

    window.addEventListener("load",async()=>{  // To get an accurate initial default conversion (ex - 1 USD = (present_rate) INR)
      final_exchange();
    })

    

















  