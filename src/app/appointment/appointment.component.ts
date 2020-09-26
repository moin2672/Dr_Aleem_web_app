import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { MessageService } from "../message.service";
import { Observable } from "rxjs";
import { Post } from "../appointment";
import { Router } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.css"]
})
export class AppointmentComponent implements OnInit {
  @ViewChild("nameit") private elementRef: ElementRef;

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
    this.inValidPhoneNo=false;
    console.log("ngAfterViewInit->inValidPhoneNo",this.inValidPhoneNo);
  }
  // public ngAfterViewChange():void{
  //   this.inValidPhoneNo=false;
    
  //   console.log("ngAfterViewChange->inValidPhoneNo",this.inValidPhoneNo);
  // }
  registerForm: FormGroup;
  submitted = false;
  inValidPhoneNo = false;
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ["", Validators.required],
      userPhone: ["", Validators.required],
      userAppointmentDate: ["", [Validators.required]],
      userInWhatsapp: ["", []]
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
    console.log("charArray.length",charArray.length)
    if(charArray.length<10){
      this.inValidPhoneNo=true;
    }

    // stop here if form is invalid
    if (this.registerForm.invalid || this.inValidPhoneNo) {
      return;
    }

    this.messageService.postProfile(this.registerForm.value);
    console.log(JSON.stringify(this.registerForm.value));
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    swal({
      title: "Your Appointment has been accepted.",
      text: "",
      type: "success",
      showConfirmButton: true,
      showCancelButton: false
    });
    if (this.submitted) {
      this.router.navigate(["/products"]);
      // this.registerForm.reset();
    }
  }
}
