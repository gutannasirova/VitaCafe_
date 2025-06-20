import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, 
  ScrollView, ImageBackground, Animated, TextInput, Switch 
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [showEditName, setShowEditName] = useState(false);
  const [name, setName] = useState('');
  const [showSupport, setShowSupport] = useState(false);

  // Для настроек уведомлений
  const [notifPromo, setNotifPromo] = useState(true);
  const [notifOrders, setNotifOrders] = useState(true);
  const [notifBonus, setNotifBonus] = useState(false);

  const [qrVisible, setQrVisible] = useState(false);

  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
      Animated.loop(
          Animated.sequence([ 
              Animated.timing(spinValue, {
                  toValue: 1,
                  duration: 4000,
                  useNativeDriver: true,
              }),
              Animated.timing(spinValue, {
                  toValue: 0,
                  duration: 4000,
                  useNativeDriver: true,
              })
          ])
      ).start();
  }, []);

  const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-50deg"],
  });

  const handleEditProfile = () => {
    setShowEditName(true);
  };

  const handleNameSubmit = () => {
    setShowEditName(false);
  };

  const supportEmail = 'support@vitacafe.com';

  return (
      <ImageBackground source={require('./assets/fon.png')} style={styles.background}>
          <ScrollView contentContainerStyle={styles.container}>
              {/* Верхняя панель */}
              <View style={styles.header}>
                  <View style={styles.logoContainer}>
                      <Text style={styles.logo}>VitaCafe</Text>
                  </View>
                  <TouchableOpacity>
                      <Image source={require("./assets/delivery1.png")} style={styles.icon} />
                  </TouchableOpacity>
              </View>

              <Text style={styles.headerText}>Личный кабинет</Text>
              
              <View style={styles.profileCard}>
                  <Image source={require('./assets/Ava.png')} style={styles.avatar} />
                  {qrVisible && (
                      <View style={styles.qrModal}>
                          <TouchableOpacity onPress={() => setQrVisible(false)} style={styles.closeButton}>
                              <AntDesign name="closecircleo" size={30} color="white" />
                          </TouchableOpacity>
                          <Image source={require('./assets/QRcod.png')} style={styles.qrFull} />
                      </View>
                  )}

                  {showEditName ? (
                    <TextInput
                      style={[styles.name, styles.nameInput]}
                      placeholder="Введите ник"
                      value={name}
                      onChangeText={setName}
                      onBlur={handleNameSubmit}
                      autoFocus
                      returnKeyType="done"
                      onSubmitEditing={handleNameSubmit}
                    />
                  ) : (
                    <Text style={styles.name}>{name || " "}</Text>
                  )}

                  <TouchableOpacity onPress={handleEditProfile} style={styles.editIcon}>
                      <MaterialIcons name="edit" size={24} color="#777" />
                  </TouchableOpacity>
              </View>

              <Animated.Image
                  source={require('./assets/Bazelik.png')}
                  style={[styles.Bazelik, { transform: [{ rotate: spin }] }]}
              />
              <Animated.Image
                  source={require('./assets/Spinach2.png')}
                  style={[styles.Spinach, { transform: [{ rotate: spin }] }]}
              />

              {/* Блок поддержки */}
              <TouchableOpacity style={styles.navItem} onPress={() => setShowSupport(!showSupport)}>
                  <Text style={styles.navText}>Поддержка</Text>
                  <Text style={styles.arrow}>{showSupport ? '▲' : '>'}</Text>
              </TouchableOpacity>
              {showSupport && <Text style={styles.detailText}>{supportEmail}</Text>}

              {/* Новый блок — Настройки уведомлений */}
              <View style={styles.settingsBlock}>
                <Text style={styles.settingsTitle}>Настройки уведомлений</Text>

                <View style={styles.settingRow}>
                  <Text style={styles.settingText}>Уведомления о новых акциях</Text>
                  <Switch
                    value={notifPromo}
                    onValueChange={setNotifPromo}
                    trackColor={{ false: "#ccc", true: "#7bc100" }}
                    thumbColor={notifPromo ? "#4CAF50" : "#f4f3f4"}
                  />
                </View>

                <View style={styles.settingRow}>
                  <Text style={styles.settingText}>Уведомления о статусе заказа</Text>
                  <Switch
                    value={notifOrders}
                    onValueChange={setNotifOrders}
                    trackColor={{ false: "#ccc", true: "#7bc100" }}
                    thumbColor={notifOrders ? "#4CAF50" : "#f4f3f4"}
                  />
                </View>

                <View style={styles.settingRow}>
                  <Text style={styles.settingText}>Уведомления о бонусах и скидках</Text>
                  <Switch
                    value={notifBonus}
                    onValueChange={setNotifBonus}
                    trackColor={{ false: "#ccc", true: "#7bc100" }}
                    thumbColor={notifBonus ? "#4CAF50" : "#f4f3f4"}
                  />
                </View>
              </View>

              <Text style={styles.logo}>VitaCafe</Text>
          </ScrollView>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: 412,
  },
  container: {
    width: 412,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  profileCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  icon: {
    width: 30,
    height: 30,
    left: 17,
    bottom: 30,
  },
  logoContainer: {
    right: 20,
    bottom: 50,
  },
  logo: {
    fontSize: 33,
    fontFamily: "faberge",
    textAlign: 'center',
    marginTop: 40,
  },
  headerText: {
    fontSize: 26,
    fontFamily: "faberge",
    bottom: 20,
  },
  name: {
    fontSize: 18,
    fontFamily: 'faberge',
    marginLeft: 10,
    flex: 1,
  },
  nameInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
    paddingVertical: 2,
  },
  editIcon: {
    position: 'absolute',
    right: 15,
    top: 32,
  },
  Bazelik: {
    position: "absolute",
    top: 100,
    left: 380,
    width: 50,
    height: 50,
  },
  Spinach: {
    position: "absolute",
    top: 630,
    right: 380,
    width: 50,
    height: 50,
  },
  navItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  navText: {
    fontSize: 17,
    fontFamily: 'faberge',
  },
  arrow: {
    fontSize: 22,
    color: '#222',
    fontFamily: 'faberge',
  },
  detailText: {
    fontSize: 15,
    paddingVertical: 5,
    paddingLeft: 10,
    color: '#555',
    fontFamily: 'faberge',
  },
  settingsBlock: {
    marginTop: 30,
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    padding: 15,
  },
  settingsTitle: {
    fontSize: 18,
    fontFamily: 'faberge',
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'faberge',
  },
});
