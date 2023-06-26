import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdotEntryFormComponent } from './cdot-entry-form.component';

describe('CdotEntryFormComponent', () => {
  let component: CdotEntryFormComponent;
  let fixture: ComponentFixture<CdotEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdotEntryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdotEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
