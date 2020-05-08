import { Component, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 @ViewChild('dateTime', {static:false}) dateTime;
  title = 'catastrophe';
  selectedState: string = "A";
  selectedBranch: string = "A";
  counter$: Observable<number>;
  count = 60*4;
  hours:string;
  mins:string;
  selectedDate = new Date();
  modalRef: BsModalRef;
  modalMessage:string = '';
  modalHeader:string = '';
  stateBranch = [{
    "state": "A",
    "branches": ["A", "A1"]
  },
  {
    "state": "B",
    "branches": ["B", "B1", "B2", "B3"]
  },
  {
    "state": "C",
    "branches": ["C"]
  },
  {
    "state": "D",
    "branches": ["D1", "D2"]
  }
  ]

  constructor(private http: HttpClient, private modalService: BsModalService) {
    this.counter$ = timer(0,1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
      
  }

  getHrs()
  {
    return this.count/60;
  }
  getMins()
  {
    return this.count%60;
  }
  selectState(state: string) {   
    if(this.selectedBranch != state)
    {
      //rest default branch when state changed
      let branches = this.stateBranch.filter( x => x.state == state).map( x => x.branches);
      this.selectedBranch =  branches[0][0].toString();
    }
    this.selectedState = state;
    
  }

  setSelectedBranch(branch: string) {
    this.selectedBranch = branch;
  }
  getBranches() {
    return this.stateBranch.filter(x => x.state == this.selectedState).map(x => x.branches);
  }

  scrollTo(divName:string)
  {
    const el: HTMLElement|null = document.getElementById(divName);
    if (el) {
      setTimeout(() =>
        el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'}), 0);
    }

    
  }

  getAppointment(event:any,template: TemplateRef<any> ) {
    event.stopPropagation();
    this.modalMessage = '';
    this.modalHeader = '';

    console.log(this.selectedDate);
    const data: any = {
      'datetime': this.selectedDate, 
      'branch': this.selectedBranch,
      'state' : this.selectedState
    } 
  
    if( !this.selectedDate) {
      this.modalMessage += 'Please select date.'
    }

    if( !this.selectedBranch)
    {
      this.modalMessage += 'Please select branch';
    }

    if( !this.selectedState)
    {
      this.modalMessage += 'Please select state';      
    }

    if( !this.selectedDate|| !this.selectedBranch || !this.selectedState)
    {
      this.modalHeader = "Please complete the missing details.";
      this.modalRef = this.modalService.show(template);
    } else {
      this.modalHeader = 'Thank you for making an appointment';

      const d = new Date(this.selectedDate);
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      
   
      this.modalMessage = 'Your appointment is for ' +  mo + '-' + da + '-' + ye + ' , at State ' + this.selectedState + ' Branch ' + this.selectedBranch;

    

      this.modalRef = this.modalService.show(template);
    }
    

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
