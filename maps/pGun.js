fetch("pGun.json")
.then(Response => Response.json())
.then(data => {
  console.log(data.wr)
  document.querySelector("#wrTime").innerText = data.wr
})

const maplist = {
  sp_a1_intro1: 62761,
  sp_a1_intro2: 62758,
  sp_a1_intro3: 47458,
  sp_a1_intro4: 47455,
  sp_a1_intro5: 47452,
  sp_a1_intro6: 47106,
  sp_a1_intro7: 62763,
  sp_a1_wakeup: 62759,
  sp_a2_intro: 47735,
  sp_a2_laser_intro: 62765,
  sp_a2_laser_stairs: 47736,
  sp_a2_dual_lasers: 47738,
  sp_a2_laser_over_goo: 47742,
  sp_a2_catapult_intro: 62767,
  sp_a2_trust_fling: 47744,
  sp_a2_pit_flings: 47465,
  sp_a2_fizzler_intro: 47746,
  sp_a2_sphere_peek: 47748,
  sp_a2_ricochet: 47751,
  sp_a2_bridge_intro: 47752,
  sp_a2_bridge_the_gap: 47755,
  sp_a2_turret_intro: 47756,
  sp_a2_laser_relays: 47759,
  sp_a2_turret_blocker: 47760,
  sp_a2_laser_vs_turret: 47763,
  sp_a2_pull_the_rug: 47764,
  sp_a2_column_blocker: 47766,
  sp_a2_laser_chaining: 47768,
  sp_a2_triple_laser: 47770,
  sp_a2_bts1: 47773,
  sp_a2_bts2: 47774,
  sp_a2_bts3: 47776,
  sp_a2_bts4: 47779,
  sp_a2_bts5: 47780,
  sp_a2_core: 62771,
  sp_a3_01: 47783,
  sp_a3_03: 47784,
  sp_a3_jump_intro: 47787,
  sp_a3_bomb_flings: 47468,
  sp_a3_crazy_box: 47469,
  sp_a3_transition01: 47472,
  sp_a3_speed_ramp: 47791,
  sp_a3_speed_flings: 47793,
  sp_a3_portal_intro: 47795,
  sp_a3_end: 47798,
  sp_a4_intro: 88350,
  sp_a4_tb_intro: 47800,
  sp_a4_tb_trust_drop: 47802,
  sp_a4_tb_wall_button: 47804,
  sp_a4_tb_polarity: 47806,
  sp_a4_tb_catch: 47808,
  sp_a4_stop_the_box: 47811,
  sp_a4_laser_catapult: 47813,
  sp_a4_laser_platform: 47815,
  sp_a4_speed_tb_catch: 47817,
  sp_a4_jump_polarity: 47819,
  sp_a4_finale1: 62776,
  sp_a4_finale2: 47821,
  sp_a4_finale3: 47824,
  sp_a4_finale4: 47456,
};

grabTime("SlimeDiamond", "sp_a1_intro3", "#P1pb");
grabTime2("AlexAdvDev", "sp_a1_intro3", "#P2pb");

function grabTime(player, map, dest) {
  //usage
  //player: the steam nickname of the user (eg Archer)
  //map: a string of the searched mapname (eg sp_a1_intro1)
  //dest: the id of the html text file you want to change (#output)

  const file = "https://board.portal2.sr/profile/" + player + "/json";
  fetch(file)
    .then((Response) => Response.json())
    .then((data) => {
      var time = 0.0;
      if (maplist[map] == undefined) {
        document.querySelector(dest).innerText = "Invalid Map";
        return;
      }
      const maps = data.times.SP.chambers.chamberOrderedByDate;
      console.log(maps[maplist[map]].score);
      if (maps[maplist[map]].score != undefined) {
        time = maps[maplist[map]].score / 100;
        document.querySelector(dest).innerText = time;
      } else {
        console.log("No time");
        document.querySelector(dest).innerText = "Doesn't have a time";
      }
    });
}

function grabTime2(player, map, dest) {

  const file = "https://board.portal2.sr/profile/" + player + "/json";
  fetch(file)
    .then((Response) => Response.json())
    .then((data) => {
      var time = 0.0;
      if (maplist[map] == undefined) {
        document.querySelector(dest).innerText = "Invalid Map";
        return;
      }
      const maps = data.times.SP.chambers.chamberOrderedByDate;
      console.log(maps[maplist[map]].score);
      if (maps[maplist[map]].score != undefined) {
        time = maps[maplist[map]].score / 100;
        document.querySelector(dest).innerText = time;
      } else {
        console.log("No time");
        document.querySelector(dest).innerText = "Doesn't have a time";
      }
    });
}