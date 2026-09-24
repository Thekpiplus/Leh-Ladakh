/* Journeys Tashi and Tengeleck, friends in Leh, will actually run.
   The Innova stays in the valley before it climbs a pass. */

const catalog = {
  "arrive-fly": {
    kind: "rest",
    title: "We meet the flight",
    sleep: "Leh",
    sleepMeters: 3500,
    meters: 3500,
    point: "Leh",
    hours: "20 minutes from the airport",
    permit: false,
    summary:
      "Send the flight number and we meet you at Kushok Bakula Rimpochee. After that the Innova stays parked. Leh is about 3,500 m. Walk the old town if you feel well. We do not drive a pass today.",
  },
  "arrive-town": {
    kind: "rest",
    title: "A quiet first day in Leh",
    sleep: "Leh",
    sleepMeters: 3500,
    meters: 3500,
    point: "Leh",
    hours: "No long drive",
    permit: false,
    summary:
      "You are already in Leh. We do not drive the Manali or Srinagar highway — our work starts here. If that road was hard, we leave the car and go out tomorrow.",
  },
  "leh-easy": {
    kind: "rest",
    title: "We stay in the valley",
    sleep: "Leh",
    sleepMeters: 3500,
    meters: 3600,
    point: "Shanti Stupa",
    hours: "A short drive, or none",
    permit: false,
    summary:
      "The day between landing and a pass. Shanti Stupa, the palace ridge, or nothing. If a headache is building, this is when you tell us, and we do not go up.",
  },
  sham: {
    kind: "low",
    title: "Lamayuru and the moonland",
    sleep: "Leh",
    sleepMeters: 3500,
    meters: 3500,
    point: "Leh, on the way home",
    hours: "A full day in the Innova",
    permit: false,
    summary:
      "West along the Indus to Moonland, then Lamayuru, and back to Leh the same day. One landscape and one monastery, with room to stop only if the hours allow.",
  },
  indus: {
    kind: "low",
    title: "Thiksey, Hemis, Stakna",
    sleep: "Leh",
    sleepMeters: 3500,
    meters: 3700,
    point: "Hemis",
    hours: "A full day, back by evening",
    permit: false,
    summary:
      "Thiksey, Hemis, and Stakna, with time between them and a quiet hour if the day still has it. No high pass. The night can stay in Leh, or at Dakpa House in Thiksey.",
  },
  "nubra-out": {
    kind: "high",
    title: "Over Khardung La into Nubra",
    sleep: "Hunder",
    sleepMeters: 3100,
    meters: 5360,
    point: "Khardung La",
    hours: "5–6 hours of driving",
    permit: true,
    summary:
      "We cross the pass in the morning and sleep at Diskit or Hunder, lower than Leh. The sign on Khardung La quotes a height above the surveyed road, near 5,360 m. We start the permit papers a day before.",
  },
  "nubra-day": {
    kind: "stay",
    title: "Diskit and the dunes",
    sleep: "Hunder",
    sleepMeters: 3100,
    meters: 3150,
    point: "Diskit",
    hours: "A short drive",
    permit: true,
    summary:
      "The monastery above Diskit, then the sand at Hunder. The valley floor is lower than Leh. We keep the day short if yesterday’s pass is still with you.",
  },
  "nubra-back": {
    kind: "high",
    title: "Back to Leh over the pass",
    sleep: "Leh",
    sleepMeters: 3500,
    meters: 5360,
    point: "Khardung La",
    hours: "5–6 hours of driving",
    permit: true,
    summary:
      "We return in the morning, while the road is quiet, and you sleep in Leh.",
  },
  "nubra-pangong": {
    kind: "high",
    title: "Shyok road to Pangong",
    sleep: "Spangmik",
    sleepMeters: 4250,
    meters: 4250,
    point: "Pangong Tso",
    hours: "6–8 hours, slow going",
    permit: true,
    summary:
      "From Nubra to the lake on the Shyok road. It is slow, and the camps at Spangmik sit near 4,250 m. We treat it as a driving day, not a day off.",
  },
  "pangong-out": {
    kind: "high",
    title: "Chang La, then the lake",
    sleep: "Spangmik",
    sleepMeters: 4250,
    meters: 5360,
    point: "Chang La",
    hours: "5–6 hours of driving",
    permit: true,
    summary:
      "Out of Leh, over Chang La, and down to Pangong for the night. We do not drive there and back in one day.",
  },
  "pangong-back": {
    kind: "high",
    title: "Leave the lake for Leh",
    sleep: "Leh",
    sleepMeters: 3500,
    meters: 5360,
    point: "Chang La",
    hours: "5–6 hours of driving",
    permit: true,
    summary:
      "We leave the lake early. Chang La, then Leh. You sleep in town.",
  },
  "moriri-out": {
    kind: "high",
    title: "Up the Indus to Tso Moriri",
    sleep: "Korzok",
    sleepMeters: 4520,
    meters: 4520,
    point: "Korzok",
    hours: "6–7 hours of driving",
    permit: true,
    summary:
      "Through Upshi and Chumathang. You sleep at Korzok, near 4,520 m, higher than a night at Pangong. We arrive with daylight left to do nothing.",
  },
  "moriri-day": {
    kind: "stay",
    title: "A day at the lake",
    sleep: "Korzok",
    sleepMeters: 4520,
    meters: 4520,
    point: "Tso Moriri",
    hours: "Short drives only",
    permit: true,
    summary:
      "We stay near Korzok. You are already about a thousand metres above Leh. This extra night is why a gentle pace asks for three days.",
  },
  "moriri-back": {
    kind: "high",
    title: "Korzok back to Leh",
    sleep: "Leh",
    sleepMeters: 3500,
    meters: 4520,
    point: "Korzok",
    hours: "6–7 hours of driving",
    permit: true,
    summary:
      "The return takes as long as the way out. We finish in Leh.",
  },
  "leh-bazaar": {
    kind: "low",
    title: "The bazaar, if you want the car",
    sleep: "Leh",
    sleepMeters: 3500,
    meters: 3550,
    point: "Leh Palace",
    hours: "A short outing",
    permit: false,
    summary:
      "No long road today. We can drop you at the bazaar and the lane toward the palace, or leave the Innova parked.",
  },
  "leh-stupa": {
    kind: "low",
    title: "Shanti Stupa and Sankar",
    sleep: "Leh",
    sleepMeters: 3500,
    meters: 3600,
    point: "Shanti Stupa",
    hours: "A short drive",
    permit: false,
    summary:
      "The stupa sits just above town. We drive you up if you want the view, and we are back before lunch.",
  },
  "leh-quiet": {
    kind: "rest",
    title: "The car stays in",
    sleep: "Leh",
    sleepMeters: 3500,
    meters: 3500,
    point: "Leh",
    hours: "No drive booked",
    permit: false,
    summary:
      "An open day between two high roads, or before a flight. Leh is the point. We are here if you want a short lift.",
  },
  depart: {
    kind: "travel",
    title: "We drop you",
    sleep: "Leave Leh",
    sleepMeters: 3500,
    meters: 3500,
    point: "Leh",
    hours: "20 minutes to the airport",
    permit: false,
    summary:
      "Airport or wherever you are staying. We do not put a pass on a flight day. The Manali and Srinagar highways are separate taxis — say if you need a name.",
  },
};

