import { useSyncExternalStore } from 'react';

export function useOnlineStatus() {
  try{
    const isOnline = useSyncExternalStore(subscribe, getSnapshot);
    return isOnline;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}