import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SelectCropRoutingModule } from './select-crop-routing.module';
import { SelectCropComponent } from './select-crop.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [SelectCropComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        SelectCropRoutingModule,
        MaterialModule,
        FormsModule,
        Ng2SearchPipeModule,
        MatProgressSpinnerModule
    ]
})
export class SelectCropModule { }
