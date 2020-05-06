import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploadService } from '../../../services/file-upload.service';
import { PersonaResponse } from 'src/app/Models/FileUploads/PersonaResponse';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newForm = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    Identification: new FormControl(''),
    profileImage: new FormControl(''),
    imageFormat: new FormControl(''),
    imageName: new FormControl('')
  })

  form: FormGroup;
  empty: boolean;
  created: boolean;
  Personals: PersonaResponse[];
  loading: boolean;
  notRegistor: boolean;

  constructor( private _service: FileUploadService ) { 
  }
  
  ngOnInit()
  {
    this.empty = false;
    this.loading = true;
    this.form =  this.newForm;
    this.getAllPersonal();
  }

  prueba(e)
  {
    console.log(e)
  }

  getAllPersonal()
  {
    this._service.personalDocGetAll().subscribe((resp: PersonaResponse[]) =>{
      this.Personals = resp;
      this.loading = false;
      if(this.Personals == []){
        this.notRegistor = true;
      }
    })
  }

  //#region formulario creacion

  onSubmit()
  {
    try{
      if(this.form.valid)
    {
      this._service.postPersonalDocument(this.form.value)
                    .subscribe(data=> { 
                      // console.log(this.form)
                        data
                        this.created = true;
                        setTimeout(() => {
                          this.created = false;
                        }, 3000);

                        setTimeout(() => {
                          this.getAllPersonal();
                        }, 100);
                     },err=>{
                      for(let data of err.error)
                      {
                          alert(data.description);
                      }
                    });

    }else{
      this.empty = true;
      setTimeout(()=>{
        this.empty = false;
      },3000)
    }
    this.clear();
    } catch(ex)
    {
      console.log(ex);
    }
    
  }

  clear()
  {
    this.form.reset();
  }
  //#endregion

  delete(id: number)
  {
    var result = confirm("¿Desea eliminar este registro?");
    if(result == true)
    {
      this._service.delete(id).subscribe((resp: PersonaResponse) => {
        alert(`El registro '${resp.name} ${resp.lastName}' ha sido eliminado`)
        this.getAllPersonal();
      }, err => {
        for(let data of err.error)
        {
          alert(data.description);
        }
      })
    }
  }


  //#region  get base64
  uploadImg(file: FileList) {
    // console.log(file[0])
    this.form.value.imageName = file[0].name;
    this.form.value.imageFormat = file[0].name.slice(-4);
    var reader = new FileReader();
    reader.readAsBinaryString(file[0]);
    reader.onload = this.getBase64Img.bind(this); 
  }

  getBase64Img (event)
  {
    var binaryStrint = event.target.result;
    this.form.value.profileImage = btoa(binaryStrint);     
  }
  //#endregion
}
