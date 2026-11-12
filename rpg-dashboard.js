// ===== RPG STATUS WINDOW v2.0 ("Quantum-AI Materials Architect") =====
// Yêu cầu: chạy SAU `await dv.view("Resources/RPG/rpg-levelup", { hideLine: true })`

const R = window.RPG;
if (!R) {
    dv.paragraph("⚠️ Không tìm thấy lõi RPG. Hãy đặt `await dv.view(\"Resources/RPG/rpg-levelup\", { hideLine: true })` phía trên.");
    return;
}

// ---------- CẤU HÌNH PHẦN THƯỞNG MỐC LEVEL ----------
const MILESTONE_REWARDS = [
    { level: 1,  chests: 1,  reward: "🎁 +1 Rương Lượng Tử" },
    { level: 2,  chests: 1,  reward: "🎁 +1 Rương Lượng Tử" },
    { level: 3,  chests: 2,  reward: "🎁 +2 Rương Lượng Tử" },
    { level: 4,  chests: 2,  reward: "🎁 +2 Rương Lượng Tử" },
    { level: 5,  chests: 3,  reward: "🎁 +3 Rương Lượng Tử" },
    { level: 6,  chests: 4,  reward: "🎁 +4 Rương Lượng Tử" },
    { level: 7,  chests: 5,  reward: "🎁 +5 Rương Lượng Tử" },
    { level: 8,  chests: 6,  reward: "🎁 +6 Rương Lượng Tử" },
    { level: 9,  chests: 8,  reward: "🎁 +8 Rương Lượng Tử" },
    { level: 10, chests: 10, reward: "🎁 +10 Rương Lượng Tử" },
    { level: 11, chests: 12, reward: "🎁 +12 Rương Lượng Tử" },
    { level: 12, chests: 15, reward: "🎁 +15 Rương Lượng Tử" },
    { level: 13, chests: 18, reward: "🎁 +18 Rương Lượng Tử" },
    { level: 14, chests: 22, reward: "🎁 +22 Rương Lượng Tử" },
    { level: 15, chests: 30, reward: "👑 +30 Rương Lượng Tử Tối Thượng" },
];

const SHOP_ITEMS = [
    { id: "coffee", name: "☕ Ly Cà Phê / Trà Sữa Tăng Lực", cost: 100, desc: "Tự thưởng một ly đồ uống yêu thích trong lúc học." },
    { id: "game_hour", name: "🎮 1 Giờ Chơi Game Thư Giãn", cost: 200, desc: "Chơi game giải trí hoàn toàn không lo âu hay tội lỗi." },
    { id: "movie", name: "🎬 Buổi Tối Xem Phim / Anime", cost: 350, desc: "Thưởng trọn một buổi tối thư giãn với phim hay." },
    { id: "feast", name: "🍕 Bữa Ăn Thịnh Soạn / Món Khoái Khẩu", cost: 500, desc: "Một bữa ăn ngon thịnh soạn tự thưởng cho nỗ lực cày cuốc." },
    { id: "book", name: "📚 Mua Cuốn Sách / Truyện Yêu Thích", cost: 800, desc: "Đầu tư vào một cuốn sách hoặc tài liệu bạn hằng mong muốn." },
];

const SKILL_TREE = [
    {
        branch: "📜 Nhánh Tri Thức (Theory)",
        color: "#22c55e",
        skills: [
            { id: "theory_1", name: "Nhanh Nhạy (Fast Learner)", cost: 1, desc: "Tăng thêm +5 Vàng mỗi khi học xong một Concept." },
            { id: "theory_2", name: "Đồng Hóa Tri Thức (Deep Resonance)", cost: 2, desc: "Tăng 10% tỉ lệ rơi Rương Lượng Tử khi hoàn thành Concept." },
        ]
    },
    {
        branch: "⚔️ Nhánh Thực Chiến (Problem Slayer)",
        color: "#f97316",
        skills: [
            { id: "problem_1", name: "Trọng Kích (Critical Solve)", cost: 1, desc: "Tăng thêm +15 Vàng mỗi khi giải quyết xong một Problem." },
            { id: "problem_2", name: "Thợ Săn Trùm (Boss Hunter)", cost: 2, desc: "Thưởng thêm +100 Vàng khi tiêu diệt hoàn toàn 1 Boss Chương." },
        ]
    },
    {
        branch: "🧪 Nhánh Thuật Giả Kim (Quantum Alchemy)",
        color: "#06b6d4",
        skills: [
            { id: "alchemy_1", name: "Cơn Sốt Vàng (Gold Rush)", cost: 1, desc: "Tăng 20% tổng số Vàng kiếm được từ mọi nguồn." },
            { id: "alchemy_2", name: "Ngôi Sao May Mắn (Lucky Star)", cost: 2, desc: "Tăng gấp đôi tỉ lệ rơi vật phẩm Epic / Legendary khi mở Rương." },
        ]
    }
];

const TITLES = [
    { icon: "🥚", en: "Unawakened Researcher", vi: "Thực tập sinh Chưa thức tỉnh" },
    { icon: "🧪", en: "Lattice Apprentice", vi: "Học đồ Mạng tinh thể" },
    { icon: "🔬", en: "Microstructure Analyst", vi: "Chuyên viên Vi cấu trúc" },
    { icon: "📊", en: "Materials Data Explorer", vi: "Nhà Khám phá Dữ liệu Vật liệu" },
    { icon: "💻", en: "Molecular Dynamics Operator", vi: "Kỹ sư Động lực học Phân tử" },
    { icon: "⚛️", en: "Quantum State Initiate", vi: "Học giả Trạng thái Lượng tử" },
    { icon: "⚡", en: "DFT & Quantum ESPRESSO Specialist", vi: "Chuyên gia DFT & Quantum ESPRESSO" },
    { icon: "🧠", en: "Materials ML Engineer", vi: "Kỹ sư Machine Learning Vật liệu" },
    { icon: "🔮", en: "Crystal Graph Neural Architect", vi: "Kiến trúc sư Đồ thị Tinh thể (GNN)" },
    { icon: "🛡️", en: "Electronic Band Structure Master", vi: "Bậc thầy Cấu trúc Dải năng lượng" },
    { icon: "🚀", en: "High-Throughput Screening Grandmaster", vi: "Đại sư Tính toán Thông lượng cao" },
    { icon: "🪐", en: "Generative Inverse Design Sage", vi: "Hiền giả Thiết kế Vật liệu Nghịch đảo" },
    { icon: "🌀", en: "Quantum-AI Singularity Weaver", vi: "Kẻ dệt Điểm kỳ dị Lượng tử & AI" },
    { icon: "💠", en: "Autonomous Lab Sovereign", vi: "Chúa tể Phòng Lab Tự hành AI" },
    { icon: "🌌", en: "Universal Matter Synthesizer", vi: "Kẻ Kiến tạo Vật chất Vũ trụ" },
];
const MAX_TITLE = { icon: "👑", en: "Omniscient Quantum-AI Overlord", vi: "Thần Trí tuệ Lượng tử Vật chất" };

