import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './youtube.component.html',
  styleUrl: './youtube.component.scss'
})

export class YoutubeComponent {
  sheetData: Array<any> = [];
  sheetUrl: string | null = '';
  docUrl: string | null = 'https://docs.google.com/spreadsheets/d/1bz17durrhp71Yxh29lMpj6XnWYLjYEIovWl4PN9IMBw/edit?usp=sharing';
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sheetUrl = 'https://script.google.com/macros/s/AKfycbwWs1reQyiCMSLMvqPDmhx4PCdizmR408If5IQAoBHinSrIMHZbmT4Z1yaqr3VvBIavWg/exec';
    this.getData(this.sheetUrl)
  }

  async getData(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      this.sheetData = await response.json();
    } catch (error: any) {
      console.error(error.message);
    }
  }


  getEmbedUrl(videoUrl: string): SafeResourceUrl {
    const videoId = this.extractVideoId(videoUrl);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractVideoId(url: string): string {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }
}

