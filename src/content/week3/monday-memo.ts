import { Scene } from '../_types';
import { GameStore } from '../../store/types';

export const mondayMemo: Scene = {
  id: 'w3-monday-memo',
  screenType: 'memo',
  content: (decisions: GameStore['decisions']) => ({
    docHeader: {
      companyName: 'Pembrook Solutions — Internal Comms',
      docType: 'MEMO · Week 44',
    },
    dayBar: {
      label: 'Week 3 — Monday',
      dotsTotal: 5,
      dotsCurrent: [0],
    },
    emailMeta: {
      to: 'All Staff',
      from: 'marcus.webb@pembrook.com',
      date: 'Monday 28 Oct, 07:44',
      re: 'Q4 All-Staff Away Day — Save the Date! 🚀',
    },
    body: `Team Pembrook!

Big news. We are doing an All-Staff Away Day.

Date: Friday 15 November
Venue: The Meridian Conference Suite, Stevenage
Theme: Unlocking Our Human Edge™
Keynote: Brett Callahan, Apex Human Performance

This is a mandatory whole-company event. Attendance is required. I cannot stress enough how exciting this is going to be. Brett has prepared something genuinely transformational. There will be breakout sessions, a group activity (details TBC — but it involves problem-solving and possibly some light movement), and a catered lunch (dietary requirements: please resubmit via the portal, the previous submissions were lost in the system migration).

Transport: make your own way. Mileage can be expensed up to 40p/mile. The venue has 47 parking spaces for approximately 200 attendees. First come first served.

Any questions: speak to your Team Lead.

Marcus

Marcus Webb | VP, People Experience | He/Him | Certified Gallup Strengths Coach
"The best teams don't just work together. They journey together." — Brett Callahan, Apex Human Performance (used with permission)`,
    dynamicBlock: decisions.priya_leave === 'denied'
      ? {
          type: 'warn',
          text: "Priya Sharma's last day is this Friday. Her handover notes are on the shared drive. They are thorough. They are colour-coded. There are 47 of them. You have been allocated no time to read them.",
        }
      : (parseInt(String(decisions.energy_score ?? '6')) <= 5)
        ? {
            type: 'warn',
            text: 'Your calendar also contains a new event: "Jordan / Marcus — Informal Check-in" on Thursday at 3pm. The invite says "no prep needed." You have already started preparing.',
          }
        : null,
    policyBox: {
      ref: 'Policy Handbook §7.3 — Mandatory Events (D. Hartley, 2019)',
      text: `"Mandatory attendance events must be communicated a minimum of 21 days in advance and must not fall on dates that conflict with previously approved leave, school terms, or religious observances. Employees with caring responsibilities who cannot attend due to insufficient notice are entitled to request an alternative arrangement.

15 November is 18 days away. I am aware. I counted. For what it's worth, the Meridian Conference Suite in Stevenage smells of carpet and ambient disappointment and the coffee is, at best, technically coffee. I have been there. I will not be going again.

Three members of your team have school-run conflicts on Fridays. You know this. Marcus does not know this because Marcus has not asked. — D.H."`,
    },
    footnote: 'You have received three separate calendar notifications this morning. Rhonda, Dayo, and Ben all have recurring "school run" blocks on Friday mornings. The away day starts at 9am. Stevenage is 90 minutes away. You have not yet responded to any of them.',
    continueLabel: 'Tuesday — Inbox →',
    continueTarget: 'w3-inbox',
  }),
};