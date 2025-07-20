import { type City, type Country, type IncomeType } from '@root/types';
import { type ChildrenPayload } from '@services/api';

export enum InputName {
  FirstName = 'first_name',
  LastName = 'last_name',
  Email = 'email',
  Password = 'password',
  Avatar = 'avatar',
  Citizenship = 'citizenship',
  Income = 'income',
  IncomeMark = 'income_mark',
  IncomeRemote = 'income_remote',
  DateOfBirth = 'date_of_birth',
  StipendValue = 'stipend_value',
  StipendCurrency = 'stipend_currency',
}

export enum GroupInputName {
  Children = 'children',
  DepartureDate = 'departure_date',
  Bedrooms = 'bedrooms',
  Destination = 'destination',
}

export enum PartnerInputName {
  FirstName = 'partner_first_name',
  LastName = 'partner_last_name',
  Email = 'partner_email',
  Password = 'partner_password',
  Avatar = 'partner_avatar',
  Citizenship = 'partner_citizenship',
  Income = 'partner_income',
  IncomeMark = 'partner_income_mark',
  IncomeRemote = 'partner_income_remote',
  DateOfBirth = 'partner_date_of_birth',
  StipendValue = 'partner_stipend_value',
  StipendCurrency = 'partner_stipend_currency',
}

export interface TokenQuery {
  token: string;
  email: string;
  group?: string;
  userId?: string;
}

export interface SignUpData {
  [InputName.Citizenship]: string;
  [InputName.FirstName]: string;
  [InputName.LastName]: string;
  [InputName.Income]: IncomeType;
  [InputName.IncomeMark]: string;
  [InputName.Password]: string;
  [InputName.Avatar]: string;
  [InputName.DateOfBirth]: string;
  [InputName.IncomeRemote]: City | null;
  [InputName.StipendValue]?: string;
  [InputName.StipendCurrency]?: string;
  [GroupInputName.Children]?: ChildrenPayload[];
  [GroupInputName.DepartureDate]?: string;
  [GroupInputName.Bedrooms]?: string;
  [GroupInputName.Destination]?: City | Country;
  [PartnerInputName.Citizenship]: string;
  [PartnerInputName.FirstName]: string;
  [PartnerInputName.LastName]: string;
  [PartnerInputName.Income]: IncomeType;
  [PartnerInputName.IncomeMark]: string;
  [PartnerInputName.Password]?: string;
  [PartnerInputName.Email]?: string;
  [PartnerInputName.Avatar]: string;
  [PartnerInputName.DateOfBirth]: string;
  [PartnerInputName.IncomeRemote]: City | null;
  [PartnerInputName.StipendValue]?: string;
  [PartnerInputName.StipendCurrency]?: string;
}
