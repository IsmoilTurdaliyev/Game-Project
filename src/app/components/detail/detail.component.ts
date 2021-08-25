import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models';
import { HttpService } from '../../servises/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  gameRating = 0;
  id!: string;
  game!: Game;
  gameSub!: Subscription;
  actRouteSub!: Subscription;
  constructor(private actRoute: ActivatedRoute, private httpSrv: HttpService) { }

  ngOnInit(): void {
    this.actRouteSub = this.actRoute.params.subscribe((res: Params) => {
      this.getGameDetails(+res['id']);
    })
  }

  getGameDetails(id: number) {
    this.gameSub = this.httpSrv
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
  }
  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

}
