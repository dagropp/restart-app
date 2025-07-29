import {
  type City,
  type Country,
  type Currency,
  type EuUnionStatus,
  type IncomeType,
  type Language,
  type NoteScope,
  type NoteType,
  type RefCountry,
  type Region,
  type Religion,
  type UserType,
  type VisaLevel,
} from '@root/types';
import { type UseQueryResult } from '@tanstack/react-query';
import { Language as TranslatedLanguage } from '@translations';

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

export type ScoreResponse = Record<City, Record<ScoreKey, number>>;

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
}

export interface LandmarkItem {
  title: string;
  key: string;
  language: TranslatedLanguage;
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

export type CityCountryResponse = Pick<
  CountryResponse,
  | 'id'
  | 'capital'
  | 'regions'
  | 'visaLevel'
  | 'language'
  | 'englishSpeakersPercentage'
  | 'currency'
  | 'name'
  | 'isEu'
  | 'population'
  | 'socketTypes'
  | 'voltage'
>;

export interface ImmigrantData {
  percentage: number;
  origins: RefCountry[];
  neighborhoods: string[];
}

export interface CityData {
  id: City;
  country: CityCountryResponse;
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
  satelliteChildren: City[];
  satelliteCity?: City;
  satelliteDistance?: number;
  immigrants: ImmigrantData;
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
  traffic?: CityStatResponse;
  health?: CityStatResponse;
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

export interface PartnerPayload
  extends Omit<UserPayload, 'email' | 'password' | 'groupPayload'> {
  email?: string;
  password?: string;
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
  stipendValue: number | null;
  stipendCurrency: Currency | null;
  groupPayload?: GroupPayload;
  partnerPayload?: PartnerPayload;
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
  destination?: City | Country;
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
  countryId?: Country;
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
  modifyReplyCount: (noteId: number, count: number) => void;
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
  | 'sunlight'
  | 'commute';

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

export interface CostStateItem {
  value: number;
  instances?: number;
  hidden?: boolean;
  maxInstances?: number;
}

export type CostNegativeState = Record<
  'general' | 'rent' | 'flights' | 'school' | 'preschool',
  CostStateItem
>;

export type CostPositiveState = Record<
  | 'user'
  | 'partner'
  | 'userTax'
  | 'partnerTax'
  | 'userStipend'
  | 'partnerStipend',
  CostStateItem
>;

export interface SavedCostStateItem extends Omit<CostStateItem, 'value'> {
  mark?: number;
}

export interface SavedSimulation {
  id: number;
  name: string;
  created: string;
  updated: string;
  positiveState: Partial<Record<keyof CostPositiveState, SavedCostStateItem>>;
  negativeState: Partial<Record<keyof CostNegativeState, SavedCostStateItem>>;
}

export type UpdateSimulationPayload = Omit<
  SavedSimulation,
  'created' | 'updated'
>;

export type SaveSimulationPayload = Omit<UpdateSimulationPayload, 'id'>;

// checklist
export enum ChecklistItemSeverity {
  Low,
  Medium,
  High,
}

export interface ChecklistItem {
  id: string;
  text: string;
  severity: ChecklistItemSeverity;
  created?: number;
}

export interface ChecklistResponse {
  todo: ChecklistItem[];
  done: ChecklistItem[];
}

export interface PutChecklistPayload {
  text: string;
  status: boolean;
  severity: ChecklistItemSeverity;
  type: 'add' | 'status' | 'update';
}

// external apis
export interface ExternalMapsApiResponse {
  apiKey: string;
}

// flags
export type FlagName = string;

export type FlagsResponse = Record<FlagName, boolean>;

export interface FlagItemResponse {
  id: number;
  name: FlagName;
  users: string[];
  groups: string[];
  status: boolean;
  description?: string;
}

export type EditFlagPayload = Omit<FlagItemResponse, 'id'>;

export interface FlagParams {
  id: number;
}
