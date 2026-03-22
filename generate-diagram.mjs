import { writeFileSync } from 'fs';

// ─── Primitives ────────────────────────────────────────────────────────────────
let seedCounter = 100000;
const seed = () => seedCounter++;
const uid = () => Math.random().toString(36).slice(2, 22).padEnd(20, '0');

function rect(x, y, w, h, bg, opts = {}) {
  const rid = uid();
  return {
    id: rid,
    obj: {
      id: rid, type: "rectangle", x, y, width: w, height: h, angle: 0,
      strokeColor: opts.strokeColor ?? "#1e1e1e",
      backgroundColor: bg, fillStyle: "solid",
      strokeWidth: opts.strokeWidth ?? 2,
      strokeStyle: opts.strokeStyle ?? "solid",
      roughness: 0, opacity: opts.opacity ?? 100,
      roundness: { type: 3 }, seed: seed(), version: 1, versionNonce: seed(),
      isDeleted: false, boundElements: [], updated: 1, link: null,
      locked: false, groupIds: []
    }
  };
}

function txt(x, y, w, h, content, fontSize, containerId = null, color = "#1e1e1e") {
  const tid = uid();
  return {
    id: tid,
    obj: {
      id: tid, type: "text", x, y, width: w, height: h, angle: 0,
      strokeColor: color, backgroundColor: "transparent", fillStyle: "solid",
      strokeWidth: 1, strokeStyle: "solid", roughness: 0, opacity: 100,
      roundness: null, seed: seed(), version: 1, versionNonce: seed(),
      isDeleted: false, boundElements: null, updated: 1, link: null,
      locked: false, text: content, fontSize, fontFamily: 5,
      textAlign: containerId ? "center" : "left",
      verticalAlign: containerId ? "middle" : "top",
      containerId, originalText: content, autoResize: true,
      lineHeight: 1.25, groupIds: []
    }
  };
}

function mkArrow(startX, startY, points, color, startId, endId, labelText, opts = {}) {
  const aid = uid();
  const els = [];
  const obj = {
    id: aid, type: "arrow", x: startX, y: startY,
    width: Math.abs(points[points.length - 1][0]),
    height: Math.abs(points[points.length - 1][1]),
    angle: 0, strokeColor: color, backgroundColor: "transparent",
    fillStyle: "solid", strokeWidth: opts.strokeWidth ?? 2,
    strokeStyle: opts.strokeStyle ?? "solid", roughness: 0,
    opacity: 100, roundness: { type: 2 }, seed: seed(), version: 1,
    versionNonce: seed(), isDeleted: false, updated: 1, link: null,
    locked: false, points, lastCommittedPoint: null,
    startBinding: startId ? { elementId: startId, focus: 0, gap: 8, fixedPoint: null } : null,
    endBinding: endId ? { elementId: endId, focus: 0, gap: 8, fixedPoint: null } : null,
    startArrowhead: null, endArrowhead: "arrow", groupIds: [], boundElements: []
  };
  if (labelText) {
    const midIdx = Math.floor(points.length / 2);
    const mp = points[midIdx];
    const lbl = txt(startX + mp[0] - 50, startY + mp[1] - 10, 100, 20,
      labelText, 11, aid, color);
    obj.boundElements.push({ id: lbl.id, type: "text" });
    els.push(lbl.obj);
  }
  els.unshift(obj);
  return { id: aid, elements: els };
}

function card(x, y, w, h, bg, label, fontSize = 18) {
  const r = rect(x, y, w, h, bg);
  const lines = label.split('\n').length;
  const th = lines * fontSize * 1.25;
  const t = txt(x + 10, y + (h - th) / 2, w - 20, th, label, fontSize, r.id);
  r.obj.boundElements.push({ id: t.id, type: "text" });
  return { rectId: r.id, textId: t.id, elements: [r.obj, t.obj], x, y, w, h };
}

