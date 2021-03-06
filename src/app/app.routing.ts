import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { CategoryComponent } from "./components/category.component";
import { CategoryItemComponent } from "./components/category-item.component";
import { ItemDetailsComponent } from "./components/item-details.component";

const routes: Routes = [
  { path: "categories", component: CategoryComponent },
  { path: "categoryItems/:cat/:page", component: CategoryItemComponent },
  { path: "itemDetail", component: ItemDetailsComponent },
  { path: "", redirectTo: "/categories", pathMatch: "full" }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
