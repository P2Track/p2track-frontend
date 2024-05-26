import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-order-dialog',
  templateUrl: './register-order-dialog.component.html',
  styleUrl: './register-order-dialog.component.scss'
})
export class RegisterOrderDialogComponent {

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder
  ){}

  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      estimatedDate: ['', Validators.required],
      quantity: [null, Validators.required],
      totalPrice: [null, Validators.required],
    });
  }
}