function stackedCard(x, y, w, h, bg, label, fontSize = 18) {
  const off = 7;
  const s2 = rect(x + off * 2, y - off * 2, w, h, bg,
    { opacity: 30, strokeStyle: "dashed", strokeWidth: 1 });
  const s1 = rect(x + off, y - off, w, h, bg,
    { opacity: 55, strokeStyle: "dashed", strokeWidth: 1 });
  const main = card(x, y, w, h, bg, label, fontSize);
  return {
    rectId: main.rectId, textId: main.textId,
    elements: [s2.obj, s1.obj, ...main.elements],
    x, y, w, h
  };
}

// ─── Diagram state ─────────────────────────────────────────────────────────────
const elements = [];
const add = (...els) => elements.push(...els);
const addCard = (c) => add(...c.elements);

const cx = (c) => c.x + c.w / 2;
const cy = (c) => c.y + c.h / 2;
const T = (c) => c.y;
const B = (c) => c.y + c.h;
const L = (c) => c.x;
const R = (c) => c.x + c.w;

function addArrow(src, dst, pts, color, label, opts) {
  const a = mkArrow(pts[0][0], pts[0][1],
    pts.map(p => [p[0] - pts[0][0], p[1] - pts[0][1]]),
    color, src?.rectId, dst?.rectId, label, opts);
  if (src) {
    const el = elements.find(e => e.id === src.rectId);
    if (el) el.boundElements.push({ id: a.id, type: "arrow" });
  }
  if (dst) {
    const el = elements.find(e => e.id === dst.rectId);
    if (el) el.boundElements.push({ id: a.id, type: "arrow" });
  }
  add(...a.elements);
}

const DASHED = { strokeStyle: "dashed", strokeWidth: 2 };
const THIN = { strokeWidth: 1 };

// ═══════════════════════════════════════════════════════════════════════════════
//  SPATIAL GRID — all layout math is here
// ═══════════════════════════════════════════════════════════════════════════════

// Horizontal: generous margins and gaps for routing
const SIDE_W = 180;         // side-card width (sellers, referrers)
const ROUTE_W = 50;         // routing-lane width beside columns
const COL_W = 220;          // column / container width
const COL_GAP = 110;        // gap BETWEEN columns (arrow routing lanes)
const INNER_PAD = 15;       // padding inside column for cards
const CARD_W = COL_W - 2 * INNER_PAD; // 190

const COLS_START = SIDE_W + ROUTE_W;            // 230
const colX  = (i) => COLS_START + i * (COL_W + COL_GAP);
const innerX = (i) => colX(i) + INNER_PAD;
const colCx = (i) => colX(i) + COL_W / 2;
// gap center between col i and col i+1
const gapX  = (i) => colX(i) + COL_W + COL_GAP / 2;

const COLS_END = colX(4) + COL_W;               // rightmost column right edge
const SIDE_R_X = COLS_END + ROUTE_W;             // right side-cards start
const CANVAS_W = SIDE_R_X + SIDE_W;              // total width (~1910)

// Vertical: big gaps between sections = routing lanes
const USER_Y = 50;
const USER_H = 65;

const GROUP_Y = 220;        // container top
const FACT_Y = 238;         // factory card inside container
const FACT_H = 56;
const CHILD_Y = 360;        // child card inside container (or standalone)
const CHILD_H = 85;
const CONTAINER_H = 240;    // GROUP_Y + 240 = 460

// 140px ROUTING ZONE between containers and DAO — no cards live here
const ROUTE_ZONE = GROUP_Y + CONTAINER_H + 20;  // 480
const ROUTE_FEE = ROUTE_ZONE + 15;              // 495 — horizontal lane for Create Fee
const ROUTE_TAX = ROUTE_ZONE + 40;              // 520 — horizontal lane for Impact Tax
const ROUTE_PAY = ROUTE_ZONE + 65;              // 545 — horizontal lane for payouts

const DAO_Y = 630;
const DAO_H = 100;

const SELLER_Y = 620;
const MKTPLACE_Y = 740;
const REFERRER_Y = 620;
const TRIGGER_Y = 740;

const RM_Y = 870;

