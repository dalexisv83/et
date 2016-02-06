# Entertainment Tool Revamp
[Entertainment Tool on AAC Source Code Repository]

## Overview

The revamp of Entertainment Tool is primarily written using [AngularJS]. It is a has a two tiered tabbed layout with the top tier mostly* listing premium packages and the second tier categorizing and displaying selling points and other miscellaneous information.

*The Calendar tab lists Movie and Series data across all premium packages, filterable by various metadata. 

## Goals

  - Easier content maintenance
  - Faster performance
  - Less prone to caching issues
  - Updated presentation and enhanced UX
  - Robust, filterable Movie/Series listings

## Libraries

  - [AngularJS]
  - [Angular Route]
  - [jQuery]
  - [jQuery Datetimepicker]
  - [Modernizr]
  - [Moment.js]
  - [HTML5Shiv]

## Datasource

The content for Entertainment Tool is now maintained via a [Master Spreadsheet] which is updated and converted into JSON data using a [Parser].

Each sheet in the document corresponds to a root property in the JSON data. Each of those have the following properties:

### Premiums

 - **name**
 - **aacURL**
	 - The url of the premium landing page on AAC
 - **streamName**
	 - The name of the third-party streaming service included with a DIRECTV subscription
 - **streamFrag**
	 - The Fragment ID of the third party streaming service on AAC
 - **dotcomURL**
	 - The premium's landing page on DIRECTV.com
 - **premURL**
	 - The premium's proprietary website
 - **price**
 - **ODchan**
	 - The On Demand Channel for that premium
 - **logo**
	 - Filename for a premium logo. Only used if the URL encoded *name* would not suffice as the logo filename.
 - **subtabs**
	 - The subtabs that should be available for a specific premium in order. This uses the ID determined in the *subtab* sheet/object
 - **disclosures**
	 - The disclosures that should be available for a specific premium in order. This uses the ID determined in the *disclosures* sheet/object
 - **ID**
	 - Determined by the premium's row position in the spreadsheet

### Subtabs

  - **name**
  - **ID**
	  - Determined by the subtab's row position in the spreadsheet

### Channels

  - **premium**
  - **name**
  - **description**
  - **number**
  - **HD**
	  - Boolean to describe the channels HD compatibility
  - **SD**
	  - Boolean to describe the channels SD compatibility
 - **logo**
	 - Filename for a channel logo. Only used if the URL encoded *name* would not suffice as the logo filename.

### Selling Points

Entertainment tool uses several types of Selling Points. Evergreen points change infrequently and are styled as black text on a white background separated by a horizontal rule. Programming selling points have titles and are styled in an accordion with programming titles in white text on a blue background. This styling also applies to selling points regarding ordering or pricing of Cinema titles. Streaming selling points are displayed in a single column with each point bordered in blue.

  - **premium**
  - **subtab**
  - **title**
	  - Title displayed in accordion header (does not apply for evergreen selling points)
  - **point**
  - **evergreen**
	  - Boolean to determine whether the content is evergreen or not

### Objections

Objections are displayed in an accordion with titles in white text on a grey background. The responses to each objection are grouped by objection.

  - **premium**
  - **objection**
  - **response**

### Disclosures

Disclosures work similarly to objections and are displayed in an accordion with titles in white text on an orange background. The disclosures have a top level (or category) with each disclosure having several specific disclosures grouped within.

  - **lvl1**
  - **lvl2**

### Calendar/Listings

Each program in the Calendar tab listing is an object of various data

  - **program**
	  - The title of the program
  - **premium**
  - **chanName**
  - **chanNum**
  - **premDate**
  - **premTime**
  - **dayWeek**
	  - The day of the week the series episode premieres occur. Null entries flag the program as a movie. Otherwise the program is considered a series
  - **finDate**
	  - The date the series finale occurs
  - **repDate**
	  - Comma separated array of dates which a movie reruns
  - **onDemand**
  - **startOD**
  - **keyDemos**
  - **genres**
  - **starActrs**
  - **starDrctrs**
  - **starPrdcrs**
  - **description**
  - **image**
	  - Filename for a program image. Only used if the URL encoded *program* would not suffice as the image filename.

## Controllers

### MainCtrl

Handles initial routing/redirecting, scope variables for all views except Calendar.

### CalCtrl

Handles routing, getting/setting filter values to/from url params for Calendar view

## Views

### Initial view (entertainment_tool.htm)

  - HTML head
  - Logo and title header
  - Top level navigation
  - Premium or Calendar view template placeholder
  - Webtrends script

