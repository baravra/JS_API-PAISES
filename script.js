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

window.addEventListener("load", function(){
    /*-----------------BUSCANDO OS DADOS DA API---------------*/
    const valores = this.fetch('https://restcountries.com/v2/all').then(res=>{
        /*--------------TRANSFORMANDO A RESPOSTA EM JSON---------------*/
            res.json().then(dados=>{
                //console.log(dados)
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

    /*-------------------TEXTO QUE SERA INSERIDO--------------------------*/
    var txt = "<div id='"+codPais+"' class='conteudo'>"
                + "<img src='"+bandPais+"' alt='bandeira' class='add' onclick='favoritar("+i+")'>"
                    + "<div>"
                        + "<h3>"+nomePais+"</h3>"
                        + "<p>"+quantPss+"</p>"
                    + "</div>"
                + "</div>"
    
    divCarregar.innerHTML += txt
    popTotal += quantPss

    globalPaises.push({nome: nomePais, id: codPais , populacao: quantPss, bandeira: bandPais})
}

function favoritar(i){
    var favoritado = globalPaises[i]

    /*----------------------ADICIONANDO NO VETOR FAVORITOS E RETIRANDO DO GERAL----------------------*/
    globalFavoritos.push({nome: favoritado.nome , id: favoritado.id, populacao: favoritado.populacao, bandeira: favoritado.bandeira})
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
                            + "<h3>"+pais.nome+"</h3>"
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
                           + "<h3>"+paisFavorito.nome+"</h3>"
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
    globalPaises.push({nome: excluido.nome, id: excluido.id, bandeira: excluido.bandeira, populacao: excluido.populacao})

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
                             + "<h3>"+paisgLOBAL.nome+"</h3>"
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
                            + "<h3>"+paisExcluido.nome+"</h3>"
                            + "<p>"+paisExcluido.populacao+"</p>"
                        + "</div>"
                    + "</div>"
         divFavoritos.innerHTML += textoFav   
         popFavoritos += paisExcluido.populacao
    }
    document.querySelector("#paisesFavoritos").innerHTML = "Países (" + w + ")"
    document.querySelector("#popFavoritos").innerHTML = "População Total (" + popFavoritos + ")"
}

