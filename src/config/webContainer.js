import { WebContainer } from '@webcontainer/api';

let webcontainerInstance = null;
let bootPromise = null;

export const getWebContainer = async () => {
  if (!bootPromise) {
    bootPromise = WebContainer.boot();
  }
  if (!webcontainerInstance) {
    webcontainerInstance = await bootPromise;
  }
  return webcontainerInstance;
};