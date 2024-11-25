// 更新玩家健康状态到记分板
function updateHealthScores() {
    try {
        // 获取所有在线玩家
        let players = mc.getOnlinePlayers();
        for (let player of players) {
            // 获取玩家的当前健康值和记分板上的健康值
            let currentHealth = player.health;
            let scoreboardHealth = player.getScore('syhealth');

            // 如果健康值不同，则更新记分板
            if (scoreboardHealth !== currentHealth) {
                player.setScore('syhealth', currentHealth);
            }
        }
    } catch (error) {
        // 捕获异常以防止程序中断
        console.error("Error updating health scores:", error);
    }
}

// 服务器启动事件
mc.listen("onServerStarted", () => {
    // 检查是否存在名为 'syhealth' 的记分板
    let healthScoreboard = mc.getScoreObjective('syhealth');
    if (healthScoreboard === null) {
        // 如果不存在，则创建一个新的记分板，显示为粗体红色 "health"
        mc.newScoreObjective('syhealth', '§l§chealth');
        healthScoreboard = mc.getScoreObjective('syhealth');
    }

    // 将记分板显示在玩家名称下方
    mc.runcmdEx('scoreboard objectives setdisplay belowname syhealth');

    // 每500毫秒更新一次玩家健康值
    setInterval(() => {
        updateHealthScores();
    }, 500);
});

// 日志输出
log("Player Health Scoreboard Plugin Loaded Successfully");
