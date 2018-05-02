import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { P3kPage } from '../p3k/p3k';
import { StatsPage } from '../stats/stats';
import { HelpPage } from '../help/help';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = P3kPage;
  tab3Root = StatsPage;
  tab4Root = HelpPage;

  constructor() {

  }
}
