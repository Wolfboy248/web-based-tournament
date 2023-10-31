class P2Data {
    constructor() {
        let genericTriggers = coop => ['"Start" load action=force_start'].concat(coop ? ['"Flags 1" flags', '"Flags 2" flags "ccafter=Flags 1" action=stop'] : ['"Flags" flags action=stop']);
        let chapterLast = "", chapterIdx = 0;
        let P2Map = e => ({
            filename: e[0],
            splitname: e[1],
            wikiname:
                e[1] == 'Funnel Catch'
                    ? 'Funnel Catch (singleplayer)'
                    : e[1] == 'Funnel Catch Coop'
                        ? 'Funnel Catch'
                        : e[1] == 'Jailbreak'
                            ? 'Jail Break'
                            : e[1] == 'Laser vs Turret'
                                ? 'Laser Vs Turret'
                                : e[1],
            chapter: isNaN(parseInt(e[2])) ? -1 : parseInt(e[2]),
            chapterIdx: (e => {
                let ret = chapterLast == e[2] ? ++chapterIdx : chapterIdx = 1;
                chapterLast = e[2];
                return ret;
            })(e),
            coop: e[3],
            triggers: genericTriggers(e[3]),
            chamberID: e[4],
            cmboard: [],
            fade: e[5],
            wikicontent: '',
            categories: [],
            formattedWiki: '',
            cmAvailability: Math.floor(e[4] / 10000) >= 6 ? 0 : e[4] > -1 ? 1 : -1,
        });
        this.maps = [
            P2Map(['sp_a1_intro1', 'Container Ride', 1, false, 62761, `You have [j]ust passed through an Aperture [S]cience Material E[m]ancipation Grill, which vaporises most Aperture Science equipment that touches it.`]),
            P2Map(['sp_a1_intro2', 'Portal Carousel', 1, false, 62758, `Good. []Because of the tech[n]ical difficulties we [a]re currently experiencing, your test environment is unsuper[v]ised. Be[f]ore re-entering a [r]elaxation vault at the conclusion of testing, please take a m[o]ment to write down the re[s]ults of your test. []An Aperture Sci[e]nce Reintegration [A]ssociate will revive you for an interview when society has been rebuilt.`]),
            P2Map(['sp_a1_intro3', 'Portal Gun', 1, false, 47458, `Good. [I]f you feel that a lethal [m]ilitary android has not respected your rights as detailed in the Law[s] of Robotics, pl[e]ase note it on your Self-[R]eporting Form. []A future Aperture [S]cience Entitlement Associate will initiate the appropriate grievance-filing paperwork.`]),
            P2Map(['sp_a1_intro4', 'Smooth Jazz', 1, false, 47455, ``]),
            P2Map(['sp_a1_intro5', 'Cube Momentum', 1, false, 47452, `Well [d]one. The En[r]ichment Center reminds [y]ou that although circumstances may appear bleak, you are not alon[e]. All Ap[e]rture Science Personality [C]onstructs will rem[a]in functional in ap[o]calyptic, low-power environments of as few as 1 point 1 volts.`]),
            P2Map(['sp_a1_intro6', 'Future Starter', 1, false, 47106, `Good work [g]etting this far, future [s]tarter! That said, if you are simple-minded, ol[d], or irradi[a]ted in such a way th[a]t the future should not s[t]art with you, plea[s]e return to your primitive tribe, and send back someone better qualified for testing.`]),
            P2Map(['sp_a1_intro7', 'Secret Panel', 1, false, 62763, ``]),
            P2Map(['sp_a1_wakeup', 'Wakeup', 1, false, 62759, ``]),
            P2Map(['sp_a2_intro', 'Incinerator', 1, false, 47735, `But the important [t]hing is you're back, with me. And now I'm onto all your little tricks. []So there's nothing to sto[p] us from testing, []for the rest of your life.[] After that, []who knows, maybe I'll take up a hobby. Reanimating the dead, maybe.`]),
            P2Map(['sp_a2_laser_intro', 'Laser Intro', 2, false, 62765, ``]),
            P2Map(['sp_a2_laser_stairs', 'Laser Stairs', 2, false, 47736, `Well [d]one. Here come the test results... []you are a h[o]rrible person.[] Tha[t]'s what it says, []a horrible person. We weren't even testing for that.`]),
            P2Map(['sp_a2_dual_lasers', 'Dual Lasers', 2, false, 47738, `[]Congratulatio[n]s. Not on the test. Most people emerge from su[s]pension terri[b]ly undernourished.[] I want to congra[t]ulate you on beatin[g] the odds and somehow managing to pack on a few pounds.`]),
            P2Map(['sp_a2_laser_over_goo', 'Laser Over Goo', 2, false, 47742, ``]),
            P2Map(['sp_a2_catapult_intro', 'Catapult Intro', 2, false, 62767, `Here's an interesting fact: []you're not breathin[g] real air. []It's too expensive to pump this far down. [W]e just take car[b]on dioxide [o]ut of a room, freshen it up a little, and pump it [b]ack in. []So you'll be [b]reathing the same [r]oom full of air [f]or the rest of your life.`]),
            P2Map(['sp_a2_trust_fling', 'Trust Fling', 2, false, 47744, `{Remember before when I was talking about smelly garbage standing around being useless? That} wa[s] a metaphor. I was actually talking about yo[u]. [A]nd I'm so[r]ry. You didn't react at the time, []so I was [w]orried it [s]ailed right over your head, which would've [m]ade this apolo[g]y seem in[s]ane. []Tha[t]'s why I had to call you garbage a second time just now.`]),
            P2Map(['sp_a2_pit_flings', 'Pit Flings', 2, false, 47465, ``]),
            P2Map(['sp_a2_fizzler_intro', 'Fizzler Intro', 2, false, 47746, ``]),
            P2Map(['sp_a2_sphere_peek', 'Ceiling Catapult', 3, false, 47748, ``]),
            P2Map(['sp_a2_ricochet', 'Ricochet', 3, false, 47751, `Well, you passed the test. []I didn't see [t]he deer today.[] I did [s]ee some humans,[] but with you here I've got more test subjects than I'll ever need.`]),
            P2Map(['sp_a2_bridge_intro', 'Bridge Intro', 3, false, 47752, `Excellent! You're a predator, and the[s]e tests are you[r] prey. [S]peaking of which, I was researching sharks for an upcoming [t]est. [D]o you know who el[s]e murders people who are only trying to help them? []Did you guess 'shar[k]s'? Because th[a]t's wrong. []The correct answer i[s] 'nobody.' Nobody but you is that pointlessly cruel.`]),
            P2Map(['sp_a2_bridge_the_gap', 'Bridge The Gap', 3, false, 47755, `Well done.[] In fac[t], you did so [w]ell, I'm going to note this on your file, in the commen[d]ations sectio[n]. Oh,[] there's lots of [r]oom here. []'Did well. Enough.'`]),
            P2Map(['sp_a2_turret_intro', 'Turret Intro', 3, false, 47756, ``]),
            P2Map(['sp_a2_laser_relays', 'Laser Relays', 3, false, 47759, `You know how I'm going [t]o live forever, []but you're going to be dea[d] in sixty years? Well, I've been working on a bela[t]ed birthday presen[t] for you. []Well, more of a belated birthday medical pro[c]edure. [W]ell, te[c]hnically, i[t]'s a medical expe[r]iment. What's important is it's a present.`]),
            P2Map(['sp_a2_turret_blocker', 'Turret Blocker', 3, false, 47760, `[]I'm going through the [l]ist of test subjects in cryogenic storage. I [m]anaged to find tw[o] with your last name.[] A m[a]n and a woman.[] So that's interesting. It's a small world.`]),
            P2Map(['sp_a2_laser_vs_turret', 'Laser vs Turret', 3, false, 47763, `[2nd high note] https://cdn.discordapp.com/attachments/574898830995357697/1069483351246905395/laser-vs-turret.mp3`]),
            P2Map(['sp_a2_pull_the_rug', 'Pull The Rug', 3, false, 47764, `I bet [y]ou think I forgot about your surprise. I didn't. []In fact, we're hea[d]ed to your surpris[e] right now. []After al[l] these years. I'm getting choked up just thinking about it.`]),
            P2Map(['sp_a2_column_blocker', 'Column Blocker', 4, false, 47766, ``]),
            P2Map(['sp_a2_laser_chaining', 'Laser Chaining', 4, false, 47768, `I thought about our [d]ilemma, and [I] came up with a sol[u]tion that I honestly think works out best for one of both of us.`]),
            P2Map(['sp_a2_triple_laser', 'Triple Laser', 4, false, 47770, `I think [t]hese test chambers look even better than they did before. []It was easy, re[a]lly. You jus[t] have to look at things [o]bjectively, [s]ee what you don't need anymore, and trim out the fat.`]),
            P2Map(['sp_a2_bts1', 'Jailbreak', 4, false, 47773, ``]),
            P2Map(['sp_a2_bts2', 'Escape', 4, false, 47774, ``]),
            P2Map(['sp_a2_bts3', 'Turret Factory', 5, false, 47776, ``]),
            P2Map(['sp_a2_bts4', 'Turret Sabotage', 5, false, 47779, ``]),
            P2Map(['sp_a2_bts5', 'Neurotoxin Sabotage', 5, false, 47780, ``]),
            P2Map(['sp_a2_core', 'Core', 5, false, 62771, ``]),
            P2Map(['sp_a3_01', 'Underground', 6, false, 47783, ``]),
            P2Map(['sp_a3_03', 'Cave Johnson', 6, false, 47784, ``]),
            P2Map(['sp_a3_jump_intro', 'Repulsion Intro', 6, false, 47787, `Oh, in case you got [c]overed in that repulsion gel, here's some advice the lab boys gave me: []do not get covered in the repulsion gel. We haven't entirely nailed down what element it is yet, but I'll tell you this: it's a lively one, and it does not like the human skeleton.`]),
            P2Map(['sp_a3_bomb_flings', 'Bomb Flings', 6, false, 47468, `Just a heads up, that coffee we gave you earlier had fluores[c]ent calcium in it so we could track the neuronal activity in your brain.[] There's a slight chance the calcium could harden and vitrify your frontal lobe. Anyway, don't stress yourself thinking about it. I'm serious. Visualising the scenario while under stress actually triggers the reaction.`]),
            P2Map(['sp_a3_crazy_box', 'Crazy Box', 6, false, 47469, `{Science isn't} abou[t] "why", it's about "why not!" Why is so mu[c]h of our science dangerous? Why not marry safe science if you [l]ove it so much? In fact, why not invent a special safety [d]oor that won't hit you on the butt on the way out because you are fired! Not you, test subject, you're doing fine. Yes, you, box, your stuff, out the front door, parking lot, car. Goodbye.`]),
            P2Map(['sp_a3_transition01', 'PotatOS', 6, false, 47472, ``]),
            P2Map(['sp_a3_speed_ramp', 'Propulsion Intro', 7, false, 47791, `Great job, astro[n]aut, war hero, and or Olympian! With your help, [w]e're gonna cHaNgE ThE wOrLd! This on? *tap* *tap* *tap* Hey, listen up down there. That thing's called an 'elevator.' Not a bathroom.`]),
            P2Map(['sp_a3_speed_flings', 'Propulsion Flings', 7, false, 47793, `In case you're interested, there's still some [p]ositions available for that bonus opportunity I mentioned earlier. []Again, all you gotta do is let us disassemble you. We're no[t] banging rocks together here, we know how to put a man back together. So, that's a complete reassembly. New vitals, spit-shine on the old ones, plus we're scooping out tumors. Frankly, you oughtta be paying us.`]),
            P2Map(['sp_a3_portal_intro', 'Conversion Intro', 7, false, 47795, ``]),
            P2Map(['sp_a3_end', 'Three Gels', 7, false, 47798, ``]),
            P2Map(['sp_a4_intro', 'Test', 8, false, 88350, `Alr[i]ght, so my paradox idea didn't work. An[d] it almost [k]illed me. []Luckily, by the looks of things, he knows as [m]uch about test bui[l]ding as he does about logical contradictions.`]),
            P2Map(['sp_a4_tb_intro', 'Funnel Intro', 8, false, 47800, `Okay, so the [b]ad news is the tests [a]re my tests now.[] So they can kill us. The [g]ood news is? []Well, none so far, to be honest. I'll get back to you on that.`]),
            P2Map(['sp_a4_tb_trust_drop', 'Ceiling Button', 8, false, 47802, `Ooh, ye[s], []well done.[] Thanks, all we had to do was pull that [l]ever. What? [W]ell no, you pressed the b-[A]HHHHHH! []I know we're in a l[o]t of trouble and probably about to die, but that was worth it.`]),
            P2Map(['sp_a4_tb_wall_button', 'Wall Button', 8, false, 47804, `Oh no, []it's happening [s]ooner than I expected. I'm sure we'll be fine.`]),
            P2Map(['sp_a4_tb_polarity', 'Polarity', 8, false, 47806, `[]Grrrrh, it's [n]ot enough! []If I'm such a moron, why can't you solve [a] simple test? []I might've pushed that moron thing a little too far this time.`]),
            P2Map(['sp_a4_tb_catch', 'Funnel Catch', 8, false, 47808, `The body he's squatting in,[] my body, has a buil[t] in euphoric response to tes[t]ing. Eventually you build up a resistance to it. It can get a little, []unbearable, unless you have the me[n]tal capacity to push past it. It didn't matter to me, I was in it for the science. Him, though...`]),
            P2Map(['sp_a4_stop_the_box', 'Stop The Box', 8, false, 47811, `Are you, []are you absolutely [s]ure you're solving the[s]e correctly? I mean, yes, you solved it, but I'm wondering[] if [m]aybe there's a number of way[s] to solve them, and you're picking all the [w]orst ways. []No, no, that was the solution. Grrh, what am I missing?`]),
            P2Map(['sp_a4_laser_catapult', 'Laser Catapult', 8, false, 47813, `Remember when I told you that he was s[p]ecifically designed to [m]ake bad decision[s]? Because I think he's decided not [t]o maintain any [o]f the crucial functions required to keep this facility from exploding.`]),
            P2Map(['sp_a4_laser_platform', 'Laser Platform', 8, false, 47815, ``]),
            P2Map(['sp_a4_speed_tb_catch', 'Propulsion Catch', 8, false, 47817, `You two are gonna love this big surprise.[] In [f]act, [y]ou might say, you're going to love it...[] to [d]eath.[] Gonna love it, until you're d-- []until it kills you, until you're [d]ead. Ha[h]aha, alright, I don't know whether, []you're uh[h], you're pickin' up on what I'm sayin' there, but -- Yes, thanks, we get it.`]),
            P2Map(['sp_a4_jump_polarity', 'Repulsion Polarity', 8, false, 47819, `[]So, he's inexplicably happy all of a sudden, [e]ven though he should b[e] going out of his min[d] with test withdrawal. And [h]e's got a surprise [f]or us. What did he find back there?`]),
            P2Map(['sp_a4_finale1', 'Finale 1', 9, false, 62776, ``]),
            P2Map(['sp_a4_finale2', 'Finale 2', 9, false, 47821, ``]),
            P2Map(['sp_a4_finale3', 'Finale 3', 9, false, 47824, ``]),
            P2Map(['sp_a4_finale4', 'Finale 4', 9, false, 47456, ``]),
        ];

        this.chapters = ({
            sp: [
                'The Courtesy Call',
                'The Cold Boot',
                'The Return',
                'The Surprise',
                'The Escape',
                'The Fall',
                'The Reunion',
                'The Itch',
                'The Part Where He Kills You',
            ],
            mp: [
                'Calibration',
                'Team Building',
                'Mass And Velocity',
                'Hard-Light Surfaces',
                'Excursion Funnels',
                'Mobility Gels',
                'Art Therapy',
            ],
        });
        this.getCMChapterIdx();
    }

    getCMChapterIdx() {
        let chapterLast = "", chapterIdx = 0;
        for (let i = 0; i < this.maps.length; i++) {
            if (this.maps[i].cmAvailability == -1) this.maps[i].cmChapterIdx = -1;
            else if (chapterLast == this.maps[i].chapter) {
                this.maps[i].cmChapterIdx = ++chapterIdx;
            } else {
                this.maps[i].cmChapterIdx = chapterIdx = 1;
                chapterLast = this.maps[i].chapter;
            }
        }
    }

}

