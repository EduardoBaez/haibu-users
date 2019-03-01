import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUserByName'
})
export class SearchUserByNamePipe implements PipeTransform {

  transform(items: any[], searchItem: string): any {
    if (!items) return []
    if (!searchItem) return items
    searchItem = searchItem.toLowerCase()
    return items.filter(item => {
      return item.nombre.toLowerCase().includes(searchItem)
    })
  }
}

