import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-to-voice',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './text-to-voice.component.html',
  styleUrl: './text-to-voice.component.scss'
})
export class TextToVoiceComponent {
  text: string = '';
  synth: SpeechSynthesis;
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = window.speechSynthesis;

    // Load available voices
    this.synth.onvoiceschanged = () => {
      this.voices = this.synth.getVoices();
    };
  }

  // Function to speak the text
  speak() {
    if (this.text.trim()) {
      const utterance = new SpeechSynthesisUtterance(this.text);

      // Use the selected voice if available
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      // Speak the text
      this.synth.speak(utterance);
    }
  }

  // Function to stop speaking
  stop() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }
}

