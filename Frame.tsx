import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";

import MaterialBottomTabNavigator from "./src/RootBottomNav";
import RootStackScreen from "./src/RootLoginNav";

// const socket = io(BASE_URL, { jsonp: false });
// const socket = io('http://192.168.43.91:3200', { jsonp: false });

type Props = {
  dispatchEvent: Function;
};

const AppFrame = (props: Props) => {
  const [isLogedIn, setIsLogedIn] = React.useState(false);
  const [Load, setLoad] = React.useState(true);
  const [socket, setSocket] = React.useState();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("ServerConfig");
      if (value !== null) {
        setSocket(io(`http://${value}:3200`, { jsonp: false }));
        const socketIo = io(`http://${value}:3200`, { jsonp: false });

        // console.log(io(`https://switch-smart.herokuapp.com/`, { jsonp: false }));

        socketIo.on("connect", () => {
          console.log("connect");

          props.dispatchEvent({
            type: "SocketConnected",
            payload: socketIo,
          });
        });

        socketIo.on("disconnect", () => {
          console.log("dis-connect");

          props.dispatchEvent({
            type: "SocketDisconnceted",
            payload: {},
          });
        });

        socketIo.on("USER_DATA", (data) => {
          console.log(data);
          if (data.isLoggedIn) {
            setIsLogedIn(true);
          }
          // props.dispatchEvent({
          //   type: "SocketDisconnceted",
          //   payload: {},
          // });
        });
      } else {
        props.dispatchEvent({
          type: "SocketDisconnceted",
          payload: {},
        });
      }
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    if (Load) {
      getData();

      setLoad(false);
    }
  }, [props]);

  return <MaterialBottomTabNavigator />;
  // if (isLogedIn) return <MaterialBottomTabNavigator />;
  // else return <RootStackScreen />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function mapStateToProps(state: { SocketConfig: any }) {
  return {
    SocketConfig: state.SocketConfig,
  };
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    dispatchEvent: (data: any) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppFrame);
