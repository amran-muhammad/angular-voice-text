import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VoiceToTextComponent } from "./voice-to-text/voice-to-text.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VoiceToTextComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'voicetotext';
}

