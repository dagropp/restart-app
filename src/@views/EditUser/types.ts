import { type City, type IncomeType } from '@root/types';
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
}

export interface TokenQuery {
  token: string;
  email: string;
  group?: string;
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
}
