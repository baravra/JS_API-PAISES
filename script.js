/*-------------ELEMENTOS DO HTML QUE SERAO ADICIONADOS TEXTOS--------------*/
const divCarregar = document.querySelector(".conteudoGlobal");
const divFavoritos =  document.querySelector(".conteudoFavoritos");
const divQuantGlobal = document.querySelector("#popTotal");
const divPaisesGlobal = document.querySelector("#paisesTotal");

/*------------------------VARIAVEIS GLOBAIS-------------------------*/
var popTotal = 0
var globalPaises = []
var globalFavoritos = []
var popFavoritos = 0
var globalRegiao = []

window.addEventListener("load", function(){
    /*-----------------BUSCANDO OS DADOS DA API---------------*/
    const valores = this.fetch('https://restcountries.com/v2/all').then(res=>{
        /*--------------TRANSFORMANDO A RESPOSTA EM JSON---------------*/
            res.json().then(dados=>{
                for(i = 0; i < dados.length ;i++){
                    carregarTela(dados, i)
                } 
                divQuantGlobal.innerHTML = "População Total (" + popTotal +")"
                divPaisesGlobal.innerHTML = "Países (" +i+ ")"

            })
        }
    )
});

function carregarTela(dados, i){
    /*--------------VARIAVEIS DOS PAISES--------------*/
    var codPais = dados[i].numericCode
    var nomePais = dados[i].name
    var quantPss = dados[i].population
    var bandPais = dados[i].flag
    var regPais = dados[i].region

    /*-------------------TEXTO QUE SERA INSERIDO--------------------------*/
    var txt = "<div id='"+codPais+"' class='conteudo'>"
                + "<img src='"+bandPais+"' alt='bandeira' class='add' onclick='favoritar("+i+")'>"
                    + "<div>"
                        + "<h3 class='"+regPais+"'>"+nomePais+"</h3>"
                        + "<p>"+quantPss+"</p>"
                    + "</div>"
                + "</div>"
    
    divCarregar.innerHTML += txt
    popTotal += quantPss

    globalPaises.push({nome: nomePais, id: codPais , populacao: quantPss, bandeira: bandPais, regiao: regPais})
}

function favoritar(i){
    var favoritado = globalPaises[i]

    /*----------------------ADICIONANDO NO VETOR FAVORITOS E RETIRANDO DO GERAL----------------------*/
    globalFavoritos.push({nome: favoritado.nome , id: favoritado.id, populacao: favoritado.populacao, bandeira: favoritado.bandeira, regiao: favoritado.regiao })
    globalPaises.splice(i, 1)

   /*----------------------------ATUALIZANDO A RESPOSTA NA TELA------------------------------*/
   /*------------GERAL--------------*/
   divCarregar.innerHTML = ""
   popTotal = 0
   globalPaises = globalPaises.sort(function (a, b) {return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);    });

   for(x=0;x<globalPaises.length;x++){
        var pais = globalPaises[x]

       var texto = "<div id='"+pais.id+"' class='conteudo'>"
                    + "<img src='"+pais.bandeira+"' alt='bandeira' class='add' onclick='favoritar("+x+")'>"
                        + "<div>"
                            + "<h3 class='"+pais.regiao+"'>"+pais.nome+"</h3>"
                            + "<p>"+pais.populacao+"</p>"
                        + "</div>"
                    + "</div>"
        divCarregar.innerHTML += texto
        popTotal += pais.populacao
   }
   divQuantGlobal.innerHTML = "População Total (" + popTotal +")"
   divPaisesGlobal.innerHTML = "Países (" +x+ ")"

   /*------------FAVORITOS--------------*/
   divFavoritos.innerHTML = "" 
   popFavoritos = 0
   globalFavoritos = globalFavoritos.sort(function (a, b) { return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);    });

   for(y=0;y<globalFavoritos.length; y++){
       var paisFavorito = globalFavoritos[y]

        var textoFav = "<div id='"+paisFavorito.id+"' class='conteudo'>"
                   + "<img src='"+paisFavorito.bandeira+"' alt='bandeira' class='del' onclick='retirar("+y+")'>"
                       + "<div>"
                           + "<h3 class='"+paisFavorito.regiao+"'>"+paisFavorito.nome+"</h3>"
                           + "<p>"+paisFavorito.populacao+"</p>"
                       + "</div>"
                   + "</div>"
        divFavoritos.innerHTML += textoFav   
        popFavoritos += paisFavorito.populacao
   }
   document.querySelector("#paisesFavoritos").innerHTML = "Países (" + y + ")"
   document.querySelector("#popFavoritos").innerHTML = "População Total (" + popFavoritos + ")"

}

