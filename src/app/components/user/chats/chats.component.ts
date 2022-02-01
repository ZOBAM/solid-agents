import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  @ViewChild('chatbox') ChatElem!: ElementRef;
  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.intervalHandle = setInterval(() => {
      this.chatService.getMessages().subscribe((resp: any) => {
        console.log(resp);
        this.propChats = resp.uniquePropChats;
        let prevChats = this.chats;
        this.chats = resp.chats;
        this.loading = false;
        if (this.activePropChatID && this.chats.length != prevChats.length) {
          this.loadChats(
            this.activeChats[0].property_id,
            this.activePropChatIndex,
            this.receiverID
          );
          console.log('this is not the first load');
        }
      });
    }, 10000);
  }
  ngOnDestroy() {
    clearInterval(this.intervalHandle);
    alert('destroying component');
  }
  intervalHandle: any;
  chats: any;
  loading = false;
  propChats: any;
  propChat: any;
  activePropChatID = 0;
  activePropChatIndex = 0;
  activeChats: any;
  receiverID = 0;
  loadChats(property_id: number, index: number, chatter_id: number) {
    //alert(property_id);
    this.activePropChatIndex = index;
    this.propChat = this.propChats[index];
    this.activePropChatID = this.propChat.id;
    this.activeChats = this.chats.filter((chat: any) => {
      return (
        chat.property_id == property_id &&
        (chat.sender_id == chatter_id || chat.receiver_id == chatter_id)
      );
    });
    /* console.log('active chats');
    console.log(this.activeChats); */
    this.receiverID =
      this.authService.currentUser.id != this.propChat.sender_id
        ? this.propChat.sender_id
        : this.propChat.receiver_id;
    console.log(
      `receiver id is ${this.receiverID} while sender id is ${this.authService.currentUser.id}`
    );
    console.log(this.activeChats);
    // alert(this.ChatElem.nativeElement.scrollHeight);
    this.scrollToLastChat();
  }
  isSender(chat: any) {
    //for styling chats differently
    return this.authService.currentUser.id == chat.sender_id;
  }
  updateChat(newChat: string) {
    let chat = {
      chat: newChat,
      created_at: '2022-01-23T08:56:16.000000Z',
      id: 18,
      property_id: this.propChat.property.id,
      receiver_id: this.receiverID,
      sender_id: this.authService.currentUser.id,
      updated_at: '2022-01-23T08:56:16.000000Z',
      viewed: 0,
    };
    this.chats.push(chat);
    this.activeChats.push(chat);
    console.log(chat);
    this.scrollToLastChat();
  }
  scrollToLastChat() {
    setTimeout(() => {
      this.ChatElem.nativeElement.scrollTop =
        this.ChatElem.nativeElement.scrollHeight;
    }, 10);
  }
}
