import { app, BrowserWindow, ipcMain } from 'electron';
import UsuarioRepository from './repository/UsuarioRepository';
import Usuario from './enty/usuarios';
import VeiculosRepository from './repository/VeiculosRepository';
import veiculos from './enty/veiculos';
import ProdutosRepository from './repository/ProdutosRepository';
import Produtos from './enty/produtos';




declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;


if (require('electron-squirrel-startup')) {
  app.quit();
}

var mainWindow:BrowserWindow;
const createWindow = (): void => {

   mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.maximize()
  mainWindow.loadURL('http://localhost:3000/qualidade');

};


app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})


//---------------------------------------------------------------------------------------//
ipcMain.handle('create',async (event:any, veiculo:any) => {
  const {nome, modelo,chassi,motor,transmissao,freios,pneus,rodas, cor} = veiculo
  const novoVeiculo = new veiculos(nome, modelo,chassi,motor,transmissao,freios,pneus,rodas,cor)
  return await new VeiculosRepository().save(novoVeiculo)
})

ipcMain.handle('addProdutos',async (event:any, produtos:any) => {
  const {nome, marca,fornecedor,quantidade} = produtos;
  const novoProduto = new Produtos (nome, marca, fornecedor, quantidade);
   await new ProdutosRepository().save(novoProduto)
  
})


ipcMain.handle('findAll', async ()=>{
 return await new VeiculosRepository().findAll();
})

ipcMain.handle('findAllProdutos', async ()=>{
 return await new ProdutosRepository().findAllProdutos();
})

ipcMain.handle('updateStatus', async (_:any, id: any)=>{
  return await new VeiculosRepository().updateStatus(id)
})


ipcMain.handle('createUsuario', async (_: any, usuario: any) => {
  const { name, data_nascimento, email, senha} = usuario;

  const newUsuario = new Usuario(name,data_nascimento, email, senha );
  await new UsuarioRepository().save(newUsuario);
})

ipcMain.handle('findByEmail', async (_: any, email: string) => {
  return await new UsuarioRepository().findByEmail(email);
})

ipcMain.handle('findBySenha', async (_: any, senha: any) => { 
  const { senhaEntrada, senhaBanco } = senha;

  // Certifique-se de que ambas as senhas foram fornecidas
  if (!senhaEntrada || !senhaBanco) {
    alert("Ambas as senhas devem ser fornecidas.");
  }

  // Comparação das senhas
  const isMatch = senhaEntrada === senhaBanco;
  return isMatch; 
});

//--------------------------------------------------------//
ipcMain.on('pagina-home', ()=>{
  mainWindow.loadURL('http://localhost:3000/main_window')
})

ipcMain.on('paginaCadastro', ()=>{
  mainWindow.loadURL('http://localhost:3000/cadastro')
})

ipcMain.on('paginaLogin', ()=>{
  mainWindow.loadURL('http://localhost:3000/login')
})

ipcMain.on('paginaProducao', ()=>{
  mainWindow.loadURL('http://localhost:3000/producao')
})

ipcMain.on('paginaQualidade', ()=>{
  mainWindow.loadURL('http://localhost:3000/qualidade')
})

ipcMain.on('paginaEstoque', ()=>{
  mainWindow.loadURL('http://localhost:3000/estoque')
})