function retirar(y){
    var excluido = globalFavoritos[y];
    
    /*----------------------ADICIONANDO NO VETOR GERAL E RETIRANDO DO FAVORITO----------------------*/
    globalFavoritos.splice(y,1)
    globalPaises.push({nome: excluido.nome, id: excluido.id, bandeira: excluido.bandeira, populacao: excluido.populacao, regiao: excluido.regiao})

    /*----------------------------ATUALIZANDO A RESPOSTA NA TELA------------------------------*/
    /*---------------------GERAL---------------------------------*/
    divCarregar.innerHTML = ""
    popTotal = 0
    globalPaises = globalPaises.sort(function (a, b) { return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);    });
    for(Z=0;Z<globalPaises.length;Z++){
        var paisgLOBAL = globalPaises[Z]
 
        var texto = "<div id='"+paisgLOBAL.id+"' class='conteudo'>"
                     + "<img src='"+paisgLOBAL.bandeira+"' alt='bandeira' class='add' onclick='favoritar("+Z+")'>"
                         + "<div>"
                             + "<h3 class='"+paisgLOBAL.regiao+"'>"+paisgLOBAL.nome+"</h3>"
                             + "<p>"+paisgLOBAL.populacao+"</p>"
                         + "</div>"
                     + "</div>"
         divCarregar.innerHTML += texto
         popTotal += paisgLOBAL.populacao
    }
    divQuantGlobal.innerHTML = "População Total (" + popTotal +")"
    divPaisesGlobal.innerHTML = "Países (" +Z+ ")"
    /*---------------------FAVOTITOS---------------------------------*/
    divFavoritos.innerHTML = "" 
    popFavoritos = 0
    globalFavoritos = globalFavoritos.sort(function (a, b) { return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);    });
    for(w=0;w<globalFavoritos.length; w++){
        var paisExcluido = globalFavoritos[w]
 
         var textoFav = "<div id='"+paisExcluido.id+"' class='conteudo'>"
                    + "<img src='"+paisExcluido.bandeira+"' alt='bandeira' class='del' onclick='retirar("+w+")'>"
                        + "<div>"
                            + "<h3  class='"+paisExcluido.regiao+"'>"+paisExcluido.nome+"</h3>"
                            + "<p>"+paisExcluido.populacao+"</p>"
                        + "</div>"
                    + "</div>"
         divFavoritos.innerHTML += textoFav   
         popFavoritos += paisExcluido.populacao
    }
    document.querySelector("#paisesFavoritos").innerHTML = "Países (" + w + ")"
    document.querySelector("#popFavoritos").innerHTML = "População Total (" + popFavoritos + ")"
}

