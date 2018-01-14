import {ChangeDetectorRef, Component, Input, OnInit, AfterContentChecked, AfterViewInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {BaseComponent} from '../base.component';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.css']
})
export class AppRootComponent implements OnInit {

  public appTitle = 'Starkman CMS';
  public appLoading = false;
  public progressBarMode: string = "determinate";

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private notificationService: NotificationService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.notificationService.appLoadingChange
      .subscribe((state) => {
        this.appLoading = state
        //this.progressBarMode =  this.appLoading ? "query" : "determinate";
      });
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
  }

  ngAfterViewInit() {
  }
}
