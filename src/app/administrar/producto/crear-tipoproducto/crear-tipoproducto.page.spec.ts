import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearTipoproductoPage } from './crear-tipoproducto.page';

describe('CrearTipoproductoPage', () => {
  let component: CrearTipoproductoPage;
  let fixture: ComponentFixture<CrearTipoproductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearTipoproductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearTipoproductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
