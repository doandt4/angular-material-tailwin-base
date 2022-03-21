import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                component: HomeComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'order-history',
                component: OrderHistoryComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'statistics',
                component: StatisticsComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'products',
                component: ProductsComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'settings',
                component: SettingsComponent,
                // canActivate: [AuthGuard],
            },
        ],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
