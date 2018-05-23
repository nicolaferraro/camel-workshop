import { Pipe, PipeTransform } from '@angular/core';
import {Entry} from "./datatypes";

@Pipe({
  name: 'mapValues'
})
export class MapValuesPipe implements PipeTransform {

  transform(theMap: any, args?: any[]): Entry[] {
    let res = [];
    for (let key in theMap) {
      res.push({
        key: key,
        value: theMap[key]
      });
    }

    return res;
  }

}
