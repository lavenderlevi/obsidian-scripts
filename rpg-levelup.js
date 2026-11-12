// ===== RPG LEVEL-UP CORE v2.0 ("Quantum-AI Materials Architect") =====
// Gọi trong note:      await dv.view("Resources/RPG/rpg-levelup")
// Gọi trong Dashboard: await dv.view("Resources/RPG/rpg-levelup", { hideLine: true })
// Quy tắc: 1 note hoàn thành = 1 EXP; Level n mở khóa tại tổng 2^(n-1) EXP.

const STORAGE_KEYS = {
    LAST_LEVEL: "obsidian_rpg_quantum_last_level",
    AP: "obsidian_rpg_ap_allocated",
    GOLD: "obsidian_rpg_gold_balance",
    CHESTS: "obsidian_rpg_chests_inventory",
    SKILLS: "obsidian_rpg_skills_unlocked",
    ITEMS: "obsidian_rpg_purchased_items",
    CLAIMED: "obsidian_rpg_claimed_chests",
    RELICS: "obsidian_rpg_unlocked_relics",
    DUST: "obsidian_rpg_quantum_dust",
};

const RARITY_META = {
    common:    { name: "Common (Thông thường)", color: "#94a3b8", dustYield: 5,   craftCost: 30 },
    rare:      { name: "Rare (Hiếm)",            color: "#3b82f6", dustYield: 15,  craftCost: 80 },
    epic:      { name: "Epic (Sử Thi)",          color: "#a855f7", dustYield: 40,  craftCost: 200 },
    legendary: { name: "Legendary (Huyền Thoại)",color: "#f59e0b", dustYield: 100, craftCost: 500 },
    fabled:    { name: "Fabled (Truyền Thuyết)", color: "#FA5053", dustYield: 250, craftCost: 1000 },
    mythic:    { name: "Mythic (Thần Thoại)",    color: "#8A00C4", dustYield: 600, craftCost: 2500 },
};

const TYPES = ["concept", "problem", "equation"];
const norm = (v) => String(v ?? "").toLowerCase().trim();

const kindOf = (p) => {
    const t = norm(p.type);
    if (TYPES.includes(t)) return t;
    const tags = Array.from(p.file.tags || []).map((x) => norm(x).replace(/^#/, ""));
    return TYPES.find((k) => tags.includes(k)) || null;
};

const isDone = (kind, status) => {
    const s = norm(status);
    if (kind === "problem") return s === "solved" || s === "mastered";
    return s === "mastered";
};

const levelFromExp = (exp) => (exp >= 1 ? Math.floor(Math.log2(exp)) + 1 : 0);

const collect = () => {
    const out = [];
    for (const p of dv.pages('"Resources"')) {
        if (p.file.path.startsWith("Resources/docs/")) continue;
        const kind = kindOf(p);
        if (!kind) continue;
        out.push({ page: p, kind, done: isDone(kind, p.status) });
    }
    return out;
};

// ----- BỘ TỔNG HỢP ÂM THANH (WEB AUDIO API) -----
function playTone(freqs, type = "sine", baseVol = 0.1, duration = 0.8) {
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        const ctx = new Ctx();
        if (ctx.state === "suspended") ctx.resume();
        freqs.forEach((f, i) => {
            const t = ctx.currentTime + i * 0.08;
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.type = type;
            o.frequency.value = f;
            g.gain.setValueAtTime(baseVol, t);
            g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
            o.connect(g).connect(ctx.destination);
            o.start(t);
            o.stop(t + duration + 0.05);
        });
        setTimeout(() => ctx.close(), (duration + 1) * 1000);
    } catch (e) {}
}

function playLevelUpChime() {
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        const ctx = new Ctx();
        if (ctx.state === "suspended") ctx.resume();
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 → E5 → G5 → C6
        notes.forEach((f, i) => {
            const t = ctx.currentTime + i * 0.12;
            for (const type of ["triangle", "sine"]) {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.type = type;
                o.frequency.value = type === "sine" ? f * 2 : f;
                g.gain.setValueAtTime(type === "sine" ? 0.06 : 0.18, t);
                g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
                o.connect(g).connect(ctx.destination);
                o.start(t);
                o.stop(t + 1.25);
            }
        });
        setTimeout(() => ctx.close(), 2000);
    } catch (e) {}
}

function playCoinSound() {
    playTone([987.77, 1318.51], "sine", 0.12, 0.4); // B5 → E6 ping
}

