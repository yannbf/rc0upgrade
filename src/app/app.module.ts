import { NgModule }               from '@angular/core';
import { IonicApp, IonicModule }  from 'ionic-angular';
import { MyApp }                  from './app.component';
import { HomePage }               from '../pages/home/home';
import { TabsPage }               from '../pages/tabs/tabs';
import { ChatsPage }              from '../pages/chats/chats';
import { SignupPage }             from '../pages/signup/signup';
import { ExplorePage }            from '../pages/explore/explore';
import { WelcomePage }            from '../pages/welcome/welcome';
import { ProfilePage }            from '../pages/profile/profile';
import { WishlistsPage }          from '../pages/wishlists/wishlists';
import { ResetPasswordPage }      from '../pages/reset-password/reset-password';
import { VehicleDetailPage }      from '../pages/vehicle-detail/vehicle-detail';
import { AlertService }           from '../providers/alert/alert';
import { MessageService }         from '../providers/message/message';
import { AuthData }               from '../providers/auth-data/auth-data';
import { MockService }            from '../providers/mock.service/mock.service';
import { ElasticHeader }          from '../components/elastic-header/elastic-header';

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    VehicleDetailPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage,
    WishlistsPage,
    WelcomePage,
    ChatsPage,
    ExplorePage,
    HomePage,
    TabsPage,
    ElasticHeader
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    VehicleDetailPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage,
    WishlistsPage,
    WelcomePage,
    ChatsPage,
    ExplorePage,
    HomePage,
    TabsPage
  ],
  providers: [
    AuthData,
    AlertService,
    MockService,
    MessageService
  ]
})
export class AppModule {}
