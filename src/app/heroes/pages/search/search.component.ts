import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'hero-search',
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent {

  searchInput = new FormControl('');
  heroes: Hero[] = []
  selectedHero?: Hero

  constructor(private heroesService: HeroesService) {}

  searchHero() {
    const value = this.searchInput.value || '';

    this.heroesService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption(event: MatAutocompleteActivatedEvent): void {

    if (!event.option || !event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero
  }
}
