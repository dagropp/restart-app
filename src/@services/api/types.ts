import { UseQueryResult } from '@tanstack/react-query';

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

export type CurrencyList = Record<Currency, number>;

export type SqlBoolean = 0 | 1;

export type MonthlyStatList = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export interface WeatherData {
  rainfall: MonthlyStatList;
  minTemp: MonthlyStatList;
  maxTemp: MonthlyStatList;
  rainyDays: MonthlyStatList;
  sunHours: MonthlyStatList;
}

export type ScoreKey =
  | 'timezone'
  | 'distance'
  | 'language'
  | 'qualityRank'
  | 'weather'
  | 'cost'
  | 'visa'
  | 'average'
  | 'urbanism';

export type ScoreList = Record<City, number>;

export type ScoreResponse = Record<City, Record<ScoreKey, number>>;

export enum Religion {
  CHRISTIANITY = 'CHRISTIANITY',
  ISLAM = 'ISLAM',
  HINDUISM = 'HINDUISM',
  BUDDHISM = 'BUDDHISM',
  JUDAISM = 'JUDAISM',
  NO_RELIGION = 'NO_RELIGION',
}

export type ElectricitySocketType =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O';

export enum EuUnionStatus {
  No = 'No',
  Yes = 'Yes',
  Proxy = 'Proxy',
}

export type FunFactType =
  | 'history'
  | 'architecture'
  | 'food'
  | 'bicycle'
  | 'water'
  | 'nature'
  | 'money'
  | 'art'
  | 'sport'
  | 'literature'
  | 'music'
  | 'mountain'
  | 'people'
  | 'tech'
  | 'language'
  | 'geography'
  | 'education'
  | 'culture'
  | 'beer'
  | 'wine'
  | 'weather'
  | 'transportation'
  | 'cars'
  | 'flight'
  | 'animals'
  | 'science'
  | 'rank'
  | 'religion'
  | 'ship'
  | 'light'
  | 'industry'
  | 'nazi';

export interface FunFactItem {
  label: string;
  type: FunFactType;
  link?: string;
}

export interface LandmarkItem {
  title: string;
  key: string;
}

export interface CountryData {
  name: string;
  capital: City | string | null;
  isEu: EuUnionStatus;
  currency: Currency;
  language: Language[];
  englishSpeakersPercentage?: number;
  costOfLivingKey: string;
  incomeLevelKey: string;
  population: number;
  density: number;
  voltage: 110 | 120 | 220 | 230 | 240;
  socketTypes: ElectricitySocketType[];
  religion: Record<Religion, number>;
  religionImportance: number | null;
  regions: Region[];
  wikipediaKey: string;
  lowestElevation: number;
  highestElevation: number;
  funFacts?: FunFactItem[];
  landmarks?: LandmarkItem[];
  isDestination: boolean;
}

export interface CountryResponse extends CountryData {
  id: Country;
  visaLevel: VisaLevel;
  isBookmark: boolean;
}

export interface CityData {
  id: City;
  country: CountryResponse;
  state?: string;
  name: string;
  airport: string;
  driveDuration: number;
  timezone: string;
  timezoneDiff: number;
  language: Language;
  costOfLivingKey: string;
  incomeLevelKey: string;
  flightPriceKey?: string;
  communityKey?: string;
  weather: WeatherData;
  population: number;
  density: number;
  elevation: number;
  wikipediaKey: string;
  funFacts?: FunFactItem[];
  landmarks?: LandmarkItem[];
  isBookmark: boolean;
  isDestination: boolean;
}

export interface CurrencyRates {
  lastUpdate: number;
  data: CurrencyList;
}