let spMaps = new P2Data();
const img = document.getElementById('imgContainer');
const text = document.getElementById('MapText');

text.style.fontFamily = 'sans-serif';

let randMap;
let finalrandMap = Math.round(Math.random() * 60)
console.log(finalrandMap)

let i = 0;


// do the thing on the key press
window.addEventListener("keypress", (event) => {
    if (event.key === "r") {
        let interval = setInterval(() => {
            if (i < 58) {
                randMap = Math.round(Math.random() * 60);
                text.textContent = spMaps.maps[randMap].splitname;
                img.style.backgroundImage = `url(https://board.portal2.sr/images/chambers_full/${spMaps.maps[randMap].chamberID}.jpg)`;
                i++;
            } else {
                clearInterval(interval);
                text.textContent = spMaps.maps[finalrandMap].splitname;
                img.style.backgroundImage = `url(https://board.portal2.sr/images/chambers_full/${spMaps.maps[finalrandMap].chamberID}.jpg)`;
                img.onload = function() {
                    const scores = document.getElementById('scores')
                    scores.classList.add('slide-animation')
                }
            }
        }, 20);

        showRandomizer();
    }
})

//GET PLAYER SCORES
async function getPlayerScores(player = "", chamber = "") {
    try {
        const response = await fetch(`https://board.portal2.sr/profile/${player}/json`);
        const data = await response.json();

        // Use the 'data' here
        console.log(data);
        const filtered = data.times.SP.chambers.chamber;
        let final;
        for (let i = 7; i < 16; i++) {
            const filtered2 = filtered[i];
            if (filtered2 && filtered2[chamber] !== undefined) {
                final = filtered2[chamber];
            }
        }

        console.log(final);

        // Return 'final' or any other data if needed
        return final;
    } catch (error) {
        console.error('Error:', error);
    }
}



function convertToTime(time) {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

const players = {
    1: "FifthWit",
    2: "AlexAdvDev"
}

console.log(spMaps.maps[finalrandMap].chamberID)
getPlayerScores(players[1], spMaps.maps[finalrandMap].chamberID)
    .then(response => {
        console.log(convertToTime(response.score))
        document.getElementById('playertime1').textContent = `${players[1]}'s PB: ${convertToTime(response.score)}`
        document.getElementById('playerdate1').textContent = `Last PBed on ${response.date}`
        document.getElementById('playerrank1').textContent = `Rank: ${response.scoreRank}`
    })

getPlayerScores(players[2], spMaps.maps[finalrandMap].chamberID)
    .then(response => {
        console.log(convertToTime(response.score))
        document.getElementById('playertime2').textContent = `${players[2]}'s PB: ${convertToTime(response.score)}`
        document.getElementById('playerdate2').textContent = `Last PBed on ${response.date}`
        document.getElementById('playerrank2').textContent = `Rank: ${response.scoreRank}`
    })