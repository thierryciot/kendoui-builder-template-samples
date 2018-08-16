import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgUrlComponent } from './img-url.component';

describe('ImgUrlComponent', () => {
  let component: ImgUrlComponent;
  let fixture: ComponentFixture<ImgUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
