import { Type } from "@src/shared/result";
import { RequiredMinLenError } from "../errors/required-min-len-error";

export class Password {
  static REQUIRED_MIN_LENGHT = 6;
  constructor(readonly password: string){}

  static create(password: string): Type<Password> {    
   return password.length < Password.REQUIRED_MIN_LENGHT ? 
       new RequiredMinLenError('Password', Password.REQUIRED_MIN_LENGHT) : 
       new Password(password)
  }

  get value(): string {
    return this.password
  }
}