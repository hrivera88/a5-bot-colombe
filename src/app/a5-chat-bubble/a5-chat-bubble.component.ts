import { Component, OnInit, Input, OnChanges } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  useAnimation
} from "@angular/animations";
import { fadeInAnimation } from "../animations";

@Component({
  selector: "a5-chat-bubble",
  templateUrl: "./a5-chat-bubble.component.html",
  styleUrls: ["./a5-chat-bubble.component.css"],
  animations: [
    trigger("bubbleState", [
      state("user", style({})),
      state("agent", style({})),
      transition("void => agent", [
        useAnimation(fadeInAnimation, {
          params: {
            delay: "0ms",
            from: 0,
            to: 1,
            startingPoint: "-150%",
            endingPoint: "0",
            time: "1s"
          }
        })
      ]),
      transition("void => user", [
        useAnimation(fadeInAnimation, {
          params: {
            delay: "0ms",
            from: 0,
            to: 1,
            startingPoint: "150%",
            endingPoint: "0",
            time: "1s"
          }
        })
      ])
    ])
  ]
})
export class A5ChatBubbleComponent implements OnInit, OnChanges {
  @Input() userMessage: boolean;
  @Input() messageContent: string;
  @Input() name: string;
  bubbleType: string;

  constructor() {}

  ngOnInit() {
    console.log(this.userMessage);
    if (this.userMessage) {
      this.bubbleType = "user";
    } else {
      this.bubbleType = "agent";
    }
  }

  ngOnChanges() {}
}
