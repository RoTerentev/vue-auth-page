import capitalize from './capitalize';

export interface FullName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export default function fullname(obj: FullName): string {
  let name = capitalize(obj.firstName);
  name += obj.middleName !== '' ? ` ${capitalize(obj.middleName)}` : '';
  name += obj.lastName !== '' ? ` ${capitalize(obj.lastName)}` : '';
  return name || '';
}
