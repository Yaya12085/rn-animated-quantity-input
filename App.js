import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Input from "./components/Input";
import { Image, Text, View } from "react-native";

export default function App() {
  const [value, setValue] = useState(1);

  const price = 120;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "#ffc059",
              padding: 10,
            }}
          >
            <Image
              source={{
                uri: "https://via.placeholder.com/600/92c952",
              }}
              style={{ flex: 0.7, borderRadius: 40 }}
            />
            <View style={{ flex: 0.5, justifyContent: "center", gap: 10 }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 50,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Product Title
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "400",
                  lineHeight: 18,
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias corrupti quod, mollitia aperiam nemo expedita ex!
                Harum, illo nemo perspiciatis velit magni ipsam molestias
                explicabo unde id rerum voluptatum dolores?
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.3,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              width: "100%",
              backgroundColor: "#fff",
            }}
          >
            <Input value={value} setValue={setValue} />
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              ${price * value}
            </Text>
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
