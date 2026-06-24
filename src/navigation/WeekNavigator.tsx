import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootNavigator';
import { PAYWALL_ENABLED } from '../utils/constants';
import { colours } from '../theme/colours';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

import MemoScreen from '../screens/MemoScreen';
import MeetingScreen from '../screens/MeetingScreen';
import InboxScreen from '../screens/InboxScreen';
import OneOnOneScreen from '../screens/OneOnOneScreen';
import SceneScreen from '../screens/SceneScreen';
import WarRoomScreen from '../screens/WarRoomScreen';
import WeekSummaryScreen from '../screens/WeekSummaryScreen';
import EndingScreen from '../screens/EndingScreen';

export type WeekStackParamList = {
  // Paywall screen (shown at start of Week 2 when PAYWALL_ENABLED = true)
  Paywall: undefined;
  // Standard / shared screens
  Memo: { sceneId: string; week: number };
  Meeting: { sceneId: string; week: number };
  Inbox: { sceneId: string; week: number };
  OneOnOne: { sceneId: string; week: number };
  Scene: { sceneId: string; week: number };
  WarRoom: { week: number };
  WeekSummary: { week: number };
  Ending: undefined;
};

const Stack = createNativeStackNavigator<WeekStackParamList>();

// ---------------------------------------------------------------------------
// Paywall screen — rendered only when PAYWALL_ENABLED = true and the player
// has not yet purchased. Styled as an Accounts Payable memo per spec §12.
// ---------------------------------------------------------------------------
function PaywallScreen({ navigation }: { navigation: any }) {
  return (
    <View style={paywallStyles.wrapper}>
      <View style={paywallStyles.doc}>
        <Text style={paywallStyles.label}>PEMBROOK SOLUTIONS — INTERNAL</Text>
        <Text style={paywallStyles.from}>FROM: Accounts Payable</Text>
        <Text style={paywallStyles.from}>TO: Jordan Ellis, Team Lead</Text>
        <Text style={paywallStyles.from}>RE: Continued access to weeks 2–8</Text>
        <View style={paywallStyles.rule} />
        <Text style={paywallStyles.body}>
          Thank you for your participation in Week 1 of the MIDDLE experience.{'\n\n'}
          Access to Weeks 2 through 8 requires a one-time payment of £2.99.{'\n\n'}
          This is not a subscription. There are no further charges. The handbook
          does not have a page about this because D. Hartley retired before the
          app existed.
        </Text>
        <TouchableOpacity
          style={paywallStyles.button}
          onPress={() => {
            // Phase 5: trigger expo-in-app-purchases flow here.
            // For now (PAYWALL_ENABLED should be false in dev) this is unreachable.
            navigation.goBack();
          }}
        >
          <Text style={paywallStyles.buttonLabel}>UNLOCK — £2.99</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const paywallStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colours.appBg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[24],
  },
  doc: {
    backgroundColor: colours.paper,
    borderTopWidth: 4,
    borderTopColor: colours.ink,
    padding: spacing[32],
    width: '100%',
    maxWidth: 480,
  },
  label: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    letterSpacing: 1,
    marginBottom: spacing[16],
  },
  from: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.sm,
    color: colours.inkMid,
    marginBottom: spacing[4],
  },
  rule: {
    height: 1,
    backgroundColor: colours.rule,
    marginVertical: spacing[16],
  },
  body: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.base,
    color: colours.inkMid,
    lineHeight: 22,
    marginBottom: spacing[32],
  },
  button: {
    backgroundColor: colours.ink,
    paddingVertical: spacing[12],
    alignItems: 'center',
  },
  buttonLabel: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.md,
    color: colours.paper,
    letterSpacing: 1,
  },
});

// ---------------------------------------------------------------------------
// WeekNavigator
// ---------------------------------------------------------------------------

type Props = NativeStackScreenProps<RootStackParamList, 'WeekNavigator'>;

export default function WeekNavigator({ route }: Props) {
  const startWeek = route?.params?.week ?? 1;

  // If PAYWALL_ENABLED is true and the player is starting Week 2+, the first
  // screen they encounter in this navigator is the Paywall.  If false (dev
  // default), skip straight to the week content.
  const showPaywall = PAYWALL_ENABLED && startWeek >= 2;

  // Determine the initial route name based on paywall state.
  const initialRoute: keyof WeekStackParamList = showPaywall ? 'Paywall' : 'Memo';

  // Build the initial params for the Memo screen (first scene of each week).
  // Week 8 starts with a Memo (Diana's call) per spec §10.
  const memoSceneIds: Record<number, string> = {
    1: 'w1_monday_memo',
    2: 'w2_monday_memo',
    3: 'w3_monday_memo',
    4: 'w4_monday_memo',
    5: 'w5_monday_memo',
    6: 'w6_monday_memo',
    7: 'w7_monday_memo',
    8: 'w8_diana_call',
  };

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      initialRouteName={initialRoute}
    >
      {showPaywall && (
        <Stack.Screen name="Paywall" component={PaywallScreen} />
      )}
      <Stack.Screen
        name="Memo"
        component={MemoScreen}
        initialParams={{ sceneId: memoSceneIds[startWeek] ?? 'w1_monday_memo', week: startWeek }}
      />
      <Stack.Screen name="Meeting" component={MeetingScreen} />
      <Stack.Screen name="Inbox" component={InboxScreen} />
      <Stack.Screen name="OneOnOne" component={OneOnOneScreen} />
      <Stack.Screen name="Scene" component={SceneScreen} />
      <Stack.Screen name="WarRoom" component={WarRoomScreen} />
      <Stack.Screen name="WeekSummary" component={WeekSummaryScreen} />
      <Stack.Screen name="Ending" component={EndingScreen} />
    </Stack.Navigator>
  );
}
