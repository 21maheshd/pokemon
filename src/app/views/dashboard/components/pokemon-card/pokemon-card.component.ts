import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { DashboardService } from "../../dashboard.service";
import { Pokemon } from "./Pokemon";

@Component({
  selector: "app-pokemon-card",
  templateUrl: "./pokemon-card.component.html",
  styleUrls: ["./pokemon-card.component.scss"],
})
export class PokemonCardComponent {
  description: string;
  @Input("data") data: Pokemon;
  @Input("isDetailsView") isDetailsView: false;
  @Input("descriptionData") descriptionData: any;
  constructor(private dashoboardService: DashboardService, private router: Router) {}

  ngOnInit() {
    this.initData();
  }
  initData() {
    console.log("data ", this.data);
    if (this.isDetailsView) {
      this.dashoboardService
        .getPokemonSpecies(this.data.id)
        .subscribe((res: any) => {
          console.log("description ", res);
          this.description = res.flavor_text_entries[0]["flavor_text"].replace(
            /\f/,
            ""
          );
        });
    }
  }

  goToDetails(id){
    this.router.navigate(['/dashboard/details/' + id])
  }
}
