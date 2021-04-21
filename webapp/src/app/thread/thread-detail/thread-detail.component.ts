import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/models/Thread';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/services/post.service';
import { CreatePost } from 'src/models/CreatePost';
import { AlertifyService } from 'src/services/alertify.service';

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
              private alertifyService: AlertifyService) {}

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
      Content: new FormControl(null, [Validators.required, Validators.minLength(1)])
    });
  }

  loggedIn() {
    if(localStorage.getItem('id')) {
      return this.loggedInUser = true;
    }
  }

  onSubmit() {
    if(this.loggedIn() && this.postForm.valid) {
      console.log('test');
      this.post = {
        Content: this.Content.value,
        UserId: +localStorage.getItem('id'),
        ThreadId: this.route.snapshot.params['id'],
        CreationDate: Date().toLocaleString().split('GMT')[0]
      }
      this.postService.addPost(this.post).subscribe(data => {
        window.location.reload();
      });
    }
  }


  // Helper-Methods
  get Content() {
    return this.postForm.get('Content') as FormControl;
  }
}
