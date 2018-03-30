import { Component, OnInit } from '@angular/core';
import * as crypto from 'crypto-js';
import {Blockchain, Block} from '../../blockchain/coin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  hashInput: string = '';
  hashOutput: string = '';
  coin = new Blockchain();

  constructor() {
    console.log("constructor ran");
    this.coin.addBlock(new Block(1, new Date(), "abc"));
    console.log(JSON.stringify(this.coin, null, 4));
  }

  ngOnInit() {
    console.log("ngOnInit ran");
    console.log(crypto.SHA256("MSG"));
  }

  hashString(s) {
    this.hashOutput = crypto.SHA256(this.hashInput);
  }
}