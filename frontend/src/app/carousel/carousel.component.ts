import { Component, Input, OnInit } from '@angular/core';

interface carouselImage{
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  @Input() images: carouselImage[] = []
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;
  @Input() indicators = true;

  selectedIndex=0;

  ngOnInit(): void {
    if (this.autoSlide){
      this.autoSlideImages();
    }
  }

  autoSlideImages(): void{
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  onNextClick(): void {
    if(this.selectedIndex === this.images.length-1){
      this.selectedIndex=0;
    }else{
      this.selectedIndex++;
    }
  }

  selectImage(index:number):void{
    this.selectedIndex = index;
  }

}
