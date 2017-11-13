import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseSearchComponent } from './enterprise-search.component';

describe('EnterpriseSearchComponent', () => {
  let component: EnterpriseSearchComponent;
  let fixture: ComponentFixture<EnterpriseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
