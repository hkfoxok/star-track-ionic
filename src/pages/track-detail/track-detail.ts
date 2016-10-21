import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import {NativeMedia} from '../../providers/native-media/native-media';
@Component({
  selector: 'page-track-detail',
  templateUrl: 'track-detail.html',
})
export class TrackDetailPage {
  track = this.params.get('track');
  progress = 0;
  @ViewChild('player') audio;
  ifPlaying = false;
  constructor(
    public nav: NavController,
    public params: NavParams,
    public events: Events,
    public nativeMedia: NativeMedia
  ) {}
  ionViewWillLeave() {
    this.stopSong();
  }
  toggleSong() {
    if (this.ifPlaying) {
      this.stopSong();
    } else {
      this.playSong();
    }
  }

  playSong() {
    this.nativeMedia.createMediaControls(this.track);
    this.ifPlaying = true;
    this.audio.nativeElement.play();
  }
  stopSong() {
    this.nativeMedia.destroy();
    this.ifPlaying = false;
    this.audio.nativeElement.currentTime = 0;
    this.audio.nativeElement.pause();
  }
  setProgress() {
    this.progress = Math.round((this.audio.nativeElement.currentTime / this.audio.nativeElement.duration) * 100);
  }

  playerEnded() {
    this.ifPlaying = false;
    this.nativeMedia.destroy();
    this.audio.nativeElement.currentTime = 0;
  }

}
