import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { colours } from './src/theme/colours';
import { useGameStore } from './src/store/gameStore';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [storeHydrated, setStoreHydrated] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        IBMPlexSans: require('./assets/fonts/IBMPlexSans-Regular.ttf'),
        'IBMPlexSans-Light': require('./assets/fonts/IBMPlexSans-Light.ttf'),
        'IBMPlexSans-Medium': require('./assets/fonts/IBMPlexSans-Medium.ttf'),
        IBMPlexMono: require('./assets/fonts/IBMPlexMono-Regular.ttf'),
        'IBMPlexMono-Medium': require('./assets/fonts/IBMPlexMono-Medium.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    // Zustand persist rehydrates synchronously on first access via onRehydrateStorage.
    // We subscribe to the store's _hasHydrated flag.
    const unsub = useGameStore.persist.onFinishHydration(() => {
      setStoreHydrated(true);
    });

    // If already hydrated (e.g. no persisted state), resolve immediately.
    if (useGameStore.persist.hasHydrated()) {
      setStoreHydrated(true);
    }

    return unsub;
  }, []);

  if (!fontsLoaded || !storeHydrated) {
    // Spec §14 / Chunk 5 note: render a plain paper-background View — not the title
    // screen, not a spinner — until both font loading and store hydration resolve.
    return <View style={styles.loading} />;
  }

  return <RootNavigator />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colours.paper,
  },
});
