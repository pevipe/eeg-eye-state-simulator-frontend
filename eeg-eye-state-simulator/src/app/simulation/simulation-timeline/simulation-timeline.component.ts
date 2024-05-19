import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TelegramMessagesService } from '../../telegram-messages.service';

@Component({
  selector: 'app-simulation-timeline',
  templateUrl: './simulation-timeline.component.html',
  styleUrl: './simulation-timeline.component.scss'
})
export class SimulationTimelineComponent implements OnChanges {
  playing: boolean = false;
  currentTime: number = 0;
  arrayIndex = 0;
  id = 0;
  ballPosition = 0;
  showTimeline = false;
  totalAccuracy = 0;
  sendMessage = false;
  prevArrayVal = -1;

  @Input() realData: any;
  @Input() predictedData: any;

  constructor(private telegramService: TelegramMessagesService) { }

  ngOnChanges(): void {
    if (this.realData && this.predictedData) {
      if (this.realData.length > 0 && this.predictedData.length > 0) {
        this.showTimeline = true;
        this.updateAccuracy();
      }
    }
  }
  updateAccuracy() {
    var total = 0;
    for (var i = 0; i < this.realData.length; i++) {
      if (this.realData[i] === this.predictedData[i]) {
        total++;
      }
    }
    this.totalAccuracy = Math.round(total / this.realData.length * 10000)/100;
  }

  play(): void {
    // Iniciar la reproducción
    if (!this.playing){
      this.playing = true;
      this.id = window.setInterval(() => {
        this.currentTime = Math.round((this.currentTime + 0.1) * 10) / 10; // Redondear el tiempo a un decimal
        this.updateArrayValue(); // Actualizar el valor del array cada 2 segundos
      }, 100);
    }
  }
  pause(): void {
    // Pausar la reproducción
    if (this.playing){
      this.playing = false;
      clearInterval(this.id);
    }
  }
  stop(): void{
    // Detener la reproducción
    if (this.playing){
      this.playing = false;
      clearInterval(this.id);
    }
    this.currentTime = 0;
    this.updateArrayValue();
  }

  updateArrayValue(): void {
    // Lógica para obtener el valor del array en el tiempo actual
    var index = this.currentTime / 2;
    if (index >= this.realData.length){
      this.playing = false;
      clearInterval(this.id);
      this.currentTime = this.realData.length * 2;
      this.arrayIndex = this.realData.length - 1;
      return;
    }
    this.arrayIndex = Math.floor(index);
    this.ballPosition = index/this.realData.length * 100;

    if (this.sendMessage){
      if (this.prevArrayVal !== this.predictedData[this.arrayIndex] && this.arrayIndex !== 0){
        if (this.predictedData[this.arrayIndex] === 1)
          this.telegramService.sendMessage(`Detected eye state change in time=${this.arrayIndex*2}s. Now: OPENED`).subscribe();
        else
          this.telegramService.sendMessage(`Detected eye state change in time=${this.arrayIndex*2}s. Now: CLOSED`).subscribe();
      }
    }
    this.prevArrayVal = this.predictedData[this.arrayIndex];
  }
}
