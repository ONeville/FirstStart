import { Pipe, PipeTransform } from '@angular/core';
import { Ledger } from './models';

@Pipe({
  name: 'groupby'
})
export class GroupByPipe implements PipeTransform {

  transform(value: Ledger[], args?: any): any {
    const groupedObj = value.reduce((prev, cur)=> {
      if(!prev[cur[args]]) {
        prev[cur[args]] = [cur];
      } else {
        prev[cur[args]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj)
      .map(key => ({ 
        key, 
        expanded: false,
        totalProjected: groupedObj[key].reduce(function (a, b) { return a + b.projectedAmount; }, 0), 
        totalActual: groupedObj[key].reduce(function (a, b) { return a + b.actualAmount; }, 0), 
        ledgers: groupedObj[key] }));
  }


}
