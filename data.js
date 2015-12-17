var data = {
    "premiums": [{
        "id": 1,
        "name": "HBO",
        "logo": "hbo_logo.png",
        "aacURL": "agentanswercenter.directv.com",
        "dotcomURL": "directv.com/hbo",
        "premURL": "hbo.com",
        "price": "17.99",
        "ODchan": "1001",
        "channels": [{
            "name": "HBO",
            "logo": "hbo_logo.png",
            "description": "HBO has Game of Thrones",
            "HD": true,
            "SD": true
        }, {
            "name": "HBO Family",
            "logo": "hbo-family_logo.png",
            "description": "HBO Family has Honey I Shrunk the Kids",
            "HD": true,
            "SD": false
        }, {
            "name": "HBO Comedy",
            "logo": "hbo-comedy_logo.png",
            "description": "HBO Comedy is funnier than HBO Family",
            "HD": false,
            "SD": true
        }, {
            "name": "HBO West",
            "logo": "hbo-west_logo.png",
            "description": "HBO West is three hours behind",
            "HD": true,
            "SD": false
        }],
        "sellingPoints": [{
            "subtab": 1,
            "point": "HBO has the most award-winning programming on television so you're guaranteed variety and quality programming",
            "evergreen": true,
            "title": null
        }, {
            "subtab": 1,
            "point": "HBO is the #1 Premium Provider with the best Originals and biggest hit Movies you can't see anywhere else",
            "evergreen": true,
            "title": null
        }, {
            "subtab": 2,
            "point": "Exclusive studio agreements with Warner Brothers (including New Line), 20th Century Fox, Universal, Summit Studios",
            "evergreen": true,
            "title": null
        }, {
            "subtab": 2,
            "point": "HBO has variety with over 80 movie titles a month so there's something for everyone in the family. Guaranteed a new movie premiere every Saturday at 8 PM (ET)",
            "evergreen": true,
            "title": null
        }, {
            "subtab": 2,
            "point": "When millionaire James King is jailed for fraud and bound for San Quentin, he turns to Darnell Lewis to prep him to go behind bars (Comedy, Crime) (12/5)",
            "evergreen": false,
            "title": "Get Hard"
        }, {
            "subtab": 2,
            "point": "Beatrice Prior must confront her inner demons and continue her fight against a powerful alliance which threatens to tear her society apart with the help from others on her side (Adventure, Sci-Fi, Thriller) (12/12)",
            "evergreen": false,
            "title": "The Divergent Series: Insurgent"
        }],
        "objections": [{
            "category": "Price/Value",
            "responses": [
                "In-home entertainment is more affordable than going to the movies or getting movies through rental services",
                "The same amount of titles would cost over $150 a month with Red Box",
                ]
        }, {
            "category": "Too Many Repeats",
            "responses": [
                "If you missed it on HBO East, it can be seen later on another HBO network",
                "New movies debut frequently, with a guaranteed blockbuster premiere every Saturday",
                "All HBO channels air a variety of shows at different times to reduce repeats",
                "Over 20 currently running original shows, plus former hits like Flight of the Conchords air throughout the month, so there are few repeats",
                ]
        }],
        "subs": [1, 2, 3, 4, 5, 6]
    }, {
        "id": 2,
        "name": "Showtime",
        "logo": "sho_logo.png",
        "aacURL": "agentanswercenter.directv.com",
        "dotcomURL": "directv.com/sho",
        "premURL": "sho.com",
        "price": "13.99",
        "ODchan": "1021",
        "channels": [{
            "name": "Showtime East",
            "logo": "showtime_logo.png",
            "description": "Showtime East has Homeland",
            "HD": true,
            "SD": true
        },{
            "name": "Showtime Next",
            "logo": "showtime-next_logo.png",
            "description": "Showtime Next has ???",
            "HD": true,
            "SD": true
        }, {
            "name": "Showtime Beyond",
            "logo": "showtime-beyond_logo.png",
            "description": "Showtime Beyond has Buzz Lightyear",
            "HD": true,
            "SD": false
        }, {
            "name": "Showtime Extreme",
            "logo": "showtime-extreme_logo.png",
            "description": "Showtime Extreme has Tony Hawk",
            "HD": false,
            "SD": true
        }, {
            "name": "Showtime West",
            "logo": "showtime_logo.png",
            "description": "Showtime East has Homeland three hours later",
            "HD": true,
            "SD": false
        }],
        "sellingPoints": [{
            "subtab": 1,
            "point": "Showtime is cool"
        }],
        "subs": [5, 4, 3, 2, 1, 6, 8]
    }, {
        "id": 2,
        "name": "Starz",
        "subs": [1, 2, 3, 7]
    }],
    "subtabs": [{
        "id": 1,
        "name": "Overview",
        "url": "overview"
    }, {
        "id": 2,
        "name": "Movies",
        "url": "movies"
    }, {
        "id": 3,
        "name": "Original Programming",
        "url": "original-programming"
    }, {
        "id": 4,
        "name": "Streaming"
    }, {
        "id": 5,
        "name": "DIRECTV On Demand"
    }, {
        "id": 6,
        "name": "Channels"
    }, {
        "id": 7,
        "name": "Encore"
    }, {
        "id": 8,
        "name": "The Movie Channel"
    }],
    "disclosures": [{
        "id": 1,
        "lvl1": "Remind customer about the Premium Service Disconnect Fee:",
        "lvl2": [
            "\"As a reminder, our Premium Services are offered on a monthly basis. Since it hasn't been 30 days since you added the service(s), a $10 fee will be charged if you disconnect at this time.\""
        ]
    }, {
        "id": 2,
        "lvl1": "If necessary, explain benefits of keeping service for the full 30 days:",
        "lvl2": [
            "Keeping service may be less than paying fee",
            "You will continue to receive programming, rather than just paying fee"
        ]
    }]
}
