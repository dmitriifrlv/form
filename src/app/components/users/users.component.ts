import { Component, OnInit } from '@angular/core';
import { SignUpService } from "../../services/sign-up.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users=[]

  constructor(private usersService:SignUpService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onDeleteAUser(id){
    this.users = this.users.filter(user=>user.id !== id)
    this.usersService.deleteAUser(id).subscribe()
  }
}
