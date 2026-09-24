const PEOPLE = [
  { name: "Tashi", th: "ทาชิ", wa: "919596824268" },
  { name: "Tengeleck", th: "เต็งเกเล็ก", wa: "918899114489" },
  { name: "Isara", th: "อิศรา", wa: "66826356266" },
];
const CONTACT = {
  email: "",
};

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
const form = document.querySelector("#planner");
const requestForm = document.querySelector("#request");
const daysInput = document.querySelector("#days-range");
const daysCount = document.querySelector("#days-count");
const daysNights = document.querySelector("#days-nights");
const daysMin = document.querySelector("#days-min");
const output = document.querySelector("#plan-output");
const copyDays = document.querySelector("#copy-days");
const contactLine = document.querySelector("#contact-line");
const arrivalDate = document.querySelector("#arrival-date");
const departureDate = document.querySelector("#departure-date");

const PLACES = ["sham", "monasteries", "nubra", "pangong", "moriri"];

document.querySelector("#year").textContent = String(new Date().getFullYear());

const seasonLines = [
  { en: "January: the passes are shut. If you are in Leh, we drive in town.", th: "มกราคม: ช่องเขาปิด หากคุณอยู่ Leh เราขับในเมือง" },
  { en: "February: still winter. We stay around Leh.", th: "กุมภาพันธ์: ยังเป็นฤดูหนาว เราอยู่รอบ Leh" },
  { en: "March: cold and bright. Ask us before you plan Nubra.", th: "มีนาคม: หนาวและแจ่มใส ถามเราก่อนจะวางแผน Nubra" },
  { en: "April: some roads are open and some are not. We will say which.", th: "เมษายน: บางสายเปิด บางสายยังไม่ เราจะบอกว่าสายไหน" },
  { en: "May: the season for the high roads. Nights are still cold.", th: "พฤษภาคม: ฤดูของถนนสูง คืนยังเย็น" },
  { en: "June: main season. Ask for the car before you book the flight.", th: "มิถุนายน: ฤดูหลัก ถามเรื่องรถก่อนจองเที่ยวบิน" },
  { en: "July: the busiest weeks. The Innova goes early.", th: "กรกฎาคม: สัปดาห์ที่คนมากที่สุด Innova ออกแต่เช้า" },
  { en: "August: still busy. A good month if the car is already agreed.", th: "สิงหาคม: ยังแน่น เป็นเดือนดีถ้ารถตกลงไว้แล้ว" },
  { en: "September: clear days, cold nights, fewer visitors. A strong month to drive.", th: "กันยายน: ฟ้าใส คืนเย็น คนน้อยลง เป็นเดือนดีสำหรับการขับ" },
  { en: "October: the end of the open season. Mornings are sharp.", th: "ตุลาคม: ปลายฤดูที่ถนนเปิด เช้าเย็นจัด" },
  { en: "November: we treat this as a town stay unless the road is clearly open.", th: "พฤศจิกายน: เราถือว่าอยู่เมือง เว้นแต่ถนนเปิดชัดเจน" },
  { en: "December: winter. Drives stay in and around Leh.", th: "ธันวาคม: ฤดูหนาว การขับอยู่ในและรอบ Leh" },
];
const seasonLine = document.querySelector("#season-line");
if (seasonLine) {
  const line = seasonLines[new Date().getMonth()];
  const en = seasonLine.querySelector(".en");
  const th = seasonLine.querySelector(".th");
  if (en && th) {
    en.textContent = line.en;
    th.textContent = line.th;
  } else {
    seasonLine.textContent = line.en;
  }
}

const nowMonth = document.querySelector(`[data-month="${new Date().getMonth()}"]`);
if (nowMonth) nowMonth.classList.add("is-now");

if (CONTACT.email && contactLine) {
  contactLine.textContent = "";
  contactLine.append("Leh, Ladakh — ");
  const link = document.createElement("a");
  link.href = `mailto:${CONTACT.email}`;
  link.textContent = CONTACT.email;
  contactLine.append(link);
}

