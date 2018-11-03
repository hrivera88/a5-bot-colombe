import { animate, animation, style, keyframes } from "@angular/animations";

export var fadeInAnimation = animation([
  style({
    opacity: "{{ from }}",
    transform: "translateX({{startingPoint}})"
  }),
  animate(
    "{{ time }} {{ delay }} ease-in-out",
    style({
      opacity: "{{ to }}",
      transform: "translateX({{endingPoint}})"
    })
  )
]);

export var fadeUpAnimation = animation([
  style({
    opacity: "{{ from }}",
    transform: "translateY({{startingPoint}})"
  }),
  animate(
    "{{ time }} {{ delay }} ease-in-out",
    style({
      opacity: "{{ to }}",
      transform: "translateY({{endingPoint}})"
    })
  )
]);

export var bounceInAnimation = animation([
  style({}),
  animate(
    "{{duration}} {{delay}} cubic-bezier(0.215, 0.61, 0.355, 1)",
    keyframes([
      style({ opacity: 0, transform: "translate3d(0, 3000px, 0)", offset: 0 }),
      style({ opacity: 1, transform: "translate3d(0, -20px, 0)", offset: 0.6 }),
      style({ transform: "translate3d(0, 10px, 0)", offset: 0.75 }),
      style({ transform: "translate3d(0, -5px, 0)", offset: 0.9 }),
      style({ transform: "translate3d(0, 0, 0)", offset: 1 })
    ])
  )
]);
