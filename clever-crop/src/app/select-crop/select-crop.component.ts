
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-select-crop',
  templateUrl: './select-crop.component.html',
  styleUrls: ['./select-crop.component.scss']
})

export class SelectCropComponent {
  items = ["Kyle","Eric","Bailey", "Deborah", "Glenn", "Jaco", "Joni", "Gigi"]

  searchText = '';
  title = 'Select Crop';
  pictures = [
    {
      id: 1,
      title: 'Corn',
      img: './assets/crops-images/corn.jpg'
    },
    {
      id: 2,
      title: 'Lentil',
      img: './assets/crops-images/corn.jpg'
    },
    {
      id: 3,
      title: 'Rice',
      img: './assets/crops-images/corn.jpg'
    },
    {
      id: 4,
      title: 'Soy',
      img: './assets/crops-images/corn.jpg'
    },
  ];

  @ViewChild('searchbar') searchbar: ElementRef;

  toggleSearch = false;
  constructor() {

  }

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }
}
