import { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import {
  requestUserPermission,
  setupNotificationListeners,
} from "./src/services/notificationService";

export default function App() {
  useEffect(() => {
    // Configurar notificações
    requestUserPermission();
    setupNotificationListeners();
  }, []);

  return <AppNavigator />;
}
