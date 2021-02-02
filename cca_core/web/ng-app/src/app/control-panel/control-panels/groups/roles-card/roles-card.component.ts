import { Component, Input, OnInit } from '@angular/core';
import { Role } from "../../../../core/auth/role";

@Component ( {
  selector: 'cca-roles-card',
  templateUrl: './roles-card.component.html',
  styleUrls: [ './roles-card.component.scss' ]
} )
export class RolesCardComponent implements OnInit {
  @Input ()
  roleData: Role;

  constructor () {
  }

  ngOnInit () {

  }
}