const MOBS = {
    concept: { icon: "🐺", name: "Common Mob", vi: "Quái thường · Concept", color: "#22c55e" },
    equation: { icon: "⚡", name: "Elite Mob", vi: "Quái tinh anh · Equation", color: "#a855f7" },
    problem: { icon: "🛡️", name: "Dungeon Champion", vi: "Thủ lĩnh · Problem", color: "#f97316" },
};

// ---------- DỮ LIỆU & TIỆN ÍCH ----------
let S = R.getState();
const exp = S.exp;
const level = S.level;
const floor = level === 0 ? 0 : Math.pow(2, level - 1);
const next = level === 0 ? 1 : Math.pow(2, level);
const progress = Math.round(((exp - floor) / (next - floor)) * 100);
const remaining = next - exp;

const title = level < TITLES.length
    ? TITLES[level]
    : { ...MAX_TITLE, en: `${MAX_TITLE.en} · Tier ${level - 14}`, vi: `${MAX_TITLE.vi} · Bậc ${level - 14}` };
const nextTitle = level + 1 < TITLES.length ? TITLES[level + 1] : MAX_TITLE;

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const bar = (pct, color, h = 10) => `
<div style="background:rgba(255,255,255,.08);border-radius:999px;height:${h}px;overflow:hidden;">
  <div style="width:${Math.max(0, Math.min(100, pct))}%;height:100%;background:${color};border-radius:999px;box-shadow:0 0 10px ${color};"></div>
</div>`;
const card = (inner, border = "var(--background-modifier-border)") =>
    `<div style="background:var(--background-primary);border:1px solid ${border};border-radius:10px;padding:12px 14px;">${inner}</div>`;
const sectionTitle = (t) => `<div style="font-size:.8em;letter-spacing:1.5px;text-transform:uppercase;color:#06b6d4;font-weight:700;margin:16px 0 8px;">${t}</div>`;

// ---------- TẠO KHUNG CONTAINER & GIAO DIỆN CHÍNH ----------
const root = dv.el("div", "");
root.style.fontFamily = "var(--font-text)";

