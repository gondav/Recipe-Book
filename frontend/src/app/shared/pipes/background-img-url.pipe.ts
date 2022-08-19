import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backgroundImgUrl',
})
export class BackgroundImgUrlPipe implements PipeTransform {
  transform(value: string): string {
    return `url(https://source.unsplash.com/${value})`;
  }
}
