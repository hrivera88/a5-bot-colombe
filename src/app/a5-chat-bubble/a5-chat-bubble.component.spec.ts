import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A5ChatBubbleComponent } from './a5-chat-bubble.component';

describe('A5ChatBubbleComponent', () => {
  let component: A5ChatBubbleComponent;
  let fixture: ComponentFixture<A5ChatBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A5ChatBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A5ChatBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