### Premium (premium.htm)

  - Second level navigation
  - Conditionally any of the partials below.
	  - Playing This Month
	  - Logo, price, channel info, useful links (currently not a partial but part of the premium view)
	  - Selling Points
	  - Objections Disclosures
	  - Titled/accordion Selling points
	  - Streaming
	  - Channels
	  - Pricing (DTV Cinema)
	  - Breakdown (Streaming)

### Calendar (calendar.htm)

  - Filter inputs
  - Filtered programs with basic data
  - Modal program drilldown with more in-depth data
  - Link to PDF of yearly series info

## Partials

### Playing This Month (playing.htm)

  - Program listing with basic data filtered by premium and programming type (set via route) displayed as a vertical carousel

### Selling Points (selling.htm)

  - List of selling points filtered by evergreen boolean, premium and subtab params

### Objections (objections.htm)

  - List of objections displayed in an accordion that expands to reveal the responses to each objection
  - List of disclosures categories displayed in an accordion that expands to reveal the specific disclosure required

### Alternate Selling Points (movieorig.htm)

  - List of titled selling points displayed in an accordion that expands to reveal more detailed information
  - There are several variations which are determined/filtered by subtab:
	  - Movies
	  - Original Programming
	  - Encore
	  - ESPN College Extra
	  - Ways To Order
	  - PPV Life Cycle

### Ordering (ordering.htm)

  - List of selling points with customized Heading

### Pricing (pricing.htm)

  - Hard coded table displaying pricing information for DIRECTV Cinema programming

### Breakdown (breakdown.htm)

  - Interactive table comparing DIRECTV with several competitive streaming services
  - Currently the data is stored in a JSON object in the MainCtrl scope.

## To Do's

  - **~~Active Tabs~~**
	  - Completed: 1/12 - [add6e72]
  - **~~Fix programming type filter~~**
	  - Completed: 1/13 - [ddc1a89]
  - **~~Fluid Now Playing images on IE 11~~**
	  - Completed: 1/13 - [d2d00b4]
  - **~~Revert to old QL script~~**
	  - Completed: 1/14
  - **~~Same name program modal issue~~**
	  - Completed: 1/14 - [538d57c]
  - **~~Finish Documentation~~**
	  - Version 1 completed: 2/5 - [7103e04]
  - **Developer comments in code**
  - **Additional Calendar info**
  - **IE styling (CSS3PIE)**
  - **Calendar item limit (for IE8 performance)**
  - **Add Competitive Streaming Services data to spreadsheet/parser**
	  - Possibly Cinema pricing as well
  - **Back Button in IE (When previous subtab is not available in new top tier tab)**
  - **Script error for slideshow plugin**
	  - Short term fix: debug plugin
	  - Long term fix: Angular based slideshow/carousel (no vendor plugin)
  - **Hide Now Playing view if no programming is available**
  - **Helpful Links layout/style (Line breaks are awkward)**
  - **Datepicker init issues**
  - **Apply date range filter to start date**
  - **Responsive Layout**
  - **Channel counts disclaimer ("Never discuss exact channel counts")**
  - **Sticky header (esp for calendar tab)**
  - **Price info -> Pricing Tab link for Cinema**
  - **Modal close on escape keypress**
  - **Premium "aside" to it's own partial**


[//]: # (HYPERLINK DEFINITIONS)
[Entertainment Tool on AAC Source Code Repository]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/
[AngularJS]: https://angularjs.org/ "AngularJS"
[Master Spreadsheet]: https://tspace.web.att.com/viewer/app/lcfiles/cddbea06-3d69-4fae-8283-7b0ad912d99f/content
[Parser]: http://vwecda05.testla.testfrd.directv.com/tools/site/EntToolParser
[Angular Route]: https://docs.angularjs.org/api/ngRoute
[jQuery]: https://jquery.com/
[jQuery Datetimepicker]: http://xdsoft.net/jqplugins/datetimepicker/
[Modernizr]: https://modernizr.com/
[Moment.js]: http://momentjs.com/
[HTML5Shiv]: https://github.com/aFarkas/html5shiv

[//]: # (COMMIT LINKS)
[add6e72]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/commit/add6e727af9462815f0b64a918a9b9daf30f0a89
[ddc1a89]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/commit/ddc1a89e48819435d3edc0c893a14df33f943e60
[d2d00b4]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/commit/d2d00b4a5e8974344b4824b320de03d6ab91c6f9
[538d57c]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/commit/538d57c74e12ba4b1e77ece674d9fb4c21bc6872
[7103e04]: http://vwecda05.testla.testfrd.directv.com/repository_list/entertainment_tool/commit/7103e044f6a654f920e41520e942610892b7ba16
