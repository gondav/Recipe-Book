import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { BackgroundImgUrlPipe } from './pipes/background-img-url.pipe';

@NgModule({
  declarations: [HeaderComponent, BackgroundImgUrlPipe],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, BackgroundImgUrlPipe],
})
export class SharedModule {}
