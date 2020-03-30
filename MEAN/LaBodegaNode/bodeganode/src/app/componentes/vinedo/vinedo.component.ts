import { Component, OnInit } from '@angular/core';
import Cultivos from 'src/app/Cultivos';
import { CultivosService } from 'src/app/servicios/cultivos.service';

@Component({
  selector: 'app-vinedo',
  templateUrl: './vinedo.component.html',
  styleUrls: ['./vinedo.component.css']
})
export class VinedoComponent implements OnInit {

  cultivos : Cultivos[];

  constructor(private c: CultivosService) { }

  ngOnInit() {
    document.body.classList.add('masthead');
    //document.body.style.backgroundImage = "https://images.unsplash.com/photo-1525377411535-0cacd7ffe6fb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fad61054be723285bf879a0fbf1c6350&auto=format&fit=crop&w=2134&q=80";
    this.c
        .getCultivos()
        .subscribe((data: Cultivos[])=>{
          this.cultivos = data;
        });
  }

}