const FINAL_Y = 1040;
const FINAL_H = 65;

const LEGEND_Y = 1155;

// Convenience: left/right routing lane X centers
const LEFT_LANE = SIDE_W + ROUTE_W / 2;   // 205
const RIGHT_LANE = COLS_END + ROUTE_W / 2; // ~1555

// ═══════════════════════════════════════════════════════════════════════════════
//  C A R D S
// ═══════════════════════════════════════════════════════════════════════════════

// ── Title ──
add(txt(20, -40, 700, 42, "Akita Protocol — Contract Economic Flow", 28).obj);

// ── Users ──
const users = card(Math.round(CANVAS_W / 2 - 200), USER_Y, 400, USER_H,
  "#a5d8ff", "Users / Participants", 22);
addCard(users);

// ── Group containers ──
const containerBg = "#f8f9fa";
const containerStroke = "#dee2e6";
const mkContainer = (col) => {
  const c = rect(colX(col), GROUP_Y, COL_W, CONTAINER_H, containerBg,
    { strokeColor: containerStroke, strokeWidth: 1 });
  add(c.obj);
  return c;
};

// Col 0 — Auction
mkContainer(0);
const auctionF = card(innerX(0), FACT_Y, CARD_W, FACT_H, "#d0ebff", "Auction\nFactory", 15);
const auctionC = stackedCard(innerX(0), CHILD_Y, CARD_W, CHILD_H, "#b2f2bb", "Auction\n(NFT Sales)", 15);
addCard(auctionF); addCard(auctionC);

// Col 1 — Raffle
mkContainer(1);
const raffleF = card(innerX(1), FACT_Y, CARD_W, FACT_H, "#d0ebff", "Raffle\nFactory", 15);
const raffleC = stackedCard(innerX(1), CHILD_Y, CARD_W, CHILD_H, "#b2f2bb", "Raffle\n(Ticket Sales)", 15);
addCard(raffleF); addCard(raffleC);

// Col 2 — Social (standalone)
const social = card(innerX(2), CHILD_Y, CARD_W, CHILD_H, "#b2f2bb", "Social\n(Tips / Votes)", 15);
addCard(social);

// Col 3 — Subscriptions (standalone)
const subs = card(innerX(3), CHILD_Y, CARD_W, CHILD_H, "#b2f2bb", "Subscriptions\n(Recurring Pay)", 15);
addCard(subs);

// Col 4 — Staking Pool
mkContainer(4);
const stakingPF = card(innerX(4), FACT_Y, CARD_W, FACT_H, "#d0ebff", "Staking Pool\nFactory", 15);
const stakingPC = stackedCard(innerX(4), CHILD_Y, CARD_W, CHILD_H, "#b2f2bb", "Staking Pool\n(Rewards)", 15);
addCard(stakingPF); addCard(stakingPC);

// ── DAO ──
const daoW = 500;
const daoX = Math.round(CANVAS_W / 2 - daoW / 2);
const dao = card(daoX, DAO_Y, daoW, DAO_H, "#ffec99",
  "AkitaDAO Treasury Escrow\n(All Protocol Revenue)", 20);
addCard(dao);

// ── Side cards — left ──
const sellers   = card(0, SELLER_Y, SIDE_W, 80, "#d0bfff", "Sellers &\nNFT Creators", 15);
const mktplaces = card(0, MKTPLACE_Y, SIDE_W, 65, "#d0bfff", "Marketplaces\n(Listing & Buying)", 13);
addCard(sellers); addCard(mktplaces);

// ── Side cards — right ──
const referrers  = card(SIDE_R_X, REFERRER_Y, SIDE_W, 65, "#d0bfff", "Referrers", 15);
const triggerBots = card(SIDE_R_X, TRIGGER_Y, SIDE_W, 65, "#d0bfff", "Trigger Bots\n(3rd Party)", 13);
addCard(referrers); addCard(triggerBots);

// ── BONES Token Participation ──
const bonesStaking = card(SIDE_R_X, RM_Y - 5, SIDE_W, 80, "#c3fae8",
  "BONES Staking\n(Lock AKITA)", 14);
