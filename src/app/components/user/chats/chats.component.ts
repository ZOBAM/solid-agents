import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  @ViewChild('chatbox') ChatElem!: ElementRef;
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchData();
    this.intervalHandle = setInterval(() => this.fetchData(), 30000);
  }
  ngOnDestroy() {
    clearInterval(this.intervalHandle);
    // alert('destroying component');
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
  lastChat: any = {};
  fetchData() {
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
    //also fetch notifications
    this.notificationService.getNotifications();
  }
  loadChats(property_id: number, index: number, chatter_id: number) {
    //alert(property_id);
    this.activePropChatIndex = index;
    this.propChat = this.propChats[index];
    this.activePropChatID = this.propChat.id;
    this.activeChats = this.chats.filter((chat: any) => {
      let check =
        chat.property_id == property_id &&
        (chat.sender_id == chatter_id || chat.receiver_id == chatter_id);
      if (check && chat.receiver_id == this.authService.currentUser.id) {
        this.lastChat = chat;
      }
      return check;
    });
    /* console.log('active chats');
    console.log(this.activeChats); */
    console.log('LAST chat');
    console.log(this.lastChat);
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
    this.propChat.new_chat_count = 0;
    //update viewed chats in the backend
    // this.notificationService.addNotification();
    this.chatService
      .updateViewed({
        chatID: this.lastChat.id,
        senderID: this.lastChat.sender_id,
      })
      .subscribe((resp) => {
        console.log(resp);
      });
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
  updateViewed(index: number) {
    console.log('Updating viewed chats.' + index);
  }
}
