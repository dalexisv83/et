# Entertainment Tool Revamp
[Entertainment Tool on AAC Source Code Repository]

## Overview

The revamp of Entertainment Tool is written using [AngularJS]. It is a has a two tiered tabbed layout with the top tier mostly* listing premium packages and the second tier categorizing and displaying selling points and other miscellaneous information.

*The Calendar tab lists Movie and Series data across all premium packages, filterable by various metadata. 

## Goals

  - Easier content maintenance
  - Faster performance
  - Less prone to caching issues
  - Updated presentation and enhanced UX
  - Robust, filterable Movie/Series listings

## Datasource

### Premiums

### Subtabs

### Selling Points

### Objections

### Disclosures

### Listings

## To Do's

  - ~~Active Tabs~~
	  - Completed: 1/12 - [add6e72]
  - ~~Fix programming type filter~~
	  - Completed: 1/13 - [ddc1a89]
  - ~~Fluid Now Playing images on IE 11~~
	  - Completed: 1/13 - [d2d00b4]
  - ~~Revert to old QL script~~
	  - Completed: 1/14
  - ~~Same name program modal issue~~
	  - Completed: 1/14 - [538d57c]
  - Additional Calendar info
  - IE styling (CSS3PIE)
  - Calendar item limit (for IE8 performance)
  - Add Competitive Streaming Services data to spreadsheet/parser
	  - Possibly Cinema pricing as well
  - Back Button in IE (When previous subtab is not available in new top tier tab)
  - Script error for slideshow plugin
	  - Short term fix: debug plugin
	  - Long term fix: Angular based slideshow/carousel (no vendor plugin)
  - Hide Now Playing view if no programming is available
  - Helpful Links layout/style (Line breaks are awkward)
  - Datepicker init issues
  - Apply date range filter to start date
  - Responsive Layout
  - Channel counts disclaimer ("Never discuss exact channel counts")
  - Sticky header (esp for calendar tab)
  - Price info -> Pricing Tab link for Cinema
  - Modal close on escape keypress

[//]: # (COMMIT LINKS)
[add6e72]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/commit/add6e727af9462815f0b64a918a9b9daf30f0a89
[ddc1a89]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/commit/ddc1a89e48819435d3edc0c893a14df33f943e60
[d2d00b4]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/commit/d2d00b4a5e8974344b4824b320de03d6ab91c6f9
[538d57c]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/commit/538d57c74e12ba4b1e77ece674d9fb4c21bc6872

[//]: # (HYPERLINK DEFINITIONS)
[Entertainment Tool on AAC Source Code Repository]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/
[AngularJS]: https://angularjs.org/ "AngularJS"