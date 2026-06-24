# MIDDLE — Project Sitemap

```
middle/
│
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
│
├── assets/
│   ├── fonts/
│   ├── icon.png
│   └── splash.png
│
├── src/
│   │
│   ├── components/
│   │   ├── content/
│   │   │   ├── Avatar.tsx
│   │   │   ├── EmailBody.tsx
│   │   │   ├── EmailMeta.tsx
│   │   │   ├── HandwrittenNote.tsx
│   │   │   ├── PersonCard.tsx
│   │   │   ├── PolicyBox.tsx
│   │   │   ├── SpeakerLine.tsx
│   │   │   └── WarnBox.tsx
│   │   ├── interaction/
│   │   │   ├── ChoiceButton.tsx
│   │   │   ├── DecisionButton.tsx
│   │   │   ├── EnergyPicker.tsx
│   │   │   ├── StampOverlay.tsx
│   │   │   └── SwipeDecision.tsx
│   │   ├── layout/
│   │   │   ├── DayBar.tsx
│   │   │   ├── DocHeader.tsx
│   │   │   ├── DocWrapper.tsx
│   │   │   └── ScreenScrollView.tsx
│   │   ├── navigation/
│   │   │   ├── ContinueButton.tsx
│   │   │   └── InboxTabs.tsx
│   │   └── summary/
│   │       ├── MetricBar.tsx
│   │       ├── ResultRow.tsx
│   │       └── SummaryNote.tsx
│   │
│   ├── content/
│   │   ├── _types.ts
│   │   ├── characters.ts
│   │   ├── handbook.ts
│   │   ├── week1/
│   │   │   ├── index.ts
│   │   │   ├── monday-memo.ts
│   │   │   ├── monday-meeting.ts
│   │   │   ├── inbox-leave.ts
│   │   │   ├── inbox-flex.ts
│   │   │   ├── inbox-performance.ts
│   │   │   ├── thursday-1on1.ts
│   │   │   ├── friday-allhands.ts
│   │   │   └── summary.ts
│   │   ├── week2/
│   │   │   ├── index.ts
│   │   │   ├── monday-memo.ts
│   │   │   ├── monday-alignment.ts
│   │   │   ├── inbox-craig-ben.ts
│   │   │   ├── inbox-yemi.ts
│   │   │   ├── inbox-energy.ts
│   │   │   ├── thursday-craig-1on1.ts
│   │   │   ├── friday-allhands.ts
│   │   │   └── summary.ts
│   │   └── week3/
│   │       ├── index.ts
│   │       ├── monday-memo.ts
│   │       ├── inbox-a.ts
│   │       ├── inbox-b.ts
│   │       ├── inbox-away-day.ts
│   │       ├── thursday-1on1.ts
│   │       ├── friday-allhands.ts
│   │       └── summary.ts
│   │
│   ├── hooks/
│   │   ├── useBranchContent.ts
│   │   ├── useDecision.ts
│   │   ├── useEnding.ts
│   │   ├── useScores.ts
│   │   └── useWeekComplete.ts
│   │
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   └── WeekNavigator.tsx
│   │
│   ├── screens/
│   │   ├── TitleScreen.tsx
│   │   ├── MemoScreen.tsx
│   │   ├── MeetingScreen.tsx
│   │   ├── InboxScreen.tsx
│   │   ├── OneOnOneScreen.tsx
│   │   ├── SceneScreen.tsx
│   │   ├── WarRoomScreen.tsx
│   │   ├── WeekSummaryScreen.tsx
│   │   └── EndingScreen.tsx
│   │
│   ├── store/
│   │   ├── gameStore.ts
│   │   ├── selectors.ts
│   │   └── types.ts
│   │
│   ├── theme/
│   │   ├── colours.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   │
│   └── utils/
│       ├── branchResolver.ts
│       ├── constants.ts
│       ├── endingResolver.ts
│       └── scoreEngine.ts
│
└── __tests__/
    ├── branchResolver.test.ts
    ├── endingResolver.test.ts
    └── scoreEngine.test.ts
```
