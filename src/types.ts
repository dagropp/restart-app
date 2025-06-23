export enum CityTabKey {
  OVERVIEW = 'overview',
  COST = 'cost',
  NOTES = 'notes',
  NOTE = 'notes/:note',
  COMPARE = 'compare',
}

export enum CountryTabKey {
  OVERVIEW = 'overview',
  NOTES = 'notes',
  NOTE = 'notes/:note',
}

export enum SettingsTabKey {
  EDIT_USER = 'user',
  EDIT_GROUP = 'group',
  DATA_CENTER = 'data-center',
  DATA_CENTER_ITEM = 'data-center/:type',
  USERS = 'users',
}

export enum VisaLevel {
  None = 0,
  Easy = 1,
  Medium = 2,
}

export enum IncomeType {
  None = 'None',
  SoftwareEngineerEntry = 'SoftwareEngineerEntry',
  SoftwareEngineerSenior = 'SoftwareEngineerSenior',
  SoftwareEngineerManager = 'SoftwareEngineerManager',
  ProductDesigner = 'ProductDesigner',
  ProductManager = 'ProductManager',
  SocialWorker = 'SocialWorker',
  Doctor = 'Doctor',
  Other = 'Other',
}

export enum UserType {
  Admin = 'Admin',
  GroupOwner = 'GroupOwner',
  Standard = 'Standard',
}

export enum NoteScope {
  Public = 'Public',
  Private = 'Private',
}

export enum NoteType {
  Note = 'Note',
  Todo = 'Todo',
  Link = 'Link',
}

export enum City {
  LONDON = 'LONDON',
  CAMBRIDGE = 'CAMBRIDGE',
  MANCHESTER = 'MANCHESTER',
  GLASGOW = 'GLASGOW',
  EDINBURGH = 'EDINBURGH',
  DUBLIN = 'DUBLIN',
  NEW_YORK = 'NEW_YORK',
  SAN_FRANCISCO = 'SAN_FRANCISCO',
  SEATTLE = 'SEATTLE',
  AUSTIN = 'AUSTIN',
  BOSTON = 'BOSTON',
  DENVER = 'DENVER',
  CHICAGO = 'CHICAGO',
  VANCOUVER = 'VANCOUVER',
  TORONTO = 'TORONTO',
  MONTREAL = 'MONTREAL',
  BERLIN = 'BERLIN',
  MUNICH = 'MUNICH',
  HAMBURG = 'HAMBURG',
  BARCELONA = 'BARCELONA',
  MADRID = 'MADRID',
  AMSTERDAM = 'AMSTERDAM',
  EINDHOVEN = 'EINDHOVEN',
  ZURICH = 'ZURICH',
  BERN = 'BERN',
  BUDAPEST = 'BUDAPEST',
  VIENNA = 'VIENNA',
  PRAGUE = 'PRAGUE',
  WARSAW = 'WARSAW',
  COPENHAGEN = 'COPENHAGEN',
  HELSINKI = 'HELSINKI',
  BENGALURU = 'BENGALURU',
  TEL_AVIV = 'TEL_AVIV',
  JERUSALEM = 'JERUSALEM',
  HAIFA = 'HAIFA',
  SYDNEY = 'SYDNEY',
  MELBOURNE = 'MELBOURNE',
  BRISBANE = 'BRISBANE',
  BRATISLAVA = 'BRATISLAVA',
  STOCKHOLM = 'STOCKHOLM',
  LISBON = 'LISBON',
  NICOSIA = 'NICOSIA',
  OSLO = 'OSLO',
  AUCKLAND = 'AUCKLAND',
  DUBAI = 'DUBAI',
  ATHENS = 'ATHENS',
  PARIS = 'PARIS',
  MILAN = 'MILAN',
  FRANKFURT = 'FRANKFURT',
  GENEVA = 'GENEVA',
  BASEL = 'BASEL',
  TALLINN = 'TALLINN',
  VILNIUS = 'VILNIUS',
  LUXEMBOURG_CITY = 'LUXEMBOURG_CITY',
  BRUSSELS = 'BRUSSELS',
  KRAKOW = 'KRAKOW',
  LARNACA = 'LARNACA',
  RIGA = 'RIGA',
  SANTA_CLARA = 'SANTA_CLARA',
  UTRECHT = 'UTRECHT',
  HAARLEM = 'HAARLEM',
  READING = 'READING',
  POTSDAM = 'POTSDAM',
  ROTTERDAM = 'ROTTERDAM',
  DEN_HAAG = 'DEN_HAAG',
}

export enum Country {
  AUSTRALIA = 'AUSTRALIA',
  AUSTRIA = 'AUSTRIA',
  BELGIUM = 'BELGIUM',
  CANADA = 'CANADA',
  CYPRUS = 'CYPRUS',
  CZECH_REPUBLIC = 'CZECH_REPUBLIC',
  DENMARK = 'DENMARK',
  ESTONIA = 'ESTONIA',
  FINLAND = 'FINLAND',
  FRANCE = 'FRANCE',
  GERMANY = 'GERMANY',
  GREECE = 'GREECE',
  HUNGARY = 'HUNGARY',
  INDIA = 'INDIA',
  IRELAND = 'IRELAND',
  ISRAEL = 'ISRAEL',
  ITALY = 'ITALY',
  LATVIA = 'LATVIA',
  LITHUANIA = 'LITHUANIA',
  LUXEMBOURG = 'LUXEMBOURG',
  NETHERLANDS = 'NETHERLANDS',
  NEW_ZEALAND = 'NEW_ZEALAND',
  NORWAY = 'NORWAY',
  POLAND = 'POLAND',
  PORTUGAL = 'PORTUGAL',
  SLOVAKIA = 'SLOVAKIA',
  SPAIN = 'SPAIN',
  SWEDEN = 'SWEDEN',
  SWITZERLAND = 'SWITZERLAND',
  UNITED_ARAB_EMIRATES = 'UNITED_ARAB_EMIRATES',
  UNITED_KINGDOM = 'UNITED_KINGDOM',
  UNITED_STATES = 'UNITED_STATES',
}

export enum Region {
  NORTH_AMERICA = 'NORTH_AMERICA',
  EUROPE = 'EUROPE',
  ASIA = 'ASIA',
  OCEANIA = 'OCEANIA',
  ALL = 'ALL',
}

export type ValidRegion = Exclude<Region, Region.ALL>;

export enum Currency {
  AED = 'AED',
  AUD = 'AUD',
  CAD = 'CAD',
  CHF = 'CHF',
  CZK = 'CZK',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  HUF = 'HUF',
  ILS = 'ILS',
  INR = 'INR',
  NOK = 'NOK',
  NZD = 'NZD',
  PLN = 'PLN',
  SEK = 'SEK',
  USD = 'USD',
}

export enum Language {
  AR = 'AR',
  CS = 'CS',
  DA = 'DA',
  DE = 'DE',
  EL = 'EL',
  EN = 'EN',
  ES = 'ES',
  ET = 'ET',
  FI = 'FI',
  FR = 'FR',
  HE = 'HE',
  HI = 'HI',
  HU = 'HU',
  IT = 'IT',
  LT = 'LT',
  NL = 'NL',
  NO = 'NO',
  PL = 'PL',
  PT = 'PT',
  SL = 'SL',
  SV = 'SV',
  TR = 'TR',
  IS = 'IS',
  LV = 'LV',
}

export enum ThemeType {
  Dark = 'Dark',
  Light = 'Light',
  System = 'System',
}

export enum EuUnionStatus {
  No = 'No',
  Yes = 'Yes',
  Proxy = 'Proxy',
}
