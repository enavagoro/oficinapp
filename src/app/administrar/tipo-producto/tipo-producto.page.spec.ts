import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipoProductoPage } from './tipo-producto.page';

describe('TipoProductoPage', () => {
  let component: TipoProductoPage;
  let fixture: ComponentFixture<TipoProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoProductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipoProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
