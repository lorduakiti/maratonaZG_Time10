const axios = require('axios');


class ProcessaConsolidacao {
    constructor(paramns) { 
        console.log('..iniciando processamento.')
    }
    async list(req, res) {
        console.log('..listando processamentos.')
        return res.json({status: 'teste processando list..'});
    }
    async start(req, res) {

        console.log('..start processamento.', req['body'])
        try {
            var source = req['body']['source'];
            var lote_importacao = req['body']['lote_importacao'];

            var data = {
                "query": "query MyQuery {"+
                    "importacao_convenios_aggregate(where: {lote_importacao: {_eq: \""+ lote_importacao + "\"}, source: {_eq: \""+ source + "\"}, deleted_at: {_is_null: true}}) {"+
                    "    aggregate {"+
                    "      count"+
                    "    }"+
                    "  }"+
                    "}",
                "variables":null, 
                "operationName":"MyQuery"
            }
            
            // Iniciando contagem de registros
            axios.post('https://maratona-zg.herokuapp.com/v1/graphql', data)
                .then(result => {
                    //console.log('res:', result);
                    //console.log('data:', result.data);
                    console.log('statusCode:', result.status);
                    if(result.status != 200){
                        throw  result.statusText;
                    } else {
                        let responseQtd = result.data;

                        if(responseQtd['data']){
                            var qtdRegistros = responseQtd['data']['importacao_convenios_aggregate']['aggregate']['count'];
                            if(qtdRegistros){
                                console.log('qtdRegistros: ', qtdRegistros);

                                // Iniciando busca de registros
                                /*
                                var data = {
                                    "query": "query MyQuery {"+
                                        "importacao_convenios(where: {source: {lote_importacao: {_eq: \""+ lote_importacao + "\"}, source: {_eq: \""+ source + "\"}, deleted_at: {_is_null: true}}) {"+
                                        "    codigo_motivo,"+
                                        "    codigo_produto,"+
                                        "    convenio,"+
                                        "    data_pagamento,"+
                                        "    descricao_motivo,"+
                                        "    descricao_produto,"+
                                        "    id,"+
                                        "    id_convenio,"+
                                        "    lote_importacao,"+
                                        "    matricula,"+
                                        "    ng_prest,"+
                                        "    nome,"+
                                        "    numero_guia,"+
                                        "    numero_protocolo,"+
                                        "    senha_guia,"+
                                        "    source,"+
                                        "    updated_at,"+
                                        "    valor_apresentado,"+
                                        "    valor_glosa,"+
                                        "    valor_pago"+
                                        "  }"+
                                        "}\",",
                                    "variables":null, 
                                    "operationName":"MyQuery"
                                }
                                */
                                var data = {"query":"query MyQuery {\n  importacao_convenios(where: {source: {_eq: \""+ source + "\"}, lote_importacao: {_eq: \""+ lote_importacao + "\"}, deleted_at: {_is_null: true}}) {\n    codigo_motivo\n    codigo_produto\n    convenio\n    data_pagamento\n    descricao_motivo\n    descricao_produto\n    id\n    id_convenio\n    lote_importacao\n    matricula\n    ng_prest\n    nome\n    numero_guia\n    numero_protocolo\n    senha_guia\n    source\n    updated_at\n    valor_apresentado\n    valor_glosa\n    valor_pago\n  }\n}\n","variables":null,"operationName":"MyQuery"};
                                axios.post('https://maratona-zg.herokuapp.com/v1/graphql', data)
                                    .then(result => {
                                        //console.log('res:', result);
                                        //console.log('data:', result.data);
                                        console.log('statusCode:', result.status);
                                        if(result.status != 200){
                                            throw  result.statusText;
                                        } else {
                                            let responseList = result.data;
                                            if(responseList['data']){
                                                var arrRegistros = responseList['data']['importacao_convenios'];
                                                var qtdArrRegistros = arrRegistros.length;
                                                console.log('qtdArrRegistros: ', qtdArrRegistros);

                                                for(let i=0; i<qtdArrRegistros; i++){
                                                    console.log( arrRegistros[i].id );
                                                }

                                                return res.status(200).json({status: `teste processando start..[${qtdRegistros}][${qtdArrRegistros}]`});
                                            } else {
                                                throw "Não foi possível buscar os resitros da importação de convêncios."
                                            }
                                        }
                                    })
                                    .catch(error => {
                                        console.error(error)
                                    })
                            } else {
                                throw "Quantidade de resitros inválida da importação de convêncios."
                            }
                        } else {
                            throw "Não foi possível buscar a quantidade de resitros da importação de convêncios."
                        }
                    }
                })
                .catch(error => {
                    console.error(error)
                })

            
        } catch (err) {
            console.log('ERRO:', err);
            return res
                .status(400)
                .json({ error: 'Erro no processamento', messages: err });
        }

    }
    async stop(req, res) { 
        console.log('..stop processamento.')
        return res.json({status: 'teste processando stop..'});
    }
    async status(req, res) {
        console.log('..status processamento.')
        return res.json({status: 'teste processando status..'});
    }
}

module.exports = new ProcessaConsolidacao();