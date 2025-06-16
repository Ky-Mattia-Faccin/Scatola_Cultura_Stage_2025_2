import {
  animate,
  query,
  style,
  transition,
  trigger,
  group,
} from '@angular/animations';

export const slideAnimation=trigger('slideTransition', [
  transition('* => *', [

    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        top: '7.2vh',
        left: 0,
      })
    ], { optional: true }),
    //fa le animazioni in contemporanea
    group([

      query(':leave', [
        animate('500ms ease', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ], { optional: true }),


      query(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('800ms ease', style({ transform: 'translateY(0)', opacity: 1 }))
      ], { optional: true })
    ])
  ])
]);