import {Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { Pokemon } from '../pokemon-card/Pokemon';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent {
  id: number
  descriptionData: string;
  data: Pokemon;
  constructor(private dashoboardService: DashboardService,  private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id; // --> Name must match wanted parameter
  });
    this.initData();
  }
  initData() {
    console.log('data ', this.data, this.id);
    this.dashoboardService.getPokemonSpecies(this.id).subscribe((res:any) => {
      console.log('description ', res);
      this.descriptionData = res.flavor_text_entries.map((a) => a.language.name === "en" && a['flavor_text']).join(' ').replace(
        /\f/g,
        ""
      );;

    });
    this.dashoboardService.getPokemonById(this.id).subscribe((res:any) => {
      console.log('getPokemonById ', res);
      this.data = res;
    });
  }
}
