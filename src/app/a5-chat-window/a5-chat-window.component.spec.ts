import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A5ChatWindowComponent } from './a5-chat-window.component';

describe('A5ChatWindowComponent', () => {
  let component: A5ChatWindowComponent;
  let fixture: ComponentFixture<A5ChatWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A5ChatWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A5ChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