const setHeader = () => {
  header.classList.toggle("is-solid", window.scrollY > 24);
};
setHeader();
window.addEventListener("scroll", setHeader, { passive: true });

const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  header.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  const menuLabel = toggle.querySelector(".nav-toggle-label");
  const menuEn = menuLabel.querySelector(".en");
  const menuTh = menuLabel.querySelector(".th");
  if (menuEn && menuTh) {
    menuEn.textContent = open ? "Close" : "Menu";
    menuTh.textContent = open ? "ปิด" : "เมนู";
  } else {
    menuLabel.textContent = open ? "Close" : "Menu";
  }
  document.body.style.overflow = open ? "hidden" : "";
};

toggle.addEventListener("click", () => {
  setMenu(!nav.classList.contains("is-open"));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const sections = [...nav.querySelectorAll('a[href^="#"]')]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      nav.querySelectorAll('a[href^="#"]').forEach((link) => {
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
);

sections.forEach((section) => spy.observe(section));

const meters = (value) => `${Math.round(value).toLocaleString("en-IN")} m`;

const isoDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const today = new Date();
arrivalDate.min = isoDate(today);
departureDate.min = isoDate(today);

const readState = () => ({
  days: daysInput.value,
  arrival: form.elements.arrival.value,
  pace: form.elements.pace.value,
  sham: form.elements.sham.checked,
  monasteries: form.elements.monasteries.checked,
  nubra: form.elements.nubra.checked,
  pangong: form.elements.pangong.checked,
  moriri: form.elements.moriri.checked,
});

const clearQuery = () => {
  const next = `${location.pathname}${location.hash}`;
  if (`${location.pathname}${location.search}${location.hash}` !== next) {
    history.replaceState(null, "", next);
  }
};

const applyQuery = () => {
  const params = new URLSearchParams(location.search);
  if (![...params.keys()].length) return;
  const via = params.get("via");
  if (via && form.querySelector(`input[name="arrival"][value="${via}"]`)) {
    form.querySelector(`input[name="arrival"][value="${via}"]`).checked = true;
  }
  const pace = params.get("pace");
  if (pace && form.querySelector(`input[name="pace"][value="${pace}"]`)) {
    form.querySelector(`input[name="pace"][value="${pace}"]`).checked = true;
  }
  if (params.has("days")) daysInput.value = params.get("days");
  if (params.has("go")) {
    const go = new Set(params.get("go").split(",").filter(Boolean));
    PLACES.forEach((name) => {
      form.elements[name].checked = go.has(name);
    });
  }
};

const clampDaysControl = () => {
  const min = window.LehPlan.minDays();
  daysInput.min = String(min);
  daysInput.setAttribute("aria-valuemin", String(min));
  daysMin.textContent = String(min);
  if (Number(daysInput.value) < min) daysInput.value = String(min);
};

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
};

const isThai = () => document.documentElement.dataset.lang === "th";
const tx = (value) => (value && typeof value === "object" && "en" in value ? (isThai() ? value.th : value.en) : value);
const pick = (en, th) => (isThai() ? th : en);
const dayTitle = (day) => (isThai() && day.th ? day.th.title : day.title);
const dayHours = (day) => (isThai() && day.th ? day.th.hours : day.hours);
const daySummary = (day) => (isThai() && day.th ? day.th.summary : day.summary);

const planText = (plan) => {
  const lines = [
    pick("Leh Spirit — a journey from Leh", "Leh Spirit — การเดินทางจาก Leh"),
    pick(
      `${plan.summary.dayCount} days, ${plan.summary.nights} nights`,
      `${plan.summary.dayCount} วัน ${plan.summary.nights} คืน`
    ),
    tx(plan.lead),
    pick(`Nights: ${plan.summary.nightsLine}`, `คืนที่พัก: ${plan.summary.nightsLine}`),
    pick(
      `Highest: ${plan.summary.highest.point}, ${meters(plan.summary.highest.meters)}`,
      `จุดสูงสุด: ${plan.summary.highest.point}, ${meters(plan.summary.highest.meters)}`
    ),
    "",
  ];
  plan.days.forEach((day) => {
    lines.push(pick(`Day ${day.day} — ${dayTitle(day)}`, `วันที่ ${day.day} — ${dayTitle(day)}`));
    lines.push(
      pick(
        `Sleep: ${day.sleep}. High point: ${day.point}, ${meters(day.meters)}.`,
        `ค้าง: ${day.sleep} จุดสูง: ${day.point}, ${meters(day.meters)}`
      )
    );
    lines.push(daySummary(day));
    lines.push("");
  });
  if (plan.skipped.length) {
    lines.push(pick("Left out:", "สิ่งที่ยังไม่พอดี:"));
    plan.skipped.forEach((item) => lines.push(`- ${tx(item)}`));
    lines.push("");
  }
  if (plan.warnings.length) {
    lines.push(pick("Watch:", "ข้อควรดู:"));
    plan.warnings.forEach((item) => lines.push(`- ${tx(item)}`));
  }
  return lines.join("\n").trim();
};

const render = () => {
  clampDaysControl();
  const state = readState();
  const plan = window.LehPlan.buildPlan(state);
  if (String(plan.input.days) !== daysInput.value) {
    daysInput.value = String(plan.input.days);
  }
  const nights = plan.summary.nights;
  daysCount.textContent = String(plan.summary.dayCount);
  daysNights.textContent = isThai()
    ? `${nights} คืน`
    : nights === 1
      ? "1 night"
      : `${nights} nights`;
  daysInput.setAttribute("aria-valuenow", daysInput.value);
  clearQuery();

  output.replaceChildren();

  const head = el("div", "plan-head");
  head.append(
    el("p", "plan-lead", tx(plan.lead)),
    el("p", "plan-nights", pick(`Nights: ${plan.summary.nightsLine}`, `คืนที่พัก: ${plan.summary.nightsLine}`))
  );
  output.append(head);

  const facts = el("dl", "plan-facts");
  const fact = (term, value) => {
    const wrap = el("div");
    wrap.append(el("dt", null, term), el("dd", null, value));
    facts.append(wrap);
  };
  fact(pick("Highest", "จุดสูงสุด"), `${plan.summary.highest.point} · ${meters(plan.summary.highest.meters)}`);
  fact(pick("Pass days", "วันข้ามช่องเขา"), String(plan.summary.hardDays));
  fact(pick("Permit", "ใบอนุญาต"), plan.summary.permit ? pick("We arrange it", "เราจัดให้") : pick("Not for this drive", "ไม่ต้องใช้ในทริปนี้"));
  output.append(facts);

  if (plan.warnings.length) {
    const notes = el("ul", "plan-notes");
    plan.warnings.forEach((warning) => notes.append(el("li", null, tx(warning))));
    output.append(notes);
  }

  if (plan.skipped.length) {
    const left = el("div", "plan-skipped");
    left.append(el("p", "plan-kicker", pick("We would leave out", "สิ่งที่ยังไม่พอดี")));
    const list = el("ul");
    plan.skipped.forEach((item) => list.append(el("li", null, tx(item))));
    left.append(list);
    output.append(left);
  }

  const list = el("ol", "day-list");
  plan.days.forEach((day) => {
    const item = el("li", `day day-${day.kind}`);
    const body = el("div", "day-body");
    const kicker = el("p", "day-kicker");
    kicker.textContent = day.permit
      ? pick("Permit on this road", "เส้นนี้ต้องมีใบอนุญาต")
      : day.kind === "high"
        ? pick("A pass", "ช่องเขา")
        : pick("Around Leh", "รอบ Leh");
    body.append(
      kicker,
      el("h3", null, dayTitle(day)),
      el("p", "day-meta", pick(`Sleep: ${day.sleep} · ${dayHours(day)}`, `ค้าง: ${day.sleep} · ${dayHours(day)}`)),
      el("p", "day-copy", daySummary(day))
    );
    const ratio = Math.min(1, Math.max(0.04, (day.meters - 2500) / 2900));
    const alt = el("div", "alt");
    const track = el("div", "alt-track");
    const fill = el("div", "alt-fill");
    fill.style.width = `${Math.round(ratio * 100)}%`;
    track.append(fill);
    alt.append(track, el("p", "alt-label", `${day.point} · ${meters(day.meters)}`));
    body.append(alt);
    item.append(el("p", "day-index", String(day.day).padStart(2, "0")), body);
    list.append(item);
  });
  output.append(list);
  output.dataset.copy = planText(plan);
};

const syncDeparture = () => {
  if (!arrivalDate.value) return;
  const start = new Date(`${arrivalDate.value}T00:00:00`);
  start.setDate(start.getDate() + Number(daysInput.value) - 1);
  departureDate.value = isoDate(start);
};

const syncDaysFromDates = () => {
  if (!arrivalDate.value || !departureDate.value) return;
  const start = new Date(`${arrivalDate.value}T00:00:00`);
  const end = new Date(`${departureDate.value}T00:00:00`);
  const diff = Math.round((end - start) / 86400000) + 1;
  if (diff >= 3 && diff <= 14) {
    daysInput.value = String(diff);
    render();
  }
};

daysInput.addEventListener("input", syncDeparture);
arrivalDate.addEventListener("change", syncDaysFromDates);
departureDate.addEventListener("change", syncDaysFromDates);

const flash = (button, label) => {
  const previous = button.innerHTML;
  button.textContent = label;
  window.setTimeout(() => {
    button.innerHTML = previous;
  }, 1600);
};

const copyText = async (button, text) => {
  try {
    await navigator.clipboard.writeText(text);
    flash(button, pick("Copied", "คัดลอกแล้ว"));
  } catch {
    flash(button, pick("Select the note", "เลือกข้อความแล้วคัดลอก"));
  }
};

copyDays.addEventListener("click", () => {
  copyText(copyDays, output.dataset.copy || "");
});

form.addEventListener("input", render);
form.addEventListener("submit", (event) => event.preventDefault());

const setLang = (lang) => {
  const next = lang === "th" ? "th" : "en";
  document.documentElement.dataset.lang = next;
  document.documentElement.lang = next;
  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.setLang === next));
  });
  const note = document.querySelector("#note");
  if (note && note.dataset.phEn) {
    note.placeholder = next === "th" ? note.dataset.phTh : note.dataset.phEn;
  }
  try {
    localStorage.setItem("leh-lang", next);
  } catch (err) {
    /* keep the choice for this visit */
  }
  render();
  if (window.LehSeo) window.LehSeo.apply();
};

