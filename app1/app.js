
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) { //recuperar atributos do obj
            if (this[i] == undefined || this[i] == '' || this[i] == null) {// acessar a informação[]
                return false
            } else {
                return true
            }
        }

    }
}

class BD {

    constructor() {

        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0) // iniciar o id = 0
        }
    }

    getProximoId() { //verifica se já tem um id no localStorage

        let proximoId = localStorage.getItem('id') //Recuperar o id que foi inserido

        return parseInt(proximoId) + 1
    }

    gravar(d) {

        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id) // atualizar a chave id com o id recuperado, que é um número

    }

    recuperarTodosRegistros() {

        let despesas = Array()

        let id = localStorage.getItem('id')
        // recuperar as despesas cadastradas
        for (let i = 1; i <= id; i++) {
            //recuperar despesa
            let despesa = JSON.parse(localStorage.getItem(i)) //converte p/ obj literal
            if (despesa === null) {
                continue
            }
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {

        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        //ano
        if (despesa.ano != '') {
            console.log('filtro de ano');
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        //mes
        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        //dia
        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        //descricao
        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        //tipo
        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        //valor
        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }

}

let bd = new BD()


function cadastraDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )


    if (despesa.validarDados()) {
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'

        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso'
        document.getElementById('modal_btd').innerHTML = 'Voltar'
        document.getElementById('modal_btd').className = 'btn btn-success'
        //sucesso
        $('#modalRegistraDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        descricao.value = ''
        tipo.value = ''
        valor.value = ''



    } else {

        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação verifique se todos os dados foram inseridos corretamente'
        document.getElementById('modal_btd').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btd').className = 'btn btn-danger'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'


        //Erro, falta info
        $('#modalRegistraDespesa').modal('show')
    }


}

function carregaListaDespesas(despesas = Array(), filtro = false) {


    if(despesas.length == 0 && filtro == felse){
        despesas = bd.recuperarTodosRegistros()
    }
    

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    despesas.forEach(function (d) {

        //criando linha (tr)
        let linha = listaDespesas.insertRow()

        //criar colunas(td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //ajustar tipo
        switch (d.tipo) {

            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })


}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)


    let despesas = bd.pesquisar(despesa)
    
    carregaListaDespesas(despesas)
}


