import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Hub } from './../../models/hub.model';


@Component({
  selector: 'app-hub-create',
  templateUrl: './hub-create.component.html',
  styleUrls: ['./hub-create.component.css']
})
export class HubCreateComponent implements OnInit {

  submitted = false;
  hubForm: FormGroup;
  ip = new FormControl('', [
    Validators.required,
  ]);
  remoteId = new FormControl('');
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.hubForm = this.fb.group({
      remoteId: [''],
    });
    this.hubForm.addControl('ip',this.ip);
  }

  // Getter to access form control
  get myForm(){
    return this.hubForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.hubForm.valid) {
      return false;
    } else {
      this.apiService.getHubRemoteId(this.hubForm.controls['ip'].value).subscribe((res) => {
        this.hubForm.controls['remoteId'].setValue(res.activeRemoteId);
        this.apiService.createHub(this.hubForm.value).subscribe(
          (res) => {
            console.log('Hub successfully created!')
            this.ngZone.run(() => this.router.navigateByUrl('/hub-list'))
          }, (error) => {
            console.log(error);
        });
      }, (error) => {
          console.log(error);
      });
    }
  }
}