document.querySelectorAll("[data-set-lang]").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.setLang));
});

try {
  const saved = localStorage.getItem("leh-lang");
  if (saved === "en" || saved === "th") setLang(saved);
} catch (err) {
  /* start in English */
}

applyQuery();
render();

const clearErrors = () => {
  ["name", "phone", "email", "arrival-date", "departure-date", "guests"].forEach((id) => {
    const input = requestForm.querySelector(`#${id}`);
    input.removeAttribute("aria-invalid");
    requestForm.querySelector(`#${id}-error`).textContent = "";
  });
};

const setError = (id, message) => {
  const input = requestForm.querySelector(`#${id}`);
  input.setAttribute("aria-invalid", "true");
  requestForm.querySelector(`#${id}-error`).textContent = message;
  return input;
};

const requestMessage = (data) => {
  const guests = Number(data.guests);
  const lines = [
    pick("Hello Tashi, Tengeleck, and Isara — Leh Spirit,", "สวัสดีทาชิ เต็งเกเล็ก และอิศรา — Leh Spirit,"),
    "",
    `${pick("Name", "ชื่อ")}: ${String(data.name).trim()}`,
    `WhatsApp: ${String(data.phone).trim() || "—"}`,
    `${pick("Email", "อีเมล")}: ${String(data.email).trim() || "—"}`,
    `${pick("People", "จำนวนคน")}: ${data.guests}${guests > 4 ? pick(" (may need a second Innova)", " (อาจต้องใช้รถคันที่สอง)") : ""}`,
    `${pick("Arrival", "วันถึง")}: ${data.arrivalDate || pick("not set", "ยังไม่ระบุ")}`,
    `${pick("Departure", "วันออก")}: ${data.departureDate || pick("not set", "ยังไม่ระบุ")}`,
    "",
    output.dataset.copy || "",
    "",
    String(data.note).trim() || pick("(no note)", "(ไม่มีบันทึก)"),
  ];
  return lines.join("\n").trim();
};

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();
  const data = Object.fromEntries(new FormData(requestForm));
  const invalid = [];
  if (!String(data.name).trim()) invalid.push(setError("name", pick("Add your name.", "ใส่ชื่อของคุณ")));
  const phone = String(data.phone).trim();
  const email = String(data.email).trim();
  if (!phone && !email) {
    invalid.push(setError("phone", pick("Add a WhatsApp number or an email, so we can reply.", "ใส่เบอร์ WhatsApp หรืออีเมล เพื่อให้เราตอบกลับได้")));
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    invalid.push(setError("email", pick("That email does not look complete.", "อีเมลนี้ยังไม่ครบ")));
  }
  if (data.arrivalDate && data.departureDate) {
    const span = Math.round(
      (new Date(`${data.departureDate}T00:00:00`) - new Date(`${data.arrivalDate}T00:00:00`)) / 86400000
    ) + 1;
    if (data.departureDate <= data.arrivalDate) {
      invalid.push(setError("departure-date", pick("Departure should be after arrival.", "วันออกควรอยู่หลังวันถึง")));
    } else if (span < 3 || span > 14) {
      invalid.push(setError("departure-date", pick("Use dates that cover 3 to 14 days, or leave them blank and keep the sketch.", "ใช้วันที่ครอบคลุม 3 ถึง 14 วัน หรือเว้นว่างแล้วใช้ร่างนี้")));
    }
  }
  const guests = Number(data.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 12) {
    invalid.push(setError("guests", pick("Tell us how many people, from 1 to 12.", "บอกจำนวนคน ตั้งแต่ 1 ถึง 12")));
  }
  if (invalid.length) {
    invalid[0].focus();
    return;
  }

  const message = requestMessage(data);
  const status = document.querySelector("#form-status");
  const copy = document.querySelector("#request-copy");
  const links = document.querySelector("#whatsapp-links");
  copy.textContent = message;
  links.replaceChildren();
  PEOPLE.forEach((person) => {
    const link = document.createElement("a");
    link.className = "btn btn-line";
    link.href = `https://wa.me/${person.wa}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = `WhatsApp ${isThai() ? person.th : person.name}`;
    links.append(link);
  });
  status.textContent = pick(
    "The note is ready. Open WhatsApp for Tashi, Tengeleck, or Isara. If it does not open, copy the note.",
    "บันทึกพร้อมแล้ว เปิด WhatsApp ของทาชิ เต็งเกเล็ก หรืออิศรา หากไม่เปิด ให้คัดลอกบันทึก"
  );

  if (CONTACT.email) {
    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Drive with Leh Spirit")}&body=${encodeURIComponent(message)}`;
    status.textContent = pick(
      "Your email app should open with this note. If it does not, copy it below.",
      "แอปอีเมลน่าจะเปิดพร้อมบันทึกนี้ หากไม่เปิด ให้คัดลอกด้านล่าง"
    );
    window.location.href = mailto;
  }

  requestForm.querySelector(".form-fields").hidden = true;
  document.querySelector("#form-success").hidden = false;
});

document.querySelector("#copy-request").addEventListener("click", () => {
  copyText(document.querySelector("#copy-request"), document.querySelector("#request-copy").textContent);
});

document.querySelector("#rewrite").addEventListener("click", () => {
  document.querySelector("#form-success").hidden = true;
  requestForm.querySelector(".form-fields").hidden = false;
  requestForm.querySelector("#name").focus();
});
