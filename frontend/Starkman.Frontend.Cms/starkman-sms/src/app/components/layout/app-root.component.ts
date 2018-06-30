import {ChangeDetectorRef, Component, Input, OnInit, AfterContentChecked, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {BaseComponent} from '../base.component';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppRootComponent implements OnInit {

  public appTitle = 'Starkman CMS';
  public appLoading = true;
  public progressBarMode: string = "determinate";

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private notificationService: NotificationService,
              private changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.notificationService.appLoadingChange
      .subscribe((state) => {
        if (this.appLoading != state) {
          this.appLoading = state;
          this.progressBarMode = this.appLoading ? "buffer" : "determinate";
        }
      });
  }

}
