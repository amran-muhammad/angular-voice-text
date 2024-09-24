import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voice-to-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voice-to-text.component.html',
  styleUrl: './voice-to-text.component.scss'
})
export class VoiceToTextComponent {
  recognition: any;
  transcript: string = '';
  isListening: boolean = false;

  synth: SpeechSynthesis;
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice: SpeechSynthesisVoice | null = null;

  constructor(private ngZone: NgZone) {
    const { webkitSpeechRecognition }: any = window as any;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'en-US'; // You can change the language here
    this.recognition.continuous = false; // Whether to keep recognizing
    this.recognition.interimResults = false; // Set to true if you want partial results

    // Handle the result event
    this.recognition.onresult = (event: any) => {
      this.ngZone.run(() => {
        this.transcript = event.results[0][0].transcript;
      });
    };

    // Handle the end event
    this.recognition.onspeechend = () => {
      this.isListening = false;
      this.recognition.stop();
    };

    // Handle errors
    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      console.error(event.error);
    };

    this.synth = window.speechSynthesis;

    // Load available voices
    this.synth.onvoiceschanged = () => {
      this.voices = this.synth.getVoices();
    };
  }

  startListening() {
    this.isListening = true;
    this.recognition.start();
  }

  stopListening() {
    this.isListening = false;
    this.recognition.stop();
  }

  play(){
    if (this.transcript.trim()) {
      const utterance = new SpeechSynthesisUtterance(this.transcript);

      // Use the selected voice if available
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      // Speak the text
      this.synth.speak(utterance);
    }
  }
}

