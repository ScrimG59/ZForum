import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateThread } from 'src/models/CreateThread';
import { ThreadService } from 'src/services/thread.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {

  threadForm: FormGroup;
  userSubmitted: boolean = false;
  newThread: CreateThread = new CreateThread();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private threadService: ThreadService,
              private tokenService: TokenService,
              private location: Location) { }

  ngOnInit() {
    this.createThreadForm();
  }

  createThreadForm() {
    this.threadForm = this.formBuilder.group({
      Title: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      Content: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit() {
    this.userSubmitted = true;

    if(this.threadForm.valid){
      this.userSubmitted = false;
      this.newThread = {
        Title: this.Title.value,
        Content: this.Content.value,
        UserId: this.tokenService.getInfo().Id,
        CreationDate: Date().toLocaleString().split('GMT')[0]
      }
      this.threadForm.reset();
      this.threadService.addThread(this.newThread).subscribe((data:number) => {
        this.router.navigate([`/thread/detail/${data}`]);
      })
    }
  }

  onBack() {
    this.location.back();
  }

  // ------------------------------------
  // Getter-methods for all form controls
  // ------------------------------------

  get Title() {
    return this.threadForm.get('Title') as FormControl;
  }

  get Content() {
    return this.threadForm.get('Content') as FormControl;
  }

  // ------------------------------------

  // ------------------------------------
  // Helper-methods
  // ------------------------------------
  isValid(): boolean {
    if(this.threadForm.valid){
      return true;
    }
    return false;
  }
  // ------------------------------------
}
