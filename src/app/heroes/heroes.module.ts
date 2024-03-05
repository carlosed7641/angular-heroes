import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroComponent } from './pages/hero/hero.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { NewHeroComponent } from './pages/new-hero/new-hero.component';
import { SearchComponent } from './pages/search/search.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card.component';
import { HeroImagePipe } from './pipes/heroImage.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirmDialog/confirmDialog.component';


@NgModule({
  declarations: [
    HeroComponent,
    LayoutComponent,
    ListComponent,
    NewHeroComponent,
    SearchComponent,
    CardComponent,
    ConfirmDialogComponent,
    HeroImagePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