export interface CostResponse {
  apples: number;
  beef: number;
  beer: number;
  beerBottle: number;
  bills: number;
  bread: number;
  buyCentral: number;
  buyOuter: number;
  cheese: number;
  chicken: number;
  coffee: number;
  directFlight: number;
  eggs: number;
  gasoline: number;
  generalCost: number;
  generalSingleCost: number;
  germanCar: number;
  internet: number;
  japanCar: number;
  mcDonalds: number;
  mealDate: number;
  mealSingle: number;
  milk: number;
  mobile: number;
  preSchool: number;
  privateSchool: number;
  rentCentral: number;
  rentOuter: number;
  rentSingleCentral: number;
  rentSingleOuter: number;
  stopsFlight: number;
  ticketMonth: number;
  ticketSingle: number;
  tomatoes: number;
  wine: number;
}

export interface IncomeItem {
  gross: number;
  net: number;
  tax: number;
}

export interface IncomeResponse {
  lastUpdate: string;
  city: City;
  marks: IncomeItem[];
  increments: IncomeItem[];
  type: IncomeType;
  jobs: number[];
}

export interface CityStatResponse {
  lastUpdate: string;
  city: City;
  rank: number;
  minRank: number;
}

export interface QualityIndexResponse {
  quality?: CityStatResponse;
  crime?: CityStatResponse;
  pollution?: CityStatResponse;
}

export interface FlightsResponse {
  lastUpdate: string;
  city: City;
  currency: Currency;
  directPrice: number;
  directDuration: number;
  stopsPrice: number;
  stopsDuration: number;
}

export interface CommunityResponse {
  lastUpdate: string;
  city: City;
  members: number;
}

export interface UserPayload {
  citizenship: string;
  firstName: string;
  lastName: string;
  email: string;
  income: IncomeType;
  incomeMark?: number;
  incomeRemote: City | null;
  password: string;
  groupId?: string;
  avatar?: string;
  dateOfBirth: string;
  groupPayload?: GroupPayload;
  stipendValue: number | null;
  stipendCurrency: Currency | null;
}

export type EditUserPayload = Omit<
  UserPayload,
  'token' | 'groupId' | 'password' | 'email'
>;

export interface UserResponse
  extends Omit<UserPayload, 'password' | 'token' | 'groupId' | 'citizenship'> {
  id: string;
  type: UserType;
  groupId: string;
  citizenship: Country[];
}

export interface ChildrenResponse {
  id: number;
  groupId: string;
  dateOfBirth: string;
  name: string;
  ageAtDeparture: number;
}

export interface ChildrenPayload {
  id?: number;
  dateOfBirth: string | null;
  name: string;
}

export interface GroupResponse {
  id: string;
  departureDate: string;
  children: ChildrenResponse[];
  partner?: UserResponse;
  bedrooms: number;
  bookmarks: (City | Country)[];
  destination?: City | Country;
}

export interface GroupPayload {
  departureDate: string | null;
  children: ChildrenPayload[];
  bedrooms: number;
}

export interface LoginResponse extends UserResponse {
  sessionId: string;
}

export type CompactUserResponse = Pick<
  UserResponse,
  'id' | 'type' | 'firstName' | 'lastName' | 'email' | 'groupId' | 'avatar'
>;

export type UsersList = Record<string, CompactUserResponse>;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ValidateResponse {
  isValid: boolean;
}

export interface NoteResponse {
  data: string;
  id: number;
  created: string;
  userId: string;
  updated: string;
  replies: number;
  pinned: SqlBoolean;
  parent?: number;
  cityId: City;
  groupId: string;
  scope: NoteScope;
  type: NoteType;
  title: string | null;
}

export interface NotesCountResponse {
  total: number;
}

export interface UseNotesOptions {
  placeId?: City | Country;
  noteId?: number;
  enabled?: boolean;
}

export interface UseNotesActions {
  add: (note: NoteResponse) => void;
  update: (note: NoteResponse) => void;
  remove: (id: number) => void;
}

export interface UseNotesHook {
  query: UseQueryResult<NoteResponse[], Error>;
  notes: NoteResponse[];
  actions: UseNotesActions;
}

export type StatusResponse =
  | { status: true; lastID: string | number }
  | { status: false; error: string };

