enum School {
  Воплощение = 'Воплощение',
  Вызов = 'Вызов',
  Иллюзия = 'Иллюзия',
  Некромантия = 'Некромантия',
  Ограждение = 'Ограждение',
  Очарование = 'Очарование',
  Преобразование = 'Преобразование',
  Прорицание = 'Прорицание'
}

enum Classes {
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

export interface ISpell {
  name: string;
  desc: string;
  hight_level?: string;
  range: string;
  components: ['В', 'С'?, 'М'?];
  material?: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  school: School;
  classes: Classes[];
}

export interface IUser {
  email: string;
  role: 'User' | 'Admin';
  isActiveted: boolean;
}

export interface ICharacter {
  name: string;
  spells: ISpell[];
  owner: string;
}