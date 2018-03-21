import { Component, OnInit } from '@angular/core';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  hashInput: string = '';
  hashOutput: string = '';

  constructor() {
    console.log("constructor ran");
  }

  ngOnInit() {
    console.log("ngOnInit ran");
    console.log(crypto.SHA256("MSG"));
  }

  hashString(s) {
    this.hashOutput = crypto.SHA256(this.hashInput);
  }

}