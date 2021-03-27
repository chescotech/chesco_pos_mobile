import React from "react";
import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import { connect } from "react-redux";
import {
  Card,
  Divider,
  IconToggle,
  Toolbar,
  Button,
} from "react-native-material-ui";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";
import Accordion from "react-native-collapsible/Accordion";
import NumberFormat from "react-number-format";

type Props = {
  dispatchEvent: Function;
  navigation: any;
  SocketConfig: Object;
  User: Object;
};

const Tables = (props: Props) => {
  const { navigation, SocketConfig, User } = props;
  const [activeSections, setactiveSections] = React.useState([]);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [totalCost, setTotalCost] = React.useState(0);
  const [tables, setTables] = React.useState({
    data: [],
  });

  const _renderSectionTitle = (section: any) => {
    return <View>{/* <Text>{section.content}</Text> */}</View>;
  };

  const _updateSections = (activeSections: any) => {
    setactiveSections(activeSections);
    // console.log(activeSections);
  };

  React.useEffect(() => {
    // SocketConfig.socket.emit("GETSAVEDTABLES", User);

    // SocketConfig.socket.on("TABLE_UPDATES", (tablesResults: any) => {
    //   SocketConfig.socket.emit("GETSAVEDTABLES", User);
    // });

    // GetTables();
  }, []);

  const GetTables = () => {
    SocketConfig.socket.on(
      "USER_SAVED_TABLES",
      (tablesResults: { tables: { data: any } }) => {
        setTables({ ...tables, data: tablesResults.tables.data });
      }
    );
  };

  return (
    <View style={styles.main}>
      <StatusBar
        animated={true}
        backgroundColor="#AA422F"
        barStyle="light-content"
      />
      <Toolbar
        centerElement="Tables"
        searchable={{
          autoFocus: true,
          placeholder: "Search",
        }}
        rightElement={<IconToggle name="add" color="#fff" />}
        style={{ container: { backgroundColor: "tomato" } }}
      />
      <ScrollView
        style={{ padding: moderateScale(7), paddingBottom: moderateScale(10) }}
      >
        <Accordion
          sections={tables.data}
          activeSections={activeSections}
          renderSectionTitle={_renderSectionTitle}
          renderHeader={(data) => {
            let totalProducts = 0;

            data.list.data.map((num: any) => {
              totalProducts = totalProducts + num.qnt;
            });

            return (
              <Card>
                <View
                  style={{
                    padding: moderateScale(5),
                    height: verticalScale(130),
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      paddingTop: moderateScale(15),
                      paddingBottom: moderateScale(15),
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          height: verticalScale(50),
                          width: scale(50),
                          borderRadius: moderateScale(50),
                          borderColor: "tomato",
                          borderWidth: 1,
                          borderStyle: "solid",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MaterialIcons
                          name="backup-table"
                          size={34}
                          color="tomato"
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            marginLeft: moderateScale(10),
                            fontSize: 20,
                          }}
                        >
                          {data.name}
                        </Text>
                        <Text
                          style={{
                            marginLeft: moderateScale(10),
                            fontSize: 13,
                          }}
                        >
                          {data.date}
                        </Text>
                        <Text
                          style={{
                            marginLeft: moderateScale(10),
                            fontSize: 13,
                          }}
                        >
                          {data.time}
                        </Text>
                      </View>
                    </View>
                    {/* <View>
                      <IconToggle name="add-circle-outline" color="teal" />
                    </View> */}
                  </View>
                  <Divider />
                  <View
                    style={{
                      marginTop: moderateScale(5),
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text>Total items {totalProducts}</Text>
                    </View>
                    <View style={{ marginRight: moderateScale(5) }}>
                      <NumberFormat
                        value={data.total}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"k"}
                        renderText={(formattedValue) => (
                          <Text
                            style={{
                              marginLeft: moderateScale(10),
                              fontSize: 22,
                              color: "tomato",
                            }}
                          >
                            Total {formattedValue}
                          </Text>
                        )}
                      />
                    </View>
                  </View>
                </View>
              </Card>
            );
          }}
          renderContent={(data) => {
            // console.log(data.list.data);

            return (
              <View style={styles.dropList}>
                <View
                  style={{
                    padding: moderateScale(1),
                    // height: verticalScale(30),
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button icons="add" raised text="Add To Table" />
                </View>
                <Divider />

                {data.list.data.map((item: any) => (
                  <View>
                    <Divider />
                    <View
                      style={{
                        padding: moderateScale(10),
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>{item.ItemName}</Text>
                      {/* <Text>{item.qnt}</Text> */}
                      <NumberFormat
                        value={item.qnt * item.sallingprice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"k"}
                        renderText={(formattedValue) => (
                          <Text
                            style={{
                              marginLeft: moderateScale(10),
                              fontSize: 15,
                              color: "#181818",
                            }}
                          >
                            {item.qnt} * {item.sallingprice} = {formattedValue}
                          </Text>
                        )}
                      />
                    </View>
                  </View>
                ))}
              </View>
            );
          }}
          onChange={_updateSections}
          underlayColor="#E2C0B9"
        />
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tables);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  dropList: {
    padding: 5,
    backgroundColor: "#DDDDDD",
    borderRadius: 10,
  },
});
