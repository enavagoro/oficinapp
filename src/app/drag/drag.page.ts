import { Component } from '@angular/core';
import { ITreeState, ITreeOptions } from '@circlon/angular-tree-component';
import { v4 } from 'uuid';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.page.html',
  styleUrls: ['./drag.page.scss'],
})

export class DragPage{
    mensaje = "";
    tags = [];
    sucursal = 0;
    Empresa : any;
    indice = 0;
    pasos = [];
    jerarquia = [];
    usuario : any;
    nodo : any;
    currentEvent: string = 'Listos para comenzar';
    config = {
        showActionButtons: true,
        showAddButtons: true,
        showRenameButtons: true,
        showDeleteButtons: true,
        showRootActionButtons: true, // set false to hide root action buttons.
        enableExpandButtons: true,
        enableDragging: true,
        rootTitle: 'Arbol jerarquico',
        validationText: 'Ingresa un campo correcto',
        minCharacterLength: 2,
        setItemsAsLinks: false,
        setFontSize: 32,
        setIconSize: 16
    };
    myTree = [];
    arbol = [];
    count : number = 0;
    temporalTree = [];
    constructor(
      private loadingController:LoadingController) {
    }
    volver(){
      console.log(this.pasos);
      this.pasos.pop();
      console.log(this.pasos);
      this.arbol = this.myTree;
      for(let i = 0 ; i < this.pasos.length;i++){
        this.navegaNodo(this.arbol[this.pasos[i]],this.pasos[i] ,false);
      }
      this.nodo = undefined;
      this.mensaje = "Seleciona ";
    }
    public disableAll(){
      this.config.showActionButtons = false;
      this.config.showAddButtons = false;
      this.config.showRenameButtons = false;
      this.config.showDeleteButtons = false;
      this.config.showRootActionButtons = false; // set false to hide root action buttons.
      this.config.enableExpandButtons = false;
      this.config.enableDragging = false;
    }
    public saveTree(){
      console.log(this.myTree);
      this.temporalTree = this.myTree;
      this.arbol = this.myTree;

    }

    onDragStart(event) {
       this.currentEvent = 'Capturado el comienzo';
       console.log(event);
    }
    onDrop(event) {
      this.currentEvent = 'Soltando';
      console.log(event);
    }
    onAllowDrop(event) {
      this.currentEvent = 'Permitido soltar';
    }
    onDragEnter(event) {
      this.currentEvent = 'Entra a tomar';
    }
    onDragLeave(event) {
      this.currentEvent = 'Sale del tomar';
    }
    onAddItem(event) {
      this.currentEvent = 'Añadiendo un item';
      console.log(event);
    }
    onStartRenameItem(event) {
      this.currentEvent = 'Editando';
    }
    onFinishRenameItem(event) {
      this.currentEvent = 'Termina edicion';
    }
    onStartDeleteItem(event) {
      console.log('start delete');
      this.currentEvent = 'Comienza a borrar';
    }
    onFinishDeleteItem(event) {
      console.log('finish delete');
      this.currentEvent = 'Borrado ';
    }
    onCancelDeleteItem(event) {
      console.log('cancel delete');
      this.currentEvent = 'Cancelar borrado';
    }
    public seleccionaNodo(nodo,indice){
      nodo.selected = true;
      this.count++;
      setTimeout(() => {
        if (this.count == 1) {
          this.count = 0;
          console.log("hice click en selecciona",nodo);
          this.mensaje = "Seleccionado "+nodo.name;
          this.nodo = nodo;
          this.sucursal = nodo.id;
        }if(this.count > 1){
          this.count = 0;
          this.navegaNodo(nodo,indice,true);
        }
      }, 250);

    }

    navegaNodo(nodo,indice,aumentaConteo){
      console.log(this.arbol);

      if(this.arbol[indice].childrens && this.arbol[indice].childrens.length > 0){
        console.log("navegado")
        this.indice++;
        this.arbol = this.arbol[indice].childrens;
        if(aumentaConteo){
          this.pasos.push(indice);
        }
        console.log("indice",this.pasos);
      }else{
        this.seleccionaNodo(nodo,indice);
      }
    }
    getLastSelected(){
      this.tags = [];
      for(var nodo of this.myTree){
        this.navigateLastSelected(nodo);
      }
      console.log("tags!",this.tags);
      return this.tags;
    }
    checkIfChildrenIsTrue(nodo){
      var notSelectedChildrens = false;
      if(nodo.childrens){
        for(var children of nodo.childrens){
            if(children.selected){
              notSelectedChildrens = true;
            }
        }
      }
      return notSelectedChildrens;
    }
    navigateLastSelected(nodo){
      if(nodo.selected && nodo.childrens.length == 0){
        this.tags.push(nodo.name);
      }else if(nodo.selected && !this.checkIfChildrenIsTrue(nodo)){
        this.tags.push(nodo.name);
      }else{
          for(var children of nodo.childrens){
              this.navigateLastSelected(children);
          }
      }
    }

    async cargando() {
      const loading = await this.loadingController.create({
        spinner: null,
        duration: 2000,
        message: 'Guardando jerarquia <ion-spinner></ion-spinner>',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      return await loading.present();
    }

  }
