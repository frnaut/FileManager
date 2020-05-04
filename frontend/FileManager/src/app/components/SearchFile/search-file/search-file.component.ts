import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PersonaResponse } from 'src/app/Models/FileUploads/PersonaResponse';

@Component({
  selector: 'app-search-file',
  templateUrl: './search-file.component.html',
  styleUrls: ['./search-file.component.css']
})
export class SearchFileComponent implements OnInit {

  searchForm = new FormGroup({
    identification: new FormControl('')
  })

  form: FormGroup;
  data: PersonaResponse;
  loading: boolean;
  notRegistor: boolean;
  constructor(private _service: FileUploadService) { 
  }
  
  ngOnInit(){
    this.form = this.searchForm;
    this.loading = false;
  }

  search()
  {

    if(this.form.valid)
    { 
      this.loading = true;
      this._service.getByIdentification(this.form.value.identification)
                    .subscribe((resp: PersonaResponse) =>{
                      this.data = resp;
                      this.loading = false;
                      this.notRegistor = false;
                    }, err => {
                      this.notRegistor = true;
                      this.loading = false;
                    })
    }
  }

}
