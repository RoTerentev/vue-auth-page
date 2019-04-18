import fullname from '@/utils/fullname';

export class Person {
  public readonly id: number = -1;
  public firstName: string = '';
  public lastName: string = '';
  public phone: string = '';

  public middleName!: string;

  get fullname(): string {
    return fullname(this);
  }
}
