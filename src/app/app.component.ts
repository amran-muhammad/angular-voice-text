import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VoiceToTextComponent } from "./voice-to-text/voice-to-text.component";
import { TextToVoiceComponent } from './text-to-voice/text-to-voice.component';
import { CommonModule } from '@angular/common';
import { YoutubeComponent } from './youtube/youtube.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VoiceToTextComponent, TextToVoiceComponent, YoutubeComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '';
  youtube: string | null = "0";

  constructor(){
    if(localStorage.getItem("youtube")){
      this.youtube = localStorage.getItem("youtube")
    }
  }
}

