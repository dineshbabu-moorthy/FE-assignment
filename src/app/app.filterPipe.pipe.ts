import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filterPipe' })
export class FilterPipe implements PipeTransform {
  transform(records: any, searchText: any): any {
    if(searchText == null) return records;

    return records.filter(function(record){
      return record.issueCount.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}