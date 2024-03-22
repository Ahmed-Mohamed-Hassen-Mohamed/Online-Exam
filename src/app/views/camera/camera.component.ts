import { Component, ElementRef, ViewChild } from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/library';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent {
  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  video: any;
  imageUrl!: string;
  isEditing: boolean = false;
  mouseX: number = 0;
  mouseY: number = 0;
  isDrawing: boolean = false;
  strokeColor: string = '#000000';
  lineWidth: number = 5;

  constructor() {}

  ngOnInit() {
    this.video = document.getElementById('video');

    navigator.mediaDevices
      .getUserMedia({ video: { width: 550, height: 500 }, audio: false })
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.play();
      })
      .catch((error) => {
        console.error('Error accessing the camera:', error);
      });
  }

  capture() {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the center coordinates
    const centerX = canvas.width / 2 - 275; // Adjusting for half the width of the image
    const centerY = canvas.height / 2 - 250; // Adjusting for half the height of the image

    // Draw the video frame at the center
    context.drawImage(this.video, centerX, centerY, 550, 500); // Drawing a 500x300 image

    // Convert the canvas content to a data URL
    this.imageUrl = canvas.toDataURL('image/png');
    this.scanQRCode()
  }

  qrCodeResult: string = '';
  async scanQRCode() {
    const codeReader = new BrowserQRCodeReader();
    try {
      const imageElement = document.createElement('img');
      imageElement.src = this.imageUrl;

      const result = await codeReader.decodeFromImageElement(imageElement);
      this.qrCodeResult = result.getText();
      console.log(this.qrCodeResult);

    } catch (error) {
      console.error('Error decoding QR code:', error);
      // Handle errors, e.g., display error message to the user
    }
  }

  handleMouseDown(event: MouseEvent) {
    if (this.isEditing) {
      this.isDrawing = true;
      const canvas = this.canvas.nativeElement;
      const context = canvas.getContext('2d');
      context.beginPath();
      context.moveTo(event.offsetX, event.offsetY);
    }
  }

  handleMouseMove(event: MouseEvent) {
    if (this.isEditing && this.isDrawing) {
      const canvas = this.canvas.nativeElement;
      const context = canvas.getContext('2d');
      context.lineTo(event.offsetX, event.offsetY);
      context.strokeStyle = this.strokeColor;
      context.lineWidth = this.lineWidth;
      context.stroke();
    }
  }

  handleMouseUp() {
    if (this.isEditing && this.isDrawing) {
      this.isDrawing = false;
    }
  }

  clearCanvas() {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}
