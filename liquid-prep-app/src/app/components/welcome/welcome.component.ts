import {Component, Inject, OnInit} from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Router, ActivatedRoute} from '@angular/router';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})


export class WelcomeComponent implements OnInit {

  private IS_FIRST_START = `first-start`;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject( LOCAL_STORAGE ) private storage: StorageService) { }

  public config: SwiperOptions = {
    a11y: {enabled: true},
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      hideOnClick: false
    },
    autoplay: {
      delay: 2000,
      stopOnLastSlide: true,
      disableOnInteraction: true,
      waitForTransition: false
    },
    speed: 500,
    longSwipesRatio: 0.1,
    longSwipesMs: 100,
    threshold: 5
  };

  public disabled = false;

  private firstStart = true;

  ngOnInit(): void {
    this.firstStart = this.storage.get(this.IS_FIRST_START);
    if (this.firstStart !== undefined){
      this.router.navigate(['my-crops']).then(r => {});
    }
  }

  public onGetStarted(){
    this.router.navigate(['my-crops']).then(r => {});
    this.storage.set(this.IS_FIRST_START, false);
  }

  public onIndexChange(index: number): void {
  }

  public onSwiperEvent(event: string): void {
  }
}
