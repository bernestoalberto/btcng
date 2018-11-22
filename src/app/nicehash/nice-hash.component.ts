import { Component, OnInit } from '@angular/core';
import {HashService} from './hash.service';



@Component({
  selector: 'app-nicehash',
  templateUrl: './nice-hash.component.html',
  styleUrls: ['./nice-hash.component.css'],
  providers: [HashService]
})
export class NiceHashComponent implements OnInit {

  constructor(private niceService: HashService) { }

  ngOnInit() {
   this.getApiInfo();
  }
  getApiInfo() {
  this.niceService.getApiVersion();
  }

}
