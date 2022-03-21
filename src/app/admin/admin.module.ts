import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from 'app/shared/material.module';
import { FormFieldModule, InputModule } from 'app/shared';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { NgtCoreModule } from '@angular-three/core';
import { NgtMeshModule } from '@angular-three/core/meshes';
import { NgtMeshBasicMaterialModule } from '@angular-three/core/materials';
import { NgtBoxGeometryModule } from '@angular-three/core/geometries';
import { NgtSobaOrbitControlsModule } from '@angular-three/soba/controls';
import { NgtGridHelperModule } from '@angular-three/core/helpers';
import { NgtPrimitiveModule } from '@angular-three/core/primitive';
import { RxState } from '@rx-angular/state';
import { NgtSobaLoaderModule } from '@angular-three/soba/loaders';
import { NgtStatsModule } from '@angular-three/core/stats';
import {
    NgtDirectionalLightModule,
    NgtHemisphereLightModule,
} from '@angular-three/core/lights';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
    declarations: [
        AdminComponent,
        SidebarComponent,
        NavbarComponent,
        LayoutComponent,
        HomeComponent,
        OrderHistoryComponent,
        StatisticsComponent,
        ProductsComponent,
        SettingsComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MaterialModule,
        InputModule,
        FormFieldModule,
        ReactiveFormsModule,
        NgChartsModule,
        NgtCoreModule,
        NgtMeshModule,
        NgtBoxGeometryModule,
        NgtMeshBasicMaterialModule,
        NgtSobaOrbitControlsModule,
        NgtGridHelperModule,
        NgtPrimitiveModule,
        NgtSobaLoaderModule,
        NgtStatsModule,
        NgtHemisphereLightModule,
        NgtDirectionalLightModule,
    ],
})
export class AdminModule {}
