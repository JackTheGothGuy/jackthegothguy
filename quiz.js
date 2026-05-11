// quiz.js - All quiz logic for Jack's Vault quiz.html
// Updated with real character images, properly sized

// ============================================================
// IMAGE NOTE: All result images are 120x120 (object-fit cover)
// Gallery banners are 100x50 via placehold.co
// ============================================================

var QUIZZES = {

  hp: {
    id: "hp",
    title: "Which Harry Potter Character R U??",
    intro: "OMG this is my Favourite quiz I made!! It took me like 2 hours 2 make lol. Answer honestly ok?? No cheating 2 get the character u want!! There r 4 possible results: Harry, Hermione, Ron, or Draco!!",
    type: "radio",
    questions: [
      {
        text: "1. What do u do on a Friday night?",
        name: "hp_q1",
        options: [
          { label: "Study in the library just in case", value: "Hr" },
          { label: "Sneak out 4 an adventure w/ ur friends", value: "H" },
          { label: "Eat food and play wizard chess lol", value: "R" },
          { label: "Make fun of people who r below u", value: "D" }
        ]
      },
      {
        text: "2. Ur best subject at school would b:",
        name: "hp_q2",
        options: [
          { label: "Everything. Ur the smartest in class", value: "Hr" },
          { label: "Defense Against the Dark Arts / gym class", value: "H" },
          { label: "Lunch. Does that count lol", value: "R" },
          { label: "Whatever class makes u look the best", value: "D" }
        ]
      },
      {
        text: "3. Whats more important 2 u?",
        name: "hp_q3",
        options: [
          { label: "Knowledge and doing the right thing", value: "Hr" },
          { label: "Protecting the ppl u care about", value: "H" },
          { label: "Ur friends + having a good time", value: "R" },
          { label: "Power, status, and ur family name", value: "D" }
        ]
      },
      {
        text: "4. Someone is bullying ur friend - u:",
        name: "hp_q4",
        options: [
          { label: "Jump in 2 defend them no matter what", value: "H" },
          { label: "Report it 2 a teacher &amp; document everything", value: "Hr" },
          { label: "Stand there awkwardly but feel really bad", value: "R" },
          { label: "U r the one doing the bullying tbh", value: "D" }
        ]
      },
      {
        text: "5. Pick a color!!",
        name: "hp_q5",
        options: [
          { label: "Red &amp; Gold (ur Favourite)", value: "H" },
          { label: "Blue &amp; Bronze - smart and wise", value: "Hr" },
          { label: "Orange!! bright and happy", value: "R" },
          { label: "Silver &amp; Green obv", value: "D" }
        ]
      },
      {
        text: "6. Ur flaw is that u r:",
        name: "hp_q6",
        options: [
          { label: "A total know-it-all sometimes", value: "Hr" },
          { label: "Reckless and dont think b4 u act", value: "H" },
          { label: "Insecure &amp; jealous of others", value: "R" },
          { label: "Mean and care too much about status", value: "D" }
        ]
      }
    ],
    scoreKeys: ["H", "Hr", "R", "D"],
    results: {
      H:  {
        name: "&#9733; HARRY POTTER!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "U r brave, loyal, and always ready 2 do the right thing even when its hard. Sometimes u act without thinking but ur heart is always in the right place!! Ur the chosen one lol &hearts;"
      },
      Hr: {
        name: "&#9733; HERMIONE GRANGER!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/en/d/d3/Hermione_Granger_poster.jpg",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "OMG ur SO smart and u work SO hard!! U sometimes come off as a know-it-all but ur just passionate about learning. Ur the most reliable friend anyone could have &hearts;"
      },
      R:  {
        name: "&#9733; RON WEASLEY!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/en/5/5e/Ron_Weasley_poster.jpg",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "U r funny, loyal, and a little goofy but ppl luv u 4 it!! U have a big heart and ur friendship means everything. U r more awesome than u think!! &hearts;"
      },
      D:  {
        name: "&#9733; DRACO MALFOY!! &#9733;",
        img: "https://static.wikia.nocookie.net/harrypotter/images/e/e8/Draco_Malfoy_poster.png",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "Lol ok so ur a lil bit mean sometimes but we luv 2 hate u!! U r super confident and deep down theres more 2 u than ur rep suggests... maybe lol &hearts;"
      }
    }
  },

  band: {
    id: "band",
    title: "Which Band R U Most Like??",
    intro: "Ok so I luv all these bands SO much and I always wonder which 1 I am most like lol. Results: Linkin Park, Evanescence, Simple Plan, or Green Day!! Which 1 will u get??",
    type: "radio",
    questions: [
      {
        text: "1. How would ur friends describe ur vibe?",
        name: "band_q1",
        options: [
          { label: "Intense and emotional but also really cool", value: "LP" },
          { label: "Dark, mysterious, kinda gothic but beautiful", value: "EV" },
          { label: "Angsty but in a fun pop-punk kinda way lol", value: "SP" },
          { label: "Rebellious!! Punk rock 4ever", value: "GD" }
        ]
      },
      {
        text: "2. Whats ur Favourite thing 2 write/talk about?",
        name: "band_q2",
        options: [
          { label: "Inner conflict - trying 2 find ur place", value: "LP" },
          { label: "Pain, darkness, being misunderstood", value: "EV" },
          { label: "How ur parents just dont GET u", value: "SP" },
          { label: "Politics and society and not conforming", value: "GD" }
        ]
      },
      {
        text: "3. Pick a lyric vibe that speaks 2 ur soul:",
        name: "band_q3",
        options: [
          { label: '"I tried so hard and got so far..."', value: "LP" },
          { label: '"Wake me up inside... SAVE ME"', value: "EV" },
          { label: '"I\'m just a kid and life is a nightmare"', value: "SP" },
          { label: '"Do u have the time 2 listen 2 me whine"', value: "GD" }
        ]
      },
      {
        text: "4. Ur ideal concert outfit:",
        name: "band_q4",
        options: [
          { label: "Baggy jeans + hoodie + backwards cap", value: "LP" },
          { label: "Black corset dress + dramatic eye makeup", value: "EV" },
          { label: "Band tee + tie + checkered Vans", value: "SP" },
          { label: "Ripped jeans + leather jacket + eyeliner", value: "GD" }
        ]
      },
      {
        text: "5. The best thing about music is:",
        name: "band_q5",
        options: [
          { label: "How it blends totally different genres together", value: "LP" },
          { label: "The way it captures feelings no words can", value: "EV" },
          { label: "That it makes u feel less alone when life sucks", value: "SP" },
          { label: "Its power 2 make ppl angry and think differently", value: "GD" }
        ]
      }
    ],
    scoreKeys: ["LP", "EV", "SP", "GD"],
    results: {
      LP: {
        name: "&#9733; LINKIN PARK!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Linkin_Park_at_Download_2014_%28cropped%29.jpg/320px-Linkin_Park_at_Download_2014_%28cropped%29.jpg",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "OMG yes!! U r intense, emotional, and totally passionate. U blend different sides of urself in a unique way and ppl r drawn 2 ur energy!! In the end it doesnt even matter &hearts;"
      },
      EV: {
        name: "&#9733; EVANESCENCE!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Evanescence_-_Amy_Lee_-_2012_%28cropped%29.jpg/320px-Evanescence_-_Amy_Lee_-_2012_%28cropped%29.jpg",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "U r dark, beautiful, and deeply emotional. U feel everything SO intensely and u express urself in ways that take ppls breath away. U r unique and mysterious &hearts;"
      },
      SP: {
        name: "&#9733; SIMPLE PLAN!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Simple_Plan_2010.jpg/320px-Simple_Plan_2010.jpg",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "Lol ur totally the angsty pop-punk type and tbh thats amazin!! U feel like no1 gets u but u keep ur sense of humor about it. Ur friends luv that about u &hearts;"
      },
      GD: {
        name: "&#9733; GREEN DAY!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Green_Day_-_Reading_2013_%28cropped%29.jpg/320px-Green_Day_-_Reading_2013_%28cropped%29.jpg",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "U r a total rebel and u dont care what ppl think!! U stand up 4 what u believe in and ur not afraid 2 b different. American Idiot = ur anthem tbh lol &hearts;"
      }
    }
  },

  lotr: {
    id: "lotr",
    title: "Which LOTR Character R U??",
    intro: "OMG Lord of the Rings is like my Favourite thing EVER!! Return of the King comes out in December and I am SO hyped!! Find out if ur Frodo, Aragorn, Legolas, Gandalf, or Samwise!!",
    type: "radio",
    questions: [
      {
        text: "1. When things get really hard u:",
        name: "lotr_q1",
        options: [
          { label: "Keep going even when u feel like u cant", value: "F" },
          { label: "Step up and lead even tho u didnt ask 2", value: "A" },
          { label: "Stay calm and use ur skills precisely", value: "L" },
          { label: "Guide everyone with wisdom from experience", value: "G" },
          { label: "Support ur best friend no matter what", value: "S" }
        ]
      },
      {
        text: "2. In ur friend group u r:",
        name: "lotr_q2",
        options: [
          { label: "The one carrying the biggest burden quietly", value: "F" },
          { label: "The natural leader everyone respects", value: "A" },
          { label: "The cool effortless one with great hair lol", value: "L" },
          { label: "The wise older one with all the advice", value: "G" },
          { label: "The loyal ride-or-die best friend", value: "S" }
        ]
      },
      {
        text: "3. Ur biggest fear is:",
        name: "lotr_q3",
        options: [
          { label: "Being corrupted by power or temptation", value: "F" },
          { label: "Failing the people who r counting on u", value: "A" },
          { label: "Losing ur freedom and grace", value: "L" },
          { label: "Watching the world fall into darkness", value: "G" },
          { label: "Something bad happening 2 ur best friend", value: "S" }
        ]
      },
      {
        text: "4. Pick ur ideal home:",
        name: "lotr_q4",
        options: [
          { label: "A cozy hobbit hole with 2nd breakfast always ready", value: "F" },
          { label: "A grand stone fortress in the mountains", value: "A" },
          { label: "A beautiful elven city in the treetops", value: "L" },
          { label: "A ancient tower full of books and fireworks", value: "G" },
          { label: "Anywhere ur best friend is tbh", value: "S" }
        ]
      },
      {
        text: "5. Someone offers u incredible power - u:",
        name: "lotr_q5",
        options: [
          { label: "Resist it with everything u have - u know its wrong", value: "F" },
          { label: "Use it only if its 4 the good of everyone", value: "A" },
          { label: "Decline gracefully - u dont need it", value: "L" },
          { label: "Refuse - u know better than anyone how dangerous it is", value: "G" },
          { label: "Ask ur friend what 2 do first lol", value: "S" }
        ]
      }
    ],
    scoreKeys: ["F", "A", "L", "G", "S"],
    results: {
      F: {
        name: "&#9733; FRODO BAGGINS!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/en/4/4f/Frodo_Baggins.png",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "U carry huge burdens without complaining and u keep going even when everything feels impossible. U r small but ur the most important person in the room. The ring-bearer!! &hearts;"
      },
      A: {
        name: "&#9733; ARAGORN!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/en/3/35/Aragorn.png",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "U r a natural born leader but ur humble about it!! U have a quiet strength that makes ppl want 2 follow u. U r destined 4 great things even if u doubt urself sometimes &hearts;"
      },
      L: {
        name: "&#9733; LEGOLAS!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/en/c/c5/Legolas_by_tolkien_illustrators.jpg",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "OMG ur so cool and graceful and ppl r always impressed by everything u do!! U make it look effortless. Plus everyone thinks ur really attractive lol &hearts;"
      },
      G: {
        name: "&#9733; GANDALF!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/en/e/e1/Gandalf600ppx.jpg",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "U r wise beyond ur years and ppl always come 2 u 4 advice!! U see the big picture when everyone else is lost. U shall not pass... without giving someone some wisdom first &hearts;"
      },
      S: {
        name: "&#9733; SAMWISE GAMGEE!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/en/b/bf/Sam_Gamgee.png",
        imgStyle: "object-fit:cover; object-position:top center;",
        desc: "U r THE most loyal friend in all of Middle-Earth and thats not an exaggeration!! U show up 4 ur friends no matter what. Samwise is lowkey the real hero and so r u &hearts;"
      }
    }
  },

  element: {
    id: "element",
    title: "Which Element R U??",
    intro: "Fire, Water, Earth, or Air?? This quiz will tell u which element matches ur personality!! I thought of these questions myself and I think theyre pretty accurate lol.",
    type: "radio",
    questions: [
      {
        text: "1. When ur angry u:",
        name: "elem_q1",
        options: [
          { label: "Explode!! Everyone knows ur mad", value: "Fi" },
          { label: "Go quiet and withdraw into urself", value: "Wa" },
          { label: "Stay calm and deal with it practically", value: "Ea" },
          { label: "Vent 2 everyone and then get over it fast", value: "Ai" }
        ]
      },
      {
        text: "2. Ur idea of a perfect day is:",
        name: "elem_q2",
        options: [
          { label: "Doing something exciting and adventurous!!", value: "Fi" },
          { label: "Being near a lake or ocean and just chilling", value: "Wa" },
          { label: "Hiking in the woods or working in the garden", value: "Ea" },
          { label: "Exploring somewhere new and meeting ppl", value: "Ai" }
        ]
      },
      {
        text: "3. Ur friends would say ur:",
        name: "elem_q3",
        options: [
          { label: "Passionate and sometimes a little intense lol", value: "Fi" },
          { label: "Empathetic and a really good listener", value: "Wa" },
          { label: "Reliable, practical, always there 4 them", value: "Ea" },
          { label: "Fun, spontaneous, always full of ideas!!", value: "Ai" }
        ]
      },
      {
        text: "4. Pick a season:",
        name: "elem_q4",
        options: [
          { label: "Summer - hot and alive!!", value: "Fi" },
          { label: "Autumn - moody and beautiful", value: "Wa" },
          { label: "Winter - quiet and still", value: "Ea" },
          { label: "Spring - fresh and full of possibility", value: "Ai" }
        ]
      },
      {
        text: "5. When ur friend is upset u:",
        name: "elem_q5",
        options: [
          { label: "Get fired up on their behalf and wanna fix it NOW", value: "Fi" },
          { label: "Sit with them and let them feel their feelings", value: "Wa" },
          { label: "Give solid practical advice and actually help", value: "Ea" },
          { label: "Distract them with something fun and silly", value: "Ai" }
        ]
      }
    ],
    scoreKeys: ["Fi", "Wa", "Ea", "Ai"],
    results: {
      Fi: {
        name: "&#9733; U R FIRE!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Burning_fire.jpg/320px-Burning_fire.jpg",
        imgStyle: "object-fit:cover;",
        desc: "UR SO FIERCE AND PASSIONATE OMGG!! U feel everything intensely and u go after what u want. Ur energy is contagious and ppl r always drawn 2 ur warmth. Just dont burn everything down lol &hearts;"
      },
      Wa: {
        name: "&#9733; U R WATER!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sunrise_over_the_sea.jpg/320px-Sunrise_over_the_sea.jpg",
        imgStyle: "object-fit:cover;",
        desc: "Ur so deep and emotionally intelligent!! U flow around obstacles and u understand ppl on a level most cant. Ur the friend everyone cries 2 and u never make them feel dumb 4 it &hearts;"
      },
      Ea: {
        name: "&#9733; U R EARTH!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/320px-The_Earth_seen_from_Apollo_17.jpg",
        imgStyle: "object-fit:cover;",
        desc: "Ur so GROUNDED and reliable omg!! Ppl always feel safe around u. Ur the one who actually gets stuff done while everyone else is being dramatic lol. We need more earth ppl &hearts;"
      },
      Ai: {
        name: "&#9733; U R AIR!! &#9733;",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sky_over_Tilaran.jpg/320px-Sky_over_Tilaran.jpg",
        imgStyle: "object-fit:cover;",
        desc: "OMG ur so free spirited and creative!! U get bored easily cuz ur mind is always racing w/ new ideas. Ur super social and u can talk 2 literally anyone. Life is never boring w/ u around &hearts;"
      }
    }
  },

  emo: {
    id: "emo",
    title: "What % Emo R U?? lol",
    intro: "Ok this one is just 4 fun dont take it seriously lol!! I made it at like midnight so idk how accurate it is haha. Answer honestly!! Check all that apply 2 u :)",
    type: "checkbox",
    checkboxLabel: "Check everything that applies 2 u!!",
    checkboxes: [
      "U own at least 3 band tees",
      "U have written poetry about ur feelings",
      "U wear black on a regular basis",
      "Ur fringe covers at least 1 eye",
      "U have a Livejournal or Xanga",
      "U have cried 2 a Linkin Park song",
      "U have \"I'm fine\" as ur away message when ur NOT fine",
      "U own Converse or Vans",
      "U think no1 understands u",
      "U use \"...\" at the end of ur AIM messages a lot...",
      "Ur Favourite color is black (or dark purple)",
      "U have like 50+ songs on ur Winamp playlist",
      "U know what a straight edge is",
      "U have an AIM away message w/ song lyrics in it rn",
      "U sometimes feel like u were born in the wrong era"
    ],
    getResult: function(pct) {
      if (pct <= 20)      return { label: pct + "% Emo - Not Very Emo Tbh Lol",  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Smiley_face.svg/120px-Smiley_face.svg.png", imgStyle: "object-fit:contain; background:#0d000d;", desc: "Ok so ur basically a prep or something lol!! Thats ok not every1 can b deep and tortured. Maybe listen 2 some Linkin Park and come back 2 this quiz in a month haha &hearts;" };
      else if (pct <= 40) return { label: pct + "% Emo - A Little Emo ;)",       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Converse_logo.svg/320px-Converse_logo.svg.png", imgStyle: "object-fit:contain; background:#111;", desc: "Ur dabbling in the emo lifestyle lol!! U have some emo tendencies but ur not fully committed. U probably like 1 or 2 good bands and u wear black sometimes. Ur on the right track!! &hearts;" };
      else if (pct <= 60) return { label: pct + "% Emo - Pretty Emo!!",          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Heart_coraz%C3%B3n.svg/120px-Heart_coraz%C3%B3n.svg.png", imgStyle: "object-fit:contain; background:#0d000d; filter:hue-rotate(200deg);", desc: "OK so ur like half emo half normal person lol. U feel things deeply and u have great taste in music!! U probably have a really good away message up rn. Keep being u!! &hearts;" };
      else if (pct <= 80) return { label: pct + "% Emo - Very Emo omg!!",        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Star_icon_stylized.svg/120px-Star_icon_stylized.svg.png", imgStyle: "object-fit:contain; background:#110011; filter:invert(1) hue-rotate(270deg);", desc: "Wow ur really doing it huh lol!! U r deeply in touch with ur emotions and u express urself through music and writing. Ur Xanga/LJ is probably AMAZING. U r a true emo kid &hearts;" };
      else                return { label: pct + "% Emo - MAXIMUM EMO!!",          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Star_icon_stylized.svg/120px-Star_icon_stylized.svg.png", imgStyle: "object-fit:contain; background:#0d000d; filter:invert(1) hue-rotate(300deg) brightness(2);", desc: "OMG UR SO EMO LMAO!! Like fully completely emo. Ur fringe is covering ur eye rn isnt it. Ur listening 2 something sad on Winamp. We would totally b friends lol &hearts;&hearts;&hearts;" };
    }
  },

  anime: {
    id: "anime",
    title: "Which Anime Character Personality R U??",
    intro: "Ok I kno Im not like a HUGE anime person but I watch sum and I think these archetypes r so real lol!! Find out which classic anime personality type u r!! There r 4 results!!",
    type: "radio",
    questions: [
      {
        text: "1. In a group project u r:",
        name: "anime_q1",
        options: [
          { label: "The one who does everything urself cuz u care SO much", value: "hero" },
          { label: "The quiet genius in the corner doing all the thinking", value: "cool" },
          { label: "The funny one keeping everyones spirits up", value: "funny" },
          { label: "The sweet one who makes sure everyone gets along", value: "sweet" }
        ]
      },
      {
        text: "2. Ur catchphrase would b something like:",
        name: "anime_q2",
        options: [
          { label: '"I will never give up!! This is my ninja/pirate/whatever way!!"', value: "hero" },
          { label: '"Hmm. Interesting."  *adjusts glasses*', value: "cool" },
          { label: '"NANI?? OMG WHAT LOL"', value: "funny" },
          { label: '"Are u ok?? Do u need anything?? &hearts;"', value: "sweet" }
        ]
      },
      {
        text: "3. In a fight u:",
        name: "anime_q3",
        options: [
          { label: "Charge in head first on pure passion and guts", value: "hero" },
          { label: "Calculate everything and win in like 2 moves", value: "cool" },
          { label: "Accidentally win while being confused lol", value: "funny" },
          { label: "Try 2 negotiate peace b4 anyone gets hurt", value: "sweet" }
        ]
      },
      {
        text: "4. Ur power/special ability would b:",
        name: "anime_q4",
        options: [
          { label: "Sheer willpower - u get stronger when ur losing", value: "hero" },
          { label: "Ridiculous intelligence and planning 10 steps ahead", value: "cool" },
          { label: "Dumb luck - somehow always works out 4 u", value: "funny" },
          { label: "The power of friendship - not even joking lol", value: "sweet" }
        ]
      },
      {
        text: "5. Ur fatal flaw is:",
        name: "anime_q5",
        options: [
          { label: "U r SO reckless and never think b4 u act omg", value: "hero" },
          { label: "Ur emotionally closed off and kind of cold tbh", value: "cool" },
          { label: "Nobody takes u seriously even tho ur actually smart", value: "funny" },
          { label: "U care TOO much about everyone else and neglect urself", value: "sweet" }
        ]
      }
    ],
    scoreKeys: ["hero", "cool", "funny", "sweet"],
    results: {
      hero:  {
        name: "&#9733; THE PASSIONATE HERO!! &#9733;",
        img: "https://placehold.co/120x120/ff4400/ffcc00?text=HERO!!&font=courier",
        imgStyle: "object-fit:cover;",
        desc: "OMG ur literally Naruto/Luffy/Goku energy lol!! U never give up, u fight with ur whole heart, and ur nakama means EVERYTHING 2 u. Ur annoying sometimes but everyone luv u so much &hearts;"
      },
      cool:  {
        name: "&#9733; THE COOL GENIUS!! &#9733;",
        img: "https://placehold.co/120x120/000033/9999ff?text=GENIUS&font=courier",
        imgStyle: "object-fit:cover;",
        desc: "Ur giving total L (from Death Note) vibes or Sasuke vibes!! Ur scary smart and kinda mysterious. Ppl r intimidated by u but they also really want ur approval lol &hearts;"
      },
      funny: {
        name: "&#9733; THE COMIC RELIEF!! &#9733;",
        img: "https://placehold.co/120x120/ff6600/ffffff?text=LOL+XD&font=courier",
        imgStyle: "object-fit:cover;",
        desc: "Ur the funniest person in any room and u make every situation better just by being there!! Ppl underestimate u but ur actually lowkey amazing. Ur a Haruhi/Sokka type &hearts;"
      },
      sweet: {
        name: "&#9733; THE SWEET SUPPORTER!! &#9733;",
        img: "https://placehold.co/120x120/cc0066/ffaacc?text=%26hearts%3B&font=courier",
        imgStyle: "object-fit:cover;",
        desc: "Ur literally the warmest most caring person and every friend group NEEDS a u!! U put everyone else first (sometimes 2 much lol). Ur a Tohru/Hinata type and thats beautiful &hearts;"
      }
    }
  },

  punk: {
    id: "punk",
    title: "How Punk R U Really??",
    intro: "Ok so everyone online claims 2 b punk but how punk r u ACTUALLY lol?? This quiz will tell u the truth!! No cheating!! Check everything that genuinely applies 2 u!!",
    type: "checkbox",
    checkboxLabel: "Check everything that is actually true 4 u!!",
    checkboxes: [
      "U have or want a mohawk / liberty spikes / dyed hair",
      "U own a studded belt or jacket",
      "U have patches on ur clothes",
      "U know who the Sex Pistols, Clash, or Ramones r",
      "U have been 2 a mosh pit",
      "U make/make ur own zines or flyers",
      "U think major labels r selling out",
      "U have DIY modified ur own clothes",
      "U listen 2 punk bands that arent on the radio",
      "U have strong opinions about politics and society",
      "U think Green Day r too mainstream now (controversial lol)",
      "U have screamed lyrics in public without caring",
      "U know the difference between pop punk and hardcore",
      "U have painted something on ur shoes",
      "Ur parents think ur music is noise"
    ],
    getResult: function(pct) {
      if (pct <= 20)      return { label: pct + "% Punk - Not Very Punk Lol",   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Good_Charlotte_-_Berlin_2019_%2848426082437%29_%28cropped%29.jpg/320px-Good_Charlotte_-_Berlin_2019_%2848426082437%29_%28cropped%29.jpg", imgStyle: "object-fit:cover; object-position:top;", desc: "Ok so ur more of a pop punk fan than an actual punk haha!! Thats totally fine. U probably luv Good Charlotte and thats honestly valid. Baby steps!! &hearts;" };
      else if (pct <= 40) return { label: pct + "% Punk - Punk Curious!!",      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Punk_-_by_David_Shankbone.jpg/320px-Punk_-_by_David_Shankbone.jpg", imgStyle: "object-fit:cover; object-position:top;", desc: "Ur dipping ur toes into the punk world!! U have the attitude sometimes but havent fully committed 2 the lifestyle yet. Keep going!! Get some patches!! &hearts;" };
      else if (pct <= 60) return { label: pct + "% Punk - Pretty Punk!!",       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Punk_-_by_David_Shankbone.jpg/320px-Punk_-_by_David_Shankbone.jpg", imgStyle: "object-fit:cover; object-position:top;", desc: "Ur legitimately punk!! U know ur stuff and u live the values even if ur wardrobe isnt full studded-jacket mode yet. Real punks r happy 4 u &hearts;" };
      else if (pct <= 80) return { label: pct + "% Punk - Very Punk omg!!",     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Punk_girl_1.jpg/320px-Punk_girl_1.jpg", imgStyle: "object-fit:cover; object-position:top;", desc: "WOW ur actually really punk!! Like not just aesthetically but actually in terms of values and knowledge and DIY spirit. The punk community claims u &hearts;" };
      else                return { label: pct + "% Punk - MAXIMUM PUNK!!",       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Punk_girl_1.jpg/320px-Punk_girl_1.jpg", imgStyle: "object-fit:cover; object-position:top;", desc: "UR BASICALLY SID VICIOUS MINUS THE BAD STUFF lol!! Seriously ur like the real deal. Ur probably already rolling ur eyes at this quiz cuz quizzes r mainstream lol &hearts;" };
    }
  }

};

// ============================================================
// GALLERY CONFIG
// ============================================================

var GALLERY = [
  { id: "hp",      label: "Which HP Character?",   color: "740001", text: "ffdb00", textStr: "HP+Quiz" },
  { id: "band",    label: "Which Band R U?",        color: "000000", text: "ff0000", textStr: "Band+Quiz" },
  { id: "lotr",    label: "Which LOTR Char?",       color: "1a1a00", text: "c8a800", textStr: "LOTR+Quiz" },
  { id: "element", label: "Which Element R U?",     color: "003366", text: "ff9900", textStr: "Element+Quiz" },
  { id: "emo",     label: "What % Emo R U?",        color: "0d000d", text: "ff99ff", textStr: "Emo+%25+Quiz" },
  { id: "anime",   label: "Which Anime Type?",      color: "000033", text: "ff6699", textStr: "Anime+Quiz" },
  { id: "punk",    label: "How Punk R U?",          color: "111111", text: "00ff00", textStr: "Punk+Quiz" }
];

// ============================================================
// RENDERING HELPERS
// ============================================================

function el(tag, attrs, html) {
  var e = document.createElement(tag);
  if (attrs) {
    for (var k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
  }
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function buildGallery() {
  var wrap = document.getElementById('quiz-gallery');
  if (!wrap) return;
  wrap.innerHTML = '';

  for (var i = 0; i < GALLERY.length; i++) {
    (function(g) {
      var cell = el('td', { style: 'text-align:center; padding:4px;' });
      var link = el('a', { href: '#quiz-area', style: 'text-decoration:none; cursor:pointer;' });
      link.setAttribute('data-quizid', g.id);

      var img = el('img', {
        src: 'https://placehold.co/100x50/' + g.color + '/' + g.text + '?text=' + g.textStr,
        alt: g.label,
        border: '0',
        style: 'display:block; margin:0 auto 2px auto;'
      });

      var lbl = el('span', { style: 'font-size:9px; color:#cc99ff;' }, g.label);
      link.appendChild(img);
      link.appendChild(document.createElement('br'));
      link.appendChild(lbl);
      cell.appendChild(link);
      wrap.appendChild(cell);

      link.onclick = function(e) {
        e.preventDefault();
        loadQuiz(g.id);
        var area = document.getElementById('quiz-area');
        if (area) area.scrollIntoView();
      };
    })(GALLERY[i]);
  }
}

// ============================================================
// QUIZ LOADER
// ============================================================

function loadQuiz(quizId) {
  var quiz = QUIZZES[quizId];
  if (!quiz) return;

  var area = document.getElementById('quiz-area');
  area.innerHTML = '';

  var titleBar = el('div', { 'class': 'box-title' }, '&#9733; ' + quiz.title + ' &#9733;');
  area.appendChild(titleBar);

  var intro = el('p', { 'class': 'quiz-intro' }, quiz.intro);
  area.appendChild(intro);

  var divider = el('div', { 'class': 'star-divider' }, '~ * ~ * ~ * ~ * ~ * ~');
  area.appendChild(divider);

  var formDiv = el('div', { id: quizId + '-form' });

  if (quiz.type === 'radio') {
    for (var q = 0; q < quiz.questions.length; q++) {
      var qdata = quiz.questions[q];
      var qDiv = el('div', { 'class': 'quiz-question' }, qdata.text);
      formDiv.appendChild(qDiv);

      for (var o = 0; o < qdata.options.length; o++) {
        var opt = qdata.options[o];
        var label = el('label', { 'class': 'quiz-option' });
        var radio = el('input', { type: 'radio', name: qdata.name, value: opt.value });
        label.appendChild(radio);
        label.appendChild(document.createTextNode(' '));
        var span = el('span', {});
        span.innerHTML = opt.label;
        label.appendChild(span);
        formDiv.appendChild(label);
      }
    }

    var errDiv = el('div', { 'class': 'quiz-error', id: quizId + '-error' }, '!! plz answer ALL the questions b4 submitting !!');
    formDiv.appendChild(errDiv);
    formDiv.appendChild(document.createElement('br'));

    var btn = el('button', { 'class': 'quiz-submit' }, '&#9654; GET MY RESULT!!');
    (function(qid) { btn.onclick = function() { submitRadioQuiz(qid); }; })(quizId);
    formDiv.appendChild(btn);

  } else if (quiz.type === 'checkbox') {
    var cbLabel = el('div', { 'class': 'quiz-question' }, quiz.checkboxLabel);
    formDiv.appendChild(cbLabel);

    for (var c = 0; c < quiz.checkboxes.length; c++) {
      var clabel = el('label', { 'class': 'quiz-option' });
      var cb = el('input', { type: 'checkbox', 'class': quizId + '-check', value: '1' });
      clabel.appendChild(cb);
      clabel.appendChild(document.createTextNode(' ' + quiz.checkboxes[c]));
      formDiv.appendChild(clabel);
    }

    formDiv.appendChild(document.createElement('br'));
    var cbBtn = el('button', { 'class': 'quiz-submit' }, '&#9654; FIND OUT MY %!!');
    (function(qid) { cbBtn.onclick = function() { submitCheckboxQuiz(qid); }; })(quizId);
    formDiv.appendChild(cbBtn);
  }

  // Result box
  var resultBox = el('div', { 'class': 'quiz-result-box', id: quizId + '-result' });

  if (quiz.type === 'checkbox') {
    var pctTitle = el('div', { 'class': 'result-title', id: quizId + '-result-pct' });
    resultBox.appendChild(pctTitle);

    // Result image for checkbox quizzes
    var cbResImg = el('img', {
      id: quizId + '-result-img',
      src: '',
      alt: 'result',
      width: '120',
      height: '120',
      style: 'display:block; margin:6px auto; border:2px solid #660099;'
    });
    resultBox.appendChild(cbResImg);

    var barWrap = el('div', { style: 'margin:6px auto; width:160px; background:#0d000d; border:1px solid #660099; height:14px; overflow:hidden;' });
    var barFill = el('div', { id: quizId + '-bar', style: 'background:#cc00cc; height:100%; width:0%; transition:width 0.6s ease;' });
    barWrap.appendChild(barFill);
    resultBox.appendChild(barWrap);

    var pctDesc = el('div', { 'class': 'result-desc', id: quizId + '-result-desc' });
    resultBox.appendChild(pctDesc);
  } else {
    var rName = el('div', { 'class': 'result-title', id: quizId + '-result-name' });
    var rImg  = el('img', {
      id: quizId + '-result-img',
      src: '',
      alt: 'result',
      width: '120',
      height: '120',
      style: 'display:block; margin:6px auto; border:2px solid #660099; background:#0d000d;'
    });
    var rDesc = el('div', { 'class': 'result-desc', id: quizId + '-result-desc' });
    resultBox.appendChild(rName);
    resultBox.appendChild(rImg);
    resultBox.appendChild(rDesc);
  }

  resultBox.appendChild(document.createElement('br'));
  var gbNote = el('div', { style: 'font-size:10px; color:#996699; margin-top:4px;' });
  gbNote.innerHTML = 'Post this result in my <a href="guestbook.php">guestbook</a>!! &hearts;';
  resultBox.appendChild(gbNote);
  resultBox.appendChild(document.createElement('br'));

  var againBtn = el('button', { 'class': 'take-again' }, '&#187; take quiz again');
  (function(qid) { againBtn.onclick = function() { loadQuiz(qid); }; })(quizId);
  resultBox.appendChild(againBtn);

  formDiv.appendChild(resultBox);
  area.appendChild(formDiv);

  var backP = el('p', { style: 'font-size:10px; text-align:center; margin-top:8px;' });
  backP.innerHTML = '<a href="#quiz-gallery-section">&#171; back 2 all quizzes</a>';
  area.appendChild(backP);
}

// ============================================================
// RADIO QUIZ SUBMIT
// ============================================================

function submitRadioQuiz(quizId) {
  var quiz = QUIZZES[quizId];
  var scores = {};
  for (var k = 0; k < quiz.scoreKeys.length; k++) scores[quiz.scoreKeys[k]] = 0;

  var allAnswered = true;
  for (var q = 0; q < quiz.questions.length; q++) {
    var sel = document.querySelector('input[name="' + quiz.questions[q].name + '"]:checked');
    if (!sel) { allAnswered = false; break; }
    scores[sel.value]++;
  }

  var errEl = document.getElementById(quizId + '-error');
  if (!allAnswered) { errEl.style.display = 'block'; return; }
  errEl.style.display = 'none';

  var winner = quiz.scoreKeys[0];
  for (var s = 1; s < quiz.scoreKeys.length; s++) {
    if (scores[quiz.scoreKeys[s]] > scores[winner]) winner = quiz.scoreKeys[s];
  }

  var r = quiz.results[winner];
  document.getElementById(quizId + '-result-name').innerHTML = r.name;

  var imgEl = document.getElementById(quizId + '-result-img');
  imgEl.src = r.img;
  if (r.imgStyle) imgEl.style.cssText += '; ' + r.imgStyle;

  document.getElementById(quizId + '-result-desc').innerHTML = r.desc;
  showResult(quizId);
}

// ============================================================
// CHECKBOX QUIZ SUBMIT
// ============================================================

function submitCheckboxQuiz(quizId) {
  var quiz = QUIZZES[quizId];
  var checked = document.querySelectorAll('.' + quizId + '-check:checked').length;
  var total   = document.querySelectorAll('.' + quizId + '-check').length;
  var pct = Math.round((checked / total) * 100);

  var r = quiz.getResult(pct);
  document.getElementById(quizId + '-result-pct').innerHTML = '&#9733; ' + r.label + ' &#9733;';
  document.getElementById(quizId + '-result-desc').innerHTML = r.desc;

  var imgEl = document.getElementById(quizId + '-result-img');
  if (imgEl && r.img) {
    imgEl.src = r.img;
    if (r.imgStyle) imgEl.style.cssText += '; ' + r.imgStyle;
    imgEl.style.display = 'block';
  }

  showResult(quizId);

  setTimeout(function() {
    var bar = document.getElementById(quizId + '-bar');
    if (bar) bar.style.width = pct + '%';
  }, 80);
}

// ============================================================
// SHOW RESULT
// ============================================================

function showResult(quizId) {
  var form = document.getElementById(quizId + '-form');
  if (!form) return;

  var kids = form.childNodes;
  for (var i = 0; i < kids.length; i++) {
    var kid = kids[i];
    if (kid.id && kid.id === quizId + '-result') continue;
    if (kid.nodeType === 1) kid.style.display = 'none';
  }

  var resultEl = document.getElementById(quizId + '-result');
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================
// INIT
// ============================================================

buildGallery();
loadQuiz('hp');