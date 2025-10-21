export default async function handler(req, res) {
  const {
    query: { unitId },
  } = req;

  // Map unitId to its Airbnb iCal URL. For now, just unit 1.
  const icalMap = {
    '1': 'https://www.airbnb.com/calendar/ical/1213787304990229025.ics?s=87e591c658ed61ceddb615bb2906e420',
  };

  const icalUrl = icalMap[String(unitId)];
  if (!icalUrl) {
    res.status(404).json({ error: 'No iCal URL configured for this unitId' });
    return;
  }

  try {
    const resp = await fetch(icalUrl, { cache: 'no-store' });
    if (!resp.ok) {
      res.status(502).json({ error: 'Failed to fetch ICS', status: resp.status });
      return;
    }
    const icsText = await resp.text();

    // Minimal ICS parser for Airbnb blocks. We extract DTSTART/DTEND per VEVENT.
    const lines = icsText.split(/\r?\n/);
    const events = [];
    let inEvent = false;
    let current = {};

    const normalizeDate = (val) => {
      // Handles YYYYMMDD or YYYYMMDDTHHMMSSZ
      const m = String(val).trim();
      if (/^\d{8}$/.test(m)) {
        const y = m.slice(0, 4);
        const mo = m.slice(4, 6);
        const d = m.slice(6, 8);
        return `${y}-${mo}-${d}`;
      }
      const y = m.slice(0, 4);
      const mo = m.slice(4, 6);
      const d = m.slice(6, 8);
      return `${y}-${mo}-${d}`;
    };

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      if (raw === 'BEGIN:VEVENT') {
        inEvent = true;
        current = {};
        continue;
      }
      if (raw === 'END:VEVENT') {
        if (current.DTSTART && current.DTEND) {
          // DTEND is exclusive per iCal spec
          events.push({
            start: normalizeDate(current.DTSTART),
            end: normalizeDate(current.DTEND),
          });
        }
        inEvent = false;
        current = {};
        continue;
      }
      if (!inEvent) continue;

      // Handle folded lines (lines that begin with space) - join with previous
      if (raw.startsWith(' ')) {
        // Ignore folded content for our minimal fields
        continue;
      }

      if (raw.startsWith('DTSTART')) {
        const [, value] = raw.split(':');
        current.DTSTART = value;
      } else if (raw.startsWith('DTEND')) {
        const [, value] = raw.split(':');
        current.DTEND = value;
      }
    }

    res.status(200).json({ booked: events });
  } catch (err) {
    res.status(500).json({ error: 'ICS parse error', message: String(err && err.message ? err.message : err) });
  }
}
