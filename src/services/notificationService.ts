import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

// Solicitar permissão para notificações
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    getFCMToken();
  }
}

// Obter o token FCM
async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    console.log("FCM Token:", token);
    // Aqui você pode enviar o token para seu backend se necessário
    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
}

// Configurar listeners para notificações
export function setupNotificationListeners() {
  // Notificação recebida com o app em foreground
  messaging().onMessage(async (remoteMessage) => {
    Alert.alert(
      remoteMessage.notification?.title || "Nova mensagem",
      remoteMessage.notification?.body
    );
  });

  // Notificação recebida com o app em background
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });

  // Lidar com notificações que abrem o app
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage
    );
  });

  // Verificar se o app foi aberto por uma notificação
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage
        );
      }
    });
}