const thai = {
  "arrive-fly": {
    title: "เราไปรับเที่ยวบิน",
    hours: "จากสนามบินประมาณ 20 นาที",
    summary: "ส่งเลขเที่ยวบินมา เราไปรับที่ Kushok Bakula Rimpochee จากนั้นจอดรถไว้ Leh สูงประมาณ 3,500 เมตร เดินเมืองเก่าได้ถ้ารู้สึกดี วันนี้ไม่ข้ามช่องเขา",
  },
  "arrive-town": {
    title: "วันแรกที่เงียบใน Leh",
    hours: "ไม่ขับไกล",
    summary: "คุณอยู่ที่ Leh แล้ว เราไม่ขับทางหลวงมนาลีหรือศรีนคร งานของเราเริ่มที่นี่ หากทางนั้นหนัก เราพักรถไว้และออกพรุ่งนี้",
  },
  "leh-easy": {
    title: "อยู่ที่หุบเขา",
    hours: "ขับสั้น ๆ หรือไม่ขับ",
    summary: "วันระหว่างลงเครื่องกับช่องเขา Shanti Stupa สันพระราชวัง หรือไม่ไปไหน หากปวดหัวเริ่มมา บอกเราวันนี้ แล้วเราจะไม่ขึ้น",
  },
  sham: {
    title: "ลำยารุและมูนแลนด์",
    hours: "ทั้งวันใน Innova",
    summary: "ไปทางตะวันตกตามสินธุสู่ Moonland แล้ว Lamayuru และกลับ Leh ในวันเดียวกัน หนึ่งภูมิประเทศกับหนึ่งวัด แวะได้เมื่อเวลายังพอ",
  },
  indus: {
    title: "Thiksey, Hemis, Stakna",
    hours: "ทั้งวัน กลับตอนเย็น",
    summary: "Thiksey, Hemis และ Stakna มีเวลาคั่น และชั่วโมงที่เงียบหากวันยังเหลือ ไม่มีช่องเขาสูง คืนนั้นอยู่ Leh หรือ Dakpa House ที่ Thiksey",
  },
  "nubra-out": {
    title: "ข้าม Khardung La สู่ Nubra",
    hours: "ขับ 5–6 ชั่วโมง",
    summary: "ข้ามช่องเขาตอนเช้า แล้วนอนที่ Diskit หรือ Hunder ซึ่งต่ำกว่า Leh ป้ายที่ Khardung La สูงกว่าถนนที่สำรวจได้จริง ใกล้ 5,360 เมตร เราเริ่มเอกสารใบอนุญาตวันก่อนหน้า",
  },
  "nubra-day": {
    title: "Diskit และเนินทราย",
    hours: "ขับสั้น ๆ",
    summary: "วัดเหนือ Diskit แล้วทรายที่ Hunder พื้นหุบเขาต่ำกว่า Leh หากช่องเขาเมื่อวานยังอยู่กับคุณ เราจะให้วันนี้สั้น",
  },
  "nubra-back": {
    title: "กลับ Leh ข้ามช่องเขา",
    hours: "ขับ 5–6 ชั่วโมง",
    summary: "กลับตอนเช้า ขณะถนนยังเงียบ แล้วนอนที่ Leh",
  },
  "nubra-pangong": {
    title: "ถนน Shyok สู่ Pangong",
    hours: "6–8 ชั่วโมง ไปช้า",
    summary: "จาก Nubra สู่ทะเลสาบบนถนน Shyok ทางช้า และแคมป์ที่ Spangmik สูงประมาณ 4,250 เมตร เราถือว่าเป็นวันขับ ไม่ใช่วันพัก",
  },
  "pangong-out": {
    title: "Chang La แล้วสู่ทะเลสาบ",
    hours: "ขับ 5–6 ชั่วโมง",
    summary: "ออกจาก Leh ข้าม Chang La ลงไปค้างที่ Pangong เราไม่ขับไปแล้วกลับในวันเดียว",
  },
  "pangong-back": {
    title: "ออกจากทะเลสาบสู่ Leh",
    hours: "ขับ 5–6 ชั่วโมง",
    summary: "ออกจากทะเลสาบแต่เช้า Chang La แล้ว Leh นอนในเมือง",
  },
  "moriri-out": {
    title: "ขึ้นสินธุสู่ Tso Moriri",
    hours: "ขับ 6–7 ชั่วโมง",
    summary: "ผ่าน Upshi และ Chumathang นอนที่ Korzok ใกล้ 4,520 เมตร สูงกว่าคืนที่ Pangong เราถึงตอนที่ยังมีแสง ให้ได้ไม่ทำอะไร",
  },
  "moriri-day": {
    title: "วันที่ทะเลสาบ",
    hours: "ขับสั้นเท่านั้น",
    summary: "อยู่ใกล้ Korzok คุณสูงกว่า Lehประมาณหนึ่งพันเมตรแล้ว คืนพิเศษนี้คือเหตุที่จังหวะช้าขอสามวัน",
  },
  "moriri-back": {
    title: "จาก Korzok กลับ Leh",
    hours: "ขับ 6–7 ชั่วโมง",
    summary: "ทางกลับใช้เวลพอ ๆ กับขาไป เราจบที่ Leh",
  },
  "leh-bazaar": {
    title: "ตลาด หากต้องการรถ",
    hours: "ออกสั้น ๆ",
    summary: "วันนี้ไม่มีถนนยาว เราไปส่งที่ตลาดและซอยสู่พระราชวัง หรือจอด Innova ไว้",
  },
  "leh-stupa": {
    title: "Shanti Stupa และ Sankar",
    hours: "ขับสั้น ๆ",
    summary: "สถูปอยู่เหนือเมืองนิดเดียว เราขับขึ้นให้หากอยากชมวิว แล้วกลับก่อนอาหารกลางวัน",
  },
  "leh-quiet": {
    title: "รถจอดอยู่",
    hours: "ไม่ได้จองการขับ",
    summary: "วันที่ว่างระหว่างสองเส้นทางสูง หรือก่อนเที่ยวบิน Leh คือจุดหมาย เราอยู่หากต้องการไปส่งระยะสั้น",
  },
  depart: {
    title: "เราไปส่ง",
    hours: "ถึงสนามบินประมาณ 20 นาที",
    summary: "สนามบิน หรือที่ที่คุณพัก เราไม่ใส่ช่องเขาในวันบิน ทางหลวงมนาลีและศรีนครเป็นรถอีกแบบ บอกมาหากต้องการชื่อ",
  },
};

