import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { trigger, transition, useAnimation } from "@angular/animations";
import { fadeUpAnimation } from "../animations";

@Component({
  selector: "a5-alivepay-modal",
  templateUrl: "./a5-alive5-modal.component.html",
  styleUrls: ["./a5-alive5-modal.component.css"],
  animations: [
    trigger("modalVisibility", [
      transition(":enter", [
        useAnimation(fadeUpAnimation, {
          params: {
            delay: "700ms",
            from: 0,
            to: 1,
            startingPoint: "150%",
            endingPoint: "0",
            time: "1s"
          }
        })
      ]),
      transition(":leave", [
        useAnimation(fadeUpAnimation, {
          params: {
            delay: "500ms",
            from: 1,
            to: 0,
            startingPoint: "0",
            endingPoint: "150%",
            time: "1s"
          }
        })
      ])
    ])
  ]
})
export class A5AlivepayModalComponent implements OnInit {
  @Input()
  showModal: boolean;
  @Output()
  modalHidden = new EventEmitter();
  modalAnimation: string;
  constructor() {}

  ngOnInit() {}

  hideModal() {
    this.showModal = false;
    this.modalHidden.emit(this.showModal);
  }
}
