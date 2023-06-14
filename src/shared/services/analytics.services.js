import { logEvent } from "@firebase/analytics";
import { useFirebaseStore } from "@/store/useFirebase.store";

export function selectContent(type, id) {
  const firebaseStore = useFirebaseStore();
  const analytics = firebaseStore.analyticsInstance;
  logEvent(analytics, "select_content", {
    content_type: type,
    item_id: id,
  });
}
