import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  hero = new Hero();

  isValidFormSubmitted = false;
  validateHero = true;

  constructor(private heroService: HeroService) {
  }
  ngOnInit() {
    this.getHeroes();
  }

  onFormSubmit(heroForm: NgForm) {
    this.isValidFormSubmitted = false;
    if (heroForm.invalid) {
      console.log('Heroname is invalid');
      alert('Please, enter the letters only of the Latin alphabet!!!');
      return;
    }
    this.isValidFormSubmitted = true;
    this.hero = heroForm.value;
    this.heroService.addHero(this.hero);
    this.hero = new Hero();
    heroForm.resetForm();
    console.log('Heroname is valid' + this.hero.name);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }


  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });

  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}




