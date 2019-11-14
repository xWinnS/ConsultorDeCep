
let xmlHttp, retorno;

let pCep = document.getElementById('pCep');
let pLogradouro = document.getElementById('pLogradouro');
let pBairro = document.getElementById('pBairro');
let pLocalidade = document.getElementById('pLocalidade');
let pUF = document.getElementById('pUF');
let CodIbge = document.getElementById('pCodIbge');
let DivResposta = document.getElementById('DivResposta');
let DivInexistente = document.getElementById('DivInexistente');
let DivInvalida = document.getElementById('DivInvalida');


function ConsultarCep(){
    LimparDados();
    let cepFormatado = FormataCep();
    if(cepFormatado){
        xmlHttp = new XMLHttpRequest;
        xmlHttp.open('GET','https://viacep.com.br/ws/'+cepFormatado+'/xml/',true);
        xmlHttp.send();
        xmlHttp.onreadystatechange = function(){
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
                retorno = xmlHttp.responseXML;
                VerificaErro = retorno.getElementsByTagName('erro');
                if(VerificaErro.length == 0){
                    RespostaConsulta();
                }else{
                   Inexistente();
                }
            }
        }
    }else{
        Invalido();
    }
    document.getElementById("campoCep").value = null;
}

function FormataCep(){
    campoCep = document.getElementById("campoCep").value;
    campoCep = campoCep.replace(/\./g,"");
    Cep = campoCep.replace(/\-/g,"");
    if(Cep.length == 8){
        return Cep;
    }else{
        return false;
    }
}

function RespostaConsulta(){
    RetornoCep = retorno.getElementsByTagName('cep');
    RetornoLogradouro = retorno.getElementsByTagName('logradouro');
    RetornoBairro = retorno.getElementsByTagName('bairro');
    RetornoLocalidade = retorno.getElementsByTagName('localidade');
    RetornoUF = retorno.getElementsByTagName('uf');
    RetornoCodIbge = retorno.getElementsByTagName('ibge');
    ImprimirDados();
}

function ImprimirDados(){
    pCep.innerHTML += RetornoCep[0].childNodes[0].nodeValue;
    pLogradouro.innerHTML +=RetornoLogradouro[0].childNodes[0].nodeValue;
    pBairro.innerHTML += RetornoBairro[0].childNodes[0].nodeValue;
    pLocalidade.innerHTML += RetornoLocalidade[0].childNodes[0].nodeValue;
    pUF.innerHTML += RetornoUF[0].childNodes[0].nodeValue;
    pCodIbge.innerHTML += RetornoCodIbge[0].childNodes[0].nodeValue;
    Sucesso();
}

function LimparDados(){
    pCep.innerHTML = "";
    pLogradouro.innerHTML = "";
    pBairro.innerHTML = "";
    pLocalidade.innerHTML = "";
    pUF.innerHTML = "";
    pCodIbge.innerHTML = "";
}

function Sucesso(){
    DivInexistente.classList.remove("Visivel");
    DivInvalida.classList.remove("Visivel");
    DivResposta.classList.add("Visivel");
}

function Inexistente(){
    DivResposta.classList.remove("Visivel");
    DivInvalida.classList.remove("Visivel");
    DivInexistente.classList.add("Visivel");
}

function Invalido(){
    DivInexistente.classList.remove("Visivel");
    DivResposta.classList.remove("Visivel");  
    DivInvalida.classList.add("Visivel");
}