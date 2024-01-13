import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  useAnimatedRef,
} from "react-native-reanimated";

const Input = ({ value, setValue }) => {
  const animatedRef = useAnimatedRef();
  const WIDTH = 200;
  const max = WIDTH / 4;
  const min = (WIDTH / 4) * -1;
  const position = useSharedValue({
    x: 0,
    z: 0.9,
  });

  const handleUpdateValue = (type) => {
    if (type === "add") {
      if (value >= 10) {
        setValue(10);
      } else {
        setValue((prev) => prev + 1);
      }
    } else if (type === "sub") {
      if (value <= 1) {
        setValue(1);
      } else {
        setValue((prev) => prev - 1);
      }
    }
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      position.value = { x: 0, z: 0.9 };
    })
    .onChange((event) => {
      position.value = {
        x: Math.max(Math.min(event.translationX, max), min),
        z: 1,
      };
    })
    .onFinalize(() => {
      position.value = withSpring({ x: 0, z: 0.9 });

      if (position.value.x >= max) {
        if (value >= 10) {
          runOnJS(setValue)(10);
        } else {
          runOnJS(setValue)(value + 1);
        }
      } else if (position.value.x <= min) {
        if (value <= 1) {
          runOnJS(setValue)(1);
        } else {
          runOnJS(setValue)(value - 1);
        }
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value.x }, { scale: position.value.z }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            letterSpacing: 1,
            color: "#ffc059",
            marginBottom: 4,
          }}
        >
          Quantity
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "gray",
            width: WIDTH,
            height: WIDTH / 2,
            borderRadius: WIDTH / 2,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: WIDTH / 4,
              height: WIDTH / 4,
              borderRadius: WIDTH / 2,
              backgroundColor: "#ffc059",
            }}
            onPress={() => handleUpdateValue("sub")}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "300" }}>
              -
            </Text>
          </TouchableOpacity>
          <Animated.View
            ref={animatedRef}
            style={[
              {
                zIndex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: WIDTH / 2,
                height: WIDTH / 2,
                borderRadius: WIDTH / 2,
                backgroundColor: "#ffc059",
              },
              animatedStyles,
            ]}
          >
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              {value}
            </Text>
          </Animated.View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: WIDTH / 4,
              height: WIDTH / 4,
              borderRadius: WIDTH / 2,
              backgroundColor: "#ffc059",
            }}
            onPress={() => handleUpdateValue("add")}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "300" }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureDetector>
  );
};

export default Input;
