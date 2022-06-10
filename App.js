import * as React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [sound, setSound] = React.useState();
  const [cal, setcal] = React.useState("");

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/hoparlor-temizleme-sesi.mp3")
    );
    setcal("Kurutma İşlemi Başladı...");
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  function stopsound() {
    sound.stopAsync();
    setcal("Ses Kapatıldı :)");
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>Hoparlorünüze Su mu Kaçtı ? 💦 </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Button title="Sesi Çalıştır" onPress={playSound} />

        <Button title="Sesi Durdur" onPress={stopsound} />
        <Text style={styles.title}>{cal}</Text>
      </View>
      <Text style={styles.title}>Emircan Dayaç</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    padding: 50,
    fontSize: 20,
  },
  text2: {
    textAlign: "center",
    padding: 50,
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  title: {
    marginTop: 16,

    textAlign: "center",
    fontSize: 30,
    fontWeight: "light",
  },
});
