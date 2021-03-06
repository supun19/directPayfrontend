import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';



import { AppTranslationModule } from '../../app.translation.module';


import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { HotTable, HotTableModule } from 'ng2-handsontable';

import {AgentComponent} from './agent/agent.component';
import {ReportComponent} from './report.component';

import {UserComponent} from './user/user.component';

import { QRCodeModule } from 'angular2-qrcode';

import { routing } from './report.routing';

import {QrModule} from '../qr/qr.module'


import { Logger } from "angular2-logger/core";

import { MyDatePickerModule } from 'mydatepicker';
import { DateFilterPipe } from './agent/date-filter.pipe';
import {AuthGuard} from "../security/auth.guard";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    DataTableModule,
    HttpModule,
    HotTableModule,
    routing,
    QRCodeModule,
    QrModule,
    MyDatePickerModule,
    AppTranslationModule,
    NgbRatingModule



  ],
  declarations: [
    AgentComponent,
    ReportComponent,
    UserComponent,
    DateFilterPipe,



  ],
  providers:    [ Logger ]
})
export class ReportModule {}
