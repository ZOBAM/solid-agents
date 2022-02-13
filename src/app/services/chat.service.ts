import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}
  apiURL = environment.apiUrl + '/';
  sendMessage(payload: {}) {
    return this.http.post(this.apiURL + 'messages', payload);
  }
  getMessages() {
    return this.http.get(this.apiURL + 'messages');
    //alert('about to fetch messages from server');
  }
  updateViewed(payload: any) {
    return this.http.post(this.apiURL + 'messages/update_viewed', payload);
  }
}
