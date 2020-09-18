import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { WelcomeComponent } from './welcome/welcome.component';
import { MyCropsComponent } from './my-crops/my-crops.component';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { AppServicesService } from './app-services.service';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

@NgModule({
  declarations: [AppComponent, WelcomeComponent, MyCropsComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
}),
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCardModule,
    SwiperModule,
    FlexLayoutModule
  ],
  providers: [
    AppServicesService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
