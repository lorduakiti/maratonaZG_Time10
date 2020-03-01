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
            let source = req['body']['source'];
            let lote_importacao = req['body']['lote_importacao'];
            


            return res.status(200).json({status: 'teste processando start..'});
        } catch (err) {
            return res
                .status(400)
                .json({ error: 'Erro no processamento', messages: err.inner });
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