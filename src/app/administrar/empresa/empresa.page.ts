import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../_servicios/empresa.service';
import { LoginService } from '../../_servicios/login.service';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})

export class EmpresaPage implements OnInit {
  bandera=false;
  empresas=[];
  img: string;
  file = File = null;
  cargando : boolean = false;

  empresaTemporal = {id:'',nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',url:'',estado:true};
  public empresa  = {id:'',nombre:'',rut:'',giro:'',direccion:'',ciudad:'', comuna:'',contacto:'',url:'',estado:true};

  cargandoImagen : boolean = false;

  constructor(
              public storage : Storage,
              public login : LoginService,
              private empresaService : EmpresaService,
              public actionSheetController: ActionSheetController,
              private toastController : ToastController,
              public router: Router,
              private alertController :AlertController,) { }

  ngOnInit() {
    this.cargandoImagen = true;

    this.empresaService.getempresa(this.login.getEmpresa()).then(servicio=>{
      servicio.subscribe(e=>{
          this.empresa = e;
          console.log(this.empresa);

          console.log('antes');
          setTimeout(()=>{
          console.log('dentro');
            this.img = this.empresaService.url+"/"+this.empresa['id']+"/"+this.empresa['url'];
            this.cargandoImagen = false;
          }, 1800)

          console.log(this.empresa['url']);
          console.log(this.img);
      })
    })
  }

  async confirmarActualizar() {
      //console.log(this.producto);
      const alert = await this.alertController.create({
        header: 'Favor confirmar!',
        message: 'Estas a punto de <br><strong>Actualizar tu Empresa</strong>!!!',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              //console.log('Cancelado');
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.uploadFile(true);
            }
          }
        ]
      });

      await alert.present();
    }

  actualizarEmpresa(img){
    this.empresa.url = img;
    this.empresaService.actualizar(this.empresa,this.empresa.id).subscribe(empresa=>{
      //console.log(cliente);
      this.bandera=false;
      this.ngOnInit();
    })
  }

  cancelar(){
    this.bandera=false;
    this.ngOnInit();
    this.cancelarImg();
  }

  cancelarImg(){
    this.img = this.empresa.url;
  }

  public subirArchivo(evento){
    this.file= evento.target.files[0];
    console.log(this.file);
  }

  public leerArchivo(evento){
    if (evento.target.files && evento.target.files[0]) {
      var lector = new FileReader();

      lector.readAsDataURL(evento.target.files[0]);

      lector.onload = (evento) => { // called once readAsDataURL is completed
        console.log(evento);
        try {
          var pre = evento.target["result"];
            this.img = pre;
        } catch (error) {
            //console.log(error);

        }}
    }
    console.log('img:',this.img);
  }

  public vaciarArchivo(){
    this.file = 0;
  }

  uploadFile(actualizar){

      this.cargando = true;
      var BaseClass = function (data) {
        Object.assign(this, data);
      };
      var info = {};
      var currentTime = new Date().getTime();
      //console.log(this.file);
      if(this.file){
        var formData = new FormData();
        var timestamp = new Date();
        var tipo = this.file.name.split('.').pop();
        var name = currentTime +"."+tipo;
        Object.defineProperty(this.file, 'name', {
          writable: true,
          value: name
        });
        //console.log(this.file);
        formData.append('name',name);
        formData.append('file',this.file);

        this.empresaService.guardar(formData);

        if(actualizar){
          this.actualizarEmpresa(name);
        }
      }else{
        if(actualizar){
            this.actualizarEmpresa("Sin imagen");
        }
      }
    }
}