/*-----------------------------MOSTRAR POR REGIAO--------------------------------*/
function mostrar(regiao){
    globalRegiao = []
    switch(regiao){
        case "all":
            divCarregar.innerHTML = ""
            popTotal = 0
            globalPaises = globalPaises.sort(function (a, b) {return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);    });
            for(e = 0; e < globalPaises.length; e++){
                var PaisAll = globalPaises[e]
 
                var texto = "<div id='"+PaisAll.id+"' class='conteudo'>"
                            + "<img src='"+PaisAll.bandeira+"' alt='bandeira' class='add' onclick='favoritar("+e+")'>"
                                + "<div>"
                                    + "<h3 class='"+PaisAll.regiao+"'>"+PaisAll.nome+"</h3>"
                                    + "<p>"+PaisAll.populacao+"</p>"
                                + "</div>"
                            + "</div>"
                divCarregar.innerHTML += texto
                popTotal += PaisAll.populacao
            }
            divQuantGlobal.innerHTML = "População Total (" + popTotal +")"
            divPaisesGlobal.innerHTML = "Países (" +e+ ")"
        break;    
        case "Europe":
            for(a = 0; a < globalPaises.length; a++){
                if(globalPaises[a].regiao == "Europe"){
                    globalRegiao.push({nome: globalPaises[a].nome, id: globalPaises[a].id , populacao: globalPaises[a].populacao, bandeira: globalPaises[a].bandeira, regiao: globalPaises[a].regiao})
                }
            }
            montarPesquisa()
        break;
        case "Americas":
            for(a = 0; a < globalPaises.length; a++){
                if(globalPaises[a].regiao == "Americas"){
                    globalRegiao.push({nome: globalPaises[a].nome, id: globalPaises[a].id , populacao: globalPaises[a].populacao, bandeira: globalPaises[a].bandeira, regiao: globalPaises[a].regiao})
                }
            }
            montarPesquisa()
        break;
        case "Asia":
            for(a = 0; a < globalPaises.length; a++){
                if(globalPaises[a].regiao == "Asia"){
                    globalRegiao.push({nome: globalPaises[a].nome, id: globalPaises[a].id , populacao: globalPaises[a].populacao, bandeira: globalPaises[a].bandeira, regiao: globalPaises[a].regiao})
                }
            }
            montarPesquisa()
        break;
        case "Africa":
            for(a = 0; a < globalPaises.length; a++){
                if(globalPaises[a].regiao == "Africa"){
                    globalRegiao.push({nome: globalPaises[a].nome, id: globalPaises[a].id , populacao: globalPaises[a].populacao, bandeira: globalPaises[a].bandeira, regiao: globalPaises[a].regiao})
                }
            }
            montarPesquisa()
        break;
        case "Oceania":
            for(a = 0; a < globalPaises.length; a++){
                if(globalPaises[a].regiao == "Oceania"){
                    globalRegiao.push({nome: globalPaises[a].nome, id: globalPaises[a].id , populacao: globalPaises[a].populacao, bandeira: globalPaises[a].bandeira, regiao: globalPaises[a].regiao})
                }
            }
            montarPesquisa()
        break;
        case "Polar":
            for(a = 0; a < globalPaises.length; a++){
                if(globalPaises[a].regiao == "Polar"){
                    globalRegiao.push({nome: globalPaises[a].nome, id: globalPaises[a].id , populacao: globalPaises[a].populacao, bandeira: globalPaises[a].bandeira, regiao: globalPaises[a].regiao})
                }
            }
            montarPesquisa()
        break;
    }
}

function montarPesquisa(){
    divCarregar.innerHTML = ""
    popTotal = 0
    globalRegiao = globalRegiao.sort(function (a, b) {return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);    });
    for(m = 0; m < globalRegiao.length; m++){

        var paisRegiao = globalRegiao[m]
     
        var texto = "<div id='"+paisRegiao.id+"' class='conteudo'>"
                         + "<img src='"+paisRegiao.bandeira+"' alt='bandeira' class='add' onclick='favoritar("+m+")'>"
                             + "<div>"
                                 + "<h3 class='"+paisRegiao.regiao+"'>"+paisRegiao.nome+"</h3>"
                                 + "<p>"+paisRegiao.populacao+"</p>"
                             + "</div>"
                         + "</div>"
        divCarregar.innerHTML += texto
        popTotal += paisRegiao.populacao
        
        
    }
    divQuantGlobal.innerHTML = "População Total (" + popTotal +")"
    divPaisesGlobal.innerHTML = "Países (" +m+ ")"
}

function busca(){
    //console.clear()
    var paisProcura = document.querySelector("#buscar").value
    divCarregar.innerHTML = ""
    popTotal =0
    var teste = 0

    for(b = 0; b<globalPaises.length; b++)    {
        var nomePaisArray = globalPaises[b];

        if(nomePaisArray.nome.indexOf(paisProcura) != -1){

            var texto = "<div id='"+nomePaisArray.id+"' class='conteudo'>"
                         + "<img src='"+nomePaisArray.bandeira+"' alt='bandeira' class='add' onclick='favoritar("+b+")'>"
                             + "<div>"
                                 + "<h3 class='"+nomePaisArray.regiao+"'>"+nomePaisArray.nome+"</h3>"
                                 + "<p>"+nomePaisArray.populacao+"</p>"
                             + "</div>"
                         + "</div>"
            divCarregar.innerHTML += texto
            popTotal += nomePaisArray.populacao
            teste++

        }
    }
    divQuantGlobal.innerHTML = "População Total (" + popTotal +")"
    divPaisesGlobal.innerHTML = "Países (" +teste+ ")"
    //console.log(paisProcura)

}