function playGachaSound(rarity) {
    if (rarity === "mythic") {
        playTone([523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093.0], "triangle", 0.3, 2.2);
    } else if (rarity === "fabled") {
        playTone([440.0, 554.37, 659.25, 880.0, 1108.73, 1318.51], "sine", 0.25, 1.8);
    } else if (rarity === "legendary") {
        playTone([523.25, 659.25, 783.99, 1046.5, 1318.51], "triangle", 0.22, 1.4);
    } else if (rarity === "epic") {
        playTone([587.33, 739.99, 880.0, 1174.66], "sine", 0.18, 1.1);
    } else if (rarity === "rare") {
        playTone([659.25, 830.61, 987.77], "sine", 0.14, 0.8);
    } else {
        // common
        playTone([523.25, 659.25], "sine", 0.1, 0.5);
    }
}

// ----- STATE MANAGEMENT (AP, GOLD, CHESTS, SKILLS) -----
const getJSON = (key, def) => {
    try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : def;
    } catch (e) {
        return def;
    }
};
const setJSON = (key, val) => localStorage.setItem(key, JSON.stringify(val));

const SKILL_COSTS = {
    theory_1: 1, theory_2: 2,
    problem_1: 1, problem_2: 2,
    alchemy_1: 1, alchemy_2: 2,
};

const getState = () => {
    const items = collect();
    const exp = items.filter((x) => x.done).length;
    const level = levelFromExp(exp);

    // Tặng 200 Vàng và 3 Rương Bí Ẩn để người dùng test
    let gold = parseInt(localStorage.getItem(STORAGE_KEYS.GOLD) || "0", 10);
    if (!localStorage.getItem("obsidian_rpg_test_gold_given")) {
        gold = Math.max(gold, 200);
        localStorage.setItem(STORAGE_KEYS.GOLD, String(gold));
        localStorage.setItem("obsidian_rpg_test_gold_given", "true");
        const chestsCur = parseInt(localStorage.getItem(STORAGE_KEYS.CHESTS) || "0", 10);
        if (chestsCur < 3) {
            localStorage.setItem(STORAGE_KEYS.CHESTS, "3");
        }
    }

    // AP Calculation: Level 1 = 0 AP, Level n = (n-1)*3 AP + Bonus AP từ Gacha
    const bonusAP = parseInt(localStorage.getItem("obsidian_rpg_bonus_ap") || "0", 10);
    const totalAP = (level <= 1 ? 0 : (level - 1) * 3) + bonusAP;
    const allocated = getJSON(STORAGE_KEYS.AP, { int: 0, str: 0, dex: 0, vit: 0 });
    const usedAP = (allocated.int || 0) + (allocated.str || 0) + (allocated.dex || 0) + (allocated.vit || 0);
    const remainingAP = Math.max(0, totalAP - usedAP);

    // SP Calculation: Level n = n SP + Bonus SP từ Gacha
    const bonusSP = parseInt(localStorage.getItem("obsidian_rpg_bonus_sp") || "0", 10);
    const totalSP = level + bonusSP;
    const unlockedSkills = getJSON(STORAGE_KEYS.SKILLS, []);
    let usedSP = 0;
    unlockedSkills.forEach((id) => { usedSP += (SKILL_COSTS[id] || 1); });
    const remainingSP = Math.max(0, totalSP - usedSP);

    // Mystery Chests
    const chests = parseInt(localStorage.getItem(STORAGE_KEYS.CHESTS) || "0", 10);

    // Claimed Milestone Chests
    const claimedChests = getJSON(STORAGE_KEYS.CLAIMED, []);

    // Purchased Inventory Items
    const purchasedItems = getJSON(STORAGE_KEYS.ITEMS, []);

    return {
        exp,
        level,
        ap: { total: totalAP, allocated, used: usedAP, remaining: remainingAP },
        sp: { total: totalSP, used: usedSP, remaining: remainingSP },
        skills: unlockedSkills,
        gold,
        chests,
        claimedChests,
        purchasedItems,
        items,
    };
};

const allocateAP = (stat, delta = 1) => {
    const s = getState();
    const cur = s.ap.allocated[stat] || 0;
    if (delta > 0 && s.ap.remaining < delta) return false;
    if (delta < 0 && cur < Math.abs(delta)) return false;
    s.ap.allocated[stat] = Math.max(0, cur + delta);
    setJSON(STORAGE_KEYS.AP, s.ap.allocated);
    return true;
};

const resetAP = () => {
    setJSON(STORAGE_KEYS.AP, { int: 0, str: 0, dex: 0, vit: 0 });
    return true;
};

const addGold = (amount) => {
    const cur = parseInt(localStorage.getItem(STORAGE_KEYS.GOLD) || "0", 10);
    const next = Math.max(0, cur + amount);
    localStorage.setItem(STORAGE_KEYS.GOLD, String(next));
    playCoinSound();
    return next;
};