addCard(bonesStaking);

// ── Revenue Manager ──
const rmW = 440;
const revMgr = card(Math.round(CANVAS_W / 2 - rmW / 2), RM_Y, rmW, 80, "#ffd8a8",
  "Revenue Manager Plugin\n(ARC-58)", 20);
addCard(revMgr);

// ── Final Recipients ──
const fGap = 80;
const fTotalW = 3 * 180 + 2 * fGap;
const fStart = Math.round(CANVAS_W / 2 - fTotalW / 2);
const stakeholders = card(fStart, FINAL_Y, 180, FINAL_H, "#ffc9c9", "BONES\nStakers", 15);
const team = card(fStart + 260, FINAL_Y, 180, FINAL_H, "#ffc9c9", "Team &\nOperations", 15);
const community = card(fStart + 520, FINAL_Y, 180, FINAL_H, "#ffc9c9", "Community\nTreasury", 15);
addCard(stakeholders); addCard(team); addCard(community);

// ── Infrastructure — colocated with Staking Pool (col 4) ──
const INFRA_CW = 105;
const INFRA_CH = 45;
const INFRA_CY = 565;
const staking = card(colX(4), INFRA_CY, INFRA_CW, INFRA_CH, "#e9ecef", "Staking\n(Ledger)", 11);
const rewards = card(colX(4) + 115, INFRA_CY, INFRA_CW, INFRA_CH, "#e9ecef", "Rewards\n(Claimable)", 11);
addCard(staking); addCard(rewards);

// ── Legend ──
add(txt(20, LEGEND_Y, 100, 24, "Legend", 16, null, "#1e1e1e").obj);

const legStack = stackedCard(20, LEGEND_Y + 32, 90, 32, "#b2f2bb", "Child", 11);
addCard(legStack);
add(txt(130, LEGEND_Y + 37, 350, 20,
  "= many child contract instances (deployed by factory)", 11, null, "#495057").obj);

const legFact = card(20, LEGEND_Y + 78, 90, 32, "#d0ebff", "Factory", 11);
addCard(legFact);
add(txt(130, LEGEND_Y + 83, 350, 20,
  "= deploys child contracts, collects creation fees", 11, null, "#495057").obj);

const ly = LEGEND_Y + 128;
add(txt(20, ly,      440, 18, "Green arrows   = user payments / payouts (ALGO or any ASA)", 11, null, "#2f9e44").obj);
add(txt(20, ly + 20, 440, 18, "Red arrows     = protocol fees flowing to DAO treasury", 11, null, "#e03131").obj);
add(txt(20, ly + 40, 440, 18, "Orange arrows  = revenue distribution out of treasury", 11, null, "#e8590c").obj);
add(txt(20, ly + 60, 440, 18, "Dashed arrows  = factory deploys child contracts", 11, null, "#1971c2").obj);
add(txt(20, ly + 80, 440, 18, "Gray arrows    = utility / reference links (no funds)", 11, null, "#868e96").obj);
add(txt(20, ly + 100, 440, 18, "Purple arrows  = BONES staking / token participation", 11, null, "#7048e8").obj);


// ═══════════════════════════════════════════════════════════════════════════════
//  A R R O W S  —  every route uses dedicated lanes, never crosses a card
// ═══════════════════════════════════════════════════════════════════════════════

const daoL = L(dao);
const daoR = R(dao);
const daoT = T(dao);
const daoCx = cx(dao);
const uBot = B(users);
const uCx = cx(users);

// ────────────────────────────────────────────────────────────────────────────────
// 1. USERS → COLUMNS  (green, "Any Asset")
//    Fan from Users bottom — curves travel through the 100px gap above groups
// ────────────────────────────────────────────────────────────────────────────────
const uExits = [-140, -65, 0, 65, 140].map(off => uCx + off);

