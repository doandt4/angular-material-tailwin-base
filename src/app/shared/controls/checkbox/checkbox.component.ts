import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'canion3d-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }
]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

    @Input() items: any
    @Input('value') _value = false;
    onChange: any = () => {};
    onTouched: any = () => {};

    //value: boolean;
    isDisabled: boolean;

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    constructor() {}

    ngOnInit(): void {}

    //private propagateChange: any = () => {};

    writeValue(value): void {
        if (value) {
            this.value = value;
          }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onChanged(){
        this.value = !this.value;
    }

    isChecked(): boolean {
        return this.value;
    }

}
