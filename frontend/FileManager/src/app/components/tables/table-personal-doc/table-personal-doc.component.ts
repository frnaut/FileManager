import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../services/file-upload.service';
import { PersonaResponse } from 'src/app/Models/FileUploads/PersonaResponse';


@Component({
  selector: 'app-table-personal-doc',
  templateUrl: './table-personal-doc.component.html',
  styleUrls: ['./table-personal-doc.component.css']
})
export class TablePersonalDocComponent implements OnInit {

  people;
  constructor( private _service: FileUploadService ) {
      
  }
  
  ngOnInit()
  {
    this._service.personalDocGetAll().subscribe((resp: PersonaResponse[]) => {
      this.people = resp;
      // console.log(this.people)
    });
  }

  delete(id: number)
  {
    var result = confirm('¿Esta seguro que desea eliminar este elemento?')
    if(result == true){
      this._service.delete(id).subscribe(resp => console.log(resp))
      alert('¡Elemento eliminado!')
    }

  }


}