// Col 0: Auction Factory (far left, wide curve)
addArrow(users, auctionF,
  [ [uExits[0], uBot],
    [uExits[0] - 100, uBot + 50],
    [colCx(0), FACT_Y - 25],
    [colCx(0), FACT_Y] ],
  "#2f9e44", "Any Asset");

// Col 1: Raffle Factory
addArrow(users, raffleF,
  [ [uExits[1], uBot],
    [uExits[1] - 40, uBot + 45],
    [colCx(1), FACT_Y - 20],
    [colCx(1), FACT_Y] ],
  "#2f9e44", "Any Asset");

// Col 2: Social (straight down — Social is nearly centered below Users)
addArrow(users, social,
  [ [uExits[2], uBot],
    [colCx(2), uBot + 60],
    [colCx(2), CHILD_Y] ],
  "#2f9e44", "Any Asset");

// Col 3: Subscriptions
addArrow(users, subs,
  [ [uExits[3], uBot],
    [uExits[3] + 40, uBot + 45],
    [colCx(3), CHILD_Y - 20],
    [colCx(3), CHILD_Y] ],
  "#2f9e44", "Any Asset");

// Col 4: Staking Pool Factory (far right, wide curve)
addArrow(users, stakingPF,
  [ [uExits[4], uBot],
    [uExits[4] + 100, uBot + 50],
    [colCx(4), FACT_Y - 25],
    [colCx(4), FACT_Y] ],
  "#2f9e44", "Any Asset");

// ────────────────────────────────────────────────────────────────────────────────
// 2. FACTORY → CHILD  (dashed blue, "deploys")
//    Short vertical arrows inside each group container
// ────────────────────────────────────────────────────────────────────────────────
for (const [f, c, col] of [[auctionF, auctionC, 0], [raffleF, raffleC, 1], [stakingPF, stakingPC, 4]]) {
  addArrow(f, c,
    [ [colCx(col), B(f)],
      [colCx(col), B(f) + 30],
      [colCx(col), CHILD_Y - 12],
      [colCx(col), CHILD_Y] ],
    "#1971c2", "deploys", DASHED);
}

// ────────────────────────────────────────────────────────────────────────────────
// 3. FACTORY → DAO  (red, "Create Fee")
//    Route through outer margins or inter-column gaps, then horizontal in
//    ROUTE_FEE lane (y≈495), then down into DAO.
// ────────────────────────────────────────────────────────────────────────────────

// Auction Factory — left margin route
addArrow(auctionF, dao,
  [ [L(auctionF), cy(auctionF)],        // exit left side of factory
    [LEFT_LANE, cy(auctionF)],           // into left routing lane
    [LEFT_LANE, ROUTE_FEE],              // down to fee lane
    [daoL + 30, ROUTE_FEE],             // right across routing zone to DAO
    [daoL + 30, daoT] ],                // down into DAO
  "#e03131", "Create Fee");

// Raffle Factory — route through gap between col 0 and col 1
addArrow(raffleF, dao,
  [ [L(raffleF), cy(raffleF)],           // exit left side
    [gapX(0), cy(raffleF)],              // into gap between col 0-1
    [gapX(0), ROUTE_FEE + 12],          // down to fee lane (offset to avoid overlap)
    [daoL + 80, ROUTE_FEE + 12],        // right to DAO
    [daoL + 80, daoT] ],
  "#e03131", "Create Fee");

// Staking Pool Factory — right margin route
addArrow(stakingPF, dao,
  [ [R(stakingPF), cy(stakingPF)],       // exit right side
    [RIGHT_LANE, cy(stakingPF)],         // into right routing lane
    [RIGHT_LANE, ROUTE_FEE],             // down to fee lane
    [daoR - 30, ROUTE_FEE],             // left across routing zone to DAO
    [daoR - 30, daoT] ],
  "#e03131", "Create Fee");

// ────────────────────────────────────────────────────────────────────────────────
// 4. CHILD / STANDALONE → DAO  (red, protocol fees)
//    Down from card bottom into ROUTE_TAX lane (y≈520), horizontal to DAO X,
//    then down into DAO top. Each enters DAO at a spread-out X position.
// ────────────────────────────────────────────────────────────────────────────────