const spendGold = (amount) => {
    const cur = parseInt(localStorage.getItem(STORAGE_KEYS.GOLD) || "0", 10);
    if (cur < amount) return false;
    localStorage.setItem(STORAGE_KEYS.GOLD, String(cur - amount));
    playCoinSound();
    return true;
};

const addChests = (amount = 1) => {
    const cur = parseInt(localStorage.getItem(STORAGE_KEYS.CHESTS) || "0", 10);
    const next = Math.max(0, cur + amount);
    localStorage.setItem(STORAGE_KEYS.CHESTS, String(next));
    return next;
};

const getRelicsData = () => {
    return window.RPG_RELICS_DATA || { SETS: [], RELICS: [] };
};

const getQuantumDust = () => parseInt(localStorage.getItem(STORAGE_KEYS.DUST) || "0", 10);
const addQuantumDust = (amt) => {
    const cur = getQuantumDust();
    const next = Math.max(0, cur + amt);
    localStorage.setItem(STORAGE_KEYS.DUST, String(next));
    return next;
};
const spendQuantumDust = (amt) => {
    const cur = getQuantumDust();
    if (cur < amt) return false;
    localStorage.setItem(STORAGE_KEYS.DUST, String(cur - amt));
    return true;
};

const getActiveSetBonuses = (unlockedArr) => {
    const data = getRelicsData();
    const unlocked = unlockedArr || getJSON(STORAGE_KEYS.RELICS, []);
    const unlockedSet = new Set(unlocked);
    const activeSets = [];
    let b4 = 0, b8 = 0;

    for (const s of (data.SETS || [])) {
        let ownedCount = 0;
        for (const id of s.relicIds) {
            if (unlockedSet.has(id)) ownedCount++;
        }
        const has4 = ownedCount >= 4;
        const has8 = ownedCount >= 8;
        if (has4) b4++;
        if (has8) b8++;
        activeSets.push({
            id: s.id,
            name: s.name,
            icon: s.icon,
            ownedCount,
            totalCount: 8,
            has4,
            has8,
            bonus4: s.bonus4,
            bonus8: s.bonus8,
        });
    }

    return { activeSets, totalBonus4Count: b4, totalBonus8Count: b8 };
};

const getRelicState = () => {
    const data = getRelicsData();
    const unlocked = getJSON(STORAGE_KEYS.RELICS, []);
    const dust = getQuantumDust();
    const total = (data.RELICS && data.RELICS.length) || 200;
    const progressPct = total > 0 ? Math.round((unlocked.length / total) * 100) : 0;
    const bonusInfo = getActiveSetBonuses(unlocked);
    return {
        unlockedRelics: unlocked,
        count: unlocked.length,
        totalRelics: total,
        progressPct,
        dust,
        activeSets: bonusInfo.activeSets,
        bonus4Count: bonusInfo.totalBonus4Count,
        bonus8Count: bonusInfo.totalBonus8Count,
    };
};

const openMysteryChest = (forcedId) => {
    const cur = parseInt(localStorage.getItem(STORAGE_KEYS.CHESTS) || "0", 10);
    if (cur <= 0 && !forcedId) return null;
    if (!forcedId) localStorage.setItem(STORAGE_KEYS.CHESTS, String(cur - 1));

    const data = getRelicsData();
    const relics = data.RELICS || [];
    if (relics.length === 0) return null;

    let pickedRelic = null;

    if (forcedId) {
        pickedRelic = relics.find((r) => r.id === forcedId);
    } else {
        const skills = getJSON(STORAGE_KEYS.SKILLS, []);
        let luckyBonus = skills.includes("alchemy_2") ? 0.05 : 0;
        const roll = Math.max(0, Math.random() - luckyBonus);
        let rarity = "common";
        if (roll < 0.50) rarity = "common";
        else if (roll < 0.78) rarity = "rare";
        else if (roll < 0.91) rarity = "epic";
        else if (roll < 0.96) rarity = "legendary";
        else if (roll < 0.99) rarity = "fabled";
        else rarity = "mythic";

        const pool = relics.filter((r) => r.rarity === rarity);
        const finalPool = pool.length > 0 ? pool : relics;
        pickedRelic = finalPool[Math.floor(Math.random() * finalPool.length)];
    }

    if (!pickedRelic) return null;

    const unlocked = getJSON(STORAGE_KEYS.RELICS, []);
    const isNew = !unlocked.includes(pickedRelic.id);
    const meta = RARITY_META[pickedRelic.rarity] || RARITY_META.common;
    let dustGained = 0;

    if (isNew) {
        unlocked.push(pickedRelic.id);
        setJSON(STORAGE_KEYS.RELICS, unlocked);
        playGachaSound(pickedRelic.rarity);
    } else {
        dustGained = meta.dustYield;
        addQuantumDust(dustGained);
        playCoinSound();
    }

    return {
        isNew,
        relic: pickedRelic,
        rarity: pickedRelic.rarity,
        tierName: meta.name,
        tierColor: meta.color,
        dustGained,
        name: pickedRelic.name,
        reward: isNew
            ? `Cổ vật mới: ${pickedRelic.name} (${pickedRelic.setName})`
            : `Trùng lặp! Tự động phân giải thành +${dustGained} Bụi Lượng Tử ✨`,
        icon: isNew ? pickedRelic.setIcon : "♻️",
        lore: pickedRelic.lore,
    };
};

