import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StarWarsService } from "app/star-wars.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  characters = [];
  activatedRoute: ActivatedRoute;
  swService: StarWarsService;
  loadedSide = "all";
  subscription;

  constructor(activatedRoute: ActivatedRoute, swService: StarWarsService) {
    this.activatedRoute = activatedRoute;
    this.swService = swService;
  }

  ngOnInit() {
    this.swService.fetchCharacters();
    this.activatedRoute.params.subscribe((params: any) => {
      this.characters = this.swService.getCharacters(params.side);
      this.loadedSide = params.side;
    });

    this.subscription = this.swService.charactersChanged.subscribe(() => {
      this.characters = this.swService.getCharacters(this.loadedSide);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