// Auction child → DAO
addArrow(auctionC, dao,
  [ [colCx(0), B(auctionC)],
    [colCx(0), ROUTE_TAX],
    [daoL + 60, ROUTE_TAX],
    [daoL + 60, daoT] ],
  "#e03131", "Impact Tax");

// Raffle child → DAO
addArrow(raffleC, dao,
  [ [colCx(1), B(raffleC)],
    [colCx(1), ROUTE_TAX + 10],
    [daoCx - 100, ROUTE_TAX + 10],
    [daoCx - 100, daoT] ],
  "#e03131", "Impact Tax");

// Social → DAO
addArrow(social, dao,
  [ [colCx(2), B(social)],
    [colCx(2), ROUTE_TAX + 20],
    [daoCx, ROUTE_TAX + 20],
    [daoCx, daoT] ],
  "#e03131", "Fees");

// Subscriptions → DAO
addArrow(subs, dao,
  [ [colCx(3), B(subs)],
    [colCx(3), ROUTE_TAX + 10],
    [daoCx + 100, ROUTE_TAX + 10],
    [daoCx + 100, daoT] ],
  "#e03131", "Payment %");

// Staking Pool child → DAO
addArrow(stakingPC, dao,
  [ [colCx(4), B(stakingPC)],
    [colCx(4), ROUTE_TAX],
    [daoR - 60, ROUTE_TAX],
    [daoR - 60, daoT] ],
  "#e03131", "Impact Tax");

// ────────────────────────────────────────────────────────────────────────────────
// 5. CHILD → SELLERS / MARKETPLACES  (green, payouts)
//    Down from card into ROUTE_PAY lane, horizontal to left routing lane,
//    then down to side card Y, into side card.
// ────────────────────────────────────────────────────────────────────────────────

// Auction → Sellers
addArrow(auctionC, sellers,
  [ [L(auctionC), cy(auctionC) - 12],    // exit left side of child
    [LEFT_LANE, cy(auctionC) - 12],       // into left routing lane
    [LEFT_LANE, cy(sellers)],             // down to seller Y
    [R(sellers), cy(sellers)] ],          // right into sellers
  "#2f9e44", "Sale $");

// Raffle → Sellers
addArrow(raffleC, sellers,
  [ [L(raffleC), cy(raffleC)],
    [gapX(0) - 15, cy(raffleC)],          // into col 0-1 gap
    [gapX(0) - 15, ROUTE_PAY],           // down to payout lane
    [LEFT_LANE + 8, ROUTE_PAY],          // left across routing zone
    [LEFT_LANE + 8, cy(sellers) + 20],   // down to seller Y (offset)
    [R(sellers), cy(sellers) + 20] ],     // into sellers
  "#2f9e44", "Prize $");

// Auction → Marketplaces
addArrow(auctionC, mktplaces,
  [ [L(auctionC), cy(auctionC) + 15],
    [LEFT_LANE - 10, cy(auctionC) + 15],
    [LEFT_LANE - 10, cy(mktplaces)],
    [R(mktplaces), cy(mktplaces)] ],
  "#2f9e44", "Royalty %");

// Raffle → Marketplaces
addArrow(raffleC, mktplaces,
  [ [L(raffleC), cy(raffleC) + 20],
    [gapX(0) - 30, cy(raffleC) + 20],
    [gapX(0) - 30, ROUTE_PAY + 15],
    [LEFT_LANE - 18, ROUTE_PAY + 15],
    [LEFT_LANE - 18, cy(mktplaces) + 15],
    [R(mktplaces), cy(mktplaces) + 15] ],
  "#2f9e44", "Royalty %");

// ────────────────────────────────────────────────────────────────────────────────
// 6. CHILD → REFERRERS / TRIGGER BOTS  (green, payouts right)
//    Mirror of left-side routing, using right lane.
// ────────────────────────────────────────────────────────────────────────────────

