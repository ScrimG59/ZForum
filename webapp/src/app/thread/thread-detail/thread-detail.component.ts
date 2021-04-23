import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/models/Thread';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/services/post.service';
import { CreatePost } from 'src/models/CreatePost';
import { AlertifyService } from 'src/services/alertify.service';
import { TokenService } from 'src/services/token.service';
import { AuthenticationGuardService } from 'src/services/auth-guard.service';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css'],
})
export class ThreadDetailComponent implements OnInit {

  loggedInUser: boolean = false;
  thread: Thread =  new Thread();
  postForm: FormGroup;
  post: CreatePost = new CreatePost();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private postService: PostService,
              private alertifyService: AlertifyService,
              private tokenService: TokenService,
              private authenticationGuardService: AuthenticationGuardService) {}

  ngOnInit() {
    this.route.data.subscribe((data: Thread) => {
      this.thread = data['threads'];
    }, error => {
      // if there's an error, redirect to main page
      this.router.navigate(['']);
    })
    this.createPostForm();
  }

  createPostForm() {
    this.postForm = this.formBuilder.group({
      Content: new FormControl(null, [Validators.required, Validators.minLength(2)])
    });
  }

  loggedIn() {
    if(localStorage.getItem('token') && localStorage.getItem('refreshToken')) {
      return this.loggedInUser = true;
    }
  }

  onSubmit() {
    if(this.loggedIn() && this.postForm.valid) {
      this.post = {
        Content: this.Content.value,
        UserId: this.tokenService.getInfo().Id,
        ThreadId: this.route.snapshot.params['id'],
        CreationDate: Date().toLocaleString().split('GMT')[0]
      }
      this.postService.addPost(this.post).subscribe(data => {
        window.location.reload();
        this.alertifyService.success('Successfully posted!');
      });
    }
  }


  // ------------------------------------
  // Getter-methods for all form controls
  // ------------------------------------
  get Content() {
    return this.postForm.get('Content') as FormControl;
  }
  // ------------------------------------

  // ------------------------------------
  // Helper-methods
  // ------------------------------------
  isValid(): boolean {
    if(this.postForm.valid){
      return true;
    }
    return false;
  }
  // ------------------------------------
}
