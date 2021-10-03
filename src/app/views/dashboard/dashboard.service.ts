import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private http: HttpClient) { }

    getPokemons(limit?, offset?) {
        if(!limit) limit = 20;
        if(!offset) offset = 0;
        return this.http.get(environment.pokemonAPI + `/pokemon?limit=${limit}&offset=${offset}`);
    }
    getPokemonById(id) {
        return this.http.get(environment.pokemonAPI + `/pokemon/${id}`);
    }
    
    getPokemonSpecies(id) {
        return this.http.get(environment.pokemonAPI + `/pokemon-species/${id}`);
    }

    getAllPokemonDetails(urls: string[]) {
        const res = [];
        for(const url of urls){
            res.push(this.http.get(url));
        }
        return forkJoin(res);
    }
}