const openMysteryChestTestDuplicate = (forcedId) => openMysteryChest(forcedId);

const craftRelic = (relicId) => {
    const data = getRelicsData();
    const relic = (data.RELICS || []).find((r) => r.id === relicId);
    if (!relic) return { success: false, reason: "Không tìm thấy cổ vật!" };

    const unlocked = getJSON(STORAGE_KEYS.RELICS, []);
    if (unlocked.includes(relicId)) {
        return { success: false, reason: "Bạn đã sở hữu cổ vật này trong bảo tàng rồi!" };
    }

    const meta = RARITY_META[relic.rarity] || RARITY_META.common;
    const cost = meta.craftCost;
    if (!spendQuantumDust(cost)) {
        return { success: false, reason: `Không đủ Bụi Lượng Tử (Cần ${cost} Bụi, hiện có ${getQuantumDust()})!` };
    }

    unlocked.push(relicId);
    setJSON(STORAGE_KEYS.RELICS, unlocked);
    playGachaSound(relic.rarity);
    return { success: true, relic, cost };
};

const unlockSkill = (id, cost = 1) => {
    const s = getState();
    if (s.skills.includes(id)) return true;
    if (s.sp.remaining < cost) return false;
    s.skills.push(id);
    setJSON(STORAGE_KEYS.SKILLS, s.skills);
    playLevelUpChime();
    return true;
};

const resetSkills = () => {
    setJSON(STORAGE_KEYS.SKILLS, []);
    return true;
};

// Xuất ra window.RPG để Dashboard và các View sử dụng
window.RPG = {
    STORAGE_KEYS,
    RARITY_META,
    TYPES,
    norm,
    kindOf,
    isDone,
    levelFromExp,
    collect,
    getState,
    allocateAP,
    resetAP,
    addGold,
    spendGold,
    addChests,
    openMysteryChest,
    openMysteryChestTestDuplicate,
    craftRelic,
    getRelicsData,
    getRelicState,
    getActiveSetBonuses,
    addQuantumDust,
    spendQuantumDust,
    unlockSkill,
    resetSkills,
    playLevelUpChime,
    playCoinSound,
    playGachaSound,
};

// ----- KIỂM TRA LÊN CẤP & HIỂN THỊ TRONG NOTE -----
const currentState = getState();
const exp = currentState.exp;
const level = currentState.level;

const saved = localStorage.getItem(STORAGE_KEYS.LAST_LEVEL);
const prev = saved === null ? null : parseInt(saved, 10);
let leveledUp = false;

if (prev === null || Number.isNaN(prev)) {
    localStorage.setItem(STORAGE_KEYS.LAST_LEVEL, String(level));
    if (level > 0) { leveledUp = true; playLevelUpChime(); }
} else if (level > prev) {
    leveledUp = true;
    playLevelUpChime();
    localStorage.setItem(STORAGE_KEYS.LAST_LEVEL, String(level));
} else if (level < prev) {
    localStorage.setItem(STORAGE_KEYS.LAST_LEVEL, String(level));
}

const next = level === 0 ? 1 : Math.pow(2, level);
const banner = leveledUp
    ? `<div style="margin:6px 0;padding:10px 14px;border-radius:8px;background:linear-gradient(90deg,#7c3aed,#06b6d4);color:#fff;font-weight:700;box-shadow:0 0 14px rgba(6,182,212,.5);">🎉 LEVEL UP! Chúc mừng bạn đã thăng cấp từ Lv.${prev ?? 0} lên Lv.${level}! (+3 AP)</div>`
    : "";
const line = input && input.hideLine
    ? ""
    : `<div style="font-size:0.8em;color:var(--text-muted);display:flex;gap:12px;align-items:center;">
        <span>⚔️ <b>Lv.${level}</b> (${exp}/${next} EXP)</span>
        <span>💰 <b>${currentState.gold}</b> Vàng</span>
        <span>🎁 <b>${currentState.chests}</b> Rương</span>
        <a class="internal-link" data-href="RPG Status Window" href="RPG Status Window">Mở Status Window</a>
       </div>`;

if (line || banner) dv.el("div", `${line}${banner}`);
