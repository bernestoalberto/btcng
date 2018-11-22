import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiceHashComponent } from './nicehash.component';

describe('NiceHashComponent', () => {
  let component: NiceHashComponent;
  let fixture: ComponentFixture<NiceHashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiceHashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiceHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
