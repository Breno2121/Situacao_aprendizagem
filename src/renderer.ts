import './index.css';
import * as echarts from 'echarts'

document.getElementById('btn-voltar')?.addEventListener("click", async (event: MouseEvent) => {
  event.preventDefault();
  
  (window as any).navigateAPI.irPaginaLogin()  
})

document.getElementById('Producao')?.addEventListener("click", async (event: MouseEvent) => {
  event.preventDefault();
  
  (window as any).navigateAPI.irPaginaProducao()
  
})

document.getElementById('Qualidade')?.addEventListener("click", async (event: MouseEvent) => {
  event.preventDefault();
  
  (window as any).navigateAPI.irPaginaQualidade()
  
})

document.getElementById('Estoque').addEventListener("click", async  (event: MouseEvent)=> {
  event.preventDefault();
  
  (window as any).navigateAPI.irPaginaEstoque()
  
})

document.getElementById('sair').addEventListener("click", async  (event: MouseEvent)=> {
  event.preventDefault();
  
  
  
  (window as any).navigateAPI.irPaginaLogin()
  
})

desenhaGrafico()

function desenhaGrafico(){

  const teste = document.getElementById('pizza') as HTMLDivElement;
  const teste_2 = document.getElementById('pizza_2') as HTMLDivElement;
  const chart = echarts.init(teste)
  const chart_2 = echarts.init(teste_2)

const option = {
    title: {
      text: 'Produção',
      subtext: 'Veiculos',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Aprovados' },
          { value: 735, name: 'reprovados' },
          { value: 580, name: 'Produzidos' },
          { value: 484, name: 'Avaliados' },
          
        ]
      }]
  };

const option_2 = {
    title: {
      text: 'Produção',
      subtext: 'Veiculos',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Aprovados' },
          { value: 735, name: 'reprovados' },
          { value: 580, name: 'Produzidos' },
          { value: 484, name: 'Avaliados' },
          
        ]
      }]
  };
  chart.setOption(option)
  chart_2.setOption(option_2)
}