export enum TokenStatus {
  Valid = 'Valid',
  Expired = 'Expired',
  Invalid = 'Invalid',
}

export enum ScrapingType {
  IncomeLevels = 'IncomeLevels',
  CostOfLiving = 'CostOfLiving',
  QualityOfLife = 'QualityOfLife',
  Currencies = 'Currencies',
  Flights = 'Flights',
  Community = 'Community',
}

export interface ValidateTokenResponse {
  status: TokenStatus;
}

export interface LinkMetadataRequest {
  link: string;
}

export interface LinkMetadataResponse {
  title: string;
  icon?: string;
}

export type ScrapingStatusResponse =
  | {
      isPending: true;
      progress: number;
    }
  | { isPending: false };

export type ScrapingStatusesResponse = Record<
  ScrapingType,
  ScrapingStatusResponse
>;

export interface ScrapingErrorItem {
  id: string;
  type: ScrapingType;
  message?: string | null;
  key?: string | null;
}

export interface ScrapingData {
  type: ScrapingType;
  lastUpdate: string[];
  errors: ScrapingErrorItem[];
  records: number;
}

export interface ScrapingRecordsGeneric {
  error?: ScrapingErrorItem;
  placeType?: 'country' | 'city';
  lastUpdate?: string;
}

export interface ScrapingRecordsIncomeLevels extends ScrapingRecordsGeneric {
  city: City;
  extreme?: number;
  high?: number;
  id?: `${City}-${IncomeType}`;
  jobs?: string;
  low?: number;
  median?: number;
  type?: IncomeType;
}

export interface ScrapingRecordsCostOfLiving
  extends Partial<CostResponse>,
    ScrapingRecordsGeneric {
  city: City | Country;
}

export interface ScrapingRecordsQualityOfLife extends ScrapingRecordsGeneric {
  city: City;
  minRank?: number;
  rank?: number;
}

export interface ScrapingRecordsCurrencies extends ScrapingRecordsGeneric {
  currency: Currency;
  value: number;
}

export interface ScrapingRecordsFlights extends ScrapingRecordsGeneric {
  city: City;
  currency?: Currency;
  directDuration?: number;
  directPrice?: number;
  stopsDuration?: number;
  stopsPrice?: number;
}

export interface ScrapingRecordsCommunity extends ScrapingRecordsGeneric {
  city: City;
  members?: number;
}

// Wikipedia API
interface WikiImage {
  source: string;
  width: number;
  height: number;
}

interface WikiUrl {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface WikiTitleSummary {
  type: string;
  title: string;
  displaytitle: string;
  namespace: {
    id: number;
    text: string;
  };
  wikibase_item: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail: WikiImage;
  originalimage: WikiImage;
  lang: string;
  dir: 'ltr' | 'rtl';
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  content_urls: {
    desktop: WikiUrl;
    mobile: WikiUrl;
  };
  extract: string;
  extract_html: string;
}

// Insights
export enum InsightType {
  Hidden,
  Good,
  Neutral,
  Bad,
}

export type ValidInsightType = Exclude<InsightType, InsightType.Hidden>;

export type InsightKey =
  | 'visa'
  | 'flightDuration'
  | 'flightPrice'
  | 'community'
  | 'colIndexMultiple'
  | 'colIndexSingle'
  | 'quality'
  | 'weather'
  | 'language'
  | 'rainfall'
  | 'electricity'
  | 'timezone'
  | 'sunlight';

export interface InsightData {
  key: InsightKey;
  type: InsightType;
  label: string;
  link?: string;
}

export type InsightsResponse = Partial<Record<ValidInsightType, InsightData[]>>;

// CityCompare
export enum CompareStatus {
  Loser = -1,
  Tie = 0,
  Winner = 1,
}

export interface CompareItem {
  label: string;
  status: CompareStatus;
}

export interface CompareData {
  key: InsightKey;
  label: string;
  city: CompareItem;
  other: CompareItem;
}
