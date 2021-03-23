import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Toolbar } from "react-native-material-ui";
import { AntDesign } from '@expo/vector-icons';

const Tables = () => {
  return (
    <View style={styles.main}>
      <Toolbar
        centerElement="Tables"
        searchable={{
          autoFocus: true,
          placeholder: "Search",
        }}
        rightElement={
            <AntDesign name="addfile" size={24} color="black" />
         }
        onRightElementPress={(label) => {
          console.log(label);
        }}
        style={{ container: { backgroundColor: "tomato" } }}
      />
    </View>
  );
};

export default Tables;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
});
