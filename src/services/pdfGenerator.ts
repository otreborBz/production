import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { ProducaoDiaria } from '../contexts/ProducaoContext';
import { ProducaoHora } from '../contexts/ProducaoHoraContext';
import { Alert } from 'react-native';

const getProducaoDiariaHTML = (producoes: ProducaoDiaria[], linha: string, turno: string, data: string) => {
  const totals = producoes.reduce((acc, prod) => ({
    marcha: acc.marcha + prod.marcha,
    teste: acc.teste + prod.teste,
    recuperado: acc.recuperado + prod.recuperado,
  }), { marcha: 0, teste: 0, recuperado: 0 });

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          body {
            font-family: 'Helvetica', sans-serif;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            background-color: #fff;
          }
          .container {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            display: flex;
            justify-content: space-between;
            padding-bottom: 20px;
            margin-bottom: 30px;
            border-bottom: 2px solid #e0e0e0;
          }
          .header-item {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .header-label {
            font-size: 14px;
            color: #666;
            font-weight: 500;
          }
          .header-value {
            font-size: 14px;
            color: #333;
            font-weight: 600;
          }
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin-bottom: 30px;
          }
          th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            padding: 15px;
            border-bottom: 2px solid #e0e0e0;
            text-align: center;
          }
          td {
            padding: 12px 15px;
            border-bottom: 1px solid #e0e0e0;
            color: #444;
            font-size: 14px;
            text-align: center;
          }
          .total-row td {
            font-weight: 600;
            background-color: #f8f9fa;
            border-top: 2px solid #e0e0e0;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-item">
              <span class="header-label">Data:</span>
              <span class="header-value">${data}</span>
            </div>
            <div class="header-item">
              <span class="header-label">Linha:</span>
              <span class="header-value">${linha}</span>
            </div>
            <div class="header-item">
              <span class="header-label">Turno:</span>
              <span class="header-value">${turno}</span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Marcha</th>
                <th>Teste</th>
                <th>Recuperado</th>
              </tr>
            </thead>
            <tbody>
              ${producoes.map(prod => `
                <tr>
                  <td>${prod.modelo}</td>
                  <td>${prod.marcha}</td>
                  <td>${prod.teste}</td>
                  <td>${prod.recuperado}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td>Total</td>
                <td>${totals.marcha}</td>
                <td>${totals.teste}</td>
                <td>${totals.recuperado}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            <span>CodeBR | Roberto de Carvalho</span>
            <span>Gerado em: ${new Date().toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </body>
    </html>
  `;
};

const getProducaoHoraHTML = (producoes: ProducaoHora[], linha: string, data: string, turno: string) => {
  // Calcular acumulado
  let acumulado = 0;
  const producoesComAcumulado = producoes.map(prod => {
    acumulado += prod.realProduzido;
    return { ...prod, acumulado };
  });

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          body {
            font-family: 'Helvetica', sans-serif;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            background-color: #fff;
          }
          .container {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .main-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
          }
          .main-title {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-transform: uppercase;
            margin-bottom: 20px;
          }
          .info-row {
            display: flex;
            justify-content: center;
            gap: 40px;
          }
          .info-item {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .info-label {
            font-size: 14px;
            color: #666;
            font-weight: 500;
          }
          .info-value {
            font-size: 14px;
            color: #333;
            font-weight: 600;
          }
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin-bottom: 30px;
          }
          th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            padding: 15px;
            border-bottom: 2px solid #e0e0e0;
            text-align: center;
          }
          td {
            padding: 12px 15px;
            border-bottom: 1px solid #e0e0e0;
            color: #444;
            font-size: 14px;
            text-align: center;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="main-header">
            <div class="main-title">Eficiência Geral do Equipamento - OEE</div>
            <div class="info-row">
              <div class="info-item">
                <span class="info-label">Data:</span>
                <span class="info-value">${data}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Linha:</span>
                <span class="info-value">${linha}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Turno:</span>
                <span class="info-value">${turno}</span>
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Das</th>
                <th>Até</th>
                <th>Meta</th>
                <th>Real</th>
                <th>Acumulado</th>
                <th>Código Parada</th>
                <th>Tempo Parada</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              ${producoesComAcumulado.map(prod => {
                // Para cada produção, pode haver múltiplas paradas
                if (prod.paradas.length === 0) {
                  return `
                    <tr>
                      <td>${prod.horaInicio}</td>
                      <td>${prod.horaFim}</td>
                      <td>${prod.meta}</td>
                      <td>${prod.realProduzido}</td>
                      <td>${prod.acumulado}</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  `;
                }

                // Se houver paradas, criar uma linha para cada parada
                return prod.paradas.map((parada, index) => `
                  <tr>
                    <td>${index === 0 ? prod.horaInicio : ''}</td>
                    <td>${index === 0 ? prod.horaFim : ''}</td>
                    <td>${index === 0 ? prod.meta : ''}</td>
                    <td>${index === 0 ? prod.realProduzido : ''}</td>
                    <td>${index === 0 ? prod.acumulado : ''}</td>
                    <td>${parada.codigo}</td>
                    <td>${parada.minutosPerdidos}</td>
                    <td>${parada.descricao}</td>
                  </tr>
                `).join('');
              }).join('')}
            </tbody>
          </table>

          <div class="footer">
            <span>CodeBR | Roberto de Carvalho</span>
            <span>Gerado em: ${new Date().toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </body>
    </html>
  `;
};

export const pdfGenerator = {
  async generateProducaoDiariaPDF(producoes: ProducaoDiaria[], linha: string, turno: string, data: string) {
    try {
      const html = getProducaoDiariaHTML(producoes, linha, turno, data);
      
      // Gerar PDF com nome temporário
      const { uri } = await Print.printToFileAsync({ html });

      // Definir novo nome do arquivo
      const fileName = `Producao_Diaria_Linha_${linha}_${data.replace(/\//g, '-')}.pdf`;
      const newUri = FileSystem.documentDirectory + fileName;

      // Renomear o arquivo
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });

      // Compartilhar o arquivo
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newUri);
      } else {
        Alert.alert('Erro', 'Compartilhamento não disponível neste dispositivo');
      }
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      throw error;
    }
  },

  async generateProducaoHoraPDF(producoes: ProducaoHora[], linha: string, data: string, turno: string) {
    try {
      const html = getProducaoHoraHTML(producoes, linha, data, turno);
      
      // Gerar PDF com nome temporário
      const { uri } = await Print.printToFileAsync({ html });

      // Definir novo nome do arquivo
      const fileName = `Producao_Hora_Linha_${linha}_${data.replace(/\//g, '-')}.pdf`;
      const newUri = FileSystem.documentDirectory + fileName;

      // Renomear o arquivo
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });

      // Compartilhar o arquivo
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newUri);
      } else {
        Alert.alert('Erro', 'Compartilhamento não disponível neste dispositivo');
      }
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      throw error;
    }
  }
}; 