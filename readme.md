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

  - ~~Active Tabs~~ Completed: 1/12 - [add6e72]
  - Revert to old QL script
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

[//]: # (COMMIT LINKS)
[add6e72]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/commit/add6e727af9462815f0b64a918a9b9daf30f0a89

[//]: # (HYPERLINK DEFINITIONS)
[Entertainment Tool on AAC Source Code Repository]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/
[AngularJS]: https://angularjs.org/ "AngularJS"