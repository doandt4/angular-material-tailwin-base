import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'canion3d-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
    @Input() placeholder: string;
    @Input() type: string;
    @Input() icon: string = '';
    @Input() style: string[] = [];

    value: string = '';
    isDisabled: boolean;

    private onChange: any = () => {};
    private onTouched: any = () => {};

    constructor() {}

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onKeyUp(event: any) {
        this.onChange(event);
    }

    onBlur() {
        this.onTouched();
    }

    ngOnInit(): void {}
}
