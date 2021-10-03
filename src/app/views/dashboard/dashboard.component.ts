import { Component, OnInit } from '@angular/core';
import { getStartOffset } from '../../utils/utils';
import { Pokemon } from './components/pokemon-card/Pokemon';
import { DashboardService } from './dashboard.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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
      this.sortPokemons(this.getFilterData());
    });
  }

  nextPokemons(event){
    event.stopPropagation();
    const filterData:any = this.getFilterData();
    filterData.page = filterData.page + 1;
    filterData.offset = getStartOffset(filterData.page, filterData.pageSize);
    this.getPokemons(filterData);
  }

  prevPokemons(event){
    event.stopPropagation();
    const filterData:any = this.getFilterData();
    filterData.page = filterData.page - 1;
    filterData.offset = getStartOffset(filterData.page, filterData.pageSize);
    this.getPokemons(filterData);
  }

  getFilterData(){
    if(localStorage.getItem("dataFilters")){
     return JSON.parse(localStorage.getItem("dataFilters"));
    }
  }
  
  setFilterData(filterData){
    localStorage.setItem("dataFilters", JSON.stringify(filterData));
    return;
  }

  searchPokemons(event,searchStr){
    event.stopPropagation();
    if(searchStr && searchStr.length > 0){
      
    }
  }

  changePage(event){
    console.log('event ', event, event.srcElement.selectedOptions[0].value)
    const filterData:any = this.getFilterData();
    filterData.pageSize = Number(event.srcElement.selectedOptions[0].value);
    filterData.page = 1;
    filterData.offset = getStartOffset(filterData.page, filterData.pageSize);
    this.getPokemons(filterData);
  }
  changeSortKey(event){
    console.log('event ', event, event.srcElement.selectedOptions[0].value)
    const filterData:any = this.getFilterData();
    filterData.sortBy = event.srcElement.selectedOptions[0].value;
    this.sortPokemons(filterData);
  }
  changeSortOrder(event){
    console.log('event ', event, event.srcElement.selectedOptions[0].value)
    const filterData:any = this.getFilterData();
    filterData.sortOrder = event.srcElement.selectedOptions[0].value;
    this.sortPokemons(filterData);
  }

  sortPokemons(filterData) {
    console.log(filterData);
    this.setFilterData(filterData);
    return this.pokemonsList.sort((a,b) => {
      if(filterData.sortBy === 'name'){
        if(filterData.sortOrder === 'asc'){
            return (a[filterData.sortBy].toUpperCase() > b[filterData.sortBy].toUpperCase() ? 1
        : (a[filterData.sortBy].toUpperCase() < b[filterData.sortBy].toUpperCase()) ? -1 : 0)
          } else {
              return (b[filterData.sortBy].toUpperCase() > a[filterData.sortBy].toUpperCase() ? 1
        : (b[filterData.sortBy].toUpperCase() < a[filterData.sortBy].toUpperCase()) ? -1 : 0)
          }
      }else{
        if(filterData.sortOrder === 'asc'){
          return a[filterData.sortBy] - b[filterData.sortBy];
        }else{
          return b[filterData.sortBy] - a[filterData.sortBy];
        }
      }
    })
  }
}
