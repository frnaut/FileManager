import { Component, OnInit } from '@angular/core';
import { PersonaResponse } from 'src/app/Models/FileUploads/PersonaResponse';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentsService } from 'src/app/services/documents.service';
import { DocumentModel } from 'src/app/Models/DocumentModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //#region  formularios
 

  newDocForm = new FormGroup({
    document: new FormControl(''),
    format: new FormControl(''),
    name: new  FormControl(''),
    personalidadId: new FormControl('')
  })
  //#endregion

  //#region  propiedades

  data: PersonaResponse;
  editForm: FormGroup;
  newFormDoc: FormGroup;
  edit: boolean;
  newDoc: boolean;
  edited: boolean;
  upload: boolean;
  loading: boolean;
  noRegister: boolean;
  //#endregion
  
  constructor( private _service: FileUploadService, 
              private actRouter: ActivatedRoute,
              private _document: DocumentsService,
              private _router: Router ) 
  {
    
  }

  ngOnInit() {
    // this.editForm = this.newEditForm;
    this.newFormDoc = this.newDocForm;
    this.loading = true;
    var id;
    this.actRouter.params.subscribe(resp => id = resp.id)
    this.newFormDoc.value.personalidadId = id;
    this._service.getByIdentification(id).subscribe((resp: PersonaResponse) => {
      this.data = resp;
      this.loading = false;
      this.noRegister = false;
      if(resp.documents.length <= 0)
      {
        this.noRegister = true;
      }
      
       this.editForm = new FormGroup({
        name: new FormControl(this.data.name),
        lastName: new FormControl(this.data.lastName),
        identification: new FormControl(this.data.identification),
        profileImage: new FormControl(''),
        imageFormat: new FormControl(''),
        imageNama: new FormControl('')
      });


    });
  }

  //#region Documentos
  sendDocument( id: number )
  {
    this.newFormDoc.value.personalId = id;
    // console.log(this.newFormDoc.value)
    if (this.newFormDoc.valid)
    {
      this._document.addDocument(this.newFormDoc.value).subscribe(resp => {
        // console.log(resp);
        this.upload = true;
      
        setTimeout(() => {
          this.upload = false;
        }, 3000);

        setTimeout(() => {
          this.ngOnInit();
        }, 600);
      }, err => {
        for(let data of err.error)
        {
          alert(data.description);
        }
      })

    }
  }

  deleteDocument(id: number)
  {
    var result = confirm('¿Esta seguro que desea eliminar este elemento?')
    if (result == true)
    {
      this._document.deleteDocument(id).subscribe((resp: DocumentModel) => {
        
        alert(`El registro ${resp.name} ha sido eliminado`)
        
        setTimeout(() => {
            this.ngOnInit();
        }, 400);
      }, err => {
        for(let data of err.error)
        {
          alert(data.description);
        }
      })

    }
    
  }

  uploadDoc(file: FileList) {
    // console.log(file[0])
    this.newFormDoc.value.name = file[0].name;
    this.newFormDoc.value.format = file[0].name.slice(-4);
    var reader = new FileReader();
    reader.readAsBinaryString(file[0]);
    reader.onload = this.getBase64Doc.bind(this); 
  }

  getBase64Doc (event)
  {
    var binaryStrint = event.target.result;
    this.newFormDoc.value.document = btoa(binaryStrint);     
  }
  //#endregion

  //#region Formulario Editar
  editSubmit(id: number)
  {
    console.log(this.editForm)
    if(this.editForm.valid)
    {
      this._service.put(id, this.editForm.value).subscribe( resp => {
        this._router.navigateByUrl(`/profile/${this.editForm.value.identification}`);
      },err => {
        for(let data of err.error)
        {
          alert(data.description);
        }
      } )
    }
  } 

  
  
  uploadImg(file: FileList) {
    // console.log(file[0])
    this.editForm.value.imageName = file[0].name;
    this.editForm.value.imageFormat = file[0].name.slice(-4);
    var reader = new FileReader();
    reader.readAsBinaryString(file[0]);
    reader.onload = this.getBase64Img.bind(this); 
  }

  getBase64Img (event)
  {
    var binaryStrint = event.target.result;
    this.editForm.value.profileImage = btoa(binaryStrint);     
  }
  //#endregion

  //#region activar formularios
  formNewDoc()
  {
    this.edit = false;
    this.newDoc = true;
  }
  formEdit()
  {
    this.newDoc = false;
    this.edit = true;
  }
  //#endregion
}
