import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { NewHeroComponent } from './pages/new-hero/new-hero.component';
import { SearchComponent } from './pages/search/search.component';
import { ListComponent } from './pages/list/list.component';
import { HeroComponent } from './pages/hero/hero.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: 'new-hero',
      component: NewHeroComponent
    },
    {
      path: 'search',
      component: SearchComponent
    },
    {
      path: 'edit/:id',
      component: NewHeroComponent
    },
    {
      path: 'list',
      component: ListComponent,
    },
    {
      path: ':id',
      component: HeroComponent
    },
    {
      path: '**',
      redirectTo: 'list'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