function renderFullUI() {
    S = R.getState();
    root.innerHTML = "";

    // 1. HEADER HUD
    const headerHtml = `
    <div style="background:linear-gradient(135deg,rgba(124,58,237,.2),rgba(6,182,212,.15));border:1px solid rgba(6,182,212,.5);border-radius:14px;padding:16px 20px;box-shadow:0 0 20px rgba(6,182,212,.15);margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">
        <div style="display:flex;gap:14px;align-items:center;">
          <div style="font-size:2.8em;line-height:1;">${title.icon}</div>
          <div>
            <div style="font-size:.72em;letter-spacing:2px;color:var(--text-muted);text-transform:uppercase;">Quantum-AI Materials Architect · HUD v2.0</div>
            <div style="font-size:1.4em;font-weight:900;">${esc(title.en)}</div>
            <div style="font-size:.9em;color:var(--text-muted);">${esc(title.vi)}</div>
          </div>
        </div>
        <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
          <div style="text-align:right;">
            <div style="font-size:2.2em;font-weight:900;color:#06b6d4;text-shadow:0 0 12px rgba(6,182,212,.6);line-height:1;">Lv.${level}</div>
            <div style="font-size:.75em;color:var(--text-muted);margin-top:4px;">✨ ${exp} EXP</div>
          </div>
          <button class="rpg-btn-test-chime" style="font-size:.78em;padding:6px 12px;border-radius:8px;background:rgba(6,182,212,.15);border:1px solid rgba(6,182,212,.4);color:#06b6d4;cursor:pointer;font-weight:600;">🔊 Chuông</button>
        </div>
      </div>
      
      <!-- Quick Resource Bar -->
      <div style="display:flex;gap:16px;margin:12px 0 10px;padding:8px 14px;background:rgba(0,0,0,.25);border-radius:8px;font-size:.85em;flex-wrap:wrap;">
        <span style="color:#f59e0b;font-weight:700;">💰 Vàng: <b>${S.gold}</b> G</span>
        <span style="color:#ec4899;font-weight:700;">🎁 Rương Lượng Tử: <b>${S.chests}</b></span>
        <span style="color:#c084fc;font-weight:700;">✨ Bụi Lượng Tử: <b>${R.getRelicState ? R.getRelicState().dust : 0}</b></span>
        <span style="color:#06b6d4;font-weight:700;">🏛️ Cổ Vật: <b>${R.getRelicState ? R.getRelicState().count : 0}</b>/200</span>
        <span style="color:#a855f7;font-weight:700;">💠 Điểm AP: <b>${S.ap.remaining}</b> / ${S.ap.total}</span>
        <span style="color:#10b981;font-weight:700;">🌟 Điểm SP: <b>${S.sp.remaining}</b> / ${S.sp.total}</span>
      </div>

      <!-- EXP Progress Bar -->
      <div>
        <div style="display:flex;justify-content:space-between;font-size:.82em;margin-bottom:4px;">
          <span>Tiến độ Level: <b>${exp}</b> / ${next} EXP (${progress}%)</span>
          <span style="color:var(--text-muted);">Còn <b>${remaining}</b> EXP → Lv.${level + 1} ${nextTitle.icon} ${esc(nextTitle.en)}</span>
        </div>
        ${bar(progress, "linear-gradient(90deg,#7c3aed,#06b6d4)", 12)}
      </div>
    </div>`;

    // 2. TAB NAVIGATION BAR
    const activeTab = window._rpg_active_tab || "tab1";
    const navHtml = `
    <div style="display:flex;gap:8px;margin-bottom:14px;border-bottom:1px solid var(--background-modifier-border);padding-bottom:10px;flex-wrap:wrap;">
      <button class="rpg-tab-btn" data-tab="tab1" style="padding:8px 14px;border-radius:8px;border:1px solid ${activeTab === "tab1" ? "#06b6d4" : "transparent"};background:${activeTab === "tab1" ? "rgba(6,182,212,.2)" : "var(--background-secondary)"};color:${activeTab === "tab1" ? "#06b6d4" : "var(--text-muted)"};font-weight:700;cursor:pointer;">👤 Nhân Vật & Chỉ Số</button>
      <button class="rpg-tab-btn" data-tab="tab2" style="padding:8px 14px;border-radius:8px;border:1px solid ${activeTab === "tab2" ? "#f59e0b" : "transparent"};background:${activeTab === "tab2" ? "rgba(245,158,11,.2)" : "var(--background-secondary)"};color:${activeTab === "tab2" ? "#f59e0b" : "var(--text-muted)"};font-weight:700;cursor:pointer;">🏪 Tiệm & Gacha</button>
      <button class="rpg-tab-btn" data-tab="tab3" style="padding:8px 14px;border-radius:8px;border:1px solid ${activeTab === "tab3" ? "#10b981" : "transparent"};background:${activeTab === "tab3" ? "rgba(16,185,129,.2)" : "var(--background-secondary)"};color:${activeTab === "tab3" ? "#10b981" : "var(--text-muted)"};font-weight:700;cursor:pointer;">🌳 Cây Kỹ Năng</button>
      <button class="rpg-tab-btn" data-tab="tab4" style="padding:8px 14px;border-radius:8px;border:1px solid ${activeTab === "tab4" ? "#a855f7" : "transparent"};background:${activeTab === "tab4" ? "rgba(168,85,247,.2)" : "var(--background-secondary)"};color:${activeTab === "tab4" ? "#a855f7" : "var(--text-muted)"};font-weight:700;cursor:pointer;">🎁 Rương Mốc & Quests</button>
      <button class="rpg-tab-btn" data-tab="tab5" style="padding:8px 14px;border-radius:8px;border:1px solid ${activeTab === "tab5" ? "#8A00C4" : "transparent"};background:${activeTab === "tab5" ? "rgba(138,0,196,.25)" : "var(--background-secondary)"};color:${activeTab === "tab5" ? "#c084fc" : "var(--text-muted)"};font-weight:700;cursor:pointer;box-shadow:${activeTab === "tab5" ? "0 0 10px rgba(138,0,196,.4)" : "none"};">🏛️ Bảo Tàng Cổ Vật (200)</button>
    </div>`;

    // 3. TAB 1: NHÂN VẬT & CHỈ SỐ (AP SYSTEM & COMBAT & BOSSES)
    const statsHtml = `
    <div id="rpg-panel-tab1" style="display:${activeTab === "tab1" ? "block" : "none"};">
      <!-- AP ALLOCATION PANEL -->
      ${sectionTitle("💠 Phân Bổ Điểm Thuộc Tính (Attribute Points)")}
      <div style="background:var(--background-secondary);border:1px solid rgba(168,85,247,.4);border-radius:10px;padding:14px;margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
          <div>
            <span style="font-size:1.1em;font-weight:800;color:#a855f7;">Điểm AP khả dụng: ${S.ap.remaining}</span>
            <span style="font-size:.8em;color:var(--text-muted);margin-left:8px;">(Tổng nhận: ${S.ap.total} AP · +3 AP mỗi level)</span>
          </div>
          <button class="rpg-btn-reset-ap" style="font-size:.78em;padding:5px 12px;border-radius:6px;background:rgba(239,68,68,.15);border:1px solid #ef4444;color:#ef4444;cursor:pointer;font-weight:600;">🔄 Tẩy Điểm AP</button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;">
          <!-- INT -->
          ${card(`
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <b style="color:#3b82f6;">🔵 INT (Trí Tuệ)</b>
                <div style="font-size:.75em;color:var(--text-muted);">Lý thuyết & Concepts</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:1.4em;font-weight:900;color:#3b82f6;">${S.ap.allocated.int || 0}</span>
                <button class="rpg-btn-add-ap" data-stat="int" style="width:28px;height:28px;border-radius:6px;background:#3b82f6;color:#fff;border:none;font-weight:900;cursor:pointer;" ${S.ap.remaining <= 0 ? "disabled" : ""}>+</button>
              </div>
            </div>`, "#3b82f6")}
          <!-- STR -->
          ${card(`
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <b style="color:#ef4444;">🔴 STR (Sức Mạnh)</b>
                <div style="font-size:.75em;color:var(--text-muted);">Thực chiến & Problems</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:1.4em;font-weight:900;color:#ef4444;">${S.ap.allocated.str || 0}</span>
                <button class="rpg-btn-add-ap" data-stat="str" style="width:28px;height:28px;border-radius:6px;background:#ef4444;color:#fff;border:none;font-weight:900;cursor:pointer;" ${S.ap.remaining <= 0 ? "disabled" : ""}>+</button>
              </div>
            </div>`, "#ef4444")}
          <!-- DEX -->
          ${card(`
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <b style="color:#f59e0b;">🟡 DEX (Kỹ Thuật)</b>
                <div style="font-size:.75em;color:var(--text-muted);">Equations & Mô phỏng</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:1.4em;font-weight:900;color:#f59e0b;">${S.ap.allocated.dex || 0}</span>
                <button class="rpg-btn-add-ap" data-stat="dex" style="width:28px;height:28px;border-radius:6px;background:#f59e0b;color:#fff;border:none;font-weight:900;cursor:pointer;" ${S.ap.remaining <= 0 ? "disabled" : ""}>+</button>
              </div>
            </div>`, "#f59e0b")}
          <!-- VIT -->
          ${card(`
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <b style="color:#10b981;">🟢 VIT (Thể Lực)</b>
                <div style="font-size:.75em;color:var(--text-muted);">Độ bền bỉ cày cuốc</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:1.4em;font-weight:900;color:#10b981;">${S.ap.allocated.vit || 0}</span>
                <button class="rpg-btn-add-ap" data-stat="vit" style="width:28px;height:28px;border-radius:6px;background:#10b981;color:#fff;border:none;font-weight:900;cursor:pointer;" ${S.ap.remaining <= 0 ? "disabled" : ""}>+</button>
              </div>
            </div>`, "#10b981")}
        </div>
      </div>

      <!-- BOSS ĐẤU TRƯỜNG -->
      ${sectionTitle("👹 Chapter Dungeon Bosses · Boss chương")}
      <div style="display:grid;gap:8px;">${renderBossRows()}</div>
    </div>`;

    // 4. TAB 2: TIỆM TẠP HÓA & GACHA
    const shopHtml = `
    <div id="rpg-panel-tab2" style="display:${activeTab === "tab2" ? "block" : "none"};">
      <!-- GACHA MYSTERY CHEST -->
      ${sectionTitle("🎲 Rương Báu Lượng Tử (Mystery Chest Gacha)")}
      <div style="background:linear-gradient(135deg,rgba(236,72,153,.15),rgba(245,158,11,.15));border:1px solid rgba(236,72,153,.4);border-radius:12px;padding:16px;margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="font-size:1.25em;font-weight:900;color:#ec4899;">🎁 Bạn đang có: ${S.chests} Rương Lượng Tử</div>
            <div style="font-size:.8em;color:var(--text-muted);margin-top:2px;">Rơi 20% khi học xong note hoặc đổi 50 Vàng/rương. Không chứa Vàng — 100% là vật phẩm & đặc quyền!</div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="rpg-btn-buy-chest" style="padding:8px 14px;border-radius:8px;background:rgba(245,158,11,.2);border:1px solid #f59e0b;color:#f59e0b;font-weight:700;cursor:pointer;">🛒 Mua Rương (50 G)</button>
            <button class="rpg-btn-open-chest" style="padding:8px 18px;border-radius:8px;background:linear-gradient(90deg,#ec4899,#8b5cf6);border:none;color:#fff;font-weight:800;cursor:pointer;box-shadow:0 0 12px rgba(236,72,153,.5);" ${S.chests <= 0 ? "disabled" : ""}>🎲 MỞ RƯƠNG (GACHA)</button>
          </div>
        </div>

        <!-- Tỉ Lệ Rơi Đồ (Gacha Drop Rates) -->
        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;font-size:0.72em;font-weight:700;">
          <span style="padding:2px 8px;border-radius:4px;background:rgba(148,163,184,.15);color:#94a3b8;border:1px solid #94a3b8;">Common: 50%</span>
          <span style="padding:2px 8px;border-radius:4px;background:rgba(59,130,246,.15);color:#3b82f6;border:1px solid #3b82f6;">Rare: 28%</span>
          <span style="padding:2px 8px;border-radius:4px;background:rgba(168,85,247,.15);color:#a855f7;border:1px solid #a855f7;">Epic: 13%</span>
          <span style="padding:2px 8px;border-radius:4px;background:rgba(245,158,11,.15);color:#f59e0b;border:1px solid #f59e0b;">Legendary: 5%</span>
          <span style="padding:2px 8px;border-radius:4px;background:rgba(236,72,153,.15);color:#ec4899;border:1px solid #ec4899;">Fabled: 3%</span>
          <span style="padding:2px 8px;border-radius:4px;background:rgba(239,68,68,.15);color:#ef4444;border:1px solid #ef4444;">Mythic: 1%</span>
        </div>

        <div id="rpg-gacha-result" style="margin-top:12px;padding:12px;border-radius:8px;background:rgba(0,0,0,.35);border:1px dashed rgba(255,255,255,.2);font-size:.88em;text-align:center;color:var(--text-muted);">
          Bấm MỞ RƯƠNG để nhận vật phẩm (Đồ ăn vặt, Vé xem phim, Giờ chơi game, Điểm AP/SP, hoặc Đặc quyền Thần thoại)!
        </div>
      </div>

      <!-- ITEM SHOP -->
      ${sectionTitle("🏪 Cửa Hàng Vật Phẩm Tự Thưởng (Reward Shop)")}
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;">
        ${SHOP_ITEMS.map((item) => {
            const canAfford = S.gold >= item.cost;
            return card(`
              <div style="font-size:1em;font-weight:800;margin-bottom:4px;">${esc(item.name)}</div>
              <div style="font-size:.78em;color:var(--text-muted);min-height:36px;margin-bottom:8px;">${esc(item.desc)}</div>
              <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--background-modifier-border);padding-top:8px;">
                <span style="font-weight:800;color:#f59e0b;">💰 ${item.cost} Vàng</span>
                <button class="rpg-btn-buy-item" data-id="${item.id}" data-cost="${item.cost}" data-name="${esc(item.name)}" style="padding:5px 12px;border-radius:6px;background:${canAfford ? "#f59e0b" : "var(--background-modifier-border)"};color:${canAfford ? "#000" : "var(--text-muted)"};border:none;font-weight:700;cursor:${canAfford ? "pointer" : "not-allowed"};" ${canAfford ? "" : "disabled"}>Mua</button>
              </div>`);
        }).join("")}
      </div>

      <!-- INVENTORY -->
      ${sectionTitle("🎒 Túi Đồ Của Bạn (Inventory)")}
      <div style="display:grid;gap:8px;">
        ${S.purchasedItems.length === 0 ? card("<div style='color:var(--text-muted);'>Túi đồ đang trống. Hãy quay Gacha hoặc ghé Shop để đổi quà!</div>") : S.purchasedItems.map((it, idx) => {
            const badgeColor = it.tierColor || "#f59e0b";
            const badgeLabel = it.tierName ? it.tierName.split(" ")[0].toUpperCase() : "SHOP";
            return `
            <div style="display:flex;justify-content:space-between;align-items:center;background:var(--background-primary);border:1px solid ${badgeColor};border-radius:8px;padding:8px 12px;gap:8px;flex-wrap:wrap;">
              <div>
                <span style="font-size:0.7em;font-weight:800;padding:2px 6px;border-radius:4px;background:${badgeColor};color:#fff;margin-right:6px;">${badgeLabel}</span>
                <b style="font-size:0.92em;">${esc(it.name)}</b>
                ${it.reward ? `<div style="font-size:0.78em;color:var(--text-muted);margin-top:2px;">${esc(it.reward)}</div>` : ""}
                <div style="font-size:.72em;color:var(--text-muted);">Nhận ngày: ${it.date}</div>
              </div>
              <button class="rpg-btn-use-item" data-index="${idx}" style="font-size:.75em;padding:5px 10px;border-radius:6px;background:#10b981;border:none;color:#fff;cursor:pointer;font-weight:700;">Đã Dùng Xong</button>
            </div>`;
        }).join("")}
      </div>
    </div>`;

    // 5. TAB 3: CÂY KỸ NĂNG (SKILL TREE)
    const skillHtml = `
    <div id="rpg-panel-tab3" style="display:${activeTab === "tab3" ? "block" : "none"};">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <div>
          <span style="font-size:1.1em;font-weight:800;color:#10b981;">🌟 Điểm Kỹ Năng (SP) khả dụng: ${S.sp.remaining}</span>
          <span style="font-size:.8em;color:var(--text-muted);margin-left:8px;">(Tổng nhận: ${S.sp.total} SP · +1 SP mỗi level)</span>
        </div>
        <button class="rpg-btn-reset-skills" style="font-size:.78em;padding:5px 12px;border-radius:6px;background:rgba(239,68,68,.15);border:1px solid #ef4444;color:#ef4444;cursor:pointer;font-weight:600;">🔄 Tẩy Kỹ Năng (Reset SP)</button>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;">
        ${SKILL_TREE.map((branch) => `
          <div style="background:var(--background-secondary);border:1px solid ${branch.color};border-radius:12px;padding:14px;">
            <div style="font-size:1em;font-weight:800;color:${branch.color};margin-bottom:10px;">${branch.branch}</div>
            <div style="display:grid;gap:10px;">
              ${branch.skills.map((sk) => {
                  const unlocked = S.skills.includes(sk.id);
                  const canUnlock = S.sp.remaining >= sk.cost;
                  return `
                  <div style="background:var(--background-primary);border:1px solid ${unlocked ? branch.color : "var(--background-modifier-border)"};border-radius:8px;padding:10px;${unlocked ? `box-shadow:0 0 10px ${branch.color};` : ""}">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
                      <b style="font-size:.9em;color:${unlocked ? branch.color : "inherit"};">${esc(sk.name)}</b>
                      <span style="font-size:.75em;padding:2px 6px;border-radius:4px;background:rgba(255,255,255,.1);">${sk.cost} SP</span>
                    </div>
                    <div style="font-size:.78em;color:var(--text-muted);margin:6px 0;">${esc(sk.desc)}</div>
                    <div style="text-align:right;">
                      ${unlocked ? `<span style="font-size:.75em;font-weight:800;color:${branch.color};">✅ ĐÃ MỞ KHÓA</span>` : `<button class="rpg-btn-unlock-skill" data-id="${sk.id}" data-cost="${sk.cost}" style="font-size:.75em;padding:4px 10px;border-radius:6px;background:${canUnlock ? branch.color : "var(--background-modifier-border)"};border:none;color:${canUnlock ? "#fff" : "var(--text-muted)"};font-weight:700;cursor:${canUnlock ? "pointer" : "not-allowed"};" ${canUnlock ? "" : "disabled"}>Mở Khóa</button>`}
                    </div>
                  </div>`;
              }).join("")}
            </div>
          </div>`).join("")}
      </div>
    </div>`;

    // 6. TAB 4: RƯƠNG MỐC & QUESTS
    const milestoneHtml = `
    <div id="rpg-panel-tab4" style="display:${activeTab === "tab4" ? "block" : "none"};">
      ${sectionTitle("🎁 Rương Phần Thưởng Mốc Level (Bấm vào rương mở khóa để nhận)")}
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-bottom:18px;">
        ${MILESTONE_REWARDS.map((r) => renderMilestoneCard(r)).join("")}
      </div>

      ${sectionTitle("📜 Active Quests · Mục tiêu đang giao tranh")}
      <div id="rpg-active-quests-container">
        ${renderActiveQuestsTable()}
      </div>
    </div>`;

    // 7. TAB 5: BẢO TÀNG CỔ VẬT (200 RELICS & SET CODEX)
    const relicState = R.getRelicState ? R.getRelicState() : { count: 0, totalRelics: 200, progressPct: 0, dust: 0, unlockedRelics: [], activeSets: [] };
    const relicsData = R.getRelicsData ? R.getRelicsData() : { SETS: [], RELICS: [] };
    const unlockedSet = new Set(relicState.unlockedRelics || []);

    const activeSetsList = (relicState.activeSets || []).filter((s) => s.has4 || s.has8);
    const activeSetsHtml = activeSetsList.length === 0
        ? `<div style="color:var(--text-muted);font-size:.85em;padding:6px 0;">Chưa có Bộ nào kích hoạt. Hãy thu thập từ 4 món trong một Bộ để mở khóa Nội Tại vĩnh viễn!</div>`
        : `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px;">
            ${activeSetsList.map((s) => `
              <div style="background:var(--background-secondary);border:1px solid ${s.has8 ? "#8A00C4" : "#FA5053"};border-radius:8px;padding:10px 12px;box-shadow:0 0 10px ${s.has8 ? "rgba(138,0,196,.35)" : "rgba(250,80,83,.25)"};">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <b>${s.icon} ${esc(s.name)}</b>
                  <span style="font-size:0.75em;padding:2px 8px;border-radius:4px;background:${s.has8 ? "#8A00C4" : "#FA5053"};color:#fff;font-weight:800;">${s.has8 ? "👑 BỘ 8 HOÀN HẢO" : "✨ BỘ 4 MÓN"} (${s.ownedCount}/8)</span>
                </div>
                <div style="font-size:0.8em;color:#10b981;margin-top:4px;"><b>Nội tại 4 món:</b> ${esc(s.bonus4)}</div>
                ${s.has8 ? `<div style="font-size:0.8em;color:#c084fc;margin-top:2px;"><b>Nội tại 8 món:</b> ${esc(s.bonus8)}</div>` : `<div style="font-size:0.75em;color:var(--text-muted);margin-top:2px;">Cần thêm ${8 - s.ownedCount} món để kích hoạt Bộ 8: ${esc(s.bonus8)}</div>`}
              </div>`).join("")}
          </div>`;

    const curFilterSet = window._rpg_relic_filter_set || "all";
    const curFilterRarity = window._rpg_relic_filter_rarity || "all";
    const curFilterStatus = window._rpg_relic_filter_status || "all";

    let displayedRelics = relicsData.RELICS || [];
    if (curFilterSet !== "all") {
        displayedRelics = displayedRelics.filter((r) => r.set_id === curFilterSet);
    }
    if (curFilterRarity !== "all") {
        displayedRelics = displayedRelics.filter((r) => r.rarity === curFilterRarity);
    }
    if (curFilterStatus === "owned") {
        displayedRelics = displayedRelics.filter((r) => unlockedSet.has(r.id));
    } else if (curFilterStatus === "unowned") {
        displayedRelics = displayedRelics.filter((r) => !unlockedSet.has(r.id));
    }

    const setOptions = (relicsData.SETS || []).map((s) => {
        return `<option value="${s.id}" ${curFilterSet === s.id ? "selected" : ""}>${s.icon} ${esc(s.name)}</option>`;
    }).join("");

    const relicCardsHtml = displayedRelics.map((r) => {
        const isOwned = unlockedSet.has(r.id);
        const meta = (R.RARITY_META && R.RARITY_META[r.rarity]) || { name: r.rarity, color: "#94a3b8", craftCost: 100 };
        const cost = meta.craftCost;
        const canCraft = relicState.dust >= cost;
        const border = isOwned ? meta.color : "var(--background-modifier-border)";
        const shadow = isOwned ? `box-shadow:0 0 10px ${meta.color};` : "";
        const opacity = isOwned ? "1" : "0.55";

        return `
        <div class="rpg-relic-card" data-id="${r.id}" style="background:var(--background-primary);border:1px solid ${border};border-radius:10px;padding:10px 12px;opacity:${opacity};${shadow}display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.72em;margin-bottom:4px;">
              <span style="font-weight:800;color:${meta.color};">#${r.id} · ${meta.name.split(" ")[0].toUpperCase()}</span>
              <span style="font-size:1.1em;">${r.setIcon}</span>
            </div>
            <div style="font-size:0.92em;font-weight:800;color:${isOwned ? meta.color : "var(--text-muted)"};margin-bottom:2px;">${isOwned ? esc(r.name) : "🔒 Chưa Khai Quật"}</div>
            <div style="font-size:0.72em;color:var(--text-muted);">${esc(r.setName)}</div>
            <div style="font-size:0.75em;color:var(--text-muted);margin-top:6px;font-style:italic;line-height:1.3;">"${esc(r.lore)}"</div>
          </div>
          <div style="margin-top:8px;border-top:1px solid var(--background-modifier-border);padding-top:6px;">
            ${isOwned
              ? `<span style="font-size:0.72em;font-weight:800;color:#10b981;">✅ ĐÃ THU THẬP</span>`
              : `<button class="rpg-btn-craft-relic" data-id="${r.id}" data-cost="${cost}" style="font-size:0.72em;padding:4px 8px;border-radius:6px;background:${canCraft ? meta.color : "var(--background-modifier-border)"};border:none;color:${canCraft ? "#fff" : "var(--text-muted)"};font-weight:800;cursor:${canCraft ? "pointer" : "not-allowed"};width:100%;" ${canCraft ? "" : "disabled"}>🔨 Đúc (${cost} Bụi)</button>`}
          </div>
        </div>`;
    }).join("");

    const museumHtml = `
    <div id="rpg-panel-tab5" style="display:${activeTab === "tab5" ? "block" : "none"};">
      <!-- HEADER TIẾN ĐỘ BẢO TÀNG -->
      <div style="background:linear-gradient(135deg,rgba(138,0,196,.2),rgba(250,80,83,.15));border:1px solid rgba(138,0,196,.45);border-radius:12px;padding:16px;margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="font-size:1.3em;font-weight:900;color:#c084fc;">🏛️ Đại Sảnh Bảo Tàng Cổ Vật Khoa Học</div>
            <div style="font-size:.82em;color:var(--text-muted);margin-top:2px;">200 Cổ Vật Lượng Tử chia thành 25 Bộ. Thu thập đủ Bộ 4 và Bộ 8 để kích hoạt Nội Tại Vĩnh Viễn!</div>
          </div>
          <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
            <span style="padding:6px 14px;border-radius:8px;background:rgba(192,132,252,.15);border:1px solid #c084fc;color:#c084fc;font-weight:800;font-size:0.88em;">✨ ${relicState.dust} Bụi Lượng Tử</span>
            <span style="padding:6px 14px;border-radius:8px;background:rgba(250,80,83,.15);border:1px solid #FA5053;color:#FA5053;font-weight:800;font-size:0.88em;">🌟 ${relicState.bonus4Count} Bộ 4 Món</span>
            <span style="padding:6px 14px;border-radius:8px;background:rgba(138,0,196,.2);border:1px solid #8A00C4;color:#c084fc;font-weight:800;font-size:0.88em;">👑 ${relicState.bonus8Count} Bộ Hoàn Hảo</span>
          </div>
        </div>

        <div style="margin-top:14px;">
          <div style="display:flex;justify-content:space-between;font-size:.82em;margin-bottom:4px;">
            <span>Tiến độ Khai Quật: <b>${relicState.count}</b> / 200 Cổ Vật (${relicState.progressPct}%)</span>
            <span style="color:var(--text-muted);">Còn <b>${200 - relicState.count}</b> Cổ Vật chưa tìm thấy</span>
          </div>
          ${bar(relicState.progressPct, "linear-gradient(90deg,#FA5053,#8A00C4)", 12)}
        </div>
      </div>

      <!-- KHU VỰC NỘI TẠI BỘ ĐANG KÍCH HOẠT -->
      ${sectionTitle("🌟 Nội Tại Bộ Đang Kích Hoạt (Active Set Bonuses)")}
      <div style="margin-bottom:16px;">${activeSetsHtml}</div>

      <!-- THANH BỘ LỌC CỔ VẬT -->
      ${sectionTitle("🔍 Danh Mục Triển Lãm 200 Cổ Vật (Bộ Lọc)")}
      <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap;align-items:center;background:var(--background-secondary);padding:10px 14px;border-radius:8px;">
        <div>
          <label style="font-size:0.75em;color:var(--text-muted);display:block;margin-bottom:2px;">Theo Bộ (Set):</label>
          <select id="rpg-filter-set" style="padding:5px 8px;border-radius:6px;background:var(--background-primary);border:1px solid var(--background-modifier-border);color:inherit;font-size:0.82em;">
            <option value="all">Tất cả 25 Bộ (200 Món)</option>
            ${setOptions}
          </select>
        </div>
        <div>
          <label style="font-size:0.75em;color:var(--text-muted);display:block;margin-bottom:2px;">Bậc Phẩm:</label>
          <select id="rpg-filter-rarity" style="padding:5px 8px;border-radius:6px;background:var(--background-primary);border:1px solid var(--background-modifier-border);color:inherit;font-size:0.82em;">
            <option value="all" ${curFilterRarity === "all" ? "selected" : ""}>Tất cả phẩm cấp</option>
            <option value="common" ${curFilterRarity === "common" ? "selected" : ""}>Common</option>
            <option value="rare" ${curFilterRarity === "rare" ? "selected" : ""}>Rare</option>
            <option value="epic" ${curFilterRarity === "epic" ? "selected" : ""}>Epic</option>
            <option value="legendary" ${curFilterRarity === "legendary" ? "selected" : ""}>Legendary</option>
            <option value="fabled" ${curFilterRarity === "fabled" ? "selected" : ""}>Fabled</option>
            <option value="mythic" ${curFilterRarity === "mythic" ? "selected" : ""}>Mythic</option>
          </select>
        </div>
        <div>
          <label style="font-size:0.75em;color:var(--text-muted);display:block;margin-bottom:2px;">Trạng Thái:</label>
          <select id="rpg-filter-status" style="padding:5px 8px;border-radius:6px;background:var(--background-primary);border:1px solid var(--background-modifier-border);color:inherit;font-size:0.82em;">
            <option value="all" ${curFilterStatus === "all" ? "selected" : ""}>Tất cả</option>
            <option value="owned" ${curFilterStatus === "owned" ? "selected" : ""}>Đã Thu Thập</option>
            <option value="unowned" ${curFilterStatus === "unowned" ? "selected" : ""}>Chưa Có (Có Thể Đúc)</option>
          </select>
        </div>
      </div>

      <!-- LƯỚI TRIỂN LÃM CỔ VẬT -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;">
        ${relicCardsHtml || card("<div style='color:var(--text-muted);'>Không tìm thấy cổ vật nào theo bộ lọc đã chọn.</div>")}
      </div>
    </div>`;

    root.innerHTML = headerHtml + navHtml + statsHtml + shopHtml + skillHtml + milestoneHtml + museumHtml;
    bindAllEvents();
}

function renderBossRows() {
    const groups = new Map();
    for (const it of S.items) {
        const p = it.page;
        const subject = p.subject ? String(p.subject) : "";
        const chapter = p.chapter ? String(p.chapter) : "Uncategorized Dungeon";
        const key = subject ? `${subject} › ${chapter}` : chapter;
        if (!groups.has(key)) groups.set(key, { total: 0, slain: 0 });
        const g = groups.get(key);
        g.total++;
        if (it.done) g.slain++;
    }
    return [...groups.entries()]
        .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
        .map(([name, g]) => {
            const hp = g.total ? Math.round((1 - g.slain / g.total) * 100) : 100;
            let badge, color;
            if (g.total > 0 && g.slain === g.total) {
                badge = `<span style="color:#facc15;font-weight:800;">🏆 BOSS SLAIN</span>`; color = "#facc15";
            } else if (g.slain > 0) {
                badge = `<span style="color:#f97316;font-weight:700;">⚔️ GIAO TRANH · Còn ${g.total - g.slain}</span>`; color = "#ef4444";
            } else {
                badge = `<span style="color:var(--text-muted);font-weight:700;">💀 100% HP</span>`; color = "#7f1d1d";
            }
            return card(`
              <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:.88em;margin-bottom:6px;">
                <b>👹 ${esc(name)}</b>${badge}
              </div>
              <div style="display:flex;gap:10px;align-items:center;">
                <span style="font-size:.75em;color:var(--text-muted);min-width:65px;">HP ${hp}%</span>
                <div style="flex:1;">${bar(hp, color, 8)}</div>
                <span style="font-size:.75em;color:var(--text-muted);">${g.slain}/${g.total}</span>
              </div>`, g.slain === g.total ? "#facc15" : "var(--background-modifier-border)");
        }).join("");
}

function renderMilestoneCard(r) {
    const need = Math.pow(2, r.level - 1);
    const open = level >= r.level;
    const isClaimed = S.claimedChests.includes(r.level);
    let borderColor = "var(--background-modifier-border)";
    let shadow = "";
    let statusText = `ĐANG KHÓA · Cần thêm ${(need - exp).toLocaleString()} EXP`;
    let statusColor = "var(--text-muted)";
    let icon = "🔒";
    let btnText = "";

    if (open) {
        if (isClaimed) {
            borderColor = "#f59e0b";
            shadow = "box-shadow: 0 0 10px rgba(245,158,11,.3);";
            statusText = `✅ ĐÃ NHẬN (+${r.chests} Rương)`;
            statusColor = "#f59e0b";
            icon = "✨";
            btnText = `<div style="margin-top:6px;font-size:0.75em;padding:4px 8px;border-radius:6px;background:rgba(245,158,11,0.15);color:#f59e0b;font-weight:700;text-align:center;">Đã nhận vào kho ✅</div>`;
        } else {
            borderColor = "#10b981";
            shadow = "box-shadow: 0 0 10px rgba(16,185,129,.35);";
            statusText = "🎁 SẴN SÀNG NHẬN";
            statusColor = "#10b981";
            icon = "🎁";
            btnText = `<div style="margin-top:6px;font-size:0.75em;padding:4px 8px;border-radius:6px;background:linear-gradient(90deg,#059669,#10b981);color:#fff;font-weight:700;text-align:center;">Bấm để nhận +${r.chests} Rương 🎉</div>`;
        }
    }

    return `
    <div class="rpg-chest-card" data-level="${r.level}" data-unlocked="${open}" data-claimed="${isClaimed}" style="background:var(--background-primary);border:1px solid ${borderColor};border-radius:10px;padding:12px;opacity:${open ? 1 : 0.55};${shadow}cursor:${open && !isClaimed ? "pointer" : "default"};transition:all 0.2s ease;">
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:.75em;color:var(--text-muted);">
        <span>Lv.${r.level} · ${need.toLocaleString()} EXP</span>
        <span style="font-size:1.3em;">${icon}</span>
      </div>
      <div style="font-size:1.02em;font-weight:800;color:${open ? (isClaimed ? "#f59e0b" : "#10b981") : "var(--text-muted)"};margin:6px 0;line-height:1.35;${isClaimed ? "text-decoration:line-through;" : ""}">${esc(r.reward)}</div>
      <div style="font-size:.72em;font-weight:800;letter-spacing:0.5px;color:${statusColor};">${statusText}</div>
      ${btnText}
    </div>`;
}

function renderActiveQuestsTable() {
    const active = S.items
        .filter((x) => !x.done)
        .sort((a, b) => String(a.page.next_review ?? "9999").localeCompare(String(b.page.next_review ?? "9999")));
    if (active.length === 0) return "<p>🌟 Mọi quái vật đã bị tiêu diệt!</p>";
    let html = `<table class="dataview table-view-table"><thead><tr><th>Mục tiêu</th><th>Loại</th><th>Chương</th><th>Trạng thái</th><th>Ôn tập</th></tr></thead><tbody>`;
    for (const x of active) {
        html += `<tr><td><a class="internal-link" data-href="${x.page.file.path}" href="${x.page.file.path}">${x.page.file.name || x.page.file.link}</a></td><td>${MOBS[x.kind].icon} ${MOBS[x.kind].name}</td><td>${x.page.chapter ?? "—"}</td><td>${x.page.status ?? "—"}</td><td>${x.page.next_review ?? "—"}</td></tr>`;
    }
    html += `</tbody></table>`;
    return html;
}

function bindAllEvents() {
    // 1. Chuyển Tab
    root.querySelectorAll(".rpg-tab-btn").forEach((btn) => {
        btn.onclick = () => {
            window._rpg_active_tab = btn.getAttribute("data-tab");
            renderFullUI();
        };
    });

    // 2. Thử chuông
    const chimeBtn = root.querySelector(".rpg-btn-test-chime");
    if (chimeBtn) chimeBtn.onclick = () => R.playLevelUpChime();

    // 3. Cộng điểm AP
    root.querySelectorAll(".rpg-btn-add-ap").forEach((btn) => {
        btn.onclick = () => {
            const stat = btn.getAttribute("data-stat");
            R.allocateAP(stat, 1);
            renderFullUI();
        };
    });

    // 4. Reset AP
    const resetApBtn = root.querySelector(".rpg-btn-reset-ap");
    if (resetApBtn) resetApBtn.onclick = () => {
        if (confirm("Bạn có chắc chắn muốn Tẩy toàn bộ điểm AP để phân bổ lại?")) {
            R.resetAP();
            renderFullUI();
        }
    };

    // 5. Mua Rương Gacha (50 Vàng)
    const buyChestBtn = root.querySelector(".rpg-btn-buy-chest");
    if (buyChestBtn) buyChestBtn.onclick = () => {
        if (R.spendGold(50)) {
            R.addChests(1);
            renderFullUI();
        } else {
            alert("Bạn không đủ Vàng (Cần 50 Vàng để mua 1 Rương)!");
        }
    };

    // 6. Mở Rương Gacha
    const openChestBtn = root.querySelector(".rpg-btn-open-chest");
    if (openChestBtn) openChestBtn.onclick = () => {
        const drop = R.openMysteryChest();
        if (drop) {
            renderFullUI();
            const resEl = root.querySelector("#rpg-gacha-result");
            if (resEl) {
                resEl.innerHTML = `
                  <div style="display:inline-block;padding:3px 10px;border-radius:999px;font-size:0.75em;font-weight:800;letter-spacing:1px;background:${drop.tierColor};color:#fff;margin-bottom:6px;">${drop.tierName.toUpperCase()}</div>
                  <div style="font-size:1.3em;font-weight:900;color:${drop.tierColor};text-shadow:0 0 10px ${drop.tierColor};">🎉 ${drop.icon} ${drop.name}</div>
                  <div style="font-size:0.95em;color:#fff;font-weight:700;margin-top:4px;">${drop.reward}</div>
                  <div style="font-size:0.75em;color:var(--text-muted);margin-top:4px;">${drop.isNew ? "(Đã được đưa vào Đại Sảnh Bảo Tàng Cổ Vật #Tab 5)" : `(+${drop.dustGained} Bụi Lượng Tử dùng để đúc cổ vật)`}</div>`;
                resEl.style.border = `1px solid ${drop.tierColor}`;
                resEl.style.background = `rgba(0,0,0,0.5)`;
                resEl.style.boxShadow = `0 0 15px ${drop.tierColor}`;
            }
        }
    };

    // 7. Mua Vật Phẩm trong Shop
    root.querySelectorAll(".rpg-btn-buy-item").forEach((btn) => {
        btn.onclick = () => {
            const cost = parseInt(btn.getAttribute("data-cost"), 10);
            const name = btn.getAttribute("data-name");
            if (R.spendGold(cost)) {
                const inv = JSON.parse(localStorage.getItem(R.STORAGE_KEYS.ITEMS) || "[]");
                inv.push({ name, date: new Date().toLocaleDateString("vi-VN") });
                localStorage.setItem(R.STORAGE_KEYS.ITEMS, JSON.stringify(inv));
                renderFullUI();
            } else {
                alert(`Bạn không đủ Vàng để đổi "${name}"!`);
            }
        };
    });

    // 8. Dùng vật phẩm trong Túi đồ
    root.querySelectorAll(".rpg-btn-use-item").forEach((btn) => {
        btn.onclick = () => {
            const idx = parseInt(btn.getAttribute("data-index"), 10);
            const inv = JSON.parse(localStorage.getItem(R.STORAGE_KEYS.ITEMS) || "[]");
            inv.splice(idx, 1);
            localStorage.setItem(R.STORAGE_KEYS.ITEMS, JSON.stringify(inv));
            renderFullUI();
        };
    });

    // 9. Mở Khóa Kỹ Năng
    root.querySelectorAll(".rpg-btn-unlock-skill").forEach((btn) => {
        btn.onclick = () => {
            const id = btn.getAttribute("data-id");
            const cost = parseInt(btn.getAttribute("data-cost"), 10);
            if (R.unlockSkill(id, cost)) {
                renderFullUI();
            } else {
                alert("Bạn không đủ điểm SP để mở khóa kỹ năng này!");
            }
        };
    });

    // 10. Reset Kỹ Năng
    const resetSkillBtn = root.querySelector(".rpg-btn-reset-skills");
    if (resetSkillBtn) resetSkillBtn.onclick = () => {
        if (confirm("Bạn có chắc muốn Tẩy lại toàn bộ Cây Kỹ Năng để lấy lại điểm SP?")) {
            R.resetSkills();
            renderFullUI();
        }
    };

    // 11. Bấm Rương Mốc Level
    root.querySelectorAll(".rpg-chest-card").forEach((cardEl) => {
        const lvl = parseInt(cardEl.getAttribute("data-level"), 10);
        const isUnlocked = cardEl.getAttribute("data-unlocked") === "true";
        const isClaimed = cardEl.getAttribute("data-claimed") === "true";
        if (isUnlocked && !isClaimed) {
            cardEl.onclick = () => {
                let claimed = JSON.parse(localStorage.getItem(R.STORAGE_KEYS.CLAIMED) || "[]");
                if (!claimed.includes(lvl)) {
                    claimed.push(lvl);
                    localStorage.setItem(R.STORAGE_KEYS.CLAIMED, JSON.stringify(claimed));
                    const milestone = MILESTONE_REWARDS.find((m) => m.level === lvl);
                    const chestsToAdd = milestone ? milestone.chests : 1;
                    R.addChests(chestsToAdd);
                    R.playGachaSound("epic");
                    renderFullUI();
                }
            };
        }
    });

    // 12. Bộ Lọc Bảo Tàng Cổ Vật (Tab 5)
    const filterSetEl = root.querySelector("#rpg-filter-set");
    if (filterSetEl) {
        filterSetEl.onchange = (e) => {
            window._rpg_relic_filter_set = e.target.value;
            renderFullUI();
        };
    }

    const filterRarityEl = root.querySelector("#rpg-filter-rarity");
    if (filterRarityEl) {
        filterRarityEl.onchange = (e) => {
            window._rpg_relic_filter_rarity = e.target.value;
            renderFullUI();
        };
    }

    const filterStatusEl = root.querySelector("#rpg-filter-status");
    if (filterStatusEl) {
        filterStatusEl.onchange = (e) => {
            window._rpg_relic_filter_status = e.target.value;
            renderFullUI();
        };
    }

    // 13. Nút Đúc Cổ Vật Bằng Bụi Lượng Tử (Tab 5)
    root.querySelectorAll(".rpg-btn-craft-relic").forEach((btn) => {
        btn.onclick = () => {
            const id = parseInt(btn.getAttribute("data-id"), 10);
            const res = R.craftRelic(id);
            if (res.success) {
                renderFullUI();
            } else {
                alert(res.reason || "Không thể đúc cổ vật!");
            }
        };
    });
}

// Khởi tạo hiển thị lần đầu
renderFullUI();
