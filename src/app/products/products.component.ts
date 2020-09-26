import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
NgForm
} from "@angular/forms";
import { MessageService } from "../message.service";
import { Observable } from "rxjs";
import { Order } from "../order";
import swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  productName = "";
  productAmount = 0;
  @ViewChild('closebutton') closebutton;

  onClick(packageName: string, amount: number) {
    this.productName = packageName;
    this.productAmount = amount;
    console.log(packageName, amount);
  }

  @ViewChild("nameit") private elementRef: ElementRef;

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }
  quantity1=1;
  registerForm: FormGroup;
  submitted = false;
  inValidPhoneNo=false;
 
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ["", Validators.required],
      userPhone: ["", Validators.required],
      userInWhatsapp: ["", []],
      quantity: ["1", Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    let charArray:string[] = this.registerForm.value.userPhone.split('');
    // console.log(charArray);
    this.inValidPhoneNo=false;
    for(var i=0;i<charArray.length;i++){
      //console.log(charArray[i] + "-->" + Number.isInteger(charArray[i]));
      if(!(Number.isInteger(Number(charArray[i])))){
        
        this.inValidPhoneNo=true;
        break;
      }
    }
    
    if(charArray.length<10){
      this.inValidPhoneNo=true;
    }

    // stop here if form is invalid
    if (this.registerForm.invalid || this.inValidPhoneNo) {
      return;
    }


    console.log(this.registerForm.value.userName);
    console.log(this.productName);

    this.messageService.postProduct({
      userName: this.registerForm.value.userName,
      userPhone: this.registerForm.value.userPhone,
      userInWhatsapp: this.registerForm.value.userInWhatsapp,
      product: this.productName,
      amount: this.productAmount,
      quantity: this.registerForm.value.quantity,
    });
    //console.log(JSON.stringify(this.registerForm.value));
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))

    swal({
      title: "Your Order has been placed successfully.",
      text: "",
      type: "success",
      showConfirmButton: true,
      showCancelButton: false
    });

    if (this.submitted) {
    //   if (this.registerForm.valid) {
    //   console.log("Form Submitted!");
    //   this.registerForm.value.userName.reset();
    //   this.registerForm.markAsPristine();
    //   this.registerForm.value.userName.markAsUntouched();
    //   this.registerForm.value.userName.updateValueAndValidity();
    // }
      this.registerForm.reset();
     // this.router.navigate(["/products"]);
     
      this.closebutton.nativeElement.click();
      // this.registerForm.reset();
    }
  }
}
