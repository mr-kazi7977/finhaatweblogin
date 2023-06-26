import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdotEditFormComponent } from './cdot-edit-form.component';

describe('CdotEditFormComponent', () => {
  let component: CdotEditFormComponent;
  let fixture: ComponentFixture<CdotEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdotEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdotEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
