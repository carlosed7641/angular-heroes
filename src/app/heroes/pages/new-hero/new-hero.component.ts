import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirmDialog/confirmDialog.component';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styles: ``
})
export class NewHeroComponent implements OnInit {

  heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  });

  publishers = [
    {
      id: 'DC Comics',
      name: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      name: 'Marvel - Comics'
    }
  ]

  constructor(private heroesService: HeroesService,
    private activtedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }

  get currentHero(): Hero {

    const hero = this.heroForm.value as Hero
    return hero;

  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return

    this.activtedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      ).subscribe(hero => {
        if (!hero) return this.router.navigateByUrl('/')

        return this.heroForm.reset(hero)
      })

  }


  onSubmit() {
    if (this.heroForm.invalid) return

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackbar(`${hero.superhero} was updated`)
        })

      return
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        this.router.navigate(['/heroes/edit', hero.id])
        this.showSnackbar(`${hero.superhero} was created`)
      })
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw new Error('No hero to delete')

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    })

    dialogRef.afterClosed().
      pipe(
        filter(result => result),
        switchMap(() => this.heroesService.deleteHero(this.currentHero.id)),
        filter(wasDeleted => wasDeleted),
      ).subscribe(() => {
        this.router.navigate(['/heroes'])
        this.showSnackbar(`${this.currentHero.superhero} was deleted`)
      })

    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) return

    //   this.heroesService.deleteHero(this.currentHero.id)
    //     .subscribe(wasDeleted => {
    //       if (wasDeleted) {
    //         this.router.navigate(['/heroes'])
    //         this.showSnackbar(`${this.currentHero.superhero} was deleted`)
    //       }
    //     })
    // })

  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'Done', {
      duration: 2500
    })
  }
}
