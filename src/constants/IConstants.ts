export enum Classes {
  Бард = 'Бард',
  Жрец = 'Жрец',
  Паладин = 'Паладин',
  Следопыт = 'Следопыт',
  Чародей = 'Чародей',
  Колдун = 'Колдун',
  Волшебник = 'Волшебник',
  Друид = 'Друид',
  Изобретатель = 'Изобретатель'
}

export interface SpellData {
  name: string;
  desc: string;
  higher_level?: string;
  range: string;
  components: string[];
  material?: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  school: string;
  classes: Classes[];
}

export interface ISpell extends SpellData {
  _id: string;
}

export interface IUser {
  _id: string;
  email: string;
  role: 'User' | 'Admin';
  isActivated: boolean;
  accessToken?: string;
}

export interface ICharacter {
  name?: string;
  spells: ISpell[];
  owner?: string;
}

export interface FormState {
  show: boolean;
  chosenSpell: Partial<ISpell>;
}

export interface SignInResult {
  hasError: boolean;
  errorMessage: string;
}

export interface PropsAuthForm {
  cbSubmit: (email: string, password: string) => void;
  isSubmitted: boolean;
}
