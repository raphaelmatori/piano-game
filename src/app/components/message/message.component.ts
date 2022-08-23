import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() type: string = '';
  @Input() message: string = '';
  @Input() shouldDisplayMessage: boolean = false;
}
