import { LabelCasePipe } from './label-case.pipe';
import {DebugElement} from "@angular/core";
import {TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";
import {By} from "@angular/platform-browser";

describe('LabelCasePipe', () => {
  it('create an instance', () => {
    const pipe = new LabelCasePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms "abc" to "Abc"', () => {
    let pipe = new LabelCasePipe();
    expect(pipe.transform('NAME')).toBe('Name');
  });
});

