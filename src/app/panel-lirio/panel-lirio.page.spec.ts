import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PanelLirioPage } from './panel-lirio.page';

describe('PanelLirioPage', () => {
  let component: PanelLirioPage;
  let fixture: ComponentFixture<PanelLirioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelLirioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PanelLirioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
