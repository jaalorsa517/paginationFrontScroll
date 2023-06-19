import { logEvent } from "@firebase/analytics";
import { useFirebaseStore } from "@/store/useFirebase.store";

function getInstanceGA() {
  const firebaseStore = useFirebaseStore();
  return firebaseStore.analyticsInstance;
}

export function selectContent(type, id) {
  const analytics = getInstanceGA()
  if(!analytics) return
  logEvent(analytics, "select_content", {
    content_type: type,
    content_id: id,
  });
}
