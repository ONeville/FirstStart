import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupby'
})
export class GroupByPipe implements PipeTransform {

  sumAsset(newList, item): any{
    let idx = newList.findIndex( 
        i=> i.asset === item.asset);
    if(idx>-1){
      newList[idx].summary += item.asset;
    }else{
      newList.push(item)
    }
    return newList;
  }

  transform(value: any, args?: any): any {
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
        summary: groupedObj[key].reduce(function (a, b) { return a + b.asset; }, 0), 
        value: groupedObj[key] }));
  }


}
