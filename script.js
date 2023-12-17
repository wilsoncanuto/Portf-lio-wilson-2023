//EVENTO DE CLICK NO BOTÃO INICIAR
$("#iniciar").on("click", function () {
  //MODO ATIVO OU NÃO (TOOGLE)
  $("#iniciar").toggleClass("active");
  $("#menuIniciar").toggleClass("active");
});

//LIGAR O RELÓGIO PRIMEIRA VEZ
setTimeout(() => {
  var hora = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  $("#relogio").html(hora);
}, 100);

//CONTAR RELOGIO CADA SEGUNDO
setInterval(() => {
  var hora = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  $("#relogio").html(hora);
}, 1000);

//DUPLO CLIQUE NO ÍCONE HTML5
$("#html5").dblclick(function () {
  $("#html5").removeClass("selected");
  $("#Html5").addClass("selected");
  $(".janela").css("display", "flex");
  $(".prog").addClass("active");
  $(".prog").css("display", "flex");
});



//TORNAR JANELA ARRASTÁVEL NA ÁREA DE TRABALHO
$(".janela").draggable({
  containment: ".area-de-trabalho"
});

//ICONES DA ÁREA DE TRABALHO ARRASTÁVEIS
$(".desktop-icon").draggable({
  containment: ".area-de-trabalho",
  stop: function () {
    $(this).removeClass("selected");
    $(this).addClass("selected");
  }
});

//CLICOU UMA VEZ SELECIONA / DESELECIONA
$(".desktop-icon").click(function () {
  if ($(this).hasClass("selected")) {
    $(this).removeClass("selected");
  } else {
    $(this).addClass("selected");
  }
});
//CLICOU EM ALGUMA PARTE DA ÁREA DE TRABALHO A JANELA FECHA
$(".area-de-trabalho").click(function () {
  $("#botaoDireito").hide();
  $("#menuIniciar").removeClass("active");
  $(".desktop-icon").each(function (index) {
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
    }
  });
});



//PREVINIR QUE ABRA O MENU PADRÃO DO NAVEGADOR (BOTÃO DIREITO)
$(document).contextmenu(function () {
  return false;
});

//CLICOU NO BOTÃO DE FECHAR DA JANELA
$("button[aria-label=Close]").click(function () {
  $(".janela").hide();
  $(".prog").hide();
});

//CLICOU EM MINIMIZAR
$("button[aria-label=Minimize]").click(function () {
  $(".janela").animate(
    {
      height: 0,
      width: "20px",
      top: $(window).height(),
      left: "140px"
    },
    200,
    function () {
      $(this).hide();
      $(".prog").removeClass("active");
    }
  );
});

//CLICOU EM MAXIMIZAR
$("button[aria-label=Maximize]").click(function () {
  if ($(".janela").attr("data-status") == "restaurado") {
    $(".janela").animate(
      {
        height: "100%",
        width: "100%",
        top: 0,
        left: 0
      },
      200,
      function () {
        console.log("Maximizado");
        $(".janela").attr("data-status", "maximizado");
      }
    );
  } else {
    $(".janela").animate(
      {
        height: "400px",
        width: "600px",
        top: "25%",
        left: "27%"
      },
      200,
      function () {
        $(".prog").addClass("active");
        $(".janela").attr("data-status", "restaurado");
      }
    );
  }
});

//TORNAR JANELA REDIMENCIONAVEL
$(".janela").resizable({
  minWidth: 200,
  minHeight: 50
});

//CLICOU NO PROGRAMA NA BARRA DE TAREFAS
$(".prog").click(function () {
  if ($(this).hasClass("active")) {
    $(".janela").animate(
      {
        height: 0,
        width: "20px",
        top: $(window).height(),
        left: "140px"
      },
      200,
      function () {
        $(this).hide();
        $(".prog").removeClass("active");
      }
    );
  } else {
    $(".janela").show();
    if ($(".janela").attr("data-status") == "restaurado") {
      $(".janela").animate(
        {
          height: "400px",
          width: "600px",
          top: "25%",
          left: "27%"
        },
        200,
        function () {
          $(".prog").addClass("active");
        }
      );
    } else {
      $(".janela").animate(
        {
          height: "100%",
          width: "100%",
          top: 0,
          left: 0
        },
        200,
        function () {
          $(".prog").addClass("active");
        }
      );
    }
  }
});