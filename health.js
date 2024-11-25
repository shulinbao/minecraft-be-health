function healths() {
    try {
        let list = mc.getOnlinePlayers();
        for (let i in list) {
            let pl = list[i];
            if (pl.getScore('syhealth') != pl.health) {
                pl.setScore('syhealth', pl.health);
            }
        }
    } catch (_) { }
};

mc.listen("onServerStarted", function () {
    let mcscob = mc.getScoreObjective('syhealth');
    if (mcscob == null) {
        mc.newScoreObjective('syhealth', '§l§chealth');
        mcscob = mc.getScoreObjective('syhealth');
    }
    //mcscob.setDisplay('belowname');
    mc.runcmdEx('scoreboard objectives setdisplay belowname syhealth');
    setInterval(() => {
        healths();
    }, 500);
});