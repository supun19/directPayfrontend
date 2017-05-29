import {Component, OnInit, Input} from '@angular/core';

import {AgentService} from './agent.service'
import {Merchant} from "../../../class/merchant";

import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { Logger } from "angular2-logger/core";
@Component({


  selector:'agent',
  templateUrl:'./agent.component.html',
  providers:[AgentService]

})

export class AgentComponent implements OnInit{

  data;
  filterdata;
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "email";
  sortOrder = "asc";
  merchantqrcode = false;
  merchantId="";
  type="";
  todate;
  fromdate;
  role ="merchant";
  filtering ={"fromdate":this.fromdate,"todate":this.todate}
  agents;
  agentId;

  day = false;
  daytoday =false;

  //selectedDate = "2017-09-11";
  private selectedDate: Object = { date: { year: 2016, month: 10, day: 9 } };
  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    markCurrentDay:true,
    todayBtnTxt:'Today',

  };
  up;

  constructor(private agentService: AgentService,private _logger: Logger) {

  }
  ngOnInit() {
    //initiate current date
    this.initiateDate();
    this.agentService.getAgents(this.role).then(
      (data) =>{

        if(data.data != null){
          this._logger.debug("AgentComponent:agent List response",data);
          console.log(data.data);
          this.agents = data.data[0].Resources;

          console.log(this.agents);

        }
        else {
          this._logger.debug("error","network network error");
        }

      }
    );
  }

  initiateDate(){
     let date  = new Date();
     var currentdate ={
        date:{
          year : date.getFullYear(),
          month :date.getMonth()+1,
          day : date.getDate()

        }

      }
      this.selectedDate = currentdate;
     this.fromdate = currentdate.date;
    this.todate = currentdate.date;

  }

  showQrcode(merchant:Merchant){


    this.merchantId=merchant.merchantId;
    this.merchantqrcode = true;
  }
  onDateChangedTo(event: IMyDateModel) {

      this.todate =  event.date;


  }
  onDateChangedFrom(event: IMyDateModel) {

    this.fromdate = event.date;
    console.log(event.date);

  }
  selectType(){
    this._logger.error('This is a priority level 1 error message...'+this.type);
    this._logger.debug('tyoe ',""+this.type)
  }

  getAgentTransaction(){
    if(+this.type == 0){
      console.log("day");
      console.log("fromdate:"+this.fromdate);
      console.log("agentId"+this.agentId);
      this.nextDate();
      this.getByDateToDate()

    }
    if(+this.type == 1){
      console.log("daytoday");
      console.log("fromdate:"+this.fromdate+"--todate"+this.todate);
      console.log("agentId"+this.agentId);
      this.getByDateToDate()
    }

  }
  filterDate(){
    if(+this.type == 0){

      console.log("Day")
      this.day = true;
      this.daytoday =false;

    }
    if(+this.type == 1){
      console.log("DayToDay")
      this.day = true;
      this.daytoday =true;
    }

  }
  getByDateToDate(){
    console.log("getByDAteToDate");
    this.agentService.getAgentTransactionByDateToDate(this.agentId,this.fromdate,this.todate).then((data) => {
      if(data.data != null){
        this.data = data.data;
        this.filterdata = this.data;
        console.log(this.data);

      }
      else {
        console.log(data.data);
      }
    });
    console.log(this.filterdata);


  }

  nextDate(){
    console.log(this.fromdate);
    var date = new Date(this.fromdate.year,+this.fromdate.month-1,this.fromdate.day);
    date.setDate(date.getDate()+1);
    this.todate.year = date.getFullYear();
    this.todate.month = date.getMonth()+1;
    this.todate.day = date.getDate();
    //console.log(date);
    //console.log(this.todate);

  }



}
