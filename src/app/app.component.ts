import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VoiceToTextComponent } from "./voice-to-text/voice-to-text.component";
import { TextToVoiceComponent } from './text-to-voice/text-to-voice.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VoiceToTextComponent, TextToVoiceComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '';
}

