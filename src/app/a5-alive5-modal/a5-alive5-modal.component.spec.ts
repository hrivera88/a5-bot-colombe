import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A5Alive5ModalComponent } from './a5-alive5-modal.component';

describe('A5Alive5ModalComponent', () => {
  let component: A5Alive5ModalComponent;
  let fixture: ComponentFixture<A5Alive5ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A5Alive5ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A5Alive5ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
