import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core' 
import { CategoryComponent } from './components/category.component';
import { CategoryItemComponent } from './components/category-item.component';

const routes: Routes= [
    { path: "categories" , component: CategoryComponent },
    { path: "categoryItems", component: CategoryItemComponent },
    { path: '',  redirectTo: '/categories', pathMatch: 'full' },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes)