// Staking Pool → Referrers
addArrow(stakingPC, referrers,
  [ [R(stakingPC), cy(stakingPC)],
    [RIGHT_LANE, cy(stakingPC)],
    [RIGHT_LANE, cy(referrers)],
    [L(referrers), cy(referrers)] ],
  "#2f9e44", "Referral %");

// Subscriptions → Trigger Bots
addArrow(subs, triggerBots,
  [ [R(subs), cy(subs)],
    [gapX(3) + 15, cy(subs)],
    [gapX(3) + 15, ROUTE_PAY],
    [RIGHT_LANE - 8, ROUTE_PAY],
    [RIGHT_LANE - 8, cy(triggerBots)],
    [L(triggerBots), cy(triggerBots)] ],
  "#2f9e44", "Trigger %");

// ────────────────────────────────────────────────────────────────────────────────
// 6b. USERS → BONES STAKING  (purple, "Stake AKITA")
//     Users stake AKITA tokens to earn protocol revenue via BONES
// ────────────────────────────────────────────────────────────────────────────────
const bsRouteX = SIDE_R_X + SIDE_W + 15;  // route lane right of all side cards
addArrow(users, bonesStaking,
  [ [R(users), cy(users) + 10],
    [bsRouteX, cy(users) + 10],
    [bsRouteX, cy(bonesStaking)],
    [R(bonesStaking), cy(bonesStaking)] ],
  "#7048e8", "Stake AKITA");

// ────────────────────────────────────────────────────────────────────────────────
// 7. DAO → REVENUE MANAGER  (orange)
// ────────────────────────────────────────────────────────────────────────────────
addArrow(dao, revMgr,
  [ [daoCx, B(dao)],
    [daoCx, B(dao) + 50],
    [cx(revMgr), T(revMgr) - 30],
    [cx(revMgr), T(revMgr)] ],
  "#e8590c", "Revenue Split");

// ────────────────────────────────────────────────────────────────────────────────
// 8. REVENUE MANAGER → FINAL RECIPIENTS  (orange)
// ────────────────────────────────────────────────────────────────────────────────
const rmCx = cx(revMgr);
const rmBot = B(revMgr);

addArrow(revMgr, stakeholders,
  [ [rmCx - 120, rmBot],
    [rmCx - 120, rmBot + 45],
    [cx(stakeholders), T(stakeholders) - 25],
    [cx(stakeholders), T(stakeholders)] ],
  "#e8590c", "Staker Revenue");

addArrow(revMgr, team,
  [ [rmCx, rmBot],
    [rmCx, rmBot + 40],
    [cx(team), T(team) - 20],
    [cx(team), T(team)] ],
  "#e8590c", "% Split");

addArrow(revMgr, community,
  [ [rmCx + 120, rmBot],
    [rmCx + 120, rmBot + 45],
    [cx(community), T(community) - 25],
    [cx(community), T(community)] ],
  "#e8590c", "Remainder");

// ────────────────────────────────────────────────────────────────────────────────
// 9. INFRASTRUCTURE REFERENCES  (gray, thin)
// ────────────────────────────────────────────────────────────────────────────────
addArrow(stakingPC, staking,
  [ [cx(staking), B(stakingPC)],
    [cx(staking), T(staking)] ],
  "#868e96", "", THIN);

addArrow(stakingPC, rewards,
  [ [cx(rewards), B(stakingPC)],
    [cx(rewards), T(rewards)] ],
  "#868e96", "", THIN);


// ═══════════════════════════════════════════════════════════════════════════════
//  O U T P U T
// ═══════════════════════════════════════════════════════════════════════════════
const out = {
  type: "excalidraw", version: 2, source: "akita-ecosystem-generator",
  elements,
  appState: {
    gridSize: 20, gridStep: 5, gridModeEnabled: false,
    viewBackgroundColor: "#ffffff"
  },
  files: {}
};

writeFileSync('akita-ecosystem.excalidraw', JSON.stringify(out, null, 2));
console.log(`Generated ${elements.length} elements — canvas ~${CANVAS_W}w`);
