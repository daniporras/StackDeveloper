import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  angForm:FormGroup;
  constructor(private fb: FormBuilder) 
  {
    this.createForm();
  }
  createForm(){
    this.angForm = this.fb.group({
      nombre_apellidos: ['', Validators.required],
      email: ['',Validators.required],
      telefono: ['', Validators.required],
      comentario: ['', Validators.required]
    });
  }
  ngOnInit() {
  }
  
}
