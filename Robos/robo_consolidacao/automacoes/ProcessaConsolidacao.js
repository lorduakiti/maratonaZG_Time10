class ProcessaConsolidacao {
    constructor(paramns) { 
        console.log('..iniciando processamento.')
    }
    async list(req, res) {
        console.log('..listando processamentos.')
        return res.json({status: 'teste processando list..'});
    }
    async start(req, res) {
        console.log('..start processamento.')
        return res.json({status: 'teste processando start..'});
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