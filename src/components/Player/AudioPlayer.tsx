import { useEffect, useRef } from "react";
import { Audio, AVPlaybackStatusSuccess, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { getTrackStreamUrl } from "@api/endpoints";
import { usePlayer } from "@store/playerStore";

export function AudioPlayer() {
  const { current, isPlaying, setPlaying, setProgress } = usePlayer();
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      playThroughEarpieceAndroid: false
    });
  }, []);

  useEffect(() => {
    let disposed = false;
    async function load() {
      if (!current) return;
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      const url = getTrackStreamUrl({ trackHash: current.trackHash, filepath: current.filepath });
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: false },
        (status) => {
          const s = status as AVPlaybackStatusSuccess;
          if (!s.isLoaded) return;
          setProgress(s.positionMillis ?? 0, s.durationMillis ?? 0);
          setPlaying(s.isPlaying);
        }
      );
      if (disposed) {
        await sound.unloadAsync();
        return;
      }
      soundRef.current = sound;
      if (isPlaying) await sound.playAsync();
    }
    load();
    return () => {
      disposed = true;
    };
  }, [current]);

  useEffect(() => {
    async function sync() {
      const sound = soundRef.current;
      if (!sound) return;
      const status = await sound.getStatusAsync();
      if (!status.isLoaded) return;
      if (isPlaying && !status.isPlaying) await sound.playAsync();
      if (!isPlaying && status.isPlaying) await sound.pauseAsync();
    }
    sync();
  }, [isPlaying]);

  return null;
}