const fillers = ["leh-bazaar", "leh-stupa", "leh-quiet"];

function minDays() {
  return 3;
}

function normalize(input) {
  const arrival = input.arrival === "town" ? "town" : "fly";
  const pace = ["gentle", "steady", "full"].includes(input.pace) ? input.pace : "steady";
  let days = Number(input.days);
  if (!Number.isFinite(days)) days = 7;
  days = Math.round(days);
  if (days < 3) days = 3;
  if (days > 14) days = 14;
  return {
    arrival,
    pace,
    days,
    sham: Boolean(input.sham),
    monasteries: Boolean(input.monasteries),
    nubra: Boolean(input.nubra),
    pangong: Boolean(input.pangong),
    moriri: Boolean(input.moriri),
  };
}

function buildPlan(raw) {
  const input = normalize(raw);
  const gentle = input.pace === "gentle";
  const warnings = [];
  const skipped = [];
  const opening = [input.arrival === "town" ? "arrive-town" : "arrive-fly"];
  const closing = ["depart"];
  let slots = input.days - opening.length - closing.length;

  if (slots < 0) {
    throw new Error("Not enough days for the drive.");
  }

  const body = [];
  let filler = 0;

  const hasBuffer = () => {
    if (opening.includes("arrive-town")) return true;
    return body.some((id) => {
      const kind = catalog[id].kind;
      return kind === "low" || kind === "rest";
    });
  };

  const addFiller = () => {
    body.push(fillers[filler % fillers.length]);
    filler += 1;
    slots -= 1;
  };

  const explain = (nameEn, nameTh, block) => {
    const count = block.length;
    const unit = count === 1 ? "day" : "days";
    if (input.arrival === "fly" && !hasBuffer()) {
      return {
        en: `${nameEn} needs ${count} ${unit} with us, plus a quiet day after you land. These dates do not have both.`,
        th: `${nameTh} ต้องใช้ ${count} วันกับเรา และอีกหนึ่งวันพักหลังลงเครื่อง วันที่มีไม่พอทั้งสองอย่าง`,
      };
    }
    return {
      en: `${nameEn} needs ${count} ${unit} with us. These dates do not have them.`,
      th: `${nameTh} ต้องใช้ ${count} วันกับเรา วันที่มีไม่พอ`,
    };
  };

  const tryPlace = (ids, high) => {
    if (high && !hasBuffer()) {
      if (slots < ids.length + 1) return false;
      body.push("leh-easy");
      slots -= 1;
    }
    const last = body[body.length - 1];
    const lastIsDown = last && (catalog[last].kind === "low" || catalog[last].kind === "rest");
    const alreadyHigh = body.some((id) => catalog[id].kind === "high");
    if (high && gentle && alreadyHigh && !lastIsDown && slots >= ids.length + 1) {
      addFiller();
    }
    if (slots < ids.length) return false;
    body.push(...ids);
    slots -= ids.length;
    return true;
  };

  const highBlockLength = (available, buffered) => {
    const spare = buffered || hasBuffer() ? 0 : input.arrival === "fly" ? 1 : 0;
    const room = (len) => available >= len + spare;
    if (input.nubra && input.pangong && !gentle && room(3)) return 3;
    if (input.nubra && room(gentle ? 3 : 2)) return gentle ? 3 : 2;
    if (input.pangong && room(2)) return 2;
    if (input.moriri) {
      const len = input.pace === "full" ? 2 : 3;
      if (room(len)) return len;
    }
    return 0;
  };

  const lowQueue = [];
  if (input.sham) lowQueue.push({ name: "Lamayuru and Moonland", nameTh: "ลำยารุและมูนแลนด์", ids: ["sham"] });
  if (input.monasteries) lowQueue.push({ name: "The Indus monasteries", nameTh: "วัดริมสินธุ", ids: ["indus"] });

  while (lowQueue.length) {
    const next = lowQueue[0];
    const after = slots - next.ids.length;
    if (after < 0) break;
    const bestNow = highBlockLength(slots, false);
    const bestAfter = highBlockLength(after, true);
    if (bestNow > 0 && bestAfter < bestNow) break;
    lowQueue.shift();
    body.push(...next.ids);
    slots -= next.ids.length;
  }

  let placedCombined = false;
  if (input.nubra && input.pangong && !gentle) {
    placedCombined = tryPlace(["nubra-out", "nubra-pangong", "pangong-back"], true);
  }
  if (!placedCombined) {
    if (input.nubra) {
      const ids = gentle
        ? ["nubra-out", "nubra-day", "nubra-back"]
        : ["nubra-out", "nubra-back"];
      if (!tryPlace(ids, true)) skipped.push(explain("Nubra", "Nubra", ids));
    }
    if (input.pangong) {
      const ids = ["pangong-out", "pangong-back"];
      if (!tryPlace(ids, true)) skipped.push(explain("Pangong", "Pangong", ids));
    }
  }
  if (input.moriri) {
    const ids = input.pace === "full"
      ? ["moriri-out", "moriri-back"]
      : ["moriri-out", "moriri-day", "moriri-back"];
    if (!tryPlace(ids, true)) skipped.push(explain("Tso Moriri", "Tso Moriri", ids));
  }

  for (const low of lowQueue) {
    if (!tryPlace(low.ids, false)) {
      const placedHigh = body.some((id) => catalog[id].kind === "high");
      const because = placedHigh
        ? {
            en: `${low.name} cannot fit beside the higher drives.`,
            th: `${low.nameTh} ไม่พอดีกับเส้นทางที่สูงกว่า`,
          }
        : {
            en: `${low.name} cannot fit. Arrival and the drop already fill these dates.`,
            th: `${low.nameTh} ไม่พอดี วันถึงและวันไปส่งเต็มช่วงนี้แล้ว`,
          };
      skipped.push(because);
    }
  }

  while (slots > 0) addFiller();

  const ids = [...opening, ...body, ...closing];
  if (ids.length !== input.days) {
    throw new Error(`Plan is ${ids.length} days, expected ${input.days}.`);
  }

  let streak = 0;
  let warnedStreak = false;
  for (const id of ids) {
    const hard = catalog[id].kind === "high" || catalog[id].kind === "road";
    streak = hard ? streak + 1 : 0;
    if (streak >= 3 && !warnedStreak) {
      warnings.push({
        en: "Three hard days in a row. If a headache is not easing, or sleep is poor, we stay down and the next pass waits.",
        th: "สามวันหนักติดกัน หากปวดหัวไม่ทุเลา หรือนอนไม่หลับ เราจะอยู่ต่ำไว้ และเลื่อนช่องเขาถัดไป",
      });
      warnedStreak = true;
    }
  }

  const firstHigh = ids.findIndex((id) => catalog[id].kind === "high");
  if (input.arrival === "fly" && firstHigh === 1) {
    warnings.push({
      en: "A pass the day after you fly in is too soon. We will not drive that.",
      th: "ข้ามช่องเขาในวันถัดจากวันที่บินถึงเร็วเกินไป เราจะไม่ขับแบบนั้น",
    });
  }
  if (input.arrival === "fly" && firstHigh === 2) {
    warnings.push({
      en: "The first pass is on day 3, after one full day in Leh. If your head is not clear that morning, we stay in town.",
      th: "ช่องเขาแรกอยู่วันที่ 3 หลังจากอยู่ Leh เต็มหนึ่งวัน หากเช้าวันนั้นหัวยังไม่โล่ง เราจะอยู่ในเมือง",
    });
  }
  if (input.arrival === "town" && body[0] && catalog[body[0]].kind === "high") {
    warnings.push({
      en: "The first drive is already a pass. If you have just come off the highway, add a day so we stay in the valley first.",
      th: "วันแรกเป็นการข้ามช่องเขาอยู่แล้ว หากเพิ่งลงจากทางหลวงมา ควรเพิ่มหนึ่งวันให้อยู่ในหุบเขาก่อน",
    });
  }

  let highestId = ids[0];
  for (const id of ids) {
    if (catalog[id].meters > catalog[highestId].meters) highestId = id;
  }

  let lead;
  if (firstHigh === -1) {
    lead = input.nubra || input.pangong || input.moriri
      ? {
          en: "These dates stay around Leh. The higher roads do not fit, so we would not drive them.",
          th: "ช่วงวันนี้อยู่รอบ Leh เส้นทางที่สูงกว่ายังไม่พอดี เราจะไม่ขับขึ้นไป",
        }
      : {
          en: "These dates stay in and around Leh. That is a sound first visit.",
          th: "ช่วงวันนี้อยู่ในและรอบ Leh เหมาะกับการมาครั้งแรก",
        };
  } else {
    const point = catalog[ids[firstHigh]].point;
    const dayNo = firstHigh + 1;
    lead = {
      en: `The first pass we drive is ${point}, on day ${dayNo}.`,
      th: `ช่องเขาแรกที่เราขับคือ ${point} ในวันที่ ${dayNo}`,
    };
  }

  return {
    input,
    lead,
    warnings,
    skipped,
    days: ids.map((id, index) => ({ ...catalog[id], th: thai[id], id, day: index + 1 })),
    summary: {
      dayCount: ids.length,
      nights: ids.length - 1,
      highest: { meters: catalog[highestId].meters, point: catalog[highestId].point },
      permit: ids.some((id) => catalog[id].permit),
      hardDays: ids.filter((id) => catalog[id].kind === "high").length,
      nightsLine: ids.slice(0, -1).map((id) => catalog[id].sleep).join(" · "),
    },
  };
}

const api = { buildPlan, minDays };
if (typeof module !== "undefined" && module.exports) {
  module.exports = api;
} else {
  window.LehPlan = api;
}
