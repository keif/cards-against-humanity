"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cards = [
    {
        "id": 1,
        "cardType": "A",
        "text": "Flying sex snakes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 2,
        "cardType": "A",
        "text": "Michelle Obama's arms.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 3,
        "cardType": "A",
        "text": "German dungeon porn.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 4,
        "cardType": "A",
        "text": "White people.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 5,
        "cardType": "A",
        "text": "Getting so angry that you pop a boner.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 6,
        "cardType": "A",
        "text": "Tasteful sideboob.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 7,
        "cardType": "A",
        "text": "Praying the gay away.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 8,
        "cardType": "A",
        "text": "Two midgets shitting into a bucket.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 9,
        "cardType": "A",
        "text": "MechaHitler.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 10,
        "cardType": "A",
        "text": "Being a motherfucking sorcerer.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 11,
        "cardType": "A",
        "text": "A disappointing birthday party.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 12,
        "cardType": "A",
        "text": "Puppies!",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 13,
        "cardType": "A",
        "text": "A windmill full of corpses.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 14,
        "cardType": "A",
        "text": "Guys who don't call.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 15,
        "cardType": "A",
        "text": "Racially-biased SAT questions.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 16,
        "cardType": "A",
        "text": "Dying.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 17,
        "cardType": "A",
        "text": "Steven Hawking talking dirty.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 18,
        "cardType": "A",
        "text": "Being on fire.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 19,
        "cardType": "A",
        "text": "A lifetime of sadness.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 20,
        "cardType": "A",
        "text": "An erection that lasts longer than four hours.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 21,
        "cardType": "A",
        "text": "AIDS",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 22,
        "cardType": "A",
        "text": "Same-sex ice dancing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 23,
        "cardType": "A",
        "text": "Glenn Beck catching his scrotum on a curtain hook.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 24,
        "cardType": "A",
        "text": "The Rapture.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 25,
        "cardType": "A",
        "text": "Pterodactyl eggs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 26,
        "cardType": "A",
        "text": "Crippling debt.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 27,
        "cardType": "A",
        "text": "Eugenics.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 28,
        "cardType": "A",
        "text": "Exchanging pleasantries.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 29,
        "cardType": "A",
        "text": "Dying of dysentery.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 30,
        "cardType": "A",
        "text": "Roofies.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 31,
        "cardType": "A",
        "text": "Getting naked and watching Nickelodeon.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 32,
        "cardType": "A",
        "text": "The forbidden fruit.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 33,
        "cardType": "A",
        "text": "Republicans.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 34,
        "cardType": "A",
        "text": "The Big Bang.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 35,
        "cardType": "A",
        "text": "Anal beads.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 36,
        "cardType": "A",
        "text": "Amputees.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 37,
        "cardType": "A",
        "text": "Men.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 38,
        "cardType": "A",
        "text": "Surprise sex!",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 39,
        "cardType": "A",
        "text": "Kim Jong-il.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 40,
        "cardType": "A",
        "text": "Concealing a boner",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 41,
        "cardType": "A",
        "text": "Agriculture.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 42,
        "cardType": "A",
        "text": "Glenn Beck being harried by a swarm of buzzards.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 43,
        "cardType": "A",
        "text": "Making a pouty face.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 44,
        "cardType": "A",
        "text": "A salty surprise.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 45,
        "cardType": "A",
        "text": "The Jews.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 46,
        "cardType": "A",
        "text": "Charisma.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 47,
        "cardType": "A",
        "text": "YOU MUST CONSTRUCT ADDITIONAL PYLONS.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 48,
        "cardType": "A",
        "text": "Panda sex.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 49,
        "cardType": "A",
        "text": "Taking off your shirt.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 50,
        "cardType": "A",
        "text": "A drive-by shooting.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 51,
        "cardType": "A",
        "text": "Ronald Reagan.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 52,
        "cardType": "A",
        "text": "Morgan Freeman's voice.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 53,
        "cardType": "A",
        "text": "Breaking out into song and dance.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 54,
        "cardType": "A",
        "text": "Jewish fraternities.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 55,
        "cardType": "A",
        "text": "Dead babies.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 56,
        "cardType": "A",
        "text": "Masturbation.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 57,
        "cardType": "A",
        "text": "Hormone injections.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 58,
        "cardType": "A",
        "text": "All-you-can-eat shrimp for $4.99.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 59,
        "cardType": "A",
        "text": "Incest.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 60,
        "cardType": "A",
        "text": "Scalping.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 61,
        "cardType": "A",
        "text": "Soup that is too hot.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 62,
        "cardType": "A",
        "text": "The &Uuml;bermensch.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 63,
        "cardType": "A",
        "text": "Nazis.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 64,
        "cardType": "A",
        "text": "Tom Cruise.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 65,
        "cardType": "A",
        "text": "Stifling a giggle at the mention of Hutus and Tutsis.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 66,
        "cardType": "A",
        "text": "Edible underpants.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 67,
        "cardType": "A",
        "text": "The Hustle.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 68,
        "cardType": "A",
        "text": "A Super Soaker&trade; full of cat pee.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 69,
        "cardType": "A",
        "text": "Figgy pudding.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 70,
        "cardType": "A",
        "text": "Object permanence.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 71,
        "cardType": "A",
        "text": "Consultants.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 72,
        "cardType": "A",
        "text": "Intelligent design.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 73,
        "cardType": "A",
        "text": "Nocturnal emissions.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 74,
        "cardType": "A",
        "text": "Uppercuts.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 75,
        "cardType": "A",
        "text": "Being marginalized.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 76,
        "cardType": "A",
        "text": "The profoundly handicapped.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 77,
        "cardType": "A",
        "text": "Obesity.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 78,
        "cardType": "A",
        "text": "Chutzpah.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 79,
        "cardType": "A",
        "text": "Unfathomable stupidity.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 80,
        "cardType": "A",
        "text": "Repression.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 81,
        "cardType": "A",
        "text": "Attitude.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 82,
        "cardType": "A",
        "text": "Passable transvestites.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 83,
        "cardType": "A",
        "text": "Party poopers.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 84,
        "cardType": "A",
        "text": "The American Dream",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 85,
        "cardType": "A",
        "text": "Child beauty pageants.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 86,
        "cardType": "A",
        "text": "Puberty.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 87,
        "cardType": "A",
        "text": "Testicular torsion.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 88,
        "cardType": "A",
        "text": "The folly of man.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 89,
        "cardType": "A",
        "text": "Nickelback.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 90,
        "cardType": "A",
        "text": "Swooping.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 91,
        "cardType": "A",
        "text": "Goats eating cans.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 92,
        "cardType": "A",
        "text": "The KKK.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 93,
        "cardType": "A",
        "text": "Kamikaze pilots.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 94,
        "cardType": "A",
        "text": "Horrifying laser hair removal accidents.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 95,
        "cardType": "A",
        "text": "Adderall&trade;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 96,
        "cardType": "A",
        "text": "A look-see.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 97,
        "cardType": "A",
        "text": "Doing the right thing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 98,
        "cardType": "A",
        "text": "The taint; the grundle; the fleshy fun-bridge.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 99,
        "cardType": "A",
        "text": "Lactation.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 100,
        "cardType": "A",
        "text": "Pabst Blue Ribbon.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 101,
        "cardType": "A",
        "text": "Powerful thighs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 102,
        "cardType": "A",
        "text": "Saxophone solos.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 103,
        "cardType": "A",
        "text": "The gays.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 104,
        "cardType": "A",
        "text": "A middle-aged man on roller skates.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 105,
        "cardType": "A",
        "text": "A foul mouth.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 106,
        "cardType": "A",
        "text": "The thing that electrocutes your abs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 107,
        "cardType": "A",
        "text": "Heteronormativity.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 108,
        "cardType": "A",
        "text": "Cuddling.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 109,
        "cardType": "A",
        "text": "Coat hanger abortions.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 110,
        "cardType": "A",
        "text": "A big hoopla about nothing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 111,
        "cardType": "A",
        "text": "Boogers.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 112,
        "cardType": "A",
        "text": "A hot mess.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 113,
        "cardType": "A",
        "text": "Raptor attacks.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 114,
        "cardType": "A",
        "text": "My collection of high-tech sex toys.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 115,
        "cardType": "A",
        "text": "Fear itself.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 116,
        "cardType": "A",
        "text": "<i>Bees?</i>",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 117,
        "cardType": "A",
        "text": "Getting drunk on mouthwash.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 118,
        "cardType": "A",
        "text": "Sniffing glue.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 119,
        "cardType": "A",
        "text": "Oversized lollipops.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 120,
        "cardType": "A",
        "text": "An icepick lobotomy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 121,
        "cardType": "A",
        "text": "Being rich.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 122,
        "cardType": "A",
        "text": "Friends with benefits.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 123,
        "cardType": "A",
        "text": "Teaching a robot to love.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 124,
        "cardType": "A",
        "text": "Women's suffrage.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 125,
        "cardType": "A",
        "text": "Me time.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 126,
        "cardType": "A",
        "text": "The heart of a child.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 127,
        "cardType": "A",
        "text": "Smallpox blankets.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 128,
        "cardType": "A",
        "text": "The clitoris.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 129,
        "cardType": "A",
        "text": "John Wilkes Booth.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 130,
        "cardType": "A",
        "text": "The glass ceiling.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 131,
        "cardType": "A",
        "text": "Sarah Palin.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 132,
        "cardType": "A",
        "text": "Sexy pillow fights.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 133,
        "cardType": "A",
        "text": "Yeast.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 134,
        "cardType": "A",
        "text": "Full frontal nudity.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 135,
        "cardType": "A",
        "text": "Parting the Red Sea.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 136,
        "cardType": "A",
        "text": "A Bop It&trade;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 137,
        "cardType": "A",
        "text": "Michael Jackson.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 138,
        "cardType": "A",
        "text": "Team-building exercises.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 139,
        "cardType": "A",
        "text": "Harry Potter erotica.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 140,
        "cardType": "A",
        "text": "Authentic Mexican cuisine.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 141,
        "cardType": "A",
        "text": "Frolicking.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 142,
        "cardType": "A",
        "text": "Sexting.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 143,
        "cardType": "A",
        "text": "Grandma.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 144,
        "cardType": "A",
        "text": "Not giving a shit about the Third World.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 145,
        "cardType": "A",
        "text": "Licking things to claim them as your own.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 146,
        "cardType": "A",
        "text": "Genghis Khan.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 147,
        "cardType": "A",
        "text": "The hardworking Mexican.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 148,
        "cardType": "A",
        "text": "RoboCop.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 149,
        "cardType": "A",
        "text": "My relationship status.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 150,
        "cardType": "A",
        "text": "Scrubbing under the folds.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 151,
        "cardType": "A",
        "text": "Porn Stars.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 152,
        "cardType": "A",
        "text": "Horse meat.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 153,
        "cardType": "A",
        "text": "Sunshine and rainbows.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 154,
        "cardType": "A",
        "text": "Expecting a burp and vomiting on the floor.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 155,
        "cardType": "A",
        "text": "Barack Obama.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 156,
        "cardType": "A",
        "text": "Spontaneous human combustion.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 157,
        "cardType": "A",
        "text": "Natural selection.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 158,
        "cardType": "A",
        "text": "Mouth herpes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 159,
        "cardType": "A",
        "text": "Flash flooding.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 160,
        "cardType": "A",
        "text": "Goblins.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 161,
        "cardType": "A",
        "text": "A monkey smoking a cigar.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 162,
        "cardType": "A",
        "text": "Spectacular abs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 163,
        "cardType": "A",
        "text": "A good sniff.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 164,
        "cardType": "A",
        "text": "Wiping her butt.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 165,
        "cardType": "A",
        "text": "The Three-Fifths compromise.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 166,
        "cardType": "A",
        "text": "Pedophiles.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 167,
        "cardType": "A",
        "text": "Doin' it in the butt.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 168,
        "cardType": "A",
        "text": "Being fabulous.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 169,
        "cardType": "A",
        "text": "Mathletes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 170,
        "cardType": "A",
        "text": "Wearing underwear inside-out to avoid doing laundry.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 171,
        "cardType": "A",
        "text": "Nipple blades.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 172,
        "cardType": "A",
        "text": "An M. Night Shyamalan plot twist.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 173,
        "cardType": "A",
        "text": "A bag of magic beans.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 174,
        "cardType": "A",
        "text": "Vigorous jazz hands.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 175,
        "cardType": "A",
        "text": "A defective condom.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 176,
        "cardType": "A",
        "text": "Skeletor.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 177,
        "cardType": "A",
        "text": "Vikings.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 178,
        "cardType": "A",
        "text": "Leaving an awkward voicemail.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 179,
        "cardType": "A",
        "text": "Teenage pregnancy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 180,
        "cardType": "A",
        "text": "Dead parents.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 181,
        "cardType": "A",
        "text": "Hot cheese.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 182,
        "cardType": "A",
        "text": "My sex life.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 183,
        "cardType": "A",
        "text": "A mopey zoo lion.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 184,
        "cardType": "A",
        "text": "Assless chaps.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 185,
        "cardType": "A",
        "text": "Riding off into the sunset.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 186,
        "cardType": "A",
        "text": "Lance Armstrong's missing testicle.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 187,
        "cardType": "A",
        "text": "Sweet, sweet vengeance.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 188,
        "cardType": "A",
        "text": "Genital piercings.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 189,
        "cardType": "A",
        "text": "Keg stands.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 190,
        "cardType": "A",
        "text": "Darth Vader.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 191,
        "cardType": "A",
        "text": "Viagra&copy;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 192,
        "cardType": "A",
        "text": "Necrophilia.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 193,
        "cardType": "A",
        "text": "A really cool hat.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 194,
        "cardType": "A",
        "text": "Toni Morrison's vagina.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 195,
        "cardType": "A",
        "text": "An Oedipus complex.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 196,
        "cardType": "A",
        "text": "The Tempur-Pedic&copy; Swedish Sleep System&trade;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 197,
        "cardType": "A",
        "text": "Preteens.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 198,
        "cardType": "A",
        "text": "Dick fingers.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 199,
        "cardType": "A",
        "text": "A cooler full of organs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 200,
        "cardType": "A",
        "text": "Shapeshifters.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 201,
        "cardType": "A",
        "text": "The Care Bear Stare.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 202,
        "cardType": "A",
        "text": "Erectile dysfunction.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 203,
        "cardType": "A",
        "text": "Keanu Reeves.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 204,
        "cardType": "A",
        "text": "The Virginia Tech Massacre.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 205,
        "cardType": "A",
        "text": "The Underground Railroad.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 206,
        "cardType": "A",
        "text": "The chronic.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 207,
        "cardType": "A",
        "text": "Queefing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 208,
        "cardType": "A",
        "text": "Heartwarming orphans.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 209,
        "cardType": "A",
        "text": "A thermonuclear detonation.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 210,
        "cardType": "A",
        "text": "Cheating in the Special Olympics.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 211,
        "cardType": "A",
        "text": "Tangled Slinkys.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 212,
        "cardType": "A",
        "text": "A moment of silence.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 213,
        "cardType": "A",
        "text": "Civilian casualties.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 214,
        "cardType": "A",
        "text": "Catapults.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 215,
        "cardType": "A",
        "text": "Sharing needles.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 216,
        "cardType": "A",
        "text": "Ethnic cleansing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 217,
        "cardType": "A",
        "text": "Emotions.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 218,
        "cardType": "A",
        "text": "Children on leashes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 219,
        "cardType": "A",
        "text": "Balls.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 220,
        "cardType": "A",
        "text": "Homeless people.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 221,
        "cardType": "A",
        "text": "Eating all of the cookies before the AIDS bake-sale.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 222,
        "cardType": "A",
        "text": "Old-people smell.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 223,
        "cardType": "A",
        "text": "Farting and walking away.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 224,
        "cardType": "A",
        "text": "The inevitable heat death of the universe.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 225,
        "cardType": "A",
        "text": "The violation of our most basic human rights.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 226,
        "cardType": "A",
        "text": "Fingering.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 227,
        "cardType": "A",
        "text": "The placenta.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 228,
        "cardType": "A",
        "text": "The Rev. Dr. Martin Luther King, Jr.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 229,
        "cardType": "A",
        "text": "Leprosy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 230,
        "cardType": "A",
        "text": "Sperm whales.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 231,
        "cardType": "A",
        "text": "Multiple stab wounds.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 232,
        "cardType": "A",
        "text": "Flightless birds.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 233,
        "cardType": "A",
        "text": "Grave robbing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 234,
        "cardType": "A",
        "text": "Home video of Oprah sobbing into a Lean Cuisine&copy;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 235,
        "cardType": "A",
        "text": "Oompa-Loompas.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 236,
        "cardType": "A",
        "text": "A murder most foul.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 237,
        "cardType": "A",
        "text": "Tentacle porn.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 238,
        "cardType": "A",
        "text": "Daddy issues.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 239,
        "cardType": "A",
        "text": "Bill Nye the Science Guy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 240,
        "cardType": "A",
        "text": "Peeing a little bit.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 241,
        "cardType": "A",
        "text": "The miracle of childbirth.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 242,
        "cardType": "A",
        "text": "Tweeting.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 243,
        "cardType": "A",
        "text": "Another goddamn vampire movie.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 244,
        "cardType": "A",
        "text": "Britney Spears at 55.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 245,
        "cardType": "A",
        "text": "New Age music.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 246,
        "cardType": "A",
        "text": "The Make-A-Wish&reg; Foundation.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 247,
        "cardType": "A",
        "text": "Firing a rifle into the air while balls deep in a squealing hog.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 248,
        "cardType": "A",
        "text": "Active listening.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 249,
        "cardType": "A",
        "text": "Nicolas Cage.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 250,
        "cardType": "A",
        "text": "72 virgins.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 251,
        "cardType": "A",
        "text": "Stranger danger.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 252,
        "cardType": "A",
        "text": "Hope.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 253,
        "cardType": "A",
        "text": "A gassy antelope.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 254,
        "cardType": "A",
        "text": "BATMAN!!!",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 255,
        "cardType": "A",
        "text": "Chivalry.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 256,
        "cardType": "A",
        "text": "Passing a kidney stone.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 257,
        "cardType": "A",
        "text": "Black people.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 258,
        "cardType": "A",
        "text": "Natalie Portman.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 259,
        "cardType": "A",
        "text": "A mime having a stroke.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 260,
        "cardType": "A",
        "text": "Classist undertones.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 261,
        "cardType": "A",
        "text": "Sean Penn.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 262,
        "cardType": "A",
        "text": "A mating display.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 263,
        "cardType": "A",
        "text": "The Holy Bible.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 264,
        "cardType": "A",
        "text": "Hot Pockets&copy;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 265,
        "cardType": "A",
        "text": "A sad handjob.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 266,
        "cardType": "A",
        "text": "Pulling out.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 267,
        "cardType": "A",
        "text": "Serfdom.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 268,
        "cardType": "A",
        "text": "Pixelated bukkake.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 269,
        "cardType": "A",
        "text": "Dropping a chandelier on your enemies and riding the rope up.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 270,
        "cardType": "A",
        "text": "Jew-fros.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 271,
        "cardType": "A",
        "text": "Waiting 'til marriage.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 272,
        "cardType": "A",
        "text": "Euphoria&trade; by Calvin Klein.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 273,
        "cardType": "A",
        "text": "The World of Warcraft.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 274,
        "cardType": "A",
        "text": "Lunchables&trade;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 275,
        "cardType": "A",
        "text": "The Kool-Aid Man.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 276,
        "cardType": "A",
        "text": "The Trail of Tears.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 277,
        "cardType": "A",
        "text": "Self-loathing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 278,
        "cardType": "A",
        "text": "A falcon with a cap on its head.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 279,
        "cardType": "A",
        "text": "Historically black colleges.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 280,
        "cardType": "A",
        "text": "Not reciprocating oral sex.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 281,
        "cardType": "A",
        "text": "Global warming.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 282,
        "cardType": "A",
        "text": "Ghosts.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 283,
        "cardType": "A",
        "text": "World peace.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 284,
        "cardType": "A",
        "text": "A can of whoop-ass.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 285,
        "cardType": "A",
        "text": "The Dance of the Sugar Plum Fairy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 286,
        "cardType": "A",
        "text": "A zesty breakfast burrito.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 287,
        "cardType": "A",
        "text": "Switching to Geico&reg;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 288,
        "cardType": "A",
        "text": "Aaron Burr.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 289,
        "cardType": "A",
        "text": "Picking up girls at the abortion clinic.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 290,
        "cardType": "A",
        "text": "Land mines.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 291,
        "cardType": "A",
        "text": "Former President George W. Bush.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 292,
        "cardType": "A",
        "text": "Geese.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 293,
        "cardType": "A",
        "text": "Mutually-assured destruction.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 294,
        "cardType": "A",
        "text": "College.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 295,
        "cardType": "A",
        "text": "Date rape.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 296,
        "cardType": "A",
        "text": "Bling.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 297,
        "cardType": "A",
        "text": "A gentle caress of the inner thigh.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 298,
        "cardType": "A",
        "text": "A time travel paradox.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 299,
        "cardType": "A",
        "text": "Seppuku.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 300,
        "cardType": "A",
        "text": "Poor life choices.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 301,
        "cardType": "A",
        "text": "Waking up half-naked in a Denny's parking lot.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 302,
        "cardType": "A",
        "text": "Italians.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 303,
        "cardType": "A",
        "text": "GoGurt&reg;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 304,
        "cardType": "A",
        "text": "Finger painting.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 305,
        "cardType": "A",
        "text": "Robert Downey, Jr.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 306,
        "cardType": "A",
        "text": "My soul.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 307,
        "cardType": "A",
        "text": "Smegma.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 308,
        "cardType": "A",
        "text": "Embryonic stem cells.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 309,
        "cardType": "A",
        "text": "The South.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 310,
        "cardType": "A",
        "text": "Christopher Walken.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 311,
        "cardType": "A",
        "text": "Gloryholes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 312,
        "cardType": "A",
        "text": "Pretending to care.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 313,
        "cardType": "A",
        "text": "Public ridicule.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 314,
        "cardType": "A",
        "text": "A tiny horse.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 315,
        "cardType": "A",
        "text": "Arnold Schwarzenegger.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 316,
        "cardType": "A",
        "text": "A stray pube.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 317,
        "cardType": "A",
        "text": "Jerking off into a pool of children's tears.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 318,
        "cardType": "A",
        "text": "Child abuse.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 319,
        "cardType": "A",
        "text": "Glenn Beck convulsively vomiting as a brood of crab spiders hatches in his brain and erupts from his tear ducts.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 320,
        "cardType": "A",
        "text": "Menstruation.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 321,
        "cardType": "A",
        "text": "A sassy black woman.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 322,
        "cardType": "A",
        "text": "Re-gifting.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 323,
        "cardType": "A",
        "text": "Penis envy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 324,
        "cardType": "A",
        "text": "A sausage festival.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 325,
        "cardType": "A",
        "text": "Getting really high.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 326,
        "cardType": "A",
        "text": "Drinking alone.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 327,
        "cardType": "A",
        "text": "Too much hair gel.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 328,
        "cardType": "A",
        "text": "Hulk Hogan.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 329,
        "cardType": "A",
        "text": "Overcompensation.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 330,
        "cardType": "A",
        "text": "Foreskin.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 331,
        "cardType": "A",
        "text": "Free samples.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 332,
        "cardType": "A",
        "text": "Shaquille O'Neal's acting career.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 333,
        "cardType": "A",
        "text": "Five-Dollar Footlongs&trade;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 334,
        "cardType": "A",
        "text": "Whipping it out.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 335,
        "cardType": "A",
        "text": "A snapping turtle biting the tip of your penis.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 336,
        "cardType": "A",
        "text": "Muhammad (Praise Be Unto Him).",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 337,
        "cardType": "A",
        "text": "Half-assed foreplay.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 338,
        "cardType": "A",
        "text": "Dental dams.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 339,
        "cardType": "A",
        "text": "Being a dick to children.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 340,
        "cardType": "A",
        "text": "Famine.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 341,
        "cardType": "A",
        "text": "Chainsaws for hands.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 342,
        "cardType": "A",
        "text": "A gypsy curse.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 343,
        "cardType": "A",
        "text": "AXE Body Spray.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 344,
        "cardType": "A",
        "text": "The Force.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 345,
        "cardType": "A",
        "text": "Explosions.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 346,
        "cardType": "A",
        "text": "Cybernetic enhancements.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 347,
        "cardType": "A",
        "text": "Customer service representatives.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 348,
        "cardType": "A",
        "text": "White privilege.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 349,
        "cardType": "A",
        "text": "Gandhi.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 350,
        "cardType": "A",
        "text": "Road head.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 351,
        "cardType": "A",
        "text": "God.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 352,
        "cardType": "A",
        "text": "Poorly-timed Holocaust jokes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 353,
        "cardType": "A",
        "text": "8 oz. of sweet Mexican black-tar heroin.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 354,
        "cardType": "A",
        "text": "Judge Judy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 355,
        "cardType": "A",
        "text": "The Little Engine That Could.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 356,
        "cardType": "A",
        "text": "Altar boys.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 357,
        "cardType": "A",
        "text": "Mr. Clean, right behind you.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 358,
        "cardType": "A",
        "text": "Vehicular manslaughter.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 359,
        "cardType": "A",
        "text": "Dwarf tossing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 360,
        "cardType": "A",
        "text": "Friction.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 361,
        "cardType": "A",
        "text": "Lady Gaga.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 362,
        "cardType": "A",
        "text": "Scientology.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 363,
        "cardType": "A",
        "text": "Justin Bieber.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 364,
        "cardType": "A",
        "text": "A death ray.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 365,
        "cardType": "A",
        "text": "Vigilante justice.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 366,
        "cardType": "A",
        "text": "The Pope.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 367,
        "cardType": "A",
        "text": "A sea of troubles.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 368,
        "cardType": "A",
        "text": "Alcoholism.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 369,
        "cardType": "A",
        "text": "Poor people.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 370,
        "cardType": "A",
        "text": "A fetus.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 371,
        "cardType": "A",
        "text": "Women in yogurt commercials.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 372,
        "cardType": "A",
        "text": "Exactly what you'd expect.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 373,
        "cardType": "A",
        "text": "Flesh-eating bacteria.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 374,
        "cardType": "A",
        "text": "My genitals.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 375,
        "cardType": "A",
        "text": "A balanced breakfast.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 376,
        "cardType": "A",
        "text": "Dick Cheney.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 377,
        "cardType": "A",
        "text": "Lockjaw.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 378,
        "cardType": "A",
        "text": "Natural male enhancement.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 379,
        "cardType": "A",
        "text": "Take-backsies.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 380,
        "cardType": "A",
        "text": "Winking at old people.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 381,
        "cardType": "A",
        "text": "Opposable thumbs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 382,
        "cardType": "A",
        "text": "Flying sex snakes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 383,
        "cardType": "A",
        "text": "Passive-aggressive Post-it notes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 384,
        "cardType": "A",
        "text": "Inappropriate yodeling.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 385,
        "cardType": "A",
        "text": "Golden showers.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 386,
        "cardType": "A",
        "text": "Racism.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 387,
        "cardType": "A",
        "text": "Copping a feel.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 388,
        "cardType": "A",
        "text": "Auschwitz.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 389,
        "cardType": "A",
        "text": "Elderly Japanese men.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 390,
        "cardType": "A",
        "text": "Raping and pillaging.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 391,
        "cardType": "A",
        "text": "Kids with ass cancer.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 392,
        "cardType": "A",
        "text": "Pictures of boobs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 393,
        "cardType": "A",
        "text": "The homosexual agenda.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 394,
        "cardType": "A",
        "text": "A homoerotic volleyball montage.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 395,
        "cardType": "A",
        "text": "Sexual tension.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 396,
        "cardType": "A",
        "text": "Hurricane Katrina.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 397,
        "cardType": "A",
        "text": "Fiery poops.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 398,
        "cardType": "A",
        "text": "Science.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 399,
        "cardType": "A",
        "text": "Dry heaving.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 400,
        "cardType": "A",
        "text": "Cards Against Humanity.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 401,
        "cardType": "A",
        "text": "Fancy Feast&copy;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 402,
        "cardType": "A",
        "text": "A bleached asshole.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 403,
        "cardType": "A",
        "text": "Lumberjack fantasies.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 404,
        "cardType": "A",
        "text": "American Gladiators.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 405,
        "cardType": "A",
        "text": "Autocannibalism.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 406,
        "cardType": "A",
        "text": "Sean Connery.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 407,
        "cardType": "A",
        "text": "William Shatner.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 408,
        "cardType": "A",
        "text": "Domino's&trade; Oreo&trade; Dessert Pizza.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 409,
        "cardType": "A",
        "text": "An asymmetric boob job.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 410,
        "cardType": "A",
        "text": "Centaurs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 411,
        "cardType": "A",
        "text": "A micropenis.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 412,
        "cardType": "A",
        "text": "Asians who aren't good at math.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 413,
        "cardType": "A",
        "text": "The milk man.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 414,
        "cardType": "A",
        "text": "Waterboarding.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 415,
        "cardType": "A",
        "text": "Wifely duties.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 416,
        "cardType": "A",
        "text": "Loose lips.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 417,
        "cardType": "A",
        "text": "The Blood of Christ.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 418,
        "cardType": "A",
        "text": "Actually taking candy from a baby.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 419,
        "cardType": "A",
        "text": "The token minority.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 420,
        "cardType": "A",
        "text": "Jibber-jabber.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 421,
        "cardType": "A",
        "text": "A brain tumor.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 422,
        "cardType": "A",
        "text": "Bingeing and purging.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 423,
        "cardType": "A",
        "text": "A clandestine butt scratch.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 424,
        "cardType": "A",
        "text": "The Chinese gymnastics team.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 425,
        "cardType": "A",
        "text": "Prancing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 426,
        "cardType": "A",
        "text": "The Hamburglar.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 427,
        "cardType": "A",
        "text": "Police brutality.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 428,
        "cardType": "A",
        "text": "Man meat.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 429,
        "cardType": "A",
        "text": "Forgetting the Alamo.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 430,
        "cardType": "A",
        "text": "Eating the last known bison.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 431,
        "cardType": "A",
        "text": "Crystal meth.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 432,
        "cardType": "A",
        "text": "Booby-trapping the house to foil burglars.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 433,
        "cardType": "A",
        "text": "My inner demons.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 434,
        "cardType": "A",
        "text": "Third base.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 435,
        "cardType": "A",
        "text": "Soiling oneself.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 436,
        "cardType": "A",
        "text": "Laying an egg.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 437,
        "cardType": "A",
        "text": "Giving 110%.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 438,
        "cardType": "A",
        "text": "Hot people.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 439,
        "cardType": "A",
        "text": "Friendly fire.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 440,
        "cardType": "A",
        "text": "Count Chocula.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 441,
        "cardType": "A",
        "text": "Pac-Man uncontrollably guzzling cum.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 442,
        "cardType": "A",
        "text": "Estrogen.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 443,
        "cardType": "A",
        "text": "My vagina.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 444,
        "cardType": "A",
        "text": "Kanye West.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 445,
        "cardType": "A",
        "text": "A robust mongoloid.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 446,
        "cardType": "A",
        "text": "The Donald Trump Seal of Approval&trade;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 447,
        "cardType": "A",
        "text": "The true meaning of Christmas.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 448,
        "cardType": "A",
        "text": "Her Royal Highness, Queen Elizabeth II.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 449,
        "cardType": "A",
        "text": "An honest cop with nothing left to lose.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 450,
        "cardType": "A",
        "text": "Feeding Rosie O'Donnell.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 451,
        "cardType": "A",
        "text": "The Amish.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 452,
        "cardType": "A",
        "text": "The terrorists.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 453,
        "cardType": "A",
        "text": "When you fart and a little bit comes out.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 454,
        "cardType": "A",
        "text": "Pooping back and forth. Forever.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 455,
        "cardType": "A",
        "text": "Friends who eat all the snacks.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 456,
        "cardType": "A",
        "text": "Cockfights.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 457,
        "cardType": "A",
        "text": "Bitches.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 458,
        "cardType": "A",
        "text": "Seduction.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 459,
        "cardType": "Q",
        "text": "_?  There's an app for that.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 460,
        "cardType": "Q",
        "text": "Why can't I sleep at night?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 461,
        "cardType": "Q",
        "text": "What's that smell?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 462,
        "cardType": "Q",
        "text": "I got 99 problems but _ ain't one.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 463,
        "cardType": "Q",
        "text": "Maybe she's born with it.  Maybe it's _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 464,
        "cardType": "Q",
        "text": "What's the next Happy Meal&copy; toy?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 465,
        "cardType": "Q",
        "text": "Anthropologists have recently discovered a primitive tribe that worships _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 466,
        "cardType": "Q",
        "text": "It's a pity that kids these days are all getting involved with _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 467,
        "cardType": "Q",
        "text": "During Picasso's often-overlooked Brown Period, he produced hundreds of paintings of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 468,
        "cardType": "Q",
        "text": "Alternative medicine is now embracing the curative powers of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 469,
        "cardType": "Q",
        "text": "And the Academy Award for _ goes to _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 470,
        "cardType": "Q",
        "text": "What's that sound?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 471,
        "cardType": "Q",
        "text": "What ended my last relationship?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 472,
        "cardType": "Q",
        "text": "MTV's new reality show features eight washed-up celebrities living with _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 473,
        "cardType": "Q",
        "text": "I drink to forget _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 474,
        "cardType": "Q",
        "text": "I'm sorry professor, but I couldn't complete my homework because of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 475,
        "cardType": "Q",
        "text": "What is Batman's guilty pleasure?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 476,
        "cardType": "Q",
        "text": "This is the way the world ends <br> This is the way the world ends <br> Not with a bang but with _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 477,
        "cardType": "Q",
        "text": "What's a girl's best friend?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 478,
        "cardType": "Q",
        "text": "TSA guidelines now prohibit _ on airplanes.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 479,
        "cardType": "Q",
        "text": "_.  That's how I want to die.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 480,
        "cardType": "Q",
        "text": "For my next trick, I will pull _ out of _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 481,
        "cardType": "Q",
        "text": "In the new Disney Channel Original Movie, Hannah Montana struggles with _ for the first time.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 482,
        "cardType": "Q",
        "text": "_ is a slippery slope that leads to _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 483,
        "cardType": "Q",
        "text": "What does Dick Cheney prefer?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 484,
        "cardType": "Q",
        "text": "Dear Abby, I'm having some trouble with _ and would like your advice.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 485,
        "cardType": "Q",
        "text": "Instead of coal, Santa now gives the bad children _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 486,
        "cardType": "Q",
        "text": "What's the most emo?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 487,
        "cardType": "Q",
        "text": "In 1,000 years when paper money is but a distant memory, _ will be our currency.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 488,
        "cardType": "Q",
        "text": "What's the next superhero/sidekick duo?",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 489,
        "cardType": "Q",
        "text": "In M. Night Shyamalan's new movie, Bruce Willis discovers that _ had really been _ all along.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 490,
        "cardType": "Q",
        "text": "A romantic, candlelit dinner would be incomplete without _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 491,
        "cardType": "Q",
        "text": "_.  Becha can't have just one!",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 492,
        "cardType": "Q",
        "text": "White people like _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 493,
        "cardType": "Q",
        "text": "_.  High five, bro.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 494,
        "cardType": "Q",
        "text": "Next from J.K. Rowling: Harry Potter and the Chamber of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 495,
        "cardType": "Q",
        "text": "BILLY MAYS HERE FOR _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 496,
        "cardType": "Q",
        "text": "In a world ravaged by _, our only solace is _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 497,
        "cardType": "Q",
        "text": "War!  What is it good for?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 498,
        "cardType": "Q",
        "text": "During sex, I like to think about _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 499,
        "cardType": "Q",
        "text": "What are my parents hiding from me?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 500,
        "cardType": "Q",
        "text": "What will always get you laid?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 501,
        "cardType": "Q",
        "text": "In L.A. County Jail, word is you can trade 200 cigarettes for _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 502,
        "cardType": "Q",
        "text": "What did I bring back from Mexico?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 503,
        "cardType": "Q",
        "text": "What don't you want to find in your Chinese food?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 504,
        "cardType": "Q",
        "text": "What will I bring back in time to convince people that I am a powerful wizard?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 505,
        "cardType": "Q",
        "text": "How am I maintaining my relationship status?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 506,
        "cardType": "Q",
        "text": "_.  It's a trap!",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 507,
        "cardType": "Q",
        "text": "Coming to Broadway this season, _: The Musical.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 508,
        "cardType": "Q",
        "text": "While the United States raced the Soviet Union to the moon, the Mexican government funneled millions of pesos into research on _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 509,
        "cardType": "Q",
        "text": "After the earthquake, Sean Penn brought _ to the people of Haiti.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 510,
        "cardType": "Q",
        "text": "Next on ESPN2, the World Series of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 511,
        "cardType": "Q",
        "text": "Step 1: _.  Step 2: _.  Step 3: Profit.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 512,
        "cardType": "Q",
        "text": "Rumor has it that Vladimir Putin's favorite dish is _ stuffed with _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 513,
        "cardType": "Q",
        "text": "But before I kill you, Mr. Bond, I must show you _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 514,
        "cardType": "Q",
        "text": "What gives me uncontrollable gas?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 515,
        "cardType": "Q",
        "text": "What do old people smell like?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 516,
        "cardType": "Q",
        "text": "The class field trip was completely ruined by _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 517,
        "cardType": "Q",
        "text": "When Pharaoh remained unmoved, Moses called down a Plague of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 518,
        "cardType": "Q",
        "text": "What's my secret power?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 519,
        "cardType": "Q",
        "text": "What's there a ton of in heaven?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 520,
        "cardType": "Q",
        "text": "What would grandma find disturbing, yet oddly charming?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 521,
        "cardType": "Q",
        "text": "I never truly understood _ until I encountered _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 522,
        "cardType": "Q",
        "text": "What did the U.S. airdrop to the children of Afghanistan?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 523,
        "cardType": "Q",
        "text": "What helps Obama unwind?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 524,
        "cardType": "Q",
        "text": "What did Vin Diesel eat for dinner?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 525,
        "cardType": "Q",
        "text": "_: good to the last drop.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 526,
        "cardType": "Q",
        "text": "Why am I sticky?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 527,
        "cardType": "Q",
        "text": "What gets better with age?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 528,
        "cardType": "Q",
        "text": "_: kid-tested, mother-approved.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 529,
        "cardType": "Q",
        "text": "What's the crustiest?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 530,
        "cardType": "Q",
        "text": "What's Teach for America using to inspire inner city students to succeed?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 531,
        "cardType": "Q",
        "text": "Studies show that lab rats navigate mazes 50% faster after being exposed to _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 532,
        "cardType": "Q",
        "text": "Life for American Indians was forever changed when the White Man introduced them to _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 533,
        "cardType": "Q",
        "text": "Make a haiku.",
        "numAnswers": 3,
        "expansion": "Base"
    },
    {
        "id": 534,
        "cardType": "Q",
        "text": "I do not know with what weapons World War III will be fought, but World War IV will be fought with _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 535,
        "cardType": "Q",
        "text": "Why do I hurt all over?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 536,
        "cardType": "Q",
        "text": "What am I giving up for Lent?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 537,
        "cardType": "Q",
        "text": "In Michael Jackson's final moments, he thought about _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 538,
        "cardType": "Q",
        "text": "In an attempt to reach a wider audience, the Smithsonian Museum of Natural History has opened an interactive exhibit on _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 539,
        "cardType": "Q",
        "text": "When I am President of the United States, I will create the Department of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 540,
        "cardType": "Q",
        "text": "Lifetime&copy; presents _, the story of _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 541,
        "cardType": "Q",
        "text": "When I am a billionaire, I shall erect a 50-foot statue to commemorate _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 542,
        "cardType": "Q",
        "text": "When I was tripping on acid, _ turned into _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 543,
        "cardType": "Q",
        "text": "That's right, I killed _.  How, you ask?  _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 544,
        "cardType": "Q",
        "text": "What's my anti-drug?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 545,
        "cardType": "Q",
        "text": "_ + _ = _.",
        "numAnswers": 3,
        "expansion": "Base"
    },
    {
        "id": 546,
        "cardType": "Q",
        "text": "What never fails to liven up the party?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 547,
        "cardType": "Q",
        "text": "What's the new fad diet?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 548,
        "cardType": "Q",
        "text": "Major League Baseball has banned _ for giving players an unfair advantage.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 549,
        "cardType": "A",
        "text": "A big black dick.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 550,
        "cardType": "A",
        "text": "A beached whale.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 551,
        "cardType": "A",
        "text": "A bloody pacifier.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 552,
        "cardType": "A",
        "text": "A crappy little hand.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 553,
        "cardType": "A",
        "text": "A low standard of living.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 554,
        "cardType": "A",
        "text": "A nuanced critique.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 555,
        "cardType": "A",
        "text": "Panty raids.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 556,
        "cardType": "A",
        "text": "A passionate Latino lover.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 557,
        "cardType": "A",
        "text": "A rival dojo.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 558,
        "cardType": "A",
        "text": "A web of lies.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 559,
        "cardType": "A",
        "text": "A woman scorned.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 560,
        "cardType": "A",
        "text": "Clams.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 561,
        "cardType": "A",
        "text": "Apologizing.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 562,
        "cardType": "A",
        "text": "A plunger to the face.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 563,
        "cardType": "A",
        "text": "Neil Patrick Harris.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 564,
        "cardType": "A",
        "text": "Beating your wives.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 565,
        "cardType": "A",
        "text": "Being a dinosaur.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 566,
        "cardType": "A",
        "text": "Shaft.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 567,
        "cardType": "A",
        "text": "Bosnian chicken farmers.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 568,
        "cardType": "A",
        "text": "Nubile slave boys.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 569,
        "cardType": "A",
        "text": "Carnies.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 570,
        "cardType": "A",
        "text": "Coughing into a vagina.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 571,
        "cardType": "A",
        "text": "Suicidal thoughts.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 572,
        "cardType": "A",
        "text": "The ooze.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 573,
        "cardType": "A",
        "text": "Deflowering the princess.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 574,
        "cardType": "A",
        "text": "Dorito breath.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 575,
        "cardType": "A",
        "text": "Eating an albino.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 576,
        "cardType": "A",
        "text": "Enormous Scandinavian women.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 577,
        "cardType": "A",
        "text": "Fabricating statistics.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 578,
        "cardType": "A",
        "text": "Finding a skeleton.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 579,
        "cardType": "A",
        "text": "Gandalf.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 580,
        "cardType": "A",
        "text": "Genetically engineered super-soldiers.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 581,
        "cardType": "A",
        "text": "George Clooney's musk.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 582,
        "cardType": "A",
        "text": "Getting abducted by Peter Pan.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 583,
        "cardType": "A",
        "text": "Getting in her pants, politely.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 584,
        "cardType": "A",
        "text": "Gladiatorial combat.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 585,
        "cardType": "A",
        "text": "Clenched butt cheeks.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 586,
        "cardType": "A",
        "text": "Hipsters.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 587,
        "cardType": "A",
        "text": "Historical revisionism.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 588,
        "cardType": "A",
        "text": "Insatiable bloodlust.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 589,
        "cardType": "A",
        "text": "Jafar.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 590,
        "cardType": "A",
        "text": "Jean-Claude Van Damme.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 591,
        "cardType": "A",
        "text": "Just the tip.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 592,
        "cardType": "A",
        "text": "Mad hacky-sack skills.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 593,
        "cardType": "A",
        "text": "Leveling up.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 594,
        "cardType": "A",
        "text": "Literally eating shit.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 595,
        "cardType": "A",
        "text": "Making the penises kiss.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 596,
        "cardType": "A",
        "text": "24-hour media coverage.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 597,
        "cardType": "A",
        "text": "Medieval Times&copy; Dinner & Tournament.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 598,
        "cardType": "A",
        "text": "Moral ambiguity.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 599,
        "cardType": "A",
        "text": "My machete.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 600,
        "cardType": "A",
        "text": "One thousand Slim Jims.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 601,
        "cardType": "A",
        "text": "Ominous background music.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 602,
        "cardType": "A",
        "text": "Overpowering your father.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 603,
        "cardType": "A",
        "text": "Stockholm Syndrome.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 604,
        "cardType": "A",
        "text": "Quiche.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 605,
        "cardType": "A",
        "text": "Quivering jowls.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 606,
        "cardType": "A",
        "text": "Revenge fucking.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 607,
        "cardType": "A",
        "text": "Ripping into a man's chest and pulling out his still-beating heart.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 608,
        "cardType": "A",
        "text": "Ryan Gosling riding in on a white horse.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 609,
        "cardType": "A",
        "text": "Santa Claus.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 610,
        "cardType": "A",
        "text": "Scrotum tickling.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 611,
        "cardType": "A",
        "text": "Sexual humiliation.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 612,
        "cardType": "A",
        "text": "Sexy Siamese twins.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 613,
        "cardType": "A",
        "text": "Saliva.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 614,
        "cardType": "A",
        "text": "Space muffins.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 615,
        "cardType": "A",
        "text": "Statistically validated stereotypes.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 616,
        "cardType": "A",
        "text": "Sudden Poop Explosion Disease.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 617,
        "cardType": "A",
        "text": "The boners of the elderly.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 618,
        "cardType": "A",
        "text": "The economy.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 619,
        "cardType": "A",
        "text": "Syphilitic insanity.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 620,
        "cardType": "A",
        "text": "The Gulags.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 621,
        "cardType": "A",
        "text": "The harsh light of day.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 622,
        "cardType": "A",
        "text": "The hiccups.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 623,
        "cardType": "A",
        "text": "The shambling corpse of Larry King.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 624,
        "cardType": "A",
        "text": "The four arms of Vishnu.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 625,
        "cardType": "A",
        "text": "Being a busy adult with many important things to do.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 626,
        "cardType": "A",
        "text": "Tripping balls.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 627,
        "cardType": "A",
        "text": "Words, words, words.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 628,
        "cardType": "A",
        "text": "Zeus's sexual appetites.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 629,
        "cardType": "Q",
        "text": "My plan for world domination begins with _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 630,
        "cardType": "Q",
        "text": "The CIA now interrogates enemy agents by repeatedly subjecting them to _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 631,
        "cardType": "Q",
        "text": "Dear Sir or Madam, We regret to inform you that the Office of _ has denied your request for _",
        "numAnswers": 2,
        "expansion": "CAHe1"
    },
    {
        "id": 632,
        "cardType": "Q",
        "text": "In Rome, there are whisperings that the Vatican has a secret room devoted to _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 633,
        "cardType": "Q",
        "text": "Science will never explain _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 634,
        "cardType": "Q",
        "text": "When all else fails, I can always masturbate to _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 635,
        "cardType": "Q",
        "text": "I learned the hard way that you can't cheer up a grieving friend with _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 636,
        "cardType": "Q",
        "text": "In its new tourism campaign, Detroit proudly proclaims that it has finally eliminated _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 637,
        "cardType": "Q",
        "text": "An international tribunal has found _ guilty of _.",
        "numAnswers": 2,
        "expansion": "CAHe1"
    },
    {
        "id": 638,
        "cardType": "Q",
        "text": "The socialist governments of Scandinavia have declared that access to _ is a basic human right.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 639,
        "cardType": "Q",
        "text": "In his new self-produced album, Kanye West raps over the sounds of _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 640,
        "cardType": "Q",
        "text": "What's the gift that keeps on giving?",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 641,
        "cardType": "Q",
        "text": "Next season on Man vs. Wild, Bear Grylls must survive in the depths of the Amazon with only _ and his wits.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 642,
        "cardType": "Q",
        "text": "When I pooped, what came out of my butt?",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 643,
        "cardType": "Q",
        "text": "In the distant future, historians will agree that _ marked the beginning of America's decline.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 644,
        "cardType": "Q",
        "text": "In a pinch, _ can be a suitable substitute for _.",
        "numAnswers": 2,
        "expansion": "CAHe1"
    },
    {
        "id": 645,
        "cardType": "Q",
        "text": "What has been making life difficult at the nudist colony?",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 646,
        "cardType": "Q",
        "text": "Michael Bay's new three-hour action epic pits _ against _.",
        "numAnswers": 2,
        "expansion": "CAHe1"
    },
    {
        "id": 647,
        "cardType": "Q",
        "text": "And I would have gotten away with it, too, if it hadn't been for _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 648,
        "cardType": "Q",
        "text": "What brought the orgy to a grinding halt?",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 649,
        "cardType": "A",
        "text": "A bigger, blacker dick.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 650,
        "cardType": "A",
        "text": "The mere concept of Applebee's&reg;.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 651,
        "cardType": "A",
        "text": "A sad fat dragon with no friends.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 652,
        "cardType": "A",
        "text": "Catastrophic urethral trauma.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 653,
        "cardType": "A",
        "text": "Hillary Clinton's death stare.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 654,
        "cardType": "A",
        "text": "Existing.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 655,
        "cardType": "A",
        "text": "A pinata full of scorpions.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 656,
        "cardType": "A",
        "text": "Mooing.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 657,
        "cardType": "A",
        "text": "Swiftly achieving orgasm.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 658,
        "cardType": "A",
        "text": "Daddy's belt.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 659,
        "cardType": "A",
        "text": "Double penetration.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 660,
        "cardType": "A",
        "text": "Weapons-grade plutonium.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 661,
        "cardType": "A",
        "text": "Some really fucked-up shit.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 662,
        "cardType": "A",
        "text": "Subduing a grizzly bear and making her your wife.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 663,
        "cardType": "A",
        "text": "Rising from the grave.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 664,
        "cardType": "A",
        "text": "The mixing of the races.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 665,
        "cardType": "A",
        "text": "Taking a man's eyes and balls out and putting his eyes where his balls go and then his balls in the eye holes.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 666,
        "cardType": "A",
        "text": "Scrotal frostbite.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 667,
        "cardType": "A",
        "text": "All of this blood.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 668,
        "cardType": "A",
        "text": "Loki, the trickster god.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 669,
        "cardType": "A",
        "text": "Whining like a little bitch.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 670,
        "cardType": "A",
        "text": "Pumping out a baby every nine months.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 671,
        "cardType": "A",
        "text": "Tongue.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 672,
        "cardType": "A",
        "text": "Finding Waldo.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 673,
        "cardType": "A",
        "text": "Upgrading homeless people to mobile hotspots.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 674,
        "cardType": "A",
        "text": "Wearing an octopus for a hat.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 675,
        "cardType": "A",
        "text": "An unhinged ferris wheel rolling toward the sea.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 676,
        "cardType": "A",
        "text": "Living in a trashcan.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 677,
        "cardType": "A",
        "text": "The corporations.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 678,
        "cardType": "A",
        "text": "A magic hippie love cloud.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 679,
        "cardType": "A",
        "text": "Fuck Mountain.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 680,
        "cardType": "A",
        "text": "Survivor's guilt.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 681,
        "cardType": "A",
        "text": "Me.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 682,
        "cardType": "A",
        "text": "Getting hilariously gang-banged by the Blue Man Group.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 683,
        "cardType": "A",
        "text": "Jeff Goldblum.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 684,
        "cardType": "A",
        "text": "Making a friend.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 685,
        "cardType": "A",
        "text": "A soulful rendition of &#34;Ol' Man River.&#34;",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 686,
        "cardType": "A",
        "text": "Intimacy problems.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 687,
        "cardType": "A",
        "text": "A sweaty, panting leather daddy.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 688,
        "cardType": "A",
        "text": "Spring break!",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 689,
        "cardType": "A",
        "text": "Being awesome at sex.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 690,
        "cardType": "A",
        "text": "Dining with cardboard cutouts of the cast of &#34;Friends.&#34;",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 691,
        "cardType": "A",
        "text": "Another shot of morphine.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 692,
        "cardType": "A",
        "text": "Beefin' over turf.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 693,
        "cardType": "A",
        "text": "A squadron of moles wearing aviator goggles.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 694,
        "cardType": "A",
        "text": "Bullshit.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 695,
        "cardType": "A",
        "text": "The Google.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 696,
        "cardType": "A",
        "text": "Pretty Pretty Princess Dress-Up Board Game&#174;.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 697,
        "cardType": "A",
        "text": "The new Radiohead album.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 698,
        "cardType": "A",
        "text": "An army of skeletons.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 699,
        "cardType": "A",
        "text": "A man in yoga pants with a ponytail and feather earrings.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 700,
        "cardType": "A",
        "text": "Mild autism.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 701,
        "cardType": "A",
        "text": "Nunchuck moves.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 702,
        "cardType": "A",
        "text": "Whipping a disobedient slave.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 703,
        "cardType": "A",
        "text": "An ether-soaked rag.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 704,
        "cardType": "A",
        "text": "A sweet spaceship.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 705,
        "cardType": "A",
        "text": "A 55-gallon drum of lube.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 706,
        "cardType": "A",
        "text": "Special musical guest, Cher.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 707,
        "cardType": "A",
        "text": "The human body.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 708,
        "cardType": "A",
        "text": "Boris the Soviet Love Hammer.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 709,
        "cardType": "A",
        "text": "The grey nutrient broth that sustains Mitt Romney.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 710,
        "cardType": "A",
        "text": "Tiny nipples.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 711,
        "cardType": "A",
        "text": "Power.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 712,
        "cardType": "A",
        "text": "Oncoming traffic.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 713,
        "cardType": "A",
        "text": "A dollop of sour cream.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 714,
        "cardType": "A",
        "text": "A slightly shittier parallel universe.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 715,
        "cardType": "A",
        "text": "My first kill.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 716,
        "cardType": "A",
        "text": "Graphic violence, adult language, and some sexual content.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 717,
        "cardType": "A",
        "text": "Fetal alcohol syndrome.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 718,
        "cardType": "A",
        "text": "The day the birds attacked.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 719,
        "cardType": "A",
        "text": "One Ring to rule them all.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 720,
        "cardType": "A",
        "text": "Grandpa's ashes.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 721,
        "cardType": "A",
        "text": "Basic human decency.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 722,
        "cardType": "A",
        "text": "A Burmese tiger pit.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 723,
        "cardType": "A",
        "text": "Death by Steven Seagal",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 724,
        "cardType": "Q",
        "text": "During his midlife crisis, my dad got really into _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 725,
        "cardType": "Q",
        "text": "_ would be woefully incomplete without _.",
        "numAnswers": 2,
        "expansion": "CAHe2"
    },
    {
        "id": 726,
        "cardType": "Q",
        "text": "My new favorite porn star is Joey &#34;_&#34; McGee.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 727,
        "cardType": "Q",
        "text": "Before I run for president, I must destroy all evidence of my involvement with _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 728,
        "cardType": "Q",
        "text": "This is your captain speaking. Fasten your seatbelts and prepare for _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 729,
        "cardType": "Q",
        "text": "In his newest and most difficult stunt, David Blaine must escape from _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 730,
        "cardType": "Q",
        "text": "The Five Stages of Grief: denial, anger, bargaining, _, and acceptance.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 731,
        "cardType": "Q",
        "text": "My mom freaked out when she looked at my browser history and found _.com/_.",
        "numAnswers": 2,
        "expansion": "CAHe2"
    },
    {
        "id": 732,
        "cardType": "Q",
        "text": "I went from _ to _, all thanks to _.",
        "numAnswers": 3,
        "expansion": "CAHe2"
    },
    {
        "id": 733,
        "cardType": "Q",
        "text": "Members of New York's social elite are paying thousands of dollars just to experience _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 734,
        "cardType": "Q",
        "text": "This month's Cosmo: &#34;Spice up your sex life by bringing _ into the bedroom.&#34;",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 735,
        "cardType": "Q",
        "text": "Little Miss Muffet Sat on a tuffet, Eating her curds and _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 736,
        "cardType": "Q",
        "text": "If God didn't want us to enjoy _, he wouldn't have given us _.",
        "numAnswers": 2,
        "expansion": "CAHe2"
    },
    {
        "id": 737,
        "cardType": "Q",
        "text": "My country, 'tis of thee, sweet land of _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 738,
        "cardType": "Q",
        "text": "After months of debate, the Occupy Wall Street General Assembly could only agree on &#34;More _!&#34;",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 739,
        "cardType": "Q",
        "text": "I spent my whole life working toward _, only to have it ruined by _.",
        "numAnswers": 2,
        "expansion": "CAHe2"
    },
    {
        "id": 740,
        "cardType": "Q",
        "text": "Next time on Dr. Phil: How to talk to your child about _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 741,
        "cardType": "Q",
        "text": "Only two things in life are certain: death and _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 742,
        "cardType": "Q",
        "text": "Everyone down on the ground! We don't want to hurt anyone. We're just here for _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 743,
        "cardType": "Q",
        "text": "The healing process began when I joined a support group for victims of _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 744,
        "cardType": "Q",
        "text": "The votes are in, and the new high school mascot is _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 745,
        "cardType": "Q",
        "text": "Charades was ruined for me forever when my mom had to act out _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 746,
        "cardType": "Q",
        "text": "Before _, all we had was _.",
        "numAnswers": 2,
        "expansion": "CAHe2"
    },
    {
        "id": 747,
        "cardType": "Q",
        "text": "Tonight on 20/20: What you don't know about _ could kill you.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 748,
        "cardType": "Q",
        "text": "You haven't truly lived until you've experienced _ and _ at the same time.",
        "numAnswers": 2,
        "expansion": "CAHe2"
    },
    {
        "id": 749,
        "cardType": "Q",
        "text": "D&D 4.0 isn't real D&D because of the _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 750,
        "cardType": "Q",
        "text": "It's a D&D retroclone with _ added.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 751,
        "cardType": "Q",
        "text": "Storygames aren't RPGs because of the _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 752,
        "cardType": "Q",
        "text": "The Slayer's Guide to _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 753,
        "cardType": "Q",
        "text": "Worst character concept ever: _, but with _.",
        "numAnswers": 2,
        "expansion": "CAHgrognards"
    },
    {
        "id": 754,
        "cardType": "Q",
        "text": "Alightment: Chaotic _",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 755,
        "cardType": "Q",
        "text": "It's a D&D retroclone with _ added.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 756,
        "cardType": "Q",
        "text": "What made the paladin fall? _",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 757,
        "cardType": "Q",
        "text": "The portal leads to the quasi-elemental plane of _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 758,
        "cardType": "Q",
        "text": "The Temple of Elemental _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 759,
        "cardType": "Q",
        "text": "Pathfinder is basically D&D _ Edition.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 760,
        "cardType": "Q",
        "text": "_ : The Storytelling Game.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 761,
        "cardType": "Q",
        "text": "People are wondering why Steve Jackson published GURPS _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 762,
        "cardType": "Q",
        "text": "Linear Fighter, Quadratic _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 763,
        "cardType": "Q",
        "text": "You start with 1d4 _ points.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 764,
        "cardType": "Q",
        "text": "Back when I was 12 and I was just starting playing D&D, the game had _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 765,
        "cardType": "Q",
        "text": "Big Eyes, Small _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 766,
        "cardType": "Q",
        "text": "In the grim darkness of the future there is only _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 767,
        "cardType": "Q",
        "text": "My innovative new RPG has a stat for _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 768,
        "cardType": "Q",
        "text": "A true gamer has no problem with _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 769,
        "cardType": "Q",
        "text": "Elminster cast a potent _ spell and then had sex with _.",
        "numAnswers": 2,
        "expansion": "CAHgrognards"
    },
    {
        "id": 770,
        "cardType": "Q",
        "text": "The Deck of Many _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 771,
        "cardType": "Q",
        "text": "You are all at a tavern when _ approach you.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 772,
        "cardType": "A",
        "text": "Dragon boobs.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 773,
        "cardType": "A",
        "text": "Verisimilitude.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 774,
        "cardType": "A",
        "text": "Dissociated mechanics.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 775,
        "cardType": "A",
        "text": "Rape.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 776,
        "cardType": "A",
        "text": "Storygames.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 777,
        "cardType": "A",
        "text": "Random chargen",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 778,
        "cardType": "A",
        "text": "RPG.net.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 779,
        "cardType": "A",
        "text": "Dice inserted somewhere painful.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 780,
        "cardType": "A",
        "text": "FATAL.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 781,
        "cardType": "A",
        "text": "Ron Edwards' brain damage.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 782,
        "cardType": "A",
        "text": "Boob plate armor.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 783,
        "cardType": "A",
        "text": "Gamer chicks.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 784,
        "cardType": "A",
        "text": "GNS theory.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 785,
        "cardType": "A",
        "text": "Drizzt.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 786,
        "cardType": "A",
        "text": "The entire Palladium Books&reg; Megaverse&trade;",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 787,
        "cardType": "A",
        "text": "BadWrongFun.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 788,
        "cardType": "A",
        "text": "Misogynerds.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 789,
        "cardType": "A",
        "text": "Cultural Marxism.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 790,
        "cardType": "A",
        "text": "Pissing on Gary Gygax's grave.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 791,
        "cardType": "A",
        "text": "Steve Jackson's beard.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 792,
        "cardType": "A",
        "text": "Natural 20.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 793,
        "cardType": "A",
        "text": "Rapenards.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 794,
        "cardType": "A",
        "text": "The Crisis of Treachery&trade;.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 795,
        "cardType": "A",
        "text": "Game balance.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 796,
        "cardType": "A",
        "text": "Fishmalks.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 797,
        "cardType": "A",
        "text": "A kick to the dicebags.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 798,
        "cardType": "A",
        "text": "Bearded dwarven women.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 799,
        "cardType": "A",
        "text": "Owlbear's tears.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 800,
        "cardType": "A",
        "text": "Magic missile.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 801,
        "cardType": "A",
        "text": "THAC0.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 802,
        "cardType": "A",
        "text": "Bigby's Groping Hands.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 803,
        "cardType": "A",
        "text": "Drow blackface.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 804,
        "cardType": "A",
        "text": "Save or die.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 805,
        "cardType": "A",
        "text": "Swine.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 806,
        "cardType": "A",
        "text": "The Forge.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 807,
        "cardType": "A",
        "text": "Healing Surges.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 808,
        "cardType": "A",
        "text": "Gelatinous Cubes.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 809,
        "cardType": "A",
        "text": "Total Party Kill.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 810,
        "cardType": "A",
        "text": "Quoting Monty Python.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 811,
        "cardType": "A",
        "text": "Dumbed down shit for ADD WoW babies.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 812,
        "cardType": "A",
        "text": "Mike Mearls.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 813,
        "cardType": "A",
        "text": "Comeliness.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 814,
        "cardType": "A",
        "text": "Vampire: The Masquerade.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 815,
        "cardType": "A",
        "text": "Rifts&trade;.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 816,
        "cardType": "A",
        "text": "The random prostitute table.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 817,
        "cardType": "A",
        "text": "Dildo of Enlightenment +2",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 818,
        "cardType": "A",
        "text": "Grognards Against Humanity.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 819,
        "cardType": "A",
        "text": "Cthulhu.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 820,
        "cardType": "A",
        "text": "The naked succubus in the Monster Manual.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 821,
        "cardType": "A",
        "text": "Role-playing and roll-playing.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 822,
        "cardType": "A",
        "text": "Fun Tyrant.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 823,
        "cardType": "A",
        "text": "4rries.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 824,
        "cardType": "A",
        "text": "Martial dailies.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 825,
        "cardType": "A",
        "text": "Black Tokyo.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 826,
        "cardType": "A",
        "text": "Killfuck Soulshitter.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 827,
        "cardType": "A",
        "text": "Cheetoism.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 828,
        "cardType": "A",
        "text": "Grimdark.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 829,
        "cardType": "A",
        "text": "Kobolds.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 830,
        "cardType": "A",
        "text": "Oozemaster.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 831,
        "cardType": "A",
        "text": "Rocks fall, everyone dies.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 832,
        "cardType": "A",
        "text": "Mark Rein&middot;Hagen.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 833,
        "cardType": "A",
        "text": "Maid RPG.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 834,
        "cardType": "A",
        "text": "Splugorth blind warrior women.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 835,
        "cardType": "A",
        "text": "Dying during chargen.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 836,
        "cardType": "A",
        "text": "Slaughtering innocent orc children.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 837,
        "cardType": "A",
        "text": "Lesbian stripper ninjas.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 838,
        "cardType": "A",
        "text": "Magical tea party.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 839,
        "cardType": "A",
        "text": "Grinding levels.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 840,
        "cardType": "A",
        "text": "Dice animism.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 841,
        "cardType": "A",
        "text": "White privilege.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 842,
        "cardType": "A",
        "text": "Githyanki therapy.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 843,
        "cardType": "A",
        "text": "Amber Diceless Roleplaying.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 844,
        "cardType": "A",
        "text": "A ratcatcher with a small but vicious dog.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 845,
        "cardType": "A",
        "text": "Bribing the GM with sexual favors.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 846,
        "cardType": "A",
        "text": "Eurocentric fantasy.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 847,
        "cardType": "A",
        "text": "Sacred cows.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 848,
        "cardType": "A",
        "text": "Gygaxian naturalism.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 849,
        "cardType": "A",
        "text": "Special snowflakes.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 850,
        "cardType": "A",
        "text": "Neckbeards.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 851,
        "cardType": "A",
        "text": "Gazebos.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 852,
        "cardType": "A",
        "text": "Lorraine Williams.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 853,
        "cardType": "A",
        "text": "Nude larping.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 854,
        "cardType": "A",
        "text": "Portable holes.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 855,
        "cardType": "A",
        "text": "Steampunk bullshit.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 856,
        "cardType": "A",
        "text": "Dump stats.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 857,
        "cardType": "A",
        "text": "Ale and whores.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 858,
        "cardType": "Q",
        "text": "For the convention I cosplayed as Sailor Moon, except with _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 859,
        "cardType": "Q",
        "text": "The worst part of Grave of the Fireflies is all the _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 860,
        "cardType": "Q",
        "text": "In the Evangelion remake, Shinji has to deal with _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 861,
        "cardType": "Q",
        "text": "Worst anime convention purchase ever? _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 862,
        "cardType": "Q",
        "text": "While powering up Vegeta screamed, _!",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 863,
        "cardType": "Q",
        "text": "You evaded my _ attack. Most impressive.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 864,
        "cardType": "Q",
        "text": "I downloaded a doujin where _ got into _.",
        "numAnswers": 2,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 865,
        "cardType": "Q",
        "text": "The magical girl found out that the Power of Love is useless against _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 866,
        "cardType": "Q",
        "text": "The Japanese government has spent billions of yen researching _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 867,
        "cardType": "Q",
        "text": "In the dubbed version they changed _ into _.",
        "numAnswers": 2,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 868,
        "cardType": "Q",
        "text": "_ is Best Pony.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 869,
        "cardType": "Q",
        "text": "The _ of Haruhi Suzumiya.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 870,
        "cardType": "Q",
        "text": "The new thing in Akihabara is fetish cafes where you can see girls dressed up as _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 871,
        "cardType": "Q",
        "text": "Your drill can pierce _!",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 872,
        "cardType": "Q",
        "text": "Avatar: The Last _ bender.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 873,
        "cardType": "Q",
        "text": "In the name of _ Sailor Moon will punish you!",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 874,
        "cardType": "Q",
        "text": "No harem anime is complete without _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 875,
        "cardType": "Q",
        "text": "My boyfriend's a _ now.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 876,
        "cardType": "Q",
        "text": "The _ of _ has left me in despair!",
        "numAnswers": 2,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 877,
        "cardType": "Q",
        "text": "_.tumblr.com",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 878,
        "cardType": "Q",
        "text": "Somehow they made a cute mascot girl out of _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 879,
        "cardType": "Q",
        "text": "Haruko hit Naoto in the head with her bass guitar and _ came out.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 880,
        "cardType": "A",
        "text": "Japanese schoolgirl porn.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 881,
        "cardType": "A",
        "text": "Horny catgirls.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 882,
        "cardType": "A",
        "text": "Japanese people.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 883,
        "cardType": "A",
        "text": "Cimo.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 884,
        "cardType": "A",
        "text": "ZA WARUDO!",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 885,
        "cardType": "A",
        "text": "40 gigs of lolicon.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 886,
        "cardType": "A",
        "text": "Goku's hair.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 887,
        "cardType": "A",
        "text": "Slashfic.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 888,
        "cardType": "A",
        "text": "Star Gentle Uterus",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 889,
        "cardType": "A",
        "text": "Naruto headbands.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 890,
        "cardType": "A",
        "text": "Homestuck troll horns.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 891,
        "cardType": "A",
        "text": "Hayao Miyazaki.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 892,
        "cardType": "A",
        "text": "The tsunami.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 893,
        "cardType": "A",
        "text": "Death Note.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 894,
        "cardType": "A",
        "text": "Small breasts.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 895,
        "cardType": "A",
        "text": "Asians being racist against each other.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 896,
        "cardType": "A",
        "text": "Weeaboo bullshit.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 897,
        "cardType": "A",
        "text": "Tsundere.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 898,
        "cardType": "A",
        "text": "Body pillows.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 899,
        "cardType": "A",
        "text": "A lifelike silicone love doll.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 900,
        "cardType": "A",
        "text": "Anime figures drenched in jizz.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 901,
        "cardType": "A",
        "text": "Surprise sex.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 902,
        "cardType": "A",
        "text": "Yaoi.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 903,
        "cardType": "A",
        "text": "Girls with glasses.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 904,
        "cardType": "A",
        "text": "Bronies.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 905,
        "cardType": "A",
        "text": "Blue and white striped panties.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 906,
        "cardType": "A",
        "text": "4chan.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 907,
        "cardType": "A",
        "text": "Hello Kitty vibrator.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 908,
        "cardType": "A",
        "text": "Finishing attack.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 909,
        "cardType": "A",
        "text": "Keikaku* *(keikaku means plan).",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 910,
        "cardType": "A",
        "text": "Hatsune Miku's screams.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 911,
        "cardType": "A",
        "text": "School swimsuits.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 912,
        "cardType": "A",
        "text": "Lovingly animated bouncing boobs.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 913,
        "cardType": "A",
        "text": "Dragon Balls.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 914,
        "cardType": "A",
        "text": "Zangief's chest hair.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 915,
        "cardType": "A",
        "text": "DeviantArt.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 916,
        "cardType": "A",
        "text": "Giant fucking robots.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 917,
        "cardType": "A",
        "text": "Crossplay.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 918,
        "cardType": "A",
        "text": "Moeblob.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 919,
        "cardType": "A",
        "text": "Carl Macek's rotting corpse.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 920,
        "cardType": "A",
        "text": "My waifu.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 921,
        "cardType": "A",
        "text": "Voice actress Megumi Hayashibara.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 922,
        "cardType": "A",
        "text": "Lynn Minmei.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 923,
        "cardType": "A",
        "text": "Panty shots.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 924,
        "cardType": "A",
        "text": "Love and Justice.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 925,
        "cardType": "A",
        "text": "Consensual tentacle rape.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 926,
        "cardType": "A",
        "text": "Gundam.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 927,
        "cardType": "A",
        "text": "Captain Bright slapping Amuro.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 928,
        "cardType": "A",
        "text": "The Wave Undulation Cannon.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 929,
        "cardType": "A",
        "text": "Having sex in the P.E. equipment shed.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 930,
        "cardType": "A",
        "text": "Tainted sushi.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 931,
        "cardType": "A",
        "text": "Shitty eurobeat music.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 932,
        "cardType": "A",
        "text": "Bad dubbing.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 933,
        "cardType": "A",
        "text": "Fangirls.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 934,
        "cardType": "A",
        "text": "Kawaii desu uguu.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 935,
        "cardType": "A",
        "text": "Futanari.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 936,
        "cardType": "A",
        "text": "Lesbian schoolgirls.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 937,
        "cardType": "A",
        "text": "Osamu Tezuka, rolling in his grave forever.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 938,
        "cardType": "A",
        "text": "FUNimation.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 939,
        "cardType": "A",
        "text": "Underage cosplayers in bondage gear.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 940,
        "cardType": "A",
        "text": "Jackie Chan.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 941,
        "cardType": "A",
        "text": "Exchanging Pocky for sexual favors.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 942,
        "cardType": "A",
        "text": "Shipping.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 943,
        "cardType": "A",
        "text": "Chiyo's father.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 944,
        "cardType": "A",
        "text": "Magikarp.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 945,
        "cardType": "A",
        "text": "Derpy.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 946,
        "cardType": "A",
        "text": "Nanoha and her special friend Fate.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 947,
        "cardType": "A",
        "text": "The marbles from Ramune bottles.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 948,
        "cardType": "A",
        "text": "Wideface.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 949,
        "cardType": "A",
        "text": "Spoilers.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 950,
        "cardType": "A",
        "text": "Man-Faye.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 951,
        "cardType": "A",
        "text": "Oppai mousepads.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 952,
        "cardType": "A",
        "text": "Another dimension.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 953,
        "cardType": "A",
        "text": "Homura sniffing Madoka's panties.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 954,
        "cardType": "A",
        "text": "Hadouken.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 955,
        "cardType": "A",
        "text": "Asian ball-jointed dolls.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 956,
        "cardType": "A",
        "text": "J-list.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 957,
        "cardType": "A",
        "text": "Childhood friends.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 958,
        "cardType": "A",
        "text": "Monkey D. Luffy's rubbery cock.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 959,
        "cardType": "A",
        "text": "Cloud's giant fucking Buster Swords.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 960,
        "cardType": "A",
        "text": "Taking a dump in Char's helmet.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 961,
        "cardType": "A",
        "text": "Hentai marathons.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 962,
        "cardType": "A",
        "text": "Gothic Lolita.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 963,
        "cardType": "A",
        "text": "Onaholes.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 964,
        "cardType": "A",
        "text": "Super Saiyan Level 2.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 965,
        "cardType": "A",
        "text": "Gaia Online.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 966,
        "cardType": "Q",
        "text": "After blacking out during New year's Eve, I was awoken by _.",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 967,
        "cardType": "Q",
        "text": "This holiday season, Tim Allen must overcome his fear of _ to save Christmas.",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 968,
        "cardType": "Q",
        "text": "Jesus is _.",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 969,
        "cardType": "Q",
        "text": "Every Christmas, my uncle gets drunk and tells the story about _.",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 970,
        "cardType": "Q",
        "text": "What keeps me warm during the cold, cold, winter?",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 971,
        "cardType": "Q",
        "text": "On the third day of Christmas, my true love gave to me: three French hens, two turtle doves, and _.",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 972,
        "cardType": "Q",
        "text": "Wake up, America. Christmas is under attack by secular liberals and their _.",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 973,
        "cardType": "A",
        "text": "Santa's heavy sack.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 974,
        "cardType": "A",
        "text": "Clearing a bloody path through Walmart with a scimitar.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 975,
        "cardType": "A",
        "text": "Another shitty year.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 976,
        "cardType": "A",
        "text": "Whatever Kwanzaa is supposed to be about.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 977,
        "cardType": "A",
        "text": "A Christmas stocking full of coleslaw.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 978,
        "cardType": "A",
        "text": "Elf cum.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 979,
        "cardType": "A",
        "text": "The tiny, calloused hands of the Chinese children that made this card.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 980,
        "cardType": "A",
        "text": "Taking down Santa with a surface-to-air missile.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 981,
        "cardType": "A",
        "text": "Socks.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 982,
        "cardType": "A",
        "text": "Pretending to be happy.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 983,
        "cardType": "A",
        "text": "Krampus, the Austrian Christmas monster.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 984,
        "cardType": "A",
        "text": "The Star Wars Holiday Special.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 985,
        "cardType": "A",
        "text": "My hot cousin.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 986,
        "cardType": "A",
        "text": "Mall Santa.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 987,
        "cardType": "A",
        "text": "Several intertwining love stories featuring Hugh Grant.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 988,
        "cardType": "A",
        "text": "A Hungry-Man&trade; Frozen Christmas Dinner for one.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 989,
        "cardType": "A",
        "text": "Gift-wrapping a live hamster.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 990,
        "cardType": "A",
        "text": "Space Jam on VHS.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 991,
        "cardType": "A",
        "text": "Immaculate conception.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 992,
        "cardType": "A",
        "text": "Fucking up 'Silent Night' in front of 300 parents.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 993,
        "cardType": "A",
        "text": "A visually arresting turtleneck.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 994,
        "cardType": "A",
        "text": "A toxic family environment.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 995,
        "cardType": "A",
        "text": "Eating an entire snowman.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 996,
        "cardType": "A",
        "text": "Bumpses.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 997,
        "cardType": "A",
        "text": "A Vin Gerard H8 X 10.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 998,
        "cardType": "Q",
        "text": "We got the third rope, now where's the fourth?",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 999,
        "cardType": "A",
        "text": "Harry Acropolis.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1000,
        "cardType": "A",
        "text": "Under the ring.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1001,
        "cardType": "Q",
        "text": "Tonights main event, _ vs. _.",
        "numAnswers": 2,
        "expansion": "NEIndy"
    },
    {
        "id": 1002,
        "cardType": "A",
        "text": "Afa The Wild Samoan.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1003,
        "cardType": "Q",
        "text": "Tackle, Dropdown, _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1004,
        "cardType": "A",
        "text": "Peanut Butter and Baby sandwiches.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1005,
        "cardType": "Q",
        "text": "Christopher Daniels is late on his _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1006,
        "cardType": "A",
        "text": "Yard Tards.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1007,
        "cardType": "A",
        "text": "Two girls, one cup.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1008,
        "cardType": "A",
        "text": "Ugly Mexican Hookers.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1009,
        "cardType": "A",
        "text": "Duct tape.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1010,
        "cardType": "A",
        "text": "Sodaj.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1011,
        "cardType": "Q",
        "text": "Instead of booking _, they should have booked _.",
        "numAnswers": 2,
        "expansion": "NEIndy"
    },
    {
        "id": 1012,
        "cardType": "Q",
        "text": "Genius is 10% inspiration, 90% _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1013,
        "cardType": "Q",
        "text": "They found _ in the dumpster behind _.",
        "numAnswers": 2,
        "expansion": "NEIndy"
    },
    {
        "id": 1014,
        "cardType": "A",
        "text": "Steve The Teacher.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1015,
        "cardType": "Q",
        "text": "The best thing I ever got for Christmas was _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1016,
        "cardType": "A",
        "text": "Jefferee.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1017,
        "cardType": "Q",
        "text": "There's no crying in _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1018,
        "cardType": "Q",
        "text": "Mastodon! Pterodactyl! Triceratops! Sabretooth Tiger! _!",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1019,
        "cardType": "A",
        "text": "Autoerotic Asphyxiation.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1020,
        "cardType": "Q",
        "text": "Don't eat the _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1021,
        "cardType": "A",
        "text": "Sonic The Hedgehog.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1022,
        "cardType": "A",
        "text": "Lotto Money.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1023,
        "cardType": "Q",
        "text": "He did _ with the _!?!",
        "numAnswers": 2,
        "expansion": "NEIndy"
    },
    {
        "id": 1024,
        "cardType": "A",
        "text": "Jailbait.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1025,
        "cardType": "A",
        "text": "Prison rape.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1026,
        "cardType": "Q",
        "text": "SOOOOO hot, want to touch the _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1027,
        "cardType": "Q",
        "text": "Stop looking at me _!",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1028,
        "cardType": "A",
        "text": "Two And A Half Men.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1029,
        "cardType": "A",
        "text": "Anne Frank.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1030,
        "cardType": "A",
        "text": "Black Santa.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1031,
        "cardType": "Q",
        "text": "I'm cuckoo for _ puffs.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1032,
        "cardType": "Q",
        "text": "Silly rabbit, _ are for kids.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1033,
        "cardType": "A",
        "text": "Jesus Christ (our lord and saviour).",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1034,
        "cardType": "A",
        "text": "Farting with your armpits.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1035,
        "cardType": "A",
        "text": "Poopsicles.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1036,
        "cardType": "A",
        "text": "Slaughtering innocent children.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1037,
        "cardType": "A",
        "text": "Sex with vegetables.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1038,
        "cardType": "A",
        "text": "My gay ex-husband.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1039,
        "cardType": "A",
        "text": "Accidentally sexting your mom.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1040,
        "cardType": "A",
        "text": "Tabasco in your pee-hole.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1041,
        "cardType": "A",
        "text": "Pee Wee Herman.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1042,
        "cardType": "A",
        "text": "A breath of fresh air.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1043,
        "cardType": "A",
        "text": "A great big floppy donkey dick.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1044,
        "cardType": "A",
        "text": "A pyramid scheme.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1045,
        "cardType": "A",
        "text": "A school bus surrounded by cop cars.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1046,
        "cardType": "A",
        "text": "A short walk in the desert with shovels.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1047,
        "cardType": "A",
        "text": "All the boys staring at your chest.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1048,
        "cardType": "A",
        "text": "An amorous stallion.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1049,
        "cardType": "A",
        "text": "Being so wet it just slides out of you.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1050,
        "cardType": "A",
        "text": "Being tarred and feathered.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1051,
        "cardType": "A",
        "text": "Catching 'em all.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1052,
        "cardType": "A",
        "text": "Chained to the bed and whipped to orgasmic bliss by a leather-clad woman.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1053,
        "cardType": "A",
        "text": "Child-bearing hips.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1054,
        "cardType": "A",
        "text": "Defenestration.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1055,
        "cardType": "A",
        "text": "Dungeons and/or dragons.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1056,
        "cardType": "A",
        "text": "Ecco the Dolphin.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1057,
        "cardType": "A",
        "text": "George Washington riding on a giant eagle.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1058,
        "cardType": "A",
        "text": "Getting abducted and probed by aliens.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1059,
        "cardType": "A",
        "text": "Going viral on YouTube.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1060,
        "cardType": "A",
        "text": "Gushing.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1061,
        "cardType": "A",
        "text": "Making the baby Jesus cry.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1062,
        "cardType": "A",
        "text": "More than you can chew.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1063,
        "cardType": "A",
        "text": "Napalm.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1064,
        "cardType": "A",
        "text": "Pancake bitches.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1065,
        "cardType": "A",
        "text": "Playing God with the power of lightning.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1066,
        "cardType": "A",
        "text": "Playing tonsil-hockey.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1067,
        "cardType": "A",
        "text": "Racing cheese wheels downhill.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1068,
        "cardType": "A",
        "text": "Riding the bomb.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1069,
        "cardType": "A",
        "text": "Settling arguments with dance-offs.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1070,
        "cardType": "A",
        "text": "Sheer spite.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1071,
        "cardType": "A",
        "text": "Sinister laughter.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1072,
        "cardType": "A",
        "text": "SS Girls.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1073,
        "cardType": "A",
        "text": "Stealing your sister's underwear.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1074,
        "cardType": "A",
        "text": "Stroking a cat the wrong way.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1075,
        "cardType": "A",
        "text": "Sucking and blowing.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1076,
        "cardType": "A",
        "text": "The bullet with your name on it.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1077,
        "cardType": "A",
        "text": "The entire rest of eternity, spent in fucking Bruges.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1078,
        "cardType": "A",
        "text": "The oceans rising to reclaim the land.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1079,
        "cardType": "A",
        "text": "A cocained-fuelled sex orgy heart attack.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1080,
        "cardType": "A",
        "text": "A cocktail umbrella ",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1081,
        "cardType": "A",
        "text": "A murder/suicide pact.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1082,
        "cardType": "A",
        "text": "A squirming mass of kittens.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1083,
        "cardType": "A",
        "text": "An angry mob with torches and pitchforks.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1084,
        "cardType": "A",
        "text": "Biting my girlfriend like a vampire during sex.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1085,
        "cardType": "A",
        "text": "Dropping your pants and saluting.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1086,
        "cardType": "A",
        "text": "Frankenstein's Monster",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1087,
        "cardType": "A",
        "text": "Getting a blowjob in a theater.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1088,
        "cardType": "A",
        "text": "Going full retard.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1089,
        "cardType": "A",
        "text": "Going slob-slob-slob all over that knob.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1090,
        "cardType": "A",
        "text": "Leaking implants.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1091,
        "cardType": "A",
        "text": "Low-flying planes.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1092,
        "cardType": "A",
        "text": "Monkies flinging their own shit.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1093,
        "cardType": "A",
        "text": "My robot duplicate.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1094,
        "cardType": "A",
        "text": "Other people’s children.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1095,
        "cardType": "A",
        "text": "People who can't take a joke. Seriously.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1096,
        "cardType": "A",
        "text": "Popping a boner during Sex Ed class.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1097,
        "cardType": "A",
        "text": "Projectile vomiting.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1098,
        "cardType": "A",
        "text": "Pulling down panties with your teeth.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1099,
        "cardType": "A",
        "text": "Saying ",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1100,
        "cardType": "A",
        "text": "Shedding skin like a snake.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1101,
        "cardType": "A",
        "text": "Shooting Valley Girls for like, saying like all the time. Really.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1102,
        "cardType": "A",
        "text": "Slow seductive tentacle rape.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1103,
        "cardType": "A",
        "text": "Talking like a pirate, y’arr!",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1104,
        "cardType": "A",
        "text": "Tenderly kissing a unicorn's horn.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1105,
        "cardType": "A",
        "text": "That bastard Jesus!",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1106,
        "cardType": "A",
        "text": "The last shreads of dignity.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1107,
        "cardType": "A",
        "text": "The power of friendship.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1108,
        "cardType": "A",
        "text": "This card intentionally left blank.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1109,
        "cardType": "A",
        "text": "Throwing water on a braless woman in a white t-shirt",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1110,
        "cardType": "A",
        "text": "Upskirts.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1111,
        "cardType": "A",
        "text": "Wasting all your money on hookers and booze.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1112,
        "cardType": "A",
        "text": "Winning.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1113,
        "cardType": "A",
        "text": "A foot fetish.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1114,
        "cardType": "A",
        "text": "A powerful gag reflex.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1115,
        "cardType": "A",
        "text": "A tight, Asian pussy.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1116,
        "cardType": "A",
        "text": "Explosive decompression.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1117,
        "cardType": "A",
        "text": "Extraordinary Rendition.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1118,
        "cardType": "A",
        "text": "Forgetting the safety word.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1119,
        "cardType": "A",
        "text": "Greeting Christmas carollers naked.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1120,
        "cardType": "A",
        "text": "Handcuffs, without the key.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1121,
        "cardType": "A",
        "text": "Having a drill for a penis.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1122,
        "cardType": "A",
        "text": "Hot Jailbait Ass.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1123,
        "cardType": "A",
        "text": "Liposuction gone horrible wrong.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1124,
        "cardType": "A",
        "text": "My harem of scantily clad women.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1125,
        "cardType": "A",
        "text": "Nazi Zombie Robot Ninjas.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1126,
        "cardType": "A",
        "text": "Redneck gypsies.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1127,
        "cardType": "A",
        "text": "Scissoring.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1128,
        "cardType": "A",
        "text": "A guy and two robots who won’t shut up.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1129,
        "cardType": "A",
        "text": "A shotgun wedding.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1130,
        "cardType": "A",
        "text": "Anne Frank's diary",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1131,
        "cardType": "A",
        "text": "Autoerotic asphyxiation.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1132,
        "cardType": "A",
        "text": "Blow Up Bianca the Latex Lovedoll.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1133,
        "cardType": "A",
        "text": "Endlessly tumbling down an up escalator.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1134,
        "cardType": "A",
        "text": "Fun with nuns.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1135,
        "cardType": "A",
        "text": "Getting it all over the walls.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1136,
        "cardType": "A",
        "text": "Holiday Dinner by Jack Daniels.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1137,
        "cardType": "A",
        "text": "Nailgun fights.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1138,
        "cardType": "A",
        "text": "Teaching the bitch a lesson.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1139,
        "cardType": "A",
        "text": "Nazi super science.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1140,
        "cardType": "A",
        "text": "Making a human centipede.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1141,
        "cardType": "Q",
        "text": "Between love and madness lies _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1142,
        "cardType": "Q",
        "text": "Instead of chess, the Grim Reaper now gambles for your soul with a game of _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1143,
        "cardType": "Q",
        "text": "My father gave his life fighting to protect _ from _.",
        "numAnswers": 2,
        "expansion": "NSFH"
    },
    {
        "id": 1144,
        "cardType": "Q",
        "text": "Why is my throat sore?",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1145,
        "cardType": "Q",
        "text": "_ sparked a city-wide riot that only ended with _.",
        "numAnswers": 2,
        "expansion": "NSFH"
    },
    {
        "id": 1146,
        "cardType": "Q",
        "text": "I’m very sorry Mrs. Smith, but Little Billy has tested positive for _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1147,
        "cardType": "Q",
        "text": "Instead of beating them, Chris Brown now does _ to women.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1148,
        "cardType": "Q",
        "text": "Instead of cutting, trendy young emo girls now engage in _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1149,
        "cardType": "Q",
        "text": "The definition of rock bottom is gambling away _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1150,
        "cardType": "Q",
        "text": "The Mayan prophecies really heralded the coming of _ in 2012.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1151,
        "cardType": "Q",
        "text": "The next US election will be fought on the key issues of _ against _.",
        "numAnswers": 2,
        "expansion": "NSFH"
    },
    {
        "id": 1152,
        "cardType": "Q",
        "text": "When I was 10 I wrote to Santa wishing for _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1153,
        "cardType": "Q",
        "text": "Where or How I met my last signifigant other: _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1154,
        "cardType": "Q",
        "text": "_, Never leave home without it.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1155,
        "cardType": "Q",
        "text": "_. This is my fetish.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1156,
        "cardType": "Q",
        "text": "David Icke's newest conspiracy theory states that _ caused _.",
        "numAnswers": 2,
        "expansion": "NSFH"
    },
    {
        "id": 1157,
        "cardType": "Q",
        "text": "I did _ so you don't have to!",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1158,
        "cardType": "Q",
        "text": "I need your clothes, your bike, and _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1159,
        "cardType": "Q",
        "text": "In a new Cold War retro movie, the red menace tries to conquer the world through the cunning use of _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1160,
        "cardType": "Q",
        "text": "In college, our lecturer made us write a report comparing _ to _.",
        "numAnswers": 2,
        "expansion": "NSFH"
    },
    {
        "id": 1161,
        "cardType": "Q",
        "text": "In The Hangover part 3, those four guys have to deal with _, _, and _.",
        "numAnswers": 3,
        "expansion": "NSFH"
    },
    {
        "id": 1162,
        "cardType": "Q",
        "text": "My zombie survival kit includes food, water, and _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1163,
        "cardType": "Q",
        "text": "The way to a man's heart is through _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1164,
        "cardType": "Q",
        "text": "What was the theme of my second wedding?",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1165,
        "cardType": "Q",
        "text": "What's the newest Japanese craze to head West?",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1166,
        "cardType": "Q",
        "text": "Everybody loves _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1167,
        "cardType": "Q",
        "text": "I can only express myself through _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1168,
        "cardType": "Q",
        "text": "My new porn DVD was completely ruined by the inclusion of _",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1169,
        "cardType": "Q",
        "text": "My three wishes will be for _, _, and _.",
        "numAnswers": 3,
        "expansion": "NSFH"
    },
    {
        "id": 1170,
        "cardType": "Q",
        "text": "The latest horrifying school shooting was inspired by _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1171,
        "cardType": "Q",
        "text": "I got fired because of my not-so-secret obsession over _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1172,
        "cardType": "Q",
        "text": "My new favourite sexual position is _",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1173,
        "cardType": "A",
        "text": "The primal, ball-slapping sex your parents are having right now.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1174,
        "cardType": "A",
        "text": "A cat video so cute that your eyes roll back and your spine slides out of your anus.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1175,
        "cardType": "A",
        "text": "Cock.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1176,
        "cardType": "A",
        "text": "A cop who is also a dog.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1177,
        "cardType": "A",
        "text": "Dying alone and in pain.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1178,
        "cardType": "A",
        "text": "Gay aliens.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1179,
        "cardType": "A",
        "text": "The way white people is.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1180,
        "cardType": "A",
        "text": "Reverse cowgirl.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1181,
        "cardType": "A",
        "text": "The Quesadilla Explosion Salad&trade; from Chili's&copy;.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1182,
        "cardType": "A",
        "text": "Actually getting shot, for real.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1183,
        "cardType": "A",
        "text": "Not having sex.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1184,
        "cardType": "A",
        "text": "Vietnam flashbacks.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1185,
        "cardType": "A",
        "text": "Running naked through a mall, pissing and shitting everywhere.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1186,
        "cardType": "A",
        "text": "Nothing.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1187,
        "cardType": "A",
        "text": "Warm, velvety muppet sex.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1188,
        "cardType": "A",
        "text": "Self-flagellation.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1189,
        "cardType": "A",
        "text": "The systematic destruction of an entire people and their way of life.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1190,
        "cardType": "A",
        "text": "Samuel L. Jackson.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1191,
        "cardType": "A",
        "text": "A boo-boo.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1192,
        "cardType": "A",
        "text": "Going around punching people.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1193,
        "cardType": "A",
        "text": "The entire Internet.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1194,
        "cardType": "A",
        "text": "Some kind of bird-man.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1195,
        "cardType": "A",
        "text": "Chugging a lava lamp.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1196,
        "cardType": "A",
        "text": "Having sex on top of a pizza.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1197,
        "cardType": "A",
        "text": "Indescribable loneliness.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1198,
        "cardType": "A",
        "text": "An ass disaster.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1199,
        "cardType": "A",
        "text": "Shutting the fuck up.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1200,
        "cardType": "A",
        "text": "All my friends dying.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1201,
        "cardType": "A",
        "text": "Putting an entire peanut butter and jelly sandwich into the VCR.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1202,
        "cardType": "A",
        "text": "Spending lots of money.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1203,
        "cardType": "A",
        "text": "Some douche with an acoustic guitar.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1204,
        "cardType": "A",
        "text": "Flying robots that kill people.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1205,
        "cardType": "A",
        "text": "A greased-up Matthew McConaughey.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1206,
        "cardType": "A",
        "text": "An unstoppable wave of fire ants.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1207,
        "cardType": "A",
        "text": "Not contributing to society in any meaningful way.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1208,
        "cardType": "A",
        "text": "An all-midget production of Shakespeare's Richard III.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1209,
        "cardType": "A",
        "text": "Screaming like a maniac.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1210,
        "cardType": "A",
        "text": "The moist, demanding chasm of his mouth.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1211,
        "cardType": "A",
        "text": "Filling every orifice with butterscotch pudding.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1212,
        "cardType": "A",
        "text": "Unlimited soup, salad, and breadsticks.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1213,
        "cardType": "A",
        "text": "Crying into the pages of Sylvia Plath.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1214,
        "cardType": "A",
        "text": "Velcro&trade;.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1215,
        "cardType": "A",
        "text": "A PowerPoint presentation.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1216,
        "cardType": "A",
        "text": "A surprising amount of hair.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1217,
        "cardType": "A",
        "text": "Eating Tom Selleck's mustache to gain his powers.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1218,
        "cardType": "A",
        "text": "Roland the Farter, flatulist to the king.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1219,
        "cardType": "A",
        "text": "That ass.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1220,
        "cardType": "A",
        "text": "A pile of squirming bodies.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1221,
        "cardType": "A",
        "text": "Buying the right pants to be cool.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1222,
        "cardType": "A",
        "text": "Blood farts.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1223,
        "cardType": "A",
        "text": "Three months in the hole.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1224,
        "cardType": "A",
        "text": "A botched circumcision.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1225,
        "cardType": "A",
        "text": "The Land of Chocolate.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1226,
        "cardType": "A",
        "text": "Slapping a racist old lady.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1227,
        "cardType": "A",
        "text": "A lamprey swimming up the toilet and latching onto your taint.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1228,
        "cardType": "A",
        "text": "Jumping out at people.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1229,
        "cardType": "A",
        "text": "A black male in his early 20s, last seen wearing a hoodie.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1230,
        "cardType": "A",
        "text": "Mufasa's death scene.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1231,
        "cardType": "A",
        "text": "Bill Clinton, naked on a bearskin rug with a saxophone.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1232,
        "cardType": "A",
        "text": "Demonic possession.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1233,
        "cardType": "A",
        "text": "The Harlem Globetrotters.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1234,
        "cardType": "A",
        "text": "Vomiting mid-blowjob.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1235,
        "cardType": "A",
        "text": "My manservant, Claude.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1236,
        "cardType": "A",
        "text": "Having shotguns for legs.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1237,
        "cardType": "A",
        "text": "Letting everyone down.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1238,
        "cardType": "A",
        "text": "A spontaneous conga line.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1239,
        "cardType": "A",
        "text": "A vagina that leads to another dimension.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1240,
        "cardType": "A",
        "text": "Disco fever.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1241,
        "cardType": "A",
        "text": "Getting your dick stuck in a Chinese finger trap with another dick.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1242,
        "cardType": "A",
        "text": "Fisting.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1243,
        "cardType": "A",
        "text": "The thin veneer of situational causality that underlies porn.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1244,
        "cardType": "A",
        "text": "Girls that always be textin'.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1245,
        "cardType": "A",
        "text": "Blowing some dudes in an alley.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1246,
        "cardType": "A",
        "text": "Drinking ten 5-hour ENERGYs&reg; to get fifty continuous hours of energy.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1247,
        "cardType": "A",
        "text": "Sneezing, farting, and coming at the same time.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1248,
        "cardType": "Q",
        "text": "A successful job interview begins with a firm handshake and ends with _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1249,
        "cardType": "Q",
        "text": "Lovin' you is easy 'cause you're _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1250,
        "cardType": "Q",
        "text": "My life is ruled by a vicious cycle of _ and _.",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1251,
        "cardType": "Q",
        "text": "The blind date was going horribly until we discovered our shared interest in _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1252,
        "cardType": "Q",
        "text": "_. Awesome in theory, kind of a mess in practice.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1253,
        "cardType": "Q",
        "text": "I'm not like the rest of you. I'm too rich and busy for _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1254,
        "cardType": "Q",
        "text": "In the seventh circle of Hell, sinners must endure _ for all eternity.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1255,
        "cardType": "Q",
        "text": "_: Hours of fun. Easy to use. Perfect for _!",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1256,
        "cardType": "Q",
        "text": "What left this stain on my couch?",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1257,
        "cardType": "Q",
        "text": "Call the law offices of Goldstein & Goldstein, because no one should have to tolerate _ in the workplace.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1258,
        "cardType": "Q",
        "text": "When you get right down to it, _ is just _.",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1259,
        "cardType": "Q",
        "text": "Turns out that _-Man was neither the hero we needed nor wanted.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1260,
        "cardType": "Q",
        "text": "As part of his daily regimen, Anderson Cooper sets aside 15 minutes for _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1261,
        "cardType": "Q",
        "text": "Money can't buy me love, but it can buy me _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1262,
        "cardType": "Q",
        "text": "With enough time and pressure, _ will turn into _.",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1263,
        "cardType": "Q",
        "text": "And what did you bring for show and tell?",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1264,
        "cardType": "Q",
        "text": "During high school, I never really fit in until I found _ club.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1265,
        "cardType": "Q",
        "text": "Hey, baby, come back to my place and I'll show you _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1266,
        "cardType": "Q",
        "text": "After months of practice with _, I think I'm finally ready for _.",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1267,
        "cardType": "Q",
        "text": "To prepare for his upcoming role, Daniel Day-Lewis immersed himself in the world of _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1268,
        "cardType": "Q",
        "text": "Finally! A service that delivers _ right to your door.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1269,
        "cardType": "Q",
        "text": "My gym teacher got fired for adding _ to the obstacle course.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1270,
        "cardType": "Q",
        "text": "Having problems with _? Try _!",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1271,
        "cardType": "Q",
        "text": "As part of his contract, Prince won't perform without _ in his dressing room.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1272,
        "cardType": "Q",
        "text": "Listen, son. If you want to get involved with _, I won't stop you. Just steer clear of _.",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1273,
        "cardType": "A",
        "text": "A freshly-filled diaper",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1274,
        "cardType": "A",
        "text": "Glue",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1275,
        "cardType": "A",
        "text": "An unusually-attractive transvestite",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1276,
        "cardType": "A",
        "text": "Hand-me-down adult diapers",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1277,
        "cardType": "A",
        "text": "A stillborn fetus",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1278,
        "cardType": "A",
        "text": "A disgraced pelican",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1279,
        "cardType": "A",
        "text": "Three buckets of urine, free for 2 nights, with no late fee",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1280,
        "cardType": "A",
        "text": "My testicles",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1281,
        "cardType": "A",
        "text": "A black woman's vagina",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1282,
        "cardType": "A",
        "text": "My asshole",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1283,
        "cardType": "A",
        "text": "A whale's blowhole",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1284,
        "cardType": "A",
        "text": "2 Girls 1 Cup",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1285,
        "cardType": "A",
        "text": "The Big Bang Theory (TV)",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1286,
        "cardType": "A",
        "text": "Teen pregnancy",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1287,
        "cardType": "A",
        "text": "Ass hair",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1288,
        "cardType": "A",
        "text": "Vaginal warts",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1289,
        "cardType": "A",
        "text": "Ellen Degeneres",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1290,
        "cardType": "A",
        "text": "Jews Against Humanity",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1291,
        "cardType": "A",
        "text": "Indy wrestling",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1292,
        "cardType": "A",
        "text": "Cunt",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1293,
        "cardType": "A",
        "text": "Beating a crowd of delightful parents to death with a steel dildo",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1294,
        "cardType": "A",
        "text": "Beating a crowd of delightful parents to death with a steel dildo while dressed as Ru Paul's brother, Ron.",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1295,
        "cardType": "A",
        "text": "A roll in the hay",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1296,
        "cardType": "A",
        "text": "\"Get 'em, Steve-Dave!\"",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1297,
        "cardType": "A",
        "text": "God Hates You",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1298,
        "cardType": "A",
        "text": "Manboobs.",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1299,
        "cardType": "A",
        "text": "Daniel Benoit",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1300,
        "cardType": "A",
        "text": "Vomiting in the shower",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1301,
        "cardType": "Q",
        "text": "I just met you and this is crazy, but here's _, so _ maybe",
        "numAnswers": 2,
        "expansion": "Image1"
    },
    {
        "id": 1302,
        "cardType": "Q",
        "text": "It's only _ if you get caught!",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1303,
        "cardType": "Q",
        "text": "_: The Next Generation",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1304,
        "cardType": "Q",
        "text": "Terminator 4: _",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1305,
        "cardType": "Q",
        "text": "Disney presents _ on ice!",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1306,
        "cardType": "Q",
        "text": "_. The other white meat.",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1307,
        "cardType": "Q",
        "text": "A _ a day keeps the _ away.",
        "numAnswers": 2,
        "expansion": "Image1"
    },
    {
        "id": 1308,
        "cardType": "A",
        "text": "An intellectually superior overlord",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1309,
        "cardType": "Q",
        "text": "I'm sweating like a _ at a _.",
        "numAnswers": 2,
        "expansion": "Image1"
    },
    {
        "id": 1310,
        "cardType": "Q",
        "text": "I love the smell of _ in the morning.",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1311,
        "cardType": "Q",
        "text": "You're not gonna believe this, but _.",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1312,
        "cardType": "A",
        "text": "Dwight Schrute",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1313,
        "cardType": "A",
        "text": "Casey Anthony",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1314,
        "cardType": "A",
        "text": "Clubbin seals",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1315,
        "cardType": "A",
        "text": "Stunt cock",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1316,
        "cardType": "Q",
        "text": "_. All the cool kids are doing it.",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1317,
        "cardType": "A",
        "text": "Anal lice",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1318,
        "cardType": "Q",
        "text": "So I was _ in my cubicle at work, and suddenly _!",
        "numAnswers": 2,
        "expansion": "Image1"
    },
    {
        "id": 1319,
        "cardType": "A",
        "text": "Lightsaber Dildos",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1320,
        "cardType": "Q",
        "text": "Baskin Robbins just added a 32nd flavor: _!",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1321,
        "cardType": "Q",
        "text": "I can drive and ____ at the same time.",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1322,
        "cardType": "Q",
        "text": "_ ain't nothin' to fuck wit'!",
        "numAnswers": 1,
        "expansion": "Image1"
    }
];
exports.default = cards;
