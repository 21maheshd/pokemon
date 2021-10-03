import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, searchValue): any {
        console.log(value, searchValue);
        if (!searchValue) {
            return value;
        }
        const names = value.filter(item => item.name && item.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
        const abilities = value.filter(vv =>  vv.abilities.filter(a => a.ability.name.toLowerCase().includes(searchValue.toLowerCase())).length > 0);
        if(names.length > 0){
            return names
        }
        if(abilities.length > 0){
            return abilities;
        }
    }
}