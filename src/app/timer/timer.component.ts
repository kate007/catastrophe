import { Component, OnInit } from '@angular/core';
import { Subscription,  timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  ticks = 60*60*4;
    
  minutesDisplay: number = 0;
  hoursDisplay: number = 0;
  secondsDisplay: number = 0;

  sub: Subscription;

  constructor() { }

  ngOnInit() {
    this.startTimer();
  }

  private startTimer() {

    let mytimer = timer(0,1000).pipe(
      take(this.ticks),
      map(() => --this.ticks)
    );;
    this.sub = mytimer.subscribe(
        t => {
            this.ticks = t;            
            this.secondsDisplay = this.getSeconds(this.ticks);
            this.minutesDisplay = this.getMinutes(this.ticks);
            this.hoursDisplay = this.getHours(this.ticks);
        }
    );
}

private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
}

private getMinutes(ticks: number) {
     return this.pad((Math.floor(ticks / 60)) % 60);
}

private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 60) / 60));
}

private pad(digit: any) { 
    return digit <= 9 ? '0' + digit : digit;
}

}
