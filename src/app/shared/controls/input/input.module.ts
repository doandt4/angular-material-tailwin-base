import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MaterialModule } from 'app/shared/material.module';

@NgModule({
    declarations: [InputComponent],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        InputComponent,        
    ]
})
export class InputModule {}
