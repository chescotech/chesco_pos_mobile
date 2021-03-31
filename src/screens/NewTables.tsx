import React from "react";
import { View, Text } from "react-native";
import { Toolbar, IconToggle } from "react-native-material-ui";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";


type Props = { navigation: any, SocketConfig: Object; };

const NewTables = (props: Props) => {
  const { navigation, SocketConfig } = props;

  React.useEffect(()=>{
    SocketConfig.socket.emit("GETTABLENAMES")
  },[])

  return (
    <View>
      <Toolbar
        leftElement={
          <IconToggle
            onPress={() => navigation.navigate("Tables")}
            name="arrow-back-ios"
            color="#fff"
          />
        }
        centerElement="New Table"
        onRightElementPress={(label) => {
          console.log(label);
        }}
        style={{ container: { backgroundColor: "tomato" } }}
      />
      <Text>
        
      </Text>
    </View>
  );
};


function mapStateToProps(state: { SocketConfig: any; User: any }) {
  return {
    SocketConfig: state.SocketConfig,
    User: state.User,
  };
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    dispatchEvent: (data: any) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTables);
