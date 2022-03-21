import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { MaterialModule } from 'app/shared/material.module';

@NgModule({
    declarations: [CheckboxComponent],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        CheckboxComponent
    ]
})
export class CheckboxModule {}
