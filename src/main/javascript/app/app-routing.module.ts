import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'old',
    redirectTo: 'articles/food/7',
    pathMatch: 'full'
  },
  {
    path: 'articles',
    redirectTo: 'articles/food/7',
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
