# Hackaton Maratona ZG 2020
Códigos do hackaton de dados da ZG de 2020.

## Time 10
[Uákiti Pires](https://github.com/lorduakiti)  
[Khyquer Ronald](https://github.com/khyquer)  
[Thiago Augusto](https://github.com/wstagf)  


## Projeto Master Developer  
Ao utilizar seu plano de saúde em um hospital, é gerada uma fatura, chamada pelos hospitais de "Guia", para que o hospital possa cobrar do convênio as despesas que ele teve com você.  
O hospital deve registrar todos os produtos utilizados, para então apresentá-los ao convênio, sendo esta a única forma dee realizar a cobrança. Todos produtos (seringas, agulhas, medicamentos...) utilizados e procedimentos realizados em prol do paciente são registrados. Em seguida o hospital gera um arquivo, em um formato predefinido, que é enviado ao convênio para que eles analisem as informações e realizem o pagamento dos itens utilizados.  

-----

### Cenário  
Você passou mal e foi ao Hopital Maria da Penha, chegando lá, apresentou sua carteirinha do convênio *GlosaMax* e foi atendido pelo médico de plantão.  
Ele te fez algumas perguntas e concluiu que seu caso era de suspeita de dengue, daí pediu a realização de um exame de sangue para verificar se a suspeita se confirmaria. Enquanto o exame não ficava pronto ele determinou que você deveria ficar em observação, tomar uma Novalgina para aliviar as dores do corpo e a febre alta, características da dengue, além disso, determinou também que deveria tomar 2 litros de soro, para hidratação, pois a febre alta, causa desidratação.  
Saiu o resultado do exame, não era dengue, ele então te disse que provavelmente seria alguma virose, te passou a receita da Novalgina, para que tomasse em casa, caso as dores e a febre persistissem, mas que deveria retomar caso piorasse, ou surgissem novos sintomas, pois o exame não consegue detectar a doença nos estágio iniciais, sendo assim você foi para casa e no dia seguinte tudo estava OK.  

Todos os itens do seu atendimento devem ser registrados pelo Hospital, para que sejam apresentados à *GlosaMax* e daí ele efetuar o pagamento ao Hospital.  

Resultado:  
Foi gerada uma conta (ou "Guia" nos termos hospitalares) do seu atendimento. Nesta guia estão relacionados os seguintes itens:  
1. Consulta de emergência - Valor R$ 50,00 - Quantidade 1
2. Exame sorologia de dengue - Valor R$ 30,00 - Quantidade 1
3. Novalgina - Valor R$ 15,30 - Quantidade 1
4. Soro fisiológico - Valor R$ 5,00 - Quantidade 2
5. Taxa de sala de emergência - Valor R$ 130,00 - Quantidade 2

Estas informações são reunidas em um arquivo, de formato predefinido, e enviado ao *GlosaMax*. Chegando lá, o analista do convênio vai pegar o arquivo e verificar se está tudo certo, para então fazer o pagamento e vai decidir pagar da seguinte forma:  
1. Consulta de emergência - Valor R$ 50,00 - Quantidade 1
2. Exame sorologia de dengue - Valor R$ 30,00 - Quantidade 1
3. Novalgina - Valor R$ 1,53 - Quantidade 1
	a. Foi cobrado o valor de 15,30, mas o valor acordado é de 1,53
4. Soro fisiológico - Valor R$ 5,00 - Quantidade 2
5. Taxa de sala de emergência - Valor R$ 130,00 - Quantidade 1
	a. Foram cobradas 2 taxas, mas foi paga apenas 1, pois o paciente não ficou internado por dois dias

Esse "demonstrativo" de pagamento é disponibilizado pelo *GlosaMax* para o analista do Hospital faça uma conferência item a item do que foi pago, o que não foi e o que foi pago com diferenças. Esse processo é chamado de *conciliação*. Com a conciliação é possível identificar as diferenças entre o que foi cobrado e o que foi pago. No meio hospitalar essa diferença é chamada de *Glosa*.  

-----

### Projeto  
Fazer esta conferência manualmente é um trabalho muito complicado, pois o volume é muito grande e surgem novas regras com frequência, por isso o Hospital entrou em contato com sua equipe para que vocês desenvolvam uma solução de software para eles. O Hospital quer que o software seja capaz de acessar o site do convênio, fazer o download do demonstrativo de pagamento e mostre para o usuário quais itens foram pagos, com qual valor e, se teve diferença, informe o motivo do convênio não ter efetuado o pagamento integral.  
Eles estão muito animados com este projeto e já demonstraram interesse em contratar o desenvolvimento dos convênios *GlosaMin* e do *PagaTudo* também, mas querem ver funcionando com o convênio *GlosaMax* antes de dar este segundo passo, visto que o *GlosaMax* tem causado mais prejuízos. Então você deverá desenvolver um piloto para comprovar a viabilidade de automação do processo.  
Tenha em mente que o nível de conciliação automática é determinante na aceitação do projeto.  

Estes são os ties dos três convênios que o Hospital Maria da Penha atende:  
http://convenios.zeroglosa.com.br/glosamax/  
http://convenios.zeroglosa.com.br/glosamin/  
http://convenios.zeroglosa.com.br/pagatudo/  

-----

Todas as informações de faturamento estão disponíveis no sistema do Hospital.  
Este sistema foi desenvolvido pela TI do hospital em parceria com o Hospital José do Cerrado e roda num servidor local; no datacenter do hospital.  

O Hospital José do Cerrado sofre dos mesmos problemas que o Hospital Maria da Penha e já manifestou interesse de contratá-lo, caso o piloto funcione bem.  

A TI tem total controle do sistema e do banco de dados. eles estão totalmente dispostos a apoiar e não criar qualquer impedimento para o desenrolar rápido do projeto, mas não pretende evoluir a aplicação, devido ao custo muito alto, além disso, quando o sistema foi criado, apenas o desenvolvedor e Deus sabiam como dar manutenção, hoje vários anos depois, você já sabe...  

O sistema do hospital é bem carente de relatórios e a visualização das informações de conciliação. Assim que o processamento e visualização das informações básicas da conciliação. Assim que o processamento e visualização das informações básicas da conciliação estiverem completos, a diretoria gostaria de relatórios sintéticos para apoio à decisão.  

Para o acompanhamento do trabalho da conciliação, uma das informações que eles gostariam é o que falta conciliar. Sem dúvida há outras visões para melhorar o processo e a diretoria espera que seu time seja capaz de identificá-las.  

A diretoria afirma que devido ao uso do sistema para outros módulos, a informação de conciliação deve estar nele, mesmo se a conciliação foi feita fora do sistema.  

Este é o endereço do sistema do hospital (g1 ... g12 é o número do seu grupo)  
http://faturamento.zeroglosa.com.br/faturamento-md-g1/  

#### Notas para o desenvolvimento  
A obtenção das informações do faturamento e o pagamento deve acontecer sem a interação do usuário, pois os diretores do hospital estão antenados nas tecnologias RPA que despontam no mercado e gostariam que seu sistema de conciliação fosse criado nesta linha.  

Além da resolução do problema, há alguns requisitos que você deve observar ao desenvolver a solução:  
1. GlosaMax não é o único convênio atendido pelo hospital, apesar de ser o primeiro que terá o demonstrativo obtido automaticamente.
2. O site do convênio pode mudar
3. A avaliação dos pagamentos é feita mensalmente
4. O hospital deseja ter o máximo de precisão possível na conciliação
5. Caso algum item, ou conta, não seja encontrado, esta informação também deve ser apresentada

### Convênio  
Os arquivos com o demonstrativo do convênio GlosaMax (disponibilizados no site) são XML com cabeçalhos detalhando as colunas existentes.  
Temos a representação de forma desnormalizada dos dados dos itens que serão pagos, com os seguintes campos:  
*convenio* - Nome do convênio  
*data_pagamento* - Data em que o pagamento foi realizado  
*número_protocolo* - Protocolo do pagamento   
*matricula* - Matrícula do beneficiário  
*nome* - Nome do beneficiário  
*numero_guia* - Identificação da guia atribuída pelo convênio   
*ng_prest* - Identificação da guia atribuída pelo hospital  
*senha_guia* - Senha de autorização da guia  
*codigo_produto* - Código do produto  
*descricao_produto* - Descrição do produto  
*valor_apresentado* - Valor cobrado pelo hospital  
*valor_pago* - Valor pago pelo convênio  
*valor_glosa* - Valor da glosa  
*descricao_motivo* - Descrição do motivo da glosa  
*codigo_motivo* - Código do motivo da glosa  

-----

### Orientações técnicas
- Utilize a linguagem e framework de sua preferência;
- O projeto deverá ser versionado utilizando *Git* (em um ou mais repositórios, como achar melhor) e submetido para a avaliação;
- O resultado da conciliação deve ser apresentado de forma que o usuário consiga ver os dados que foram conciliados e identificar as diferenças e os respectivos motivos. Com isso será obrigatório a possibilidade de geração de dois tipos de relatório um CSV e um JSON com esses dados;
- Utilize boas práticas de programação. Esperamos que seja definida uma arquitetura relativamente robusta já que deve-se ter em mente que o projeto pode assumir proporções bem maiores. Processando grandes volumes de dados e outras integrações.


### Dicas extras
- Como o seu sistema tem potencial para crescimento, inserção de novos requisitos e consequentemente manutenção, é uma boa decisão cobri-lo com testes automatizados;
- Use commits pequenos e bem descritos (nada de um commit único com todo o código)
