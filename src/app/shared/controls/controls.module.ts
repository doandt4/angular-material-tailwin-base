import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from './input/input.module';
import { FormFieldModule } from './form-field/form-field.module';
import { CheckboxModule } from './checkbox/checkbox.module';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        InputModule,
        FormFieldModule,
        CheckboxModule
    ],
    exports: [
        InputModule,
        FormFieldModule,
        CheckboxModule
    ]
})
export class ControlsModule {}
