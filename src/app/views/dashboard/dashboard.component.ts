import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Pokemon } from './components/Pokemon';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  pokemonsList: Array<Pokemon> = [];
  pokeData:any;
  constructor(public dashboardService: DashboardService) {
    if(!localStorage.getItem('dataFilters')) {
      localStorage.setItem('dataFilters',JSON.stringify({
        searchQuery: '',
        pageSize: 20,
        offset: 0,
        page: 1,
        sortBy: 'name',
        sortOrder: 'asc'
      }))
    }
  }
  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(filterData?): void {
    let limit = 20;
    let offset = 0;
    if(filterData){
      limit = filterData.pageSize;
      offset = filterData.offset;
      this.setFilterData(filterData);
    }
    this.dashboardService.getPokemons(limit, offset).subscribe((res:any) => {
      this.pokeData = res.results;
      console.log('this.pokemonsList ', this.pokeData);
      this.getAllPokemonsDetails()
    })
  }

  getAllPokemonsDetails(){
    this.dashboardService.getAllPokemonDetails(this.pokeData.map(a => a.url)).subscribe((res:Array<Pokemon>) => {
      console.log('data ', res);
      this.pokemonsList = res;
    });
  }

  setFilterData(filterData){
    localStorage.setItem("dataFilters", JSON.stringify(filterData));
    return;
  }
}
