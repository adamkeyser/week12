import {Directive, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators} from "@angular/forms";


/** A hero's name can't match the given regular expression */
export function birthdayValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const no = nameRe.test(name);
    return no ? {'birthday': {name}} : null;
  };
}

@Directive({
  selector: '[birthday]',
  providers: [{provide: NG_VALIDATORS, useExisting: BirthdayValidatorDirective, multi: true}]
})
export class BirthdayValidatorDirective implements Validator, OnChanges {
  @Input() birthday: string;
  private valFn = Validators.nullValidator;
  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['birthday'];
    if (change) {
      const val: string | RegExp = change.currentValue;
      const re = val instanceof RegExp ? val : new RegExp(val, 'i');
      this.valFn = birthdayValidator(re);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }
  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}
