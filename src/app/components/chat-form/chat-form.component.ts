import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
})
export class ChatFormComponent implements OnInit {
  @Input() property: any;
  @Input() receiverID: any;
  @Output() newChat = new EventEmitter<string>();
  constructor(
    private chatService: ChatService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  chatForm = this.fb.group({
    message: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(500)],
    ],
  });

  get message() {
    return this.chatForm.get('message');
  }
  chat() {
    let payload = {
      propertyID: this.property.id,
      receiverID: this.receiverID,
      message: this.chatForm.value.message,
    };
    this.newChat.emit(payload.message);
    //console.log(payload)
    this.chatService.sendMessage(payload).subscribe((response: any) => {
      console.log(response);
      if (response.status == 1) {
        this.chatForm.patchValue({ message: '' });
        this.messageService.add({
          severity: 'success',
          summary: 'Message Sent',
          detail: response.message,
          life: 4000,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Message Failed',
          detail: response.message,
          life: 4000,
        });
      }
    });
  }
}
