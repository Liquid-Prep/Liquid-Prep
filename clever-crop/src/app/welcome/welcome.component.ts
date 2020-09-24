import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

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

  ngOnInit(): void {
  }

  public onGetStarted(){
    this.router.navigate(['my-crops']);
  }

  public onIndexChange(index: number): void {
  }

  public onSwiperEvent(event: string): void {
  }
}
