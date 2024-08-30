const { contextBridge, shell, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  shell: {
    openExternal: (url) => shell.openExternal(url)
  },
  ipcRenderer: {
    send: (channel, data) => {
      let validChannels = ['minimize-window', 'close-window'];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    invoke: (channel, data) => {
      let validChannels = ['open-folder-dialog'];
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, data);
      }
    }
  }
});