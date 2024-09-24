import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToVoiceComponent } from './text-to-voice.component';

describe('TextToVoiceComponent', () => {
  let component: TextToVoiceComponent;
  let fixture: ComponentFixture<TextToVoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextToVoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextToVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
