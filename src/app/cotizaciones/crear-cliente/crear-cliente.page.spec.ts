import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearClientePage } from './crear-cliente.page';

describe('CrearClientePage', () => {
  let component: CrearClientePage;
  let fixture: ComponentFixture<CrearClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
