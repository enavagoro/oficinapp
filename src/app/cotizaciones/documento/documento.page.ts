import { Component, OnInit } from '@angular/core';
import { ModalController ,NavParams ,AlertController } from '@ionic/angular';
import { EmailService } from '../../_servicios/email.service';
import { CotizacionService } from '../../_servicios/cotizacion.service';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.page.html',
  styleUrls: ['./documento.page.scss'],
})
export class DocumentoPage implements OnInit {
  doc = "http://178.128.71.20:3950/";
  email = "";
  creado = false;
  data = [];
  constructor(private cotiService : CotizacionService, private modalCtrl : ModalController , private emailService : EmailService,private navParams : NavParams,private alertController : AlertController) {
    var ps = navParams.get("docto");
    var datos = navParams.get('datosPdf');
    var emitido = navParams.get('emitido');
    if(emitido){
      this.creado = true;
    }
    this.email= datos['contactoCliente'];
    this.data = datos;
    if(datos){
      console.log(datos);
    }
    if(ps){
      this.doc += ps;
    }
  }

  ngOnInit() {
  }
  volver(){
    this.modalCtrl.dismiss();
  }
  async alertPrompt() {
      var self = this;
      const alert = await this.alertController.create({
        header: 'Enviar correo',
        subHeader : 'Para enviar un correo a multiples receptores, separar las direcciones de correos con coma (",")',
        inputs: [
          {
            name: 'correo',
            type: 'text',
            value : self.email,
            label: 'Correo de destino',
            placeholder: 'Correo: ej : corellanajara@hotmail.com'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Enviar',
            handler: (data) => {
              if(data && data['correo']){
                let correo = data['correo'];
                console.log(data['correo']);

                self.sendEmail(correo,self.data);
              }else{
                console.log("no puede ser vacio");

              }
            }
          }
        ]
      });
      await alert.present();
    }
    sendEmail(to,datos){
      datos.fechaEmision = datos.fechaEmision.split("T")[0];
      datos.fechaCaducidad = datos.fechaCaducidad.split("T")[0];
      let subject = "Cotización realizada por "+datos.nombreEmpresa
      let mess = 'Esta cotización ha sido enviada de forma automatica por <a href="jazmin.vase.cl" >jazmín</a><br>';
      mess += 'Informate <a href="vase.cl/jazmin">aquí</a> ';
      var correo = {email:to,attachments:"si",nombreArchivo:"Cotizacion.pdf",path:this.doc,subject:subject,message:mess}
      this.emailService.enviar(correo).subscribe(d=>{
        console.log(d);
      });
      this.cotiService.insertar(datos).subscribe(inserted=>{
        console.log(inserted);
      })

    }
}
