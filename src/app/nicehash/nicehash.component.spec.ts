import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NicehashComponent } from './nicehash.component';

describe('NicehashComponent', () => {
  let component: NicehashComponent;
  let fixture: ComponentFixture<NicehashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NicehashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NicehashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
