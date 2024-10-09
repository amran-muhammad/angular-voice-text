import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-to-voice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-to-voice.component.html',
  styleUrls: ['./text-to-voice.component.scss']
})
export class TextToVoiceComponent implements OnInit {
  text: string = '';
  synth: SpeechSynthesis = window.speechSynthesis;
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {}

  ngOnInit(): void {
    this.loadVoices();
    // Ensure voices are loaded across different browsers
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices();
    }
  }

  // Load available voices from the SpeechSynthesis API
  loadVoices(): void {
    this.voices = this.synth.getVoices();
    if (this.voices.length) {
      this.selectedVoice = this.voices[0]; // Set a default voice
    }
  }

  // Function to speak the text
  speak(): void {
    if (this.text.trim()) {
      const utterance = new SpeechSynthesisUtterance(this.text);
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }
      this.synth.speak(utterance);
    }
  }

  // Function to stop speaking
  stop(): void {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }
}
