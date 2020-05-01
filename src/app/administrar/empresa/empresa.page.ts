import { Component, OnInit } from '@angular/core';
import { EmpresaService, Empresa } from '../../_servicios/empresa.service';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})

export class EmpresaPage implements OnInit {
  bandera=false;
  empresas=[];
  empresaTemporal = {id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',estado:0};
  public empresa : Empresa = {id:0,nombre:'',rut:'',giro:'',direccion:'',ciudad:'', comuna:'',contacto:'',estado:0};

  constructor(private empresaService : EmpresaService,
              public actionSheetController: ActionSheetController,
              private toastController : ToastController,
              public router: Router,
              private alertController :AlertController,) { }

  ngOnInit() {
    this.empresaService.listarById().then(empresa=>{
      empresa.subscribe(e=>{
        this.empresa= e;
        console.log(this.empresa);
        this.empresa=this.empresa['response'][0];
        console.log(this.empresa);
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
              this.actualizarEmpresa();
            }
          }
        ]
      });

      await alert.present();
    }

  actualizarEmpresa(){
    this.empresaService.actualizar(this.empresa.id,this.empresa).subscribe(empresa=>{
      //console.log(cliente);
      this.bandera=false;
      this.ngOnInit();
    })
  }

  cancelar(){
    this.bandera=false;
    this.ngOnInit();
  }
}
