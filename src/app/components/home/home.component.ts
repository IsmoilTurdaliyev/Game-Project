import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../servises/http.service';
import { Game, APIResponse } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  gameList!: Array<Game>;
  sort: string = "date";
  routeSub!: Subscription;
  gameListSub!: Subscription;
  constructor(private httpSrv: HttpService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.actRoute.params.subscribe((res: Params) => {
      if (res['game-search']) this.searchGame('metacrit', res['game-search'])
      else this.searchGame('metacrit');
    })
  }

  searchGame(sort: string, search?: string) {
    this.gameListSub = this.httpSrv.getGamesList(sort, search).subscribe((res: APIResponse<Game>) => {
      this.gameList = res.results;
      console.log(res)
    })
  }

  ngOnDestroy() {
    this.gameListSub.unsubscribe()
    this.routeSub.unsubscribe()
  }

}
