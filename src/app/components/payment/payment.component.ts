import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';


export interface PaymentModel {
  title: string;
  price: number;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  // template: `<div class="modal-dialog">
  //                 <div class="modal-content">
  //                 <div class="modal-header">
  //                   <button type="button" class="close" (click)="close()" >&times;</button>
  //                   <h4 class="modal-title">{{title || 'Confirm'}}</h4>
  //                 </div>
  //                 <div class="modal-body">
  //                   <p>{{message || 'Are you sure?'}}</p>
  //                 </div>
  //                 <div class="modal-footer">
  //                   <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
  //                   <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
  //                 </div>
  //               </div>
  //             </div>`,
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent extends DialogComponent<PaymentModel, boolean> implements PaymentModel {
  title: string;
  price: number;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    this.result = true;
    this.close();
  }

}
