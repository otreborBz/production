const CODIGOS_PARADA = [
    { 
      codigo: 97,
      descricao: 'troca de ferramentas programadas',
      nomePerda: 'troca de ferramentas',
      grupoPerda: 'disponiblidade',
      categoria: 'parada programada'
    },
    { 
      codigo: 99,
      descricao: 'completar/esvaziar linha no inicio/ fim d turno(Inventário)',
      nomePerda: 'inicio e fim de produção',
      grupoPerda: 'disponiblidade',
      categoria: 'produção'
    },
    { 
      codigo: 100,
      descricao: 'troca de ferramentas sem virada de modelo',
      nomePerda: 'troca de ferramentas',
      grupoPerda: 'disponiblidade',
      categoria: 'produção'
    },
    { 
      codigo: 101,
      descricao: 'virada de modelo / setup',
      nomePerda: 'set up e ajustes',
      grupoPerda: 'disponiblidade',
      categoria: 'produção'
    },
    { 
      codigo: 102,
      descricao: 'ausencia de operador',
      nomePerda: 'perda de gerenciamento',
      grupoPerda: 'mão de obra',
      categoria: 'mão de obra'
    },
    { 
      codigo: 103,
      descricao: 'problema com telesy',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'ti'
    },
    { 
      codigo: 104,
      descricao: 'retrabalho de peças ou retestes',
      nomePerda: 'defeito ou retrabalhos',
      grupoPerda: 'qualidade',
      categoria: 'qualidade'
    },
    { 
      codigo: 108,
      descricao: 'enfermaria',
      nomePerda: 'perda de gerenciamento',
      grupoPerda: 'mão de obra',
      categoria: 'mão de obra'
    },
    { 
      codigo: 109,
      descricao: 'limpeza de maquinas, linha e equipamentos',
      nomePerda: 'inicio e fim de produção',
      grupoPerda: 'disponiblidade',
      categoria: 'produção'
    },
    { 
      codigo: 110,
      descricao: 'abastecimento de maquinas',
      nomePerda: 'perda de gerenciamento',
      grupoPerda: 'disponiblidade',
      categoria: 'produção'
    },
    { 
      codigo: 111,
      descricao: 'falta de empilhadeira/ paleteira ou abastecimento incorreto',
      nomePerda: 'perda de gerenciamento',
      grupoPerda: 'mão de obra',
      categoria: 'logistica'
    },
    { 
      codigo: 112,
      descricao: 'cursos, treinamentos, reunioes, comunicados e palestras',
      nomePerda: 'perda de organização da linha',
      grupoPerda: 'mão de obra',
      categoria: 'mão de obra'
    },
    { 
      codigo: 114,
      descricao: 'ajustes/ preparação de maquinas ou dispositivos',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'produção'
    },
    { 
      codigo: 142,
      descricao: 'falta de material de fornecedor interno',
      nomePerda: 'perda de gerenciamento',
      grupoPerda: 'mão de obra',
      categoria: 'produção'
    },
    { 
      codigo: 152,
      descricao: 'aquecer maquina sem produzir',
      nomePerda: 'inicio e fim de produção',
      grupoPerda: 'disponiblidade',
      categoria: 'produção'
    },
    { 
      codigo: 156,
      descricao: 'ajuste de temperatura- temp metal',
      nomePerda: 'set up e ajustes',
      grupoPerda: 'disponiblidade',
      categoria: 'produção'
    },
    { 
      codigo: 155,
      descricao: 'sem programa de produção/ alteração de programa',
      nomePerda: 'perda de gerenciamento',
      grupoPerda: 'disponiblidade',
      categoria: 'sem demanda'
    },
    { 
      codigo: 166,
      descricao: 'producao de amostras',
      nomePerda: 'paradas programadas',
      grupoPerda: 'programada',
      categoria: 'parada programada'
    },
    { 
      codigo: 173,
      descricao: 'refeição, ginastica, descanso',
      nomePerda: 'paradas programadas',
      grupoPerda: 'programada',
      categoria: 'parada programada'
    },
    { 
      codigo: 176,
      descricao: 'virada de metal',
      nomePerda: 'troca de ferramentas',
      grupoPerda: 'disponiblidade',
      categoria: 'produção'
    },
    { 
      codigo: 179,
      descricao: 'TROCA DE VÁLVULAS / STOPPER POR FALHA DE NEDAÇÃO',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'produção'
    },
    { 
      codigo: 182,
      descricao: 'Falta de óleo refrigerante (RT ou tanque) / Óleo Hidráulico / Óleo Lubrif',
      nomePerda: 'perda de gerenciamento',
      grupoPerda: 'disponiblidade',
      categoria: 'utilidades'
    },
    { 
      codigo: 183,
      descricao: 'ARENA SECA OU ÚMIDA - FALHA DO RTC',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'produção'
    },
    { 
      codigo: 184,
      descricao: 'Desligamento de energia elétrica',
      nomePerda: 'perda de gerenciamento',
      grupoPerda: 'disponiblidade',
      categoria: 'produção'
    },
    { 
      codigo: 200,
      descricao: 'Manutenção Mecânica',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'manutenção'
    },
    { 
      codigo: 201,
      descricao: 'Manutenção Elétrica / Eletrônica',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'manutenção'
    },
    { 
      codigo: 202,
      descricao: 'Manutenção Utilidades (Óleo, Ar Comprimido, Energia Elétrica, Água e relacionados)',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'utilidades'
    },
    { 
      codigo: 203,
      descricao: 'Manutenção Estrutural (Serralheria)',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'manutenção'
    },
    { 
      codigo: 206,
      descricao: 'Manutenção programada ou preventiva',
      nomePerda: 'paradas programadas',
      grupoPerda: 'programada',
      categoria: 'parada programada'
    },
    { 
      codigo: 207,
      descricao: 'Aguardando Manutenção',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'manutenção'
    },
    { 
      codigo: 208,
      descricao: 'falta de ar comprimido',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'utilidades'
    },
    { 
      codigo: 215,
      descricao: 'quebra de dispositivo/ ferramenta de maquina',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'almox ferramentas'
    },
    { 
      codigo: 216,
      descricao: 'falta de demanda',
      nomePerda: 'paradas programadas',
      grupoPerda: 'programada',
      categoria: 'sem demanda'
    },
    { 
      codigo: 218,
      descricao: 'redução de velocidade ou ciclo fora de padrão',
      nomePerda: 'redução de velocidade',
      grupoPerda: 'desempenho',
      categoria: 'produção'
    },
    { 
      codigo: 219,
      descricao: 'falta de operador treinado',
      nomePerda: 'perda de gerenciamento',
      grupoPerda: 'mão de obra',
      categoria: 'mão de obra'
    },
    { 
      codigo: 220,
      descricao: 'linha incompleta',
      nomePerda: 'perda de organização da linha',
      grupoPerda: 'mão de obra',
      categoria: 'produção'
    },
    { 
      codigo: 300,
      descricao: 'manutenção em aparelhos de medição/ calibradores',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'metrologia'
    },
    { 
      codigo: 303,
      descricao: 'aguardando analise quimica',
      nomePerda: 'medições e ajustes',
      grupoPerda: 'mão de obra',
      categoria: 'metrologia'
    },
    { 
      codigo: 304,
      descricao: 'material não conforme',
      nomePerda: 'defeito ou retrabalhos',
      grupoPerda: 'qualidade',
      categoria: 'qualidade'
    },
    { 
      codigo: 400,
      descricao: 'falta de material de fornecedor externo',
      nomePerda: 'perda de logistica',
      grupoPerda: 'mão de obra',
      categoria: 'logistica'
    },
    { 
      codigo: 401,
      descricao: 'falta de ferramentas/ dispositivo em estoque ou preparada',
      nomePerda: 'perda de gerenciamento',
      grupoPerda: 'mão de obra',
      categoria: 'almox ferramentas'
    },
    { 
      codigo: 702,
      descricao: 'operação nao prevista',
      nomePerda: 'perda de organização da linha',
      grupoPerda: 'mão de obra',
      categoria: 'produção'
    },
    { 
      codigo: 703,
      descricao: 'ajuste pela ferramentaria',
      nomePerda: 'quebra ou falha',
      grupoPerda: 'disponiblidade',
      categoria: 'ferrantaria'
    },
    { 
      codigo: 704,
      descricao: 'memdiçoes de peças',
      nomePerda: 'medições e ajustes',
      grupoPerda: 'mão de obra',
      categoria: 'produção'
    },
    { 
      codigo: 705,
      descricao: 'ajuste de equipamentos / maquinas em processo novos pelo EIA - try-out',
      nomePerda: 'paradas programadas',
      grupoPerda: 'programada',
      categoria: 'parada programada'
    },
    { 
      codigo: 706,
      descricao: 'falta de embalagem para armazenamento de peças',
      nomePerda: 'perda de logistica',
      grupoPerda: 'mão de obra',
      categoria: 'produção'
    }
  ];

  export default CODIGOS_PARADA;