import { contextBridge, ipcRenderer } from "electron";

import veiculos from './enty/veiculos';
import usuarios from "./enty/usuarios";
import VeiculosRepository from "./repository/VeiculosRepository";


contextBridge.exposeInMainWorld('bancoAPI',{
    createVeiculo: async (veiculo:veiculos) => await ipcRenderer.invoke('create', veiculo),
    deletarVeiculo: async (id:string) => await ipcRenderer.invoke('deletarVeiculo', id),
    createUsuario: async (usuario: usuarios) => await ipcRenderer.invoke('createUsuario', usuario),
    addProdutos: async (produtos:any)=> await ipcRenderer.invoke('addProdutos', produtos),
    updateStatus: async(id:VeiculosRepository)=> await ipcRenderer.invoke('updateStatus', id)
})

contextBridge.exposeInMainWorld('buscaAPI',{
    findAll: async()=> await ipcRenderer.invoke('findAll'),
    findById: async (id:string)=> await ipcRenderer.invoke('findById', id),
    findAllProdutos: async()=> await ipcRenderer.invoke('findAllProdutos'),
    findByEmail: async (email: string) => await ipcRenderer.invoke('findByEmail', email),
    findBySenha: async(senha:string)=> await ipcRenderer.invoke('findBySenha', senha),
    findByName: async(nome:string)=> await ipcRenderer.invoke('findByName', nome),

})

contextBridge.exposeInMainWorld('navigateAPI',{
    irPaginaHome:() => ipcRenderer.send('pagina-home'),
    irPaginaCadastro:()=> ipcRenderer.send('paginaCadastro'),
    irPaginaLogin:()=> ipcRenderer.send('paginaLogin'),
    irPaginaProducao:()=> ipcRenderer.send('paginaProducao'),
    irPaginaQualidade:()=> ipcRenderer.send('paginaQualidade'),
    irPaginaEstoque:()=> ipcRenderer.send('paginaEstoque')

})

