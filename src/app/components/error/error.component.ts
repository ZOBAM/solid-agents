import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() errMsg: any;
  displayError(errorMsg: any){
  console.log('from error comp:');
  console.log(errorMsg);
  let msg: Map<string, any> = new Map();
  if(typeof errorMsg !== 'string'){
    console.log('From display error: ' +errorMsg.email);
    for(let m in errorMsg){
      msg.set(m,errorMsg[m])
     //msg[m] = errorMsg[m];
    }
  }

  else
  msg.set('error',errorMsg);
  return msg;
}
}
