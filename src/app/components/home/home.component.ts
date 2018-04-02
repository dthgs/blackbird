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

    console.log("Mining block 1...");
    this.coin.addBlock(new Block(1, new Date(), { coins: 10 }));
    
    console.log("Mining block 2...");
    this.coin.addBlock(new Block(2, new Date(), { coins: 42 }));

    console.log(JSON.stringify(this.coin, null, 4));
    console.log("Is chain valid? " + this.coin.checkChain());
    this.coin.chain[1].data = { coins: 1000 };
    console.log("Is chain valid? " + this.coin.checkChain());
  }

  ngOnInit() {
    console.log("ngOnInit ran");
    console.log(crypto.SHA256("MSG"));
  }

  hashString(s) {
    this.hashOutput = crypto.SHA256(this.hashInput);
  }
}