import { Component, OnInit } from '@angular/core';
import * as crypto from 'crypto-js';
import {Blockchain, Block, Transaction } from '../../blockchain/coin';

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
    
    this.coin.createTx(new Transaction("addr1", "addr2", 10));
    this.coin.createTx(new Transaction("addr1", "addr2", 15));

    console.log("Starting miner!");
    this.coin.minePendingTxs("miner-wallet");
    console.log("Balance of miner is", this.coin.getBalanceOfAddr("miner-wallet"));

    console.log("Starting miner again!");
    this.coin.minePendingTxs("miner-wallet");    
    console.log("Balance of miner is", this.coin.getBalanceOfAddr("miner-wallet"));
  }

  ngOnInit() {
    console.log("ngOnInit ran");
    console.log(crypto.SHA256("MSG"));
  }

  hashString(s) {
    this.hashOutput = crypto.SHA256(this.hashInput);
  }
}