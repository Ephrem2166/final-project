import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditApiService } from '../services/reddit-api.service';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-savedposts',
  templateUrl: './savedposts.component.html',
  styleUrls: ['./savedposts.component.css']
})
export class SavedpostsComponent implements OnInit {

  saved: any;
  posts = [];

  constructor(private route: ActivatedRoute, private api: RedditApiService, private router: Router) { }

  ngOnInit() {
    this.getSavedPosts(this.route.snapshot.params['id']);
  }

  getSavedPosts(id) {
    this.api.getSaved(id)
      .subscribe(data => {
        //this.saved = data;
        this.saved = this.getIDs(data);
        console.log(this.saved);
      });
  }

  getIDs(data) {
    for (var i = 0; i < data.length; i++) {
        this.getPostDetails(data[i].post_id);
    }
  }

  getPostDetails(id) {
    console.log(id);
    this.api.getPost(id)
      .subscribe(data => {
        console.log(data);
        this.posts.push(data);
      });
  }

